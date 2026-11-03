#!/usr/bin/env python3
"""Look up verses in your private Orthodox Study Bible index.

    python3 tools/osb_lookup.py "John 1:1-5"          # read a passage (for your own study)
    python3 tools/osb_lookup.py "Ps 50:3"             # Psalms use the Greek numbering, like the OSB
    python3 tools/osb_lookup.py "Gen 1:31-2:3"        # ranges can cross chapters
    python3 tools/osb_lookup.py --site "John 1:14"    # a short quote ready to paste into data.js

Run tools/osb_index.py first to build source/osb-index.json.

The public site may show at most TWO verses from the OSB, always with the
reference and a link to the full passage on a free online Bible. --site
refuses anything longer, so whole chapters or long passages never end up
on the site. You can also use lookup() and site_quote() from Python.
"""

import argparse
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from bible_books import canonical, free_link  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / "source" / "osb-index.json"
MAX_SITE_VERSES = 2
MAX_SITE_CHARS = 450   # a safety net in case two verses are unusually long

_REF = re.compile(r"^\s*(?P<book>(?:[1-4]\s*)?[A-Za-z][A-Za-z .']*?)\s*(?P<c1>\d+)(?:\s*[:.]\s*(?P<v1>\d+))?"
                  r"(?:\s*[-–—]\s*(?:(?P<c2>\d+)\s*[:.]\s*)?(?P<v2>\d+))?\s*$")

_index = None


def load(path=INDEX):
    global _index
    if _index is None:
        if not Path(path).exists():
            sys.exit(f"Can't find {path}. Run:  python3 tools/osb_index.py")
        _index = json.loads(Path(path).read_text(encoding="utf-8"))
    return _index


def parse(ref):
    """'John 1:1-5' -> ('John', 1, 1, 1, 5). A chapter alone ('John 3') means the whole chapter."""
    m = _REF.match(ref)
    if not m:
        raise ValueError(f'Could not read "{ref}". Try a form like "John 1:1-5".')
    book = canonical(m["book"].strip())
    if not book:
        raise ValueError(f'Unknown book "{m["book"].strip()}".')
    c1 = int(m["c1"])
    v1 = int(m["v1"]) if m["v1"] else None
    if m["v2"]:
        c2, v2 = (int(m["c2"]), int(m["v2"])) if m["c2"] else (c1, int(m["v2"]))
    else:
        c2, v2 = c1, v1
    return book, c1, v1, c2, v2


def lookup(ref, index=None):
    """Return a list of (book, chapter, verse, text) for a reference like 'John 1:1-5'."""
    data = index or load()
    book, c1, v1, c2, v2 = parse(ref)
    chapters = data["verses"].get(book)
    if not chapters:
        raise ValueError(f"{book} is not in the index.")
    out = []
    for c in range(c1, c2 + 1):
        vs = chapters.get(str(c), {})
        if not vs:
            raise ValueError(f"{book} {c} is not in the index.")
        nums = sorted(int(v) for v in vs)
        lo = v1 if (c == c1 and v1) else nums[0]
        hi = v2 if (c == c2 and v2) else nums[-1]
        for v in nums:
            if lo <= v <= hi:
                out.append((book, c, v, vs[str(v)]))
    if not out:
        raise ValueError(f'No verses found for "{ref}".')
    return out


def pretty_ref(verses):
    b, c1, v1, _ = verses[0]
    if b == "Psalms" and verses[0][1] == verses[-1][1]:
        b = "Psalm"
    _, c2, v2, _ = verses[-1]
    if (c1, v1) == (c2, v2):
        return f"{b} {c1}:{v1}"
    return f"{b} {c1}:{v1}–{v2}" if c1 == c2 else f"{b} {c1}:{v1}–{c2}:{v2}"


def site_quote(ref, index=None):
    """A short quote for the public site: at most two verses, plus reference and free link."""
    verses = lookup(ref, index)
    if len(verses) > MAX_SITE_VERSES:
        raise ValueError(f"{pretty_ref(verses)} is {len(verses)} verses. The public site may quote at most "
                         f"{MAX_SITE_VERSES}; link to the full passage instead.")
    text = " ".join(t for *_x, t in verses)
    if len(text) > MAX_SITE_CHARS:
        raise ValueError(f"That quote is {len(text)} characters, over the {MAX_SITE_CHARS} limit. Quote one verse instead.")
    b, c, _v, _t = verses[0]
    return {"text": text, "ref": pretty_ref(verses) + " (OSB)", "url": free_link(b, c)}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("reference", nargs="+", help='e.g. "John 1:1-5"')
    ap.add_argument("--site", action="store_true", help="print a short quote (max 2 verses) ready to paste into data.js")
    ap.add_argument("--index", default=str(INDEX), help="path to the index (default: source/osb-index.json)")
    args = ap.parse_args()
    ref = " ".join(args.reference)
    data = load(args.index)
    try:
        if args.site:
            q = site_quote(ref, data)
            print("Paste this into an entry in data.js:\n")
            print("    quote: " + json.dumps(q, ensure_ascii=False) + ",")
        else:
            verses = lookup(ref, data)
            print(pretty_ref(verses) + "\n")
            last_c = None
            for _b, c, v, t in verses:
                if last_c is not None and c != last_c:
                    print()
                print(f"  {c}:{v}  {t}")
                last_c = c
    except ValueError as e:
        sys.exit(str(e))


if __name__ == "__main__":
    main()
