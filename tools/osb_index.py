#!/usr/bin/env python3
"""Build a private verse index from your Orthodox Study Bible EPUB.

    python3 tools/osb_index.py                 # reads source/osb.epub, writes source/osb-index.json
    python3 tools/osb_index.py --inspect       # shows how the EPUB marks verses (if indexing finds too few)
    python3 tools/osb_index.py --epub other.epub --out source/other-index.json

Everything stays in the source/ folder, which .gitignore keeps out of
GitHub and the public site. Only Python 3 is needed (no extra installs).

How it reads the EPUB:
  1. Unzips it in memory and follows the book's reading order (the OPF "spine").
  2. Parses each HTML page and finds verse starts, using whichever of these the
     EPUB uses:
       - anchors with ids like  John_vchap1-5,  Jn.1.5,  John_1_5,  v1_5
       - verse-number tags such as <sup class="verse">5</sup> or <span class="vnum">5</span>
       - chapter-number tags such as <span class="chapter-num">1</span>
  3. Skips study notes, footnotes, cross-references and section headings, so
     only the Scripture text itself goes into the index.
"""

import argparse
import collections
import json
import posixpath
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from bible_books import ORDER, canonical  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_EPUB = ROOT / "source" / "osb.epub"
DEFAULT_OUT = ROOT / "source" / "osb-index.json"

# Text inside elements whose class or id matches this is not Scripture text.
SKIP_RE = re.compile(r"foot|note|study|comment|xref|cross|annot|sidebar|article|intro|outline|gloss|ref-|heading|title|subhead|caption", re.I)
# Element ids that mark a verse start:  John_vchap1-5 | Jn.1.5 | John_1_5 | John-1-5 | John1:5
ANCHOR_RES = [
    re.compile(r"^(?P<b>[1-4]?[A-Za-z]+)_v?chap(?P<c>\d+)[-_](?P<v>\d+)$"),
    re.compile(r"^(?P<b>[1-4]?[A-Za-z]+)[._\-](?P<c>\d+)[._\-:](?P<v>\d+)$"),
    re.compile(r"^(?P<b>[1-4]?[A-Za-z]+?)(?P<c>\d+)[:._\-](?P<v>\d+)$"),
    re.compile(r"^v(?:erse)?[_\-]?(?P<c>\d+)[_\-:.](?P<v>\d+)$"),
]
VERSE_CLASS_RE = re.compile(r"(^|[\s_-])(v|vs|verse|versenum|verse-num|vnum|v-num|verse_number|verseno)($|[\s_-])", re.I)
CHAPTER_CLASS_RE = re.compile(r"chapter|chap-?num|chnum|drop-?cap", re.I)
VOID = {"br", "img", "hr", "meta", "link", "input", "wbr", "col", "area", "base", "source"}
HEAD_TAGS = {"h1", "h2", "h3", "h4", "h5", "h6", "title"}


class PageParser(HTMLParser):
    """Collects verse text from one XHTML page into the shared index."""

    def __init__(self, idx, state, stats):
        super().__init__(convert_charrefs=True)
        self.idx, self.st, self.stats = idx, state, stats
        self.stack = []            # (tag, skipping, role)
        self.head_text = []

    # ----- helpers -----
    def skipping(self):
        return any(s for _t, s, _r in self.stack)

    def role(self):
        for _t, _s, r in reversed(self.stack):
            if r:
                return r
        return None

    def start_verse(self, book, ch, v, how):
        if book:
            self.st["book"] = book
        if not self.st.get("book"):
            self.stats["no_book"] += 1
            return
        self.st["chapter"], self.st["verse"] = ch, v
        self.stats[how] += 1

    # ----- parser callbacks -----
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        cls, eid = a.get("class", "") or "", a.get("id", "") or ""
        # verse anchors by id
        for rx in ANCHOR_RES:
            m = rx.match(eid)
            if m:
                b = canonical(m.groupdict().get("b") or "") if m.groupdict().get("b") else None
                if m.groupdict().get("b") and not b:
                    continue                      # not a book we know (e.g. a footnote id)
                self.start_verse(b, int(m["c"]), int(m["v"]), "anchors")
                break
        skip = bool(SKIP_RE.search(cls) or SKIP_RE.search(eid)) and not VERSE_CLASS_RE.search(cls)
        if tag in HEAD_TAGS:
            skip, role = True, "heading"
        elif VERSE_CLASS_RE.search(cls):
            role = "verse-num"
        elif CHAPTER_CLASS_RE.search(cls) and not SKIP_RE.search(cls):
            role = "chapter-num"
        elif tag == "sup":
            role = "sup"
        elif tag == "a" and "#" in (a.get("href") or "") and not self.role():
            role = "link"             # footnote/cross-reference markers inside the text
        else:
            role = None
        if tag == "head":
            skip = True
        if tag not in VOID:
            self.stack.append((tag, skip, role))
        if tag in ("p", "div", "br", "li") and self.st.get("verse"):
            self.add(" ")

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        while self.stack:
            t, _s, r = self.stack.pop()
            if r == "heading" and t == tag:
                text = " ".join("".join(self.head_text).split())
                self.head_text = []
                b = canonical(text) or canonical(re.sub(r"\s+\d+$", "", text))
                if b:
                    self.st["book"] = b
                    self.stats["book_from_heading"] += 1
            if t == tag:
                break

    def handle_data(self, data):
        role = self.role()
        txt = data.strip()
        if role == "heading":
            self.head_text.append(data)
            return
        if role in ("verse-num", "chapter-num", "sup") and re.fullmatch(r"\d{1,3}", txt):
            n = int(txt)
            if role == "chapter-num":
                self.start_verse(None, n, 1, "chapter_tags")
            else:
                self.start_verse(None, self.st.get("chapter") or 1, n, "verse_tags")
            return
        if role in ("sup", "link") or self.skipping():
            return                     # footnote markers, notes, headings
        if self.st.get("verse"):
            self.add(data)

    def add(self, s):
        k = (self.st["book"], self.st["chapter"], self.st["verse"])
        self.idx[k].append(s)


def spine_files(z):
    container = ET.fromstring(z.read("META-INF/container.xml"))
    ns = {"c": "urn:oasis:names:tc:opendocument:xmlns:container"}
    opf_path = container.find(".//c:rootfile", ns).get("full-path")
    opf = ET.fromstring(z.read(opf_path))
    ons = {"o": "http://www.idpf.org/2007/opf"}
    manifest = {i.get("id"): i.get("href") for i in opf.findall(".//o:manifest/o:item", ons)}
    base = posixpath.dirname(opf_path)
    out = []
    for ref in opf.findall(".//o:spine/o:itemref", ons):
        href = manifest.get(ref.get("idref"))
        if href and re.search(r"\.x?html?$", href, re.I):
            out.append(posixpath.normpath(posixpath.join(base, href)))
    return out


def build(epub):
    idx = collections.defaultdict(list)
    stats = collections.Counter()
    state = {}
    with zipfile.ZipFile(epub) as z:
        files = spine_files(z)
        for f in files:
            if re.search(r"note|footnote|comment|study|article|glossary|index|toc|cover|copyright", posixpath.basename(f), re.I):
                stats["skipped_files"] += 1
                continue
            p = PageParser(idx, state, stats)
            p.feed(z.read(f).decode("utf-8", "replace"))
            p.close()
            state["verse"] = None          # text never runs across page files
    verses = {}
    for (b, c, v), parts in idx.items():
        text = " ".join("".join(parts).split())
        text = re.sub(r"\s+([,.;:!?’”)])", r"\1", text)
        if text:
            verses.setdefault(b, {}).setdefault(str(c), {})[str(v)] = text
    books = [b for b in ORDER if b in verses] + sorted(b for b in verses if b not in ORDER)
    return {"source": Path(epub).name, "books": books, "verses": {b: verses[b] for b in books}}, stats, len(files)


def inspect(epub):
    """Print what the EPUB's markup looks like, to help adjust the patterns above."""
    with zipfile.ZipFile(epub) as z:
        files = spine_files(z)
        print(f"{len(files)} pages in reading order. First few: {files[:5]}")
        ids, classes = collections.Counter(), collections.Counter()
        for f in files[: min(len(files), 40)]:
            s = z.read(f).decode("utf-8", "replace")
            ids.update(re.sub(r"\d+", "#", m) for m in re.findall(r'id="([^"]+)"', s))
            for m in re.findall(r'class="([^"]+)"', s):
                classes.update(m.split())
        print("\nMost common id patterns (digits shown as #):")
        for k, n in ids.most_common(15):
            print(f"  {n:6}  {k}")
        print("\nMost common class names:")
        for k, n in classes.most_common(25):
            print(f"  {n:6}  {k}")
        sample = next((f for f in files if re.search(r"gen|john|jn|matt", f, re.I)), files[min(5, len(files) - 1)])
        print(f"\nA short sample of the markup from {sample} (words replaced by …, so no Bible text is shown):\n")
        s = z.read(sample).decode("utf-8", "replace")
        body = s[s.find("<body"):]
        tags_only = re.sub(r">([^<]*[A-Za-z][^<]*)<", lambda m: ">" + ("…" if not re.fullmatch(r"\s*\d{1,3}\s*", m.group(1)) else m.group(1)) + "<", body)
        print(tags_only[:2000])


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--epub", default=str(DEFAULT_EPUB), help="path to the EPUB (default: source/osb.epub)")
    ap.add_argument("--out", default=str(DEFAULT_OUT), help="where to save the index (default: source/osb-index.json)")
    ap.add_argument("--inspect", action="store_true", help="show how the EPUB marks verses, then stop")
    args = ap.parse_args()
    epub = Path(args.epub)
    if not epub.exists():
        sys.exit(f"Can't find {epub}. Put your EPUB in the source/ folder and name it osb.epub (or use --epub).")
    if args.inspect:
        inspect(epub)
        return
    data, stats, npages = build(epub)
    total = sum(len(vs) for b in data["verses"].values() for vs in b.values())
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"Read {npages} pages. Found {total} verses in {len(data['books'])} books.")
    print("Verse starts found by: " + ", ".join(f"{k.replace('_', ' ')} {v}" for k, v in stats.items() if k not in ("skipped_files",)))
    for b in data["books"]:
        chs = data["verses"][b]
        print(f"  {b:22} {len(chs):3} chapters  {sum(len(v) for v in chs.values()):5} verses")
    print(f"Saved {out}")
    if total < 1000:
        print("\nThat's fewer verses than a whole Bible should have. Run with --inspect and share the "
              "output (it shows markup, not Bible text) so the patterns can be adjusted.")


if __name__ == "__main__":
    main()
