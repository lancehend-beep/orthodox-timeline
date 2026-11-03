"""Book names for the Orthodox Study Bible tools.

Each book has one standard name (what the index stores) and the other
spellings people use, so "Jn", "John" and "Gospel of John" all work, and
Western names like "1 Samuel" find the Orthodox "1 Kingdoms".

`free_link` gives a free online copy of a chapter for the public site:
the Septuagint (Brenton) for the Old Testament and the King James
Version for the New, both on ebible.org (the same sources the site uses).
Psalm numbers follow the Greek (Septuagint) numbering, like the OSB.
"""

import re

# (standard name, ebible code, testament, other names)
BOOKS = [
    ("Genesis", "GEN", "OT", ["gen", "ge", "gn"]),
    ("Exodus", "EXO", "OT", ["exod", "exo", "ex"]),
    ("Leviticus", "LEV", "OT", ["lev", "le", "lv"]),
    ("Numbers", "NUM", "OT", ["num", "nu", "nm"]),
    ("Deuteronomy", "DEU", "OT", ["deut", "deu", "dt"]),
    ("Joshua", "JOS", "OT", ["josh", "jos", "jsh", "joshua of navi"]),
    ("Judges", "JDG", "OT", ["judg", "jdg", "jdgs"]),
    ("Ruth", "RUT", "OT", ["ru", "rut"]),
    ("1 Kingdoms", "1SA", "OT", ["1kgdms", "1kgdm", "1 kgdms", "1 samuel", "1sam", "1 sam", "1sa", "i kingdoms", "1 reigns"]),
    ("2 Kingdoms", "2SA", "OT", ["2kgdms", "2kgdm", "2 kgdms", "2 samuel", "2sam", "2 sam", "2sa", "ii kingdoms", "2 reigns"]),
    ("3 Kingdoms", "1KI", "OT", ["3kgdms", "3kgdm", "3 kgdms", "1 kings", "1kgs", "1 kgs", "1ki", "iii kingdoms", "3 reigns"]),
    ("4 Kingdoms", "2KI", "OT", ["4kgdms", "4kgdm", "4 kgdms", "2 kings", "2kgs", "2 kgs", "2ki", "iv kingdoms", "4 reigns"]),
    ("1 Chronicles", "1CH", "OT", ["1chr", "1 chr", "1ch", "1 paralipomenon", "1 chronicles"]),
    ("2 Chronicles", "2CH", "OT", ["2chr", "2 chr", "2ch", "2 paralipomenon"]),
    ("1 Ezra", "1ES", "OT", ["1ezra", "1 esdras", "1esd", "1 esd", "1es"]),
    ("2 Ezra", "EZR", "OT", ["2ezra", "ezra", "ezr", "2 esdras"]),
    ("Nehemiah", "NEH", "OT", ["neh", "ne"]),
    ("Tobit", "TOB", "OT", ["tob", "tb"]),
    ("Judith", "JDT", "OT", ["jdt", "jth"]),
    ("Esther", "ESG", "OT", ["esth", "est", "es"]),
    ("1 Maccabees", "1MA", "OT", ["1macc", "1 macc", "1mac", "1ma"]),
    ("2 Maccabees", "2MA", "OT", ["2macc", "2 macc", "2mac", "2ma"]),
    ("3 Maccabees", "3MA", "OT", ["3macc", "3 macc", "3mac", "3ma"]),
    ("Psalms", "PSA", "OT", ["ps", "psa", "psalm", "pss", "psalter"]),
    ("Job", "JOB", "OT", ["jb"]),
    ("Proverbs", "PRO", "OT", ["prov", "pro", "prv", "pr"]),
    ("Ecclesiastes", "ECC", "OT", ["eccl", "ecc", "eccles", "qoh"]),
    ("Song of Songs", "SNG", "OT", ["song", "sg", "sng", "song of solomon", "canticles", "sos"]),
    ("Wisdom of Solomon", "WIS", "OT", ["wis", "wisdom", "ws"]),
    ("Wisdom of Sirach", "SIR", "OT", ["sir", "sirach", "ecclus", "ecclesiasticus"]),
    ("Hosea", "HOS", "OT", ["hos", "ho"]),
    ("Amos", "AMO", "OT", ["am", "amo"]),
    ("Micah", "MIC", "OT", ["mic", "mi"]),
    ("Joel", "JOL", "OT", ["jl", "joe"]),
    ("Obadiah", "OBA", "OT", ["obad", "oba", "ob"]),
    ("Jonah", "JON", "OT", ["jon", "jnh"]),
    ("Nahum", "NAM", "OT", ["nah", "na"]),
    ("Habakkuk", "HAB", "OT", ["hab", "hb"]),
    ("Zephaniah", "ZEP", "OT", ["zeph", "zep", "zp"]),
    ("Haggai", "HAG", "OT", ["hag", "hg"]),
    ("Zechariah", "ZEC", "OT", ["zech", "zec", "zc"]),
    ("Malachi", "MAL", "OT", ["mal", "ml"]),
    ("Isaiah", "ISA", "OT", ["isa", "is"]),
    ("Jeremiah", "JER", "OT", ["jer", "je"]),
    ("Baruch", "BAR", "OT", ["bar", "ba"]),
    ("Lamentations", "LAM", "OT", ["lam", "la", "lamentations of jeremiah"]),
    ("Epistle of Jeremiah", "LJE", "OT", ["epjer", "ep jer", "letter of jeremiah", "epistle of jeremy", "lje"]),
    ("Ezekiel", "EZK", "OT", ["ezek", "eze", "ezk"]),
    ("Daniel", "DAG", "OT", ["dan", "da", "dn"]),
    ("Susanna", "SUS", "OT", ["sus"]),
    ("Bel and the Dragon", "BEL", "OT", ["bel"]),
    ("Prayer of Manasseh", "MAN", "OT", ["prman", "pr man", "manasseh", "man"]),
    ("4 Maccabees", "4MA", "OT", ["4macc", "4 macc", "4mac", "4ma"]),
    ("Matthew", "MAT", "NT", ["matt", "mat", "mt", "gospel of matthew"]),
    ("Mark", "MRK", "NT", ["mk", "mrk", "mar", "gospel of mark"]),
    ("Luke", "LUK", "NT", ["lk", "luk", "lu", "gospel of luke"]),
    ("John", "JHN", "NT", ["jn", "jhn", "joh", "gospel of john"]),
    ("Acts", "ACT", "NT", ["act", "ac", "acts of the apostles"]),
    ("Romans", "ROM", "NT", ["rom", "ro", "rm"]),
    ("1 Corinthians", "1CO", "NT", ["1cor", "1 cor", "1co"]),
    ("2 Corinthians", "2CO", "NT", ["2cor", "2 cor", "2co"]),
    ("Galatians", "GAL", "NT", ["gal", "ga"]),
    ("Ephesians", "EPH", "NT", ["eph", "ephes"]),
    ("Philippians", "PHP", "NT", ["phil", "php", "pp"]),
    ("Colossians", "COL", "NT", ["col"]),
    ("1 Thessalonians", "1TH", "NT", ["1thess", "1 thess", "1th"]),
    ("2 Thessalonians", "2TH", "NT", ["2thess", "2 thess", "2th"]),
    ("1 Timothy", "1TI", "NT", ["1tim", "1 tim", "1ti"]),
    ("2 Timothy", "2TI", "NT", ["2tim", "2 tim", "2ti"]),
    ("Titus", "TIT", "NT", ["tit", "ti"]),
    ("Philemon", "PHM", "NT", ["phlm", "phm", "philem"]),
    ("Hebrews", "HEB", "NT", ["heb"]),
    ("James", "JAS", "NT", ["jas", "jm"]),
    ("1 Peter", "1PE", "NT", ["1pet", "1 pet", "1pe", "1pt"]),
    ("2 Peter", "2PE", "NT", ["2pet", "2 pet", "2pe", "2pt"]),
    ("1 John", "1JN", "NT", ["1jn", "1 jn", "1john", "1jo"]),
    ("2 John", "2JN", "NT", ["2jn", "2 jn", "2john", "2jo"]),
    ("3 John", "3JN", "NT", ["3jn", "3 jn", "3john", "3jo"]),
    ("Jude", "JUD", "NT", ["jud", "jd"]),
    ("Revelation", "REV", "NT", ["rev", "re", "apocalypse", "revelation of john"]),
]

ORDER = [b[0] for b in BOOKS]
_INFO = {b[0]: b for b in BOOKS}


def _key(s):
    s = s.lower().replace("first ", "1 ").replace("second ", "2 ").replace("third ", "3 ").replace("fourth ", "4 ")
    s = re.sub(r"^(the )?(book of |gospel (according )?to )", "", s)
    s = re.sub(r"^(iv|iii|ii|i)\b", lambda m: {"i": "1", "ii": "2", "iii": "3", "iv": "4"}[m.group(1)], s)
    return re.sub(r"[^a-z0-9]", "", s)


_ALIASES = {}
for name, code, _t, others in BOOKS:
    for a in [name, code] + others:
        _ALIASES.setdefault(_key(a), name)


def canonical(name):
    """Return the standard book name for any common spelling, or None."""
    return _ALIASES.get(_key(name or ""))


def testament(name):
    return _INFO[name][2]


def free_link(book, chapter):
    """A free online copy of the chapter (Brenton Septuagint or KJV on ebible.org)."""
    code = _INFO[book][1]
    width = 3 if code == "PSA" else 2
    edition = "eng-Brenton" if _INFO[book][2] == "OT" else "eng-kjv2006"
    return f"https://ebible.org/{edition}/{code}{int(chapter):0{width}d}.htm"
