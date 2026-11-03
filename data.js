/* =====================================================================
   ORTHODOX TIMELINE — ALL THE CONTENT LIVES IN THIS ONE FILE
   =====================================================================

   HOW TO ADD A NEW ENTRY (the short version):
   1. Find the section below for the kind of thing you are adding
      (BIBLE, FATHERS, COUNCILS, SYNODS, or EVENTS).
   2. Copy an existing entry, from its opening {  to its closing  },
      including the comma after it.
   3. Paste it where you want it and change the text.
   4. Give it a unique "id" (lowercase, no spaces, e.g. "st-nektarios").
   5. "year" decides where it appears. Use a NEGATIVE number for BC
      (e.g. -700 = 700 BC). It is only used for sorting.
      "date" is the text people will actually read (e.g. "c. 700 BC").
   6. Save the file and refresh the page in your browser.

   LINKS: ORTHODOX SOURCES ONLY
   Reading links should point to Orthodox sources (for example OrthodoxWiki,
   oca.org, goarch.org, antiochian.org, or an Orthodox monastery or seminary
   website). When no Orthodox source is known yet, the page shows
   "Orthodox link needed" so you can find one later.

   Link helpers (shortcuts instead of typing full web addresses):
     OW("words")         -> a search on OrthodoxWiki for those words
     FIND("words")       -> a general library search on archive.org. Only
                            offered as a backup next to "Orthodox link needed".

   How to write a link in a "links" list:
     { label: "Read the canons", url: "https://www.example-orthodox-site.org/..." }
     { label: "Read the canons", needed: true }      shows "Orthodox link needed"

   In a list of writings ("works"), each work can have:
     link: "https://..."   an Orthodox online copy of that writing
     find: "search words"  optional words for the backup archive.org search
     If there is no "link", the work shows "Orthodox link needed".

   For a Bible book, add   text: "https://..."   with an Orthodox online copy
   of that book. Without it, the book shows "Orthodox link needed".

   A note on links: they were written from known, stable link patterns
   but could not be click-tested when the site was built. If one is
   broken, just fix or remove it here.
   ===================================================================== */

const FIND = (q) => `https://archive.org/search?query=${encodeURIComponent(q)}`;
const OW = (q) => `https://orthodoxwiki.org/index.php?search=${encodeURIComponent(q)}`;

/* ---------------------------------------------------------------------
   ERAS: the big labeled sections of the timeline.
   An entry is placed in an era automatically by its "year",
   unless the entry has its own  era: "..."  line.
   "short" is a shorter name used on the horizontal timeline when space is tight.
   --------------------------------------------------------------------- */
const ERAS = [
  { id: "ot", short: "Old Testament", name: "The Old Testament", range: "c. 1400 BC – 1 BC", from: -5000, to: -5,
    intro: "God prepares His people. The books of the Old Testament, in the Greek Septuagint the Apostles used, were written over about a thousand years." },
  { id: "apostolic", short: "Apostolic Age", name: "New Testament & the Apostolic Age", range: "c. 4 BC – AD 100", from: -4, to: 100,
    intro: "Christ is born, dies, and rises. The Holy Spirit descends at Pentecost, the Apostles found the Church, and the New Testament is written." },
  { id: "fathers", short: "Early Fathers", name: "Age of the Martyrs & Early Fathers", range: "100 – 324", from: 101, to: 324,
    intro: "Under waves of persecution, bishops and teachers who learned from the Apostles defend the faith against heresy and hand it on." },
  { id: "councils", short: "Councils", name: "Age of the Ecumenical Councils", range: "325 – 787", from: 325, to: 787,
    intro: "The Church, now free, gathers in seven great councils to state clearly who Christ is and to guard the faith. The great Fathers write." },
  { id: "byzantine", short: "Byzantine", name: "The Byzantine Era", range: "788 – 1453", from: 788, to: 1453,
    intro: "Icons restored, the Slavs baptized, East and West drift apart and divide, and the Hesychast Fathers teach the vision of God's uncreated light." },
  { id: "later", short: "Later", name: "Later Orthodoxy", range: "1453 – today", from: 1454, to: 3000,
    intro: "Under Ottoman rule and then in the modern world, the Orthodox Church keeps the faith, answers new challenges, and spreads across the globe." }
];

/* ---------------------------------------------------------------------
   TYPES: names, colors and legend text for each kind of entry.
   (Colors are set in style.css; this is just the wording.)
   --------------------------------------------------------------------- */
const TYPES = {
  bible:   { label: "Bible book",          plural: "Bible" },
  father:  { label: "Church Father",       plural: "Church Fathers" },
  council: { label: "Ecumenical Council",  plural: "Ecumenical Councils" },
  synod:   { label: "Synod or council",    plural: "Synods" },
  event:   { label: "Key event",           plural: "Events" }
};

/* =====================================================================
   1. THE BIBLE — Orthodox canon (Septuagint Old Testament + New Testament)
   Dates are the approximate time each book was WRITTEN. For many Old
   Testament books the Church's tradition and modern scholars give
   different dates; both are noted where they differ a lot.
   ===================================================================== */
const BIBLE = [
  // ---------- The Law (Pentateuch) ----------
  { id: "genesis", type: "bible", testament: "Old Testament", section: "The Law", name: "Genesis", year: -1300, date: "Traditionally by Moses, c. 1400–1250 BC",
    summary: "God creates the world and humanity. After the fall into sin, He begins His plan of rescue through Abraham, Isaac, Jacob and Joseph." },
  { id: "exodus", type: "bible", testament: "Old Testament", section: "The Law", name: "Exodus", year: -1299, date: "Traditionally by Moses, c. 1400–1250 BC",
    summary: "God frees Israel from slavery in Egypt through Moses, gives the Ten Commandments at Sinai, and dwells among His people in the Tabernacle. The Passover foreshadows Christ's Pascha." },
  { id: "leviticus", type: "bible", testament: "Old Testament", section: "The Law", name: "Leviticus", year: -1298, date: "Traditionally by Moses, c. 1400–1250 BC",
    summary: "Laws for worship, sacrifice, priesthood and holiness. \"Be holy, for I am holy.\" The sacrifices point ahead to Christ's one perfect sacrifice." },
  { id: "numbers", type: "bible", testament: "Old Testament", section: "The Law", name: "Numbers", year: -1297, date: "Traditionally by Moses, c. 1400–1250 BC",
    summary: "Israel's forty years of wandering in the wilderness: their grumbling, God's faithfulness, and the bronze serpent that Christ says points to His Cross (John 3:14)." },
  { id: "deuteronomy", type: "bible", testament: "Old Testament", section: "The Law", name: "Deuteronomy", year: -1296, date: "Traditionally by Moses, c. 1400–1250 BC",
    summary: "Moses' farewell sermons before Israel enters the Promised Land: \"Hear, O Israel… you shall love the Lord your God with all your heart.\"" },

  // ---------- History ----------
  { id: "joshua", type: "bible", testament: "Old Testament", section: "History", name: "Joshua", year: -1200, date: "c. 1200s BC (tradition); later editing",
    summary: "Joshua (in Greek, \"Jesus\") leads Israel into the Promised Land. The Fathers saw him as a figure of Christ leading us into the Kingdom." },
  { id: "judges", type: "bible", testament: "Old Testament", section: "History", name: "Judges", year: -1050, date: "c. 1000s BC",
    summary: "A repeating cycle: Israel forgets God, suffers, cries out, and God raises up deliverers like Gideon, Deborah and Samson." },
  { id: "ruth", type: "bible", testament: "Old Testament", section: "History", name: "Ruth", year: -1000, date: "c. 1000s BC",
    summary: "A Moabite widow's loyal love for her mother-in-law. Ruth becomes great-grandmother of King David and an ancestor of Christ." },
  { id: "1kingdoms", type: "bible", testament: "Old Testament", section: "History", name: "1 Kingdoms (1 Samuel)", year: -950, date: "c. 900s BC",
    summary: "The prophet Samuel, the rise and fall of King Saul, and the anointing of the young shepherd David." },
  { id: "2kingdoms", type: "bible", testament: "Old Testament", section: "History", name: "2 Kingdoms (2 Samuel)", year: -949, date: "c. 900s BC",
    summary: "David's reign: his victories, his sin with Bathsheba, his repentance (Psalm 50/51), and God's promise of an everlasting throne fulfilled in Christ." },
  { id: "3kingdoms", type: "bible", testament: "Old Testament", section: "History", name: "3 Kingdoms (1 Kings)", year: -560, date: "c. 560 BC, using older records",
    summary: "Solomon's wisdom and Temple, the kingdom splitting in two, and the prophet Elijah confronting the worship of Baal." },
  { id: "4kingdoms", type: "bible", testament: "Old Testament", section: "History", name: "4 Kingdoms (2 Kings)", year: -559, date: "c. 560 BC, using older records",
    summary: "Elijah taken up in a fiery chariot, Elisha's miracles, and the fall of Israel (722 BC) and Judah (586 BC) because of unfaithfulness." },
  { id: "1chronicles", type: "bible", testament: "Old Testament", section: "History", name: "1 Paralipomenon (1 Chronicles)", year: -400, date: "c. 400s BC",
    summary: "History retold after the Exile, from Adam to David, focused on worship and the Temple. \"Paralipomenon\" means \"things left out.\"" },
  { id: "2chronicles", type: "bible", testament: "Old Testament", section: "History", name: "2 Paralipomenon (2 Chronicles)", year: -399, date: "c. 400s BC",
    summary: "The kings of Judah from Solomon to the Exile, ending with the Persian king Cyrus letting the people go home." },
  { id: "1esdras", type: "bible", testament: "Old Testament", section: "History", name: "1 Esdras", year: -150, date: "c. 200–100 BC",
    summary: "A Greek retelling of the return from Exile and rebuilding of the Temple, including the story of the three young guards and the praise of truth. Read in the Orthodox Bible, not in most Protestant or Catholic ones." },
  { id: "ezra", type: "bible", testament: "Old Testament", section: "History", name: "2 Esdras (Ezra)", year: -440, date: "c. 440 BC",
    summary: "The Jews return from Babylon, rebuild the Temple, and the priest Ezra calls them back to God's Law. (In the Septuagint, Ezra and Nehemiah are together called 2 Esdras.)" },
  { id: "nehemiah", type: "bible", testament: "Old Testament", section: "History", name: "Nehemiah", year: -430, date: "c. 430 BC",
    summary: "Nehemiah leads the rebuilding of Jerusalem's walls with prayer and courage, and the people renew their covenant with God." },
  { id: "esther", type: "bible", testament: "Old Testament", section: "History", name: "Esther (with Greek additions)", year: -460, date: "c. 400s BC; Greek additions c. 100s BC",
    summary: "A Jewish queen of Persia risks her life to save her people. The Septuagint version includes the prayers of Mordecai and Esther, so God's hand is named openly." },
  { id: "tobit", type: "bible", testament: "Old Testament", section: "History", name: "Tobit", year: -200, date: "c. 200s BC",
    summary: "A faithful exile, his son Tobias, and the Archangel Raphael in disguise. A warm story about prayer, almsgiving, marriage and God's care." },
  { id: "judith", type: "bible", testament: "Old Testament", section: "History", name: "Judith", year: -150, date: "c. 150 BC",
    summary: "A devout widow trusts God and saves her town from the Assyrian general Holofernes. A story of courage, prayer and fasting." },
  { id: "1maccabees", type: "bible", testament: "Old Testament", section: "History", name: "1 Maccabees", year: -100, date: "c. 100 BC",
    summary: "The Jewish revolt led by Judas Maccabeus against the Greek king who defiled the Temple (167 BC), and the Temple's rededication (Hanukkah)." },
  { id: "2maccabees", type: "bible", testament: "Old Testament", section: "History", name: "2 Maccabees", year: -120, date: "c. 120 BC",
    summary: "The faithful martyrs of the Maccabean age, including a mother and her seven sons. It also shows prayer and offerings for the dead (12:43–45) and hope in the resurrection." },
  { id: "3maccabees", type: "bible", testament: "Old Testament", section: "History", name: "3 Maccabees", year: -50, date: "c. 100–30 BC",
    summary: "Despite its name, not about the Maccabees: God rescues the Jews of Egypt from a persecuting Greek king who tries to have them trampled by elephants." },
  { id: "4maccabees", type: "bible", testament: "Old Testament", section: "Appendix", name: "4 Maccabees (appendix)", year: 50, era: "ot", date: "c. AD 20–70",
    summary: "A sermon showing that devout reason, guided by God's Law, can master the passions, using the Maccabean martyrs as examples. Printed as an appendix in Greek Bibles." },

  // ---------- Wisdom and Poetry ----------
  { id: "psalms", type: "bible", testament: "Old Testament", section: "Wisdom & Poetry", name: "Psalms (with Psalm 151)", year: -1000, date: "c. 1000 BC (David) to c. 400s BC",
    summary: "The prayer book of Israel and of the Church, read through every week in Orthodox services. The Orthodox Psalter has 151 psalms and uses the Greek numbering." },
  { id: "proverbs", type: "bible", testament: "Old Testament", section: "Wisdom & Poetry", name: "Proverbs", year: -950, date: "c. 950 BC (Solomon), collected later",
    summary: "Short sayings of practical wisdom. \"The fear of the Lord is the beginning of wisdom.\" The Fathers read Wisdom in chapter 8 as pointing to Christ." },
  { id: "ecclesiastes", type: "bible", testament: "Old Testament", section: "Wisdom & Poetry", name: "Ecclesiastes", year: -940, date: "Traditionally Solomon, c. 900s BC",
    summary: "\"Vanity of vanities, all is vanity.\" An honest look at life without God, ending: fear God and keep His commandments." },
  { id: "songofsongs", type: "bible", testament: "Old Testament", section: "Wisdom & Poetry", name: "Song of Songs", year: -945, date: "Traditionally Solomon, c. 900s BC",
    summary: "A love poem between bride and bridegroom. The Fathers (especially St. Gregory of Nyssa) read it as the love between Christ and the Church, and God and the soul." },
  { id: "job", type: "bible", testament: "Old Testament", section: "Wisdom & Poetry", name: "Job", year: -900, date: "Date uncertain; perhaps 900–500 BC",
    summary: "A righteous man loses everything and asks why. God answers out of the whirlwind. Job's patience is a model for Christians (James 5:11)." },
  { id: "wisdom", type: "bible", testament: "Old Testament", section: "Wisdom & Poetry", name: "Wisdom of Solomon", year: -50, date: "c. 100–30 BC",
    summary: "Praise of divine Wisdom and hope in immortality: \"the souls of the righteous are in the hand of God.\" Its prophecy of the righteous one's suffering (ch. 2) is read on Holy Week." },
  { id: "sirach", type: "bible", testament: "Old Testament", section: "Wisdom & Poetry", name: "Wisdom of Sirach", year: -180, date: "c. 180 BC; Greek translation c. 132 BC",
    summary: "Practical wisdom from a Jerusalem teacher on family, friendship, speech, money and worship, ending with praise of Israel's great ancestors." },
  { id: "manasseh", type: "bible", testament: "Old Testament", section: "Wisdom & Poetry", name: "Prayer of Manasseh", year: -100, date: "c. 200 BC – AD 1",
    summary: "A short, moving prayer of repentance by a wicked king who turned back to God. Prayed at Orthodox Great Compline." },

  // ---------- Prophets ----------
  { id: "amos", type: "bible", testament: "Old Testament", section: "Prophets", name: "Amos", year: -760, date: "c. 760 BC",
    summary: "A shepherd prophet condemns injustice and empty worship: \"Let justice roll down like waters.\"" },
  { id: "jonah", type: "bible", testament: "Old Testament", section: "Prophets", name: "Jonah", year: -758, date: "Set c. 780 BC; written perhaps later",
    summary: "A reluctant prophet, a great fish, and God's mercy on the pagan city of Nineveh. Christ called Jonah's three days a sign of His Resurrection." },
  { id: "hosea", type: "bible", testament: "Old Testament", section: "Prophets", name: "Hosea", year: -750, date: "c. 750–725 BC",
    summary: "God's faithful love for unfaithful Israel, shown through Hosea's marriage to an unfaithful wife. \"I desire mercy, not sacrifice.\"" },
  { id: "micah", type: "bible", testament: "Old Testament", section: "Prophets", name: "Micah", year: -725, date: "c. 735–700 BC",
    summary: "Judgment and hope. Micah foretells that the Messiah will be born in Bethlehem (5:2) and asks: do justice, love mercy, walk humbly with God." },
  { id: "isaiah", type: "bible", testament: "Old Testament", section: "Prophets", name: "Isaiah", year: -700, date: "c. 740–680 BC (tradition); scholars see later sections too",
    summary: "Called the \"fifth Gospel.\" A Virgin shall conceive (7:14), a Child is born (9:6), the Suffering Servant (ch. 53). Isaiah's vision of the seraphim echoes in every Divine Liturgy." },
  { id: "nahum", type: "bible", testament: "Old Testament", section: "Prophets", name: "Nahum", year: -620, date: "c. 620 BC",
    summary: "A poem announcing the fall of cruel Nineveh: God is patient, but He does not leave evil unpunished forever." },
  { id: "zephaniah", type: "bible", testament: "Old Testament", section: "Prophets", name: "Zephaniah", year: -625, date: "c. 630–620 BC",
    summary: "The coming Day of the Lord, and a promise that God will gather a humble remnant and rejoice over them with singing." },
  { id: "habakkuk", type: "bible", testament: "Old Testament", section: "Prophets", name: "Habakkuk", year: -605, date: "c. 605 BC",
    summary: "A prophet asks why God allows evil, and learns that \"the righteous shall live by faith.\" His prayer (ch. 3) is one of the Biblical Odes sung at Matins." },
  { id: "jeremiah", type: "bible", testament: "Old Testament", section: "Prophets", name: "Jeremiah", year: -600, date: "c. 627–580 BC",
    summary: "The \"weeping prophet\" warns Jerusalem before its fall and promises a New Covenant written on the heart (31:31)." },
  { id: "lamentations", type: "bible", testament: "Old Testament", section: "Prophets", name: "Lamentations", year: -586, date: "c. 586 BC",
    summary: "Five laments over the destroyed Jerusalem, traditionally by Jeremiah. Yet: \"His mercies are new every morning.\"" },
  { id: "baruch", type: "bible", testament: "Old Testament", section: "Prophets", name: "Baruch", year: -582, date: "Traditionally c. 580 BC; scholars c. 200–100 BC",
    summary: "Written in the name of Jeremiah's scribe: confession of sin, praise of Wisdom, and hope of return. \"Afterward He appeared on earth and lived among men\" (3:37) was read by the Fathers of Christ." },
  { id: "letterjeremiah", type: "bible", testament: "Old Testament", section: "Prophets", name: "Letter of Jeremiah", year: -581, date: "Traditionally c. 580 BC; scholars c. 300 BC",
    summary: "A warning to the exiles not to fear or worship the idols of Babylon, which are only wood, silver and gold. (Often printed as Baruch chapter 6.)" },
  { id: "ezekiel", type: "bible", testament: "Old Testament", section: "Prophets", name: "Ezekiel", year: -580, date: "c. 593–570 BC",
    summary: "Visions among the exiles: God's glory on a chariot of cherubim, the valley of dry bones raised to life, and the closed gate the Church sees as the Virgin Mary (44:2)." },
  { id: "obadiah", type: "bible", testament: "Old Testament", section: "Prophets", name: "Obadiah", year: -585, date: "c. 585 BC",
    summary: "The shortest Old Testament book: judgment on Edom for gloating over Jerusalem's fall." },
  { id: "daniel", type: "bible", testament: "Old Testament", section: "Prophets", name: "Daniel (with Greek additions)", year: -535, date: "Traditionally c. 535 BC; scholars c. 165 BC",
    summary: "Daniel in the lions' den, the three youths in the furnace, and visions of the Son of Man. The Septuagint adds the Song of the Three Youths, Susanna, and Bel and the Dragon." },
  { id: "haggai", type: "bible", testament: "Old Testament", section: "Prophets", name: "Haggai", year: -520, date: "520 BC",
    summary: "Haggai urges the returned exiles to stop delaying and rebuild God's house." },
  { id: "zechariah", type: "bible", testament: "Old Testament", section: "Prophets", name: "Zechariah", year: -518, date: "c. 520–480 BC",
    summary: "Visions of hope and the King who comes \"humble and riding on a donkey\" (9:9), fulfilled on Palm Sunday." },
  { id: "joel", type: "bible", testament: "Old Testament", section: "Prophets", name: "Joel", year: -450, date: "Uncertain; perhaps 800s or 400s BC",
    summary: "A locust plague calls Israel to repentance. \"I will pour out My Spirit on all flesh\" (2:28), quoted by St. Peter at Pentecost." },
  { id: "malachi", type: "bible", testament: "Old Testament", section: "Prophets", name: "Malachi", year: -430, date: "c. 450–430 BC",
    summary: "The last of the prophets calls priests and people to sincere worship and promises a messenger (St. John the Baptist) before the Lord comes." },

  // ---------- New Testament ----------
  { id: "james", type: "bible", testament: "New Testament", section: "Letters", name: "James", year: 48, date: "c. AD 45–62",
    summary: "From St. James, \"brother of the Lord\" and bishop of Jerusalem: faith without works is dead; control your tongue; care for the poor. Also the anointing of the sick (5:14)." },
  { id: "galatians", type: "bible", testament: "New Testament", section: "Letters of St. Paul", name: "Galatians", year: 49, date: "c. AD 49–55",
    summary: "St. Paul defends the Gospel: we are saved by Christ, not by keeping the Jewish Law. \"It is no longer I who live, but Christ who lives in me.\"" },
  { id: "1thessalonians", type: "bible", testament: "New Testament", section: "Letters of St. Paul", name: "1 Thessalonians", year: 50, date: "c. AD 50–51",
    summary: "Possibly the earliest New Testament book. Encouragement to a young church and hope for Christ's return: \"Pray without ceasing.\"" },
  { id: "2thessalonians", type: "bible", testament: "New Testament", section: "Letters of St. Paul", name: "2 Thessalonians", year: 51, date: "c. AD 51",
    summary: "Calm down and keep working: the Day of the Lord has not yet come. \"Hold fast to the traditions you were taught, whether by word or by letter\" (2:15)." },
  { id: "1corinthians", type: "bible", testament: "New Testament", section: "Letters of St. Paul", name: "1 Corinthians", year: 54, date: "c. AD 54–55",
    summary: "Answers to a troubled church: unity, the Eucharist, spiritual gifts, the great hymn to love (ch. 13), and the Resurrection (ch. 15)." },
  { id: "2corinthians", type: "bible", testament: "New Testament", section: "Letters of St. Paul", name: "2 Corinthians", year: 55, date: "c. AD 55–56",
    summary: "St. Paul's most personal letter: strength made perfect in weakness, and the ministry of reconciliation." },
  { id: "romans", type: "bible", testament: "New Testament", section: "Letters of St. Paul", name: "Romans", year: 57, date: "c. AD 57",
    summary: "St. Paul's fullest explanation of the Gospel: sin and death through Adam, life through Christ, baptism into His death and Resurrection, and life in the Spirit." },
  { id: "mark", type: "bible", testament: "New Testament", section: "Gospels", name: "Gospel of Mark", year: 60, date: "c. AD 55–70",
    summary: "The shortest, fastest-moving Gospel, traditionally St. Peter's preaching written down by St. Mark. Jesus is the Son of God who serves and suffers." },
  { id: "matthew", type: "bible", testament: "New Testament", section: "Gospels", name: "Gospel of Matthew", year: 61, date: "c. AD 50s–70s (tradition: the first Gospel)",
    summary: "Jesus is the promised Messiah and the new Moses. Includes the Sermon on the Mount and the Lord's Prayer." },
  { id: "philippians", type: "bible", testament: "New Testament", section: "Letters of St. Paul", name: "Philippians", year: 61.2, date: "c. AD 60–62, from prison",
    summary: "A letter of joy from prison. The hymn of Christ who \"emptied Himself\" and became obedient to death on a Cross (2:5–11)." },
  { id: "colossians", type: "bible", testament: "New Testament", section: "Letters of St. Paul", name: "Colossians", year: 61.3, date: "c. AD 60–62",
    summary: "Christ is \"the image of the invisible God\" and head of the Church, above every power. A key text for icons and for the Incarnation." },
  { id: "philemon", type: "bible", testament: "New Testament", section: "Letters of St. Paul", name: "Philemon", year: 61.4, date: "c. AD 60–62",
    summary: "A one-page letter asking a master to welcome back his runaway slave Onesimus \"as a beloved brother.\"" },
  { id: "ephesians", type: "bible", testament: "New Testament", section: "Letters of St. Paul", name: "Ephesians", year: 61.5, date: "c. AD 60–62",
    summary: "The mystery of the Church as Christ's Body, one Lord, one faith, one baptism, marriage as an icon of Christ and the Church, and the armor of God." },
  { id: "luke", type: "bible", testament: "New Testament", section: "Gospels", name: "Gospel of Luke", year: 62, date: "c. AD 60–80",
    summary: "By St. Luke the physician (traditionally also the first iconographer). The Annunciation, the Nativity, the Prodigal Son, and Christ's mercy to outsiders." },
  { id: "acts", type: "bible", testament: "New Testament", section: "History", name: "Acts of the Apostles", year: 63, date: "c. AD 62–80",
    summary: "Luke's second volume: the Ascension, Pentecost, the first martyr St. Stephen, the Council of Jerusalem, and St. Paul's journeys to Rome." },
  { id: "1timothy", type: "bible", testament: "New Testament", section: "Letters of St. Paul", name: "1 Timothy", year: 63.5, date: "c. AD 62–64",
    summary: "Guidance for a young bishop: sound teaching, prayer, qualifications for bishops and deacons. The Church is \"the pillar and ground of the truth\" (3:15)." },
  { id: "titus", type: "bible", testament: "New Testament", section: "Letters of St. Paul", name: "Titus", year: 64, date: "c. AD 62–64",
    summary: "Instructions for organizing the church in Crete: appointing elders and living as people saved by grace." },
  { id: "1peter", type: "bible", testament: "New Testament", section: "Letters", name: "1 Peter", year: 64.5, date: "c. AD 62–64",
    summary: "St. Peter encourages suffering Christians: you are a royal priesthood, a holy nation. Christ preached to the spirits in prison (3:19)." },
  { id: "2timothy", type: "bible", testament: "New Testament", section: "Letters of St. Paul", name: "2 Timothy", year: 66, date: "c. AD 64–67",
    summary: "St. Paul's last letter before martyrdom: \"I have fought the good fight, I have finished the race, I have kept the faith.\"" },
  { id: "2peter", type: "bible", testament: "New Testament", section: "Letters", name: "2 Peter", year: 66.5, date: "c. AD 64–68",
    summary: "We may \"become partakers of the divine nature\" (1:4), the key verse for the Orthodox teaching of theosis. A warning against false teachers." },
  { id: "hebrews", type: "bible", testament: "New Testament", section: "Letters", name: "Hebrews", year: 67, date: "c. AD 60s",
    summary: "Christ is the great High Priest, greater than angels and Moses, who offered Himself once for all. The \"great cloud of witnesses\" (ch. 11–12)." },
  { id: "jude", type: "bible", testament: "New Testament", section: "Letters", name: "Jude", year: 68, date: "c. AD 60s",
    summary: "A short, urgent call to \"contend for the faith once for all delivered to the saints.\"" },
  { id: "john", type: "bible", testament: "New Testament", section: "Gospels", name: "Gospel of John", year: 90, date: "c. AD 90–100",
    summary: "\"In the beginning was the Word… and the Word became flesh.\" The most theological Gospel, by St. John the Theologian; read at Pascha." },
  { id: "1john", type: "bible", testament: "New Testament", section: "Letters", name: "1 John", year: 92, date: "c. AD 90–100",
    summary: "\"God is love.\" Real love for God shows itself in love for one another and in confessing that Christ came in the flesh." },
  { id: "2john", type: "bible", testament: "New Testament", section: "Letters", name: "2 John", year: 92.5, date: "c. AD 90–100",
    summary: "A short note to \"the elect lady and her children\": walk in love and truth, and beware of deceivers." },
  { id: "3john", type: "bible", testament: "New Testament", section: "Letters", name: "3 John", year: 93, date: "c. AD 90–100",
    summary: "A personal letter praising Gaius for his hospitality to traveling missionaries." },
  { id: "revelation", type: "bible", testament: "New Testament", section: "Prophecy", name: "Revelation (Apocalypse)", year: 95, date: "c. AD 95",
    summary: "St. John's visions on Patmos: the heavenly worship of the Lamb, the struggle with evil, and the new heaven and new earth. It is not read publicly in Orthodox services, but is fully part of Scripture." }
];

/* =====================================================================
   2. CHURCH FATHERS — writings listed in the order they were written.
   "year" places the Father on the timeline at his most active time.
   ===================================================================== */
const FATHERS = [
  { id: "didache", type: "father", name: "The Didache & early Apostolic writings", year: 90, life: "Written c. AD 50–150", feast: "",
    title: "The earliest Christian writings after the New Testament",
    bio: "Several very early anonymous writings are grouped with the Apostolic Fathers. The Didache (\"Teaching of the Twelve Apostles\") is a short church manual on baptism, fasting on Wednesdays and Fridays, the Eucharist, and church leaders. The Shepherd of Hermas is a book of visions about repentance. The Letter to Diognetus is a beautiful defense of how Christians live as \"the soul of the world.\"",
    works: [
      { title: "The Didache", date: "c. 50–120" },
      { title: "The Shepherd of Hermas", date: "c. 100–150" },
      { title: "Letter to Diognetus", date: "c. 130–200" }
    ] },
  { id: "clement-rome", type: "father", name: "St. Clement of Rome", year: 96, life: "Died c. 99", feast: "November 25",
    title: "Bishop of Rome, Apostolic Father",
    bio: "One of the first bishops of Rome, and according to tradition a disciple of Sts. Peter and Paul (perhaps the Clement of Philippians 4:3). He wrote to the church in Corinth when it had wrongly removed its clergy, urging peace and order handed down from the Apostles. Tradition says he was exiled to Crimea and martyred.",
    works: [
      { title: "First Letter to the Corinthians (1 Clement)", date: "c. 96" }
    ] },
  { id: "ignatius", type: "father", name: "St. Ignatius of Antioch", year: 107, life: "c. 35 – c. 107", feast: "December 20",
    title: "Bishop of Antioch, \"the God-bearer\", martyr",
    bio: "A disciple of St. John the Apostle and the third bishop of Antioch. Arrested and taken to Rome to be killed by wild beasts, he wrote seven letters on the way. They are a priceless picture of the Church right after the Apostles: one bishop in each city with priests and deacons, the Eucharist as \"the medicine of immortality,\" and the real flesh of Christ. He is the first writer to call the Church \"catholic.\"",
    works: [
      { title: "Letter to the Ephesians", date: "c. 107" },
      { title: "Letter to the Magnesians", date: "c. 107" },
      { title: "Letter to the Trallians", date: "c. 107" },
      { title: "Letter to the Romans", date: "c. 107" },
      { title: "Letter to the Philadelphians", date: "c. 107" },
      { title: "Letter to the Smyrnaeans", date: "c. 107" },
      { title: "Letter to St. Polycarp", date: "c. 107" }
    ] },
  { id: "polycarp", type: "father", name: "St. Polycarp of Smyrna", year: 130, life: "c. 69 – c. 155", feast: "February 23",
    title: "Bishop of Smyrna, disciple of St. John, martyr",
    bio: "Made bishop by the Apostles and a disciple of St. John, Polycarp linked the age of the Apostles to the next generation (St. Irenaeus heard him preach as a boy). At about 86 he was burned at the stake, saying: \"Eighty-six years I have served Him, and He has done me no wrong. How can I blaspheme my King who saved me?\" The account of his death is the oldest martyr story outside the New Testament.",
    works: [
      { title: "Letter to the Philippians", date: "c. 110–140" },
      { title: "The Martyrdom of Polycarp (written by his church)", date: "c. 156" }
    ] },
  { id: "justin", type: "father", name: "St. Justin Martyr", year: 155, life: "c. 100 – c. 165", feast: "June 1",
    title: "Philosopher, apologist, martyr",
    bio: "A Samaritan-born philosopher who searched every school of thought until he found Christ, \"the only sure and useful philosophy.\" In Rome he defended Christians to the emperors. His First Apology gives the earliest full description of Sunday worship and the Eucharist. He was beheaded in Rome.",
    works: [
      { title: "First Apology", date: "c. 155" },
      { title: "Dialogue with Trypho the Jew", date: "c. 160" },
      { title: "Second Apology", date: "c. 161" }
    ] },
  { id: "irenaeus", type: "father", name: "St. Irenaeus of Lyons", year: 180, life: "c. 130 – c. 202", feast: "August 23",
    title: "Bishop of Lyons, defender against Gnosticism",
    bio: "Born in Asia Minor, he heard St. Polycarp as a boy and became bishop of Lyons in Gaul. He wrote the great refutation of the Gnostics, who claimed secret knowledge. Irenaeus answered with the public teaching handed down from the Apostles through their bishops, and taught \"recapitulation\": Christ, the new Adam, sums up and heals all of human history. \"The glory of God is a human being fully alive.\"",
    works: [
      { title: "Against Heresies", date: "c. 180" },
      { title: "Demonstration of the Apostolic Preaching", date: "c. 190", find: "Irenaeus Demonstration of the Apostolic Preaching" }
    ] },
  { id: "clement-alex", type: "father", name: "Clement of Alexandria", year: 195, life: "c. 150 – c. 215", feast: "Not on the general calendar",
    title: "Teacher of the Catechetical School of Alexandria",
    bio: "An educated convert who taught in Alexandria, showing that Greek philosophy at its best prepared people for Christ. He wrote about the Christian as the true \"gnostic\" (knower) and about everyday Christian life. The Orthodox Church values his writings but does not list him as a saint on its calendar; he is honored as an early Christian teacher.",
    works: [
      { title: "Exhortation to the Greeks", date: "c. 195" },
      { title: "The Instructor (Paedagogus)", date: "c. 198" },
      { title: "The Stromata (Miscellanies)", date: "c. 200–210" }
    ] },
  { id: "hippolytus", type: "father", name: "St. Hippolytus of Rome", year: 220, life: "c. 170 – c. 235", feast: "January 30",
    title: "Priest of Rome, theologian, martyr",
    bio: "A learned and strict priest in Rome, a student of the tradition of St. Irenaeus. He wrote against heresies and on the Antichrist, and an early church order is traditionally linked to him. Exiled to the mines of Sardinia, he was reconciled with the Roman bishop Pontian and died a martyr.",
    works: [
      { title: "On Christ and Antichrist", date: "c. 200", find: "Hippolytus On Christ and Antichrist" },
      { title: "Refutation of All Heresies", date: "c. 225", find: "Hippolytus Refutation of All Heresies" }
    ] },
  { id: "cyprian", type: "father", name: "St. Cyprian of Carthage", year: 251, life: "c. 200 – 258", feast: "August 31",
    title: "Bishop of Carthage, martyr",
    bio: "A wealthy lawyer who converted and quickly became bishop of Carthage in North Africa. During persecution he guided his flock about how to receive back those who had lapsed. He taught that the unity of the Church is in the one episcopate, which all bishops hold together: \"He cannot have God for his Father who does not have the Church for his mother.\" He was beheaded in 258.",
    works: [
      { title: "On the Lapsed", date: "251", find: "Cyprian On the Lapsed" },
      { title: "On the Unity of the Church", date: "251", find: "Cyprian On the Unity of the Catholic Church" },
      { title: "On the Lord's Prayer", date: "c. 252", find: "Cyprian On the Lord's Prayer" }
    ] },
  { id: "gregory-wonderworker", type: "father", name: "St. Gregory the Wonderworker", year: 260, life: "c. 213 – c. 270", feast: "November 17",
    title: "Bishop of Neocaesarea",
    bio: "A student of Origen who became bishop of Neocaesarea in Pontus. Famous for his miracles and missionary success, it was said he found only seventeen Christians in his city and left only seventeen pagans. His short Creed on the Trinity, said to have been revealed in a vision, deeply influenced the family of St. Basil.",
    works: [
      { title: "Declaration of Faith", date: "c. 260", find: "Gregory Thaumaturgus Declaration of Faith" },
      { title: "Panegyric (Oration of Thanksgiving) to Origen", date: "c. 238", find: "Gregory Thaumaturgus Oration Panegyric Origen" }
    ] },
  { id: "athanasius", type: "father", name: "St. Athanasius the Great", year: 328, life: "c. 296 – 373", feast: "January 18 & May 2",
    title: "Archbishop of Alexandria, \"Father of Orthodoxy\"",
    bio: "As a young deacon he attended the First Council of Nicaea, then became Archbishop of Alexandria. For almost fifty years he defended the Nicene faith that Christ is true God, \"of one essence with the Father,\" and was exiled five times for it (\"Athanasius against the world\"). He taught that \"God became man so that man might become god\" (theosis). His Festal Letter of 367 gives the earliest list of exactly our 27 New Testament books.",
    works: [
      { title: "Against the Heathen", date: "c. 318–335" },
      { title: "On the Incarnation of the Word", date: "c. 318–335" },
      { title: "Four Discourses Against the Arians", date: "c. 356–360" },
      { title: "Life of St. Antony", date: "c. 360" },
      { title: "Festal Letter 39 (list of Scripture)", date: "367" }
    ] },
  { id: "ephrem", type: "father", name: "St. Ephrem the Syrian", year: 350, life: "c. 306 – 373", feast: "January 28",
    title: "Deacon, \"Harp of the Spirit\"",
    bio: "A deacon from Nisibis and later Edessa (in modern Turkey) who taught theology through hymns sung by choirs. He wrote hundreds of poems on Christ, the Theotokos, Paradise and repentance. The Lenten prayer said in every Orthodox church during Great Lent (\"O Lord and Master of my life…\") bears his name.",
    works: [
      { title: "Hymns on Faith", date: "c. 360s", find: "Ephrem the Syrian Hymns on Faith" },
      { title: "Hymns on the Nativity", date: "c. 360s", find: "Ephrem the Syrian Hymns on the Nativity" },
      { title: "Hymns on Paradise", date: "c. 360s", find: "Ephrem the Syrian Hymns on Paradise" }
    ] },
  { id: "cyril-jerusalem", type: "father", name: "St. Cyril of Jerusalem", year: 350, life: "c. 313 – 386", feast: "March 18",
    title: "Archbishop of Jerusalem",
    bio: "As a priest and then bishop of Jerusalem, Cyril prepared new believers for baptism at Pascha in the church built over Christ's tomb. His lectures explain the Creed and, after baptism, the mysteries (sacraments) the newly baptized have received. He took part in the Second Ecumenical Council.",
    works: [
      { title: "Catechetical Lectures (incl. Mystagogical Lectures)", date: "c. 350" }
    ] },
  { id: "basil", type: "father", name: "St. Basil the Great", year: 370, life: "c. 330 – 379", feast: "January 1 & January 30",
    title: "Archbishop of Caesarea, one of the Three Holy Hierarchs",
    bio: "The first of the three Cappadocian Fathers, with his brother St. Gregory of Nyssa and his friend St. Gregory the Theologian. A brilliant scholar who became a monk, then archbishop of Caesarea. He organized monastic life (his Rules still guide Orthodox monasteries), built a huge hospital and poorhouse, and defended the full divinity of the Holy Spirit. The Divine Liturgy of St. Basil is served ten times a year.",
    works: [
      { title: "Letters (written throughout his life)", date: "c. 357–378" },
      { title: "Against Eunomius", date: "c. 364", find: "Basil of Caesarea Against Eunomius" },
      { title: "The Long and Short Rules (Asceticon)", date: "c. 360s–370s", find: "Basil the Great Ascetical Works Rules" },
      { title: "Homilies on the Hexaemeron (Six Days of Creation)", date: "c. 370" },
      { title: "On the Holy Spirit", date: "c. 375" }
    ] },
  { id: "gregory-theologian", type: "father", name: "St. Gregory the Theologian (Nazianzen)", year: 380, life: "c. 329 – 390", feast: "January 25 & January 30",
    title: "Archbishop of Constantinople, one of the Three Holy Hierarchs",
    bio: "A Cappadocian Father and poet who loved quiet but was called to lead the small Nicene community in Constantinople. His Five Theological Orations, preached there in 380, are the classic statement of the Holy Trinity, and earned him the title \"the Theologian.\" He presided for a time over the Second Ecumenical Council, then resigned for the sake of peace. \"What has not been assumed has not been healed.\"",
    works: [
      { title: "Orations (sermons), including the Five Theological Orations", date: "c. 362–381" },
      { title: "Letters, including to Cledonius against Apollinarius", date: "c. 382" },
      { title: "Poems", date: "c. 381–390", find: "Gregory Nazianzen poems" }
    ] },
  { id: "gregory-nyssa", type: "father", name: "St. Gregory of Nyssa", year: 380, life: "c. 335 – c. 395", feast: "January 10",
    title: "Bishop of Nyssa, \"Father of Fathers\"",
    bio: "Younger brother of St. Basil and St. Macrina, and the deepest philosopher of the Cappadocians. He defended the Trinity at the Second Ecumenical Council and wrote about the soul's endless journey into God, \"from glory to glory.\"",
    works: [
      { title: "On Virginity", date: "c. 371", find: "Gregory of Nyssa On Virginity" },
      { title: "On the Making of Man", date: "c. 379" },
      { title: "On the Soul and the Resurrection", date: "c. 380" },
      { title: "Against Eunomius", date: "c. 380–383" },
      { title: "The Great Catechism", date: "c. 385" },
      { title: "Life of Moses", date: "c. 390", find: "Gregory of Nyssa Life of Moses" }
    ] },
  { id: "ambrose", type: "father", name: "St. Ambrose of Milan", year: 385, life: "c. 340 – 397", feast: "December 7",
    title: "Bishop of Milan",
    bio: "A Roman governor who was acclaimed bishop of Milan by the people before he was even baptized. He defended the Nicene faith in the West, introduced hymn-singing there, stood up to emperors, and baptized St. Augustine. Venerated as a saint in both East and West.",
    works: [
      { title: "On the Duties of the Clergy", date: "c. 391", find: "Ambrose On the Duties of the Clergy" },
      { title: "On the Holy Spirit", date: "381", find: "Ambrose On the Holy Spirit" },
      { title: "On the Mysteries", date: "c. 390", find: "Ambrose On the Mysteries" }
    ] },
  { id: "chrysostom", type: "father", name: "St. John Chrysostom", year: 390, life: "c. 349 – 407", feast: "November 13, January 27 & January 30",
    title: "Archbishop of Constantinople, one of the Three Holy Hierarchs",
    bio: "\"Chrysostom\" means \"golden-mouthed.\" A monk, then the great preacher of Antioch, and then archbishop of Constantinople, he preached verse by verse through Scripture, urged care for the poor, and challenged the luxury of the powerful, including the empress. He died in exile. The Divine Liturgy of St. John Chrysostom is the one served on most Sundays in Orthodox churches, and his Paschal sermon is read every Easter night.",
    works: [
      { title: "On the Priesthood", date: "c. 386–390" },
      { title: "Homilies on the Statues", date: "387" },
      { title: "Homilies on Matthew", date: "c. 390" },
      { title: "Homilies on John", date: "c. 391" },
      { title: "Homilies on Romans", date: "c. 391" },
      { title: "Paschal (Easter) Homily", date: "c. 400", find: "John Chrysostom Paschal Homily" }
    ] },
  { id: "augustine", type: "father", name: "St. Augustine of Hippo", year: 400, life: "354 – 430", feast: "June 15",
    title: "Bishop of Hippo (Western Father)",
    bio: "The most influential Western Father, whose Confessions tell of his conversion. The Orthodox Church honors him as a saint (often as \"Blessed Augustine\") for his holiness and love of God, but reads him with care: some of his ideas, such as his reasoning about the Holy Spirit proceeding from the Son and his view of inherited guilt from Adam, were later developed in the West in ways the Orthodox Church does not accept.",
    works: [
      { title: "Confessions", date: "c. 397–400" },
      { title: "City of God", date: "413–426" }
    ] },
  { id: "cyril-alexandria", type: "father", name: "St. Cyril of Alexandria", year: 430, life: "c. 376 – 444", feast: "January 18 & June 9",
    title: "Archbishop of Alexandria, \"Seal of the Fathers\"",
    bio: "Nephew and successor of the archbishop of Alexandria, Cyril was the champion of the Third Ecumenical Council. Against Nestorius, he taught that the eternal Son of God Himself was born of the Virgin, so she is truly Theotokos, the \"Birth-giver of God.\" There is one Christ, not a man joined to God. His teaching became the measure of Orthodox Christology.",
    works: [
      { title: "Commentary on the Gospel of John", date: "c. 425–428", find: "Cyril of Alexandria Commentary on John" },
      { title: "Second and Third Letters to Nestorius (with the Twelve Anathemas)", date: "430" },
      { title: "On the Unity of Christ", date: "c. 437", find: "Cyril of Alexandria On the Unity of Christ" }
    ] },
  { id: "cassian", type: "father", name: "St. John Cassian", year: 425, life: "c. 360 – c. 435", feast: "February 29 (Feb. 28 in non-leap years)",
    title: "Monk, bridge between Eastern and Western monasticism",
    bio: "He lived among the monks of Egypt and Palestine, was ordained deacon by St. John Chrysostom, and founded monasteries near Marseilles in Gaul. His writings brought the wisdom of the Desert Fathers to the West. He taught that grace and human freedom work together (synergy), a view the Orthodox Church holds and that some Western writers wrongly called \"semi-Pelagian.\"",
    works: [
      { title: "The Institutes", date: "c. 420", find: "John Cassian Institutes" },
      { title: "The Conferences", date: "c. 426", find: "John Cassian Conferences" }
    ] },
  { id: "vincent", type: "father", name: "St. Vincent of Lérins", year: 434, life: "Died c. 445", feast: "May 24",
    title: "Monk of Lérins",
    bio: "A monk on an island off southern France who gave the famous test of true teaching: hold to \"what has been believed everywhere, always, and by all.\" True doctrine can grow in clarity, but never change its meaning.",
    works: [
      { title: "The Commonitory", date: "434" }
    ] },
  { id: "leo", type: "father", name: "St. Leo the Great", year: 449, life: "c. 400 – 461", feast: "February 18",
    title: "Pope of Rome",
    bio: "Bishop of Rome who wrote the \"Tome\" to explain the two natures of Christ against Eutyches; it was read and accepted at the Fourth Ecumenical Council after the bishops checked it against St. Cyril's teaching (\"Peter has spoken through Leo!\"). He also persuaded Attila the Hun to turn back from Rome. Honored as a saint in East and West.",
    works: [
      { title: "Sermons", date: "440–461", find: "Leo the Great Sermons" },
      { title: "The Tome (Letter 28 to Flavian)", date: "449", find: "Tome of Leo Letter 28 Flavian" }
    ] },
  { id: "dionysius", type: "father", name: "St. Dionysius the Areopagite (writings)", year: 500, life: "Writings appear c. 500", feast: "October 3",
    title: "Author of the Dionysian (Areopagitic) writings",
    bio: "St. Dionysius was the Athenian converted by St. Paul (Acts 17:34). A set of profound writings under his name appeared around AD 500. The Church traditionally received them as his; most modern scholars think they were written by a later Syrian author. Either way, St. Maximus and later Fathers accepted them as Orthodox. They teach that God is beyond all names (apophatic theology) and that the heavenly and church hierarchies lift us toward union with God.",
    works: [
      { title: "The Divine Names", date: "c. 500", find: "Dionysius the Areopagite Divine Names" },
      { title: "The Mystical Theology", date: "c. 500", find: "Dionysius the Areopagite Mystical Theology" },
      { title: "The Celestial Hierarchy", date: "c. 500", find: "Dionysius the Areopagite Celestial Hierarchy" },
      { title: "The Ecclesiastical Hierarchy", date: "c. 500", find: "Dionysius the Areopagite Ecclesiastical Hierarchy" }
    ] },
  { id: "romanos", type: "father", name: "St. Romanos the Melodist", year: 530, life: "c. 490 – c. 556", feast: "October 1",
    title: "Deacon and hymnographer",
    bio: "A deacon in Constantinople who, according to tradition, received his gift for hymns after the Theotokos appeared to him in a dream. He wrote long poetic sermons called kontakia. His Christmas kontakion, \"Today the Virgin gives birth to Him who is above all being,\" is still sung every year.",
    works: [
      { title: "Kontakia (hymns), including On the Nativity", date: "c. 518–556", find: "Romanos the Melodist Kontakia" }
    ] },
  { id: "gregory-dialogist", type: "father", name: "St. Gregory the Dialogist (Gregory the Great)", year: 590, life: "c. 540 – 604", feast: "March 12",
    title: "Pope of Rome",
    bio: "A Roman official turned monk who became pope during plague and war. He sent missionaries to England and wrote on pastoral care. The Orthodox call him \"the Dialogist\" after his Dialogues, and serve the Liturgy of the Presanctified Gifts, traditionally linked to him, in Great Lent. He rejected the title \"universal bishop\" when the patriarch of Constantinople used it, calling it proud.",
    works: [
      { title: "The Pastoral Rule", date: "c. 590" },
      { title: "The Dialogues", date: "c. 593", find: "Gregory the Great Dialogues" }
    ] },
  { id: "climacus", type: "father", name: "St. John Climacus (of the Ladder)", year: 620, life: "c. 579 – c. 649", feast: "March 30 & 4th Sunday of Great Lent",
    title: "Abbot of Sinai",
    bio: "A monk of Mount Sinai who lived for decades in solitude before becoming abbot of St. Catherine's Monastery. His book \"The Ladder of Divine Ascent\" describes thirty steps of the spiritual life, from leaving the world to love. It is read in Orthodox monasteries every Great Lent.",
    works: [
      { title: "The Ladder of Divine Ascent", date: "c. 600–640", find: "John Climacus Ladder of Divine Ascent" },
      { title: "To the Shepherd", date: "c. 600–640", find: "John Climacus To the Shepherd" }
    ] },
  { id: "sophronius", type: "father", name: "St. Sophronius of Jerusalem", year: 634, life: "c. 560 – 638", feast: "March 11",
    title: "Patriarch of Jerusalem",
    bio: "A monk and scholar who first raised the alarm against the Monothelite teaching that Christ had only one will. As patriarch he had to hand Jerusalem over to the Muslim Caliph Umar in 637. His spiritual son was St. Maximus the Confessor.",
    works: [
      { title: "Synodical Letter", date: "634", find: "Sophronius of Jerusalem Synodical Letter" }
    ] },
  { id: "maximus", type: "father", name: "St. Maximus the Confessor", year: 640, life: "c. 580 – 662", feast: "January 21 & August 13",
    title: "Monk, theologian, confessor",
    bio: "A former imperial secretary who became a monk and one of the greatest Orthodox theologians. When the emperor and patriarchs taught that Christ had only one will, Maximus insisted that Christ has a fully human will, freely obedient to the divine will, or else our human will is not healed. For refusing to accept the error, his tongue was cut out and his right hand cut off, and he died in exile. The Sixth Ecumenical Council (680–681) vindicated him.",
    works: [
      { title: "Four Hundred Chapters on Love", date: "c. 626", find: "Maximus the Confessor Chapters on Love" },
      { title: "Ambigua (Difficulties in Gregory and Dionysius)", date: "c. 628–634", find: "Maximus the Confessor Ambigua" },
      { title: "Mystagogy", date: "c. 630", find: "Maximus the Confessor Mystagogy" },
      { title: "Questions to Thalassius", date: "c. 630–633", find: "Maximus the Confessor Questions to Thalassius" },
      { title: "Disputation with Pyrrhus", date: "645", find: "Maximus the Confessor Disputation with Pyrrhus" }
    ] },
  { id: "andrew-crete", type: "father", name: "St. Andrew of Crete", year: 712, life: "c. 660 – 740", feast: "July 4",
    title: "Archbishop of Crete, hymnographer",
    bio: "A monk of Jerusalem who became archbishop of Crete. He wrote the Great Canon of repentance, a hymn of 250 verses walking through the whole Bible, sung during the first week and fifth week of Great Lent.",
    works: [
      { title: "The Great Canon of Repentance", date: "c. 700", find: "Great Canon of St Andrew of Crete" },
      { title: "Homilies on the feasts of the Theotokos", date: "c. 710–740", find: "Andrew of Crete homilies Dormition" }
    ] },
  { id: "damascene", type: "father", name: "St. John of Damascus", year: 730, life: "c. 675 – 749", feast: "December 4",
    title: "Monk, theologian, hymnographer, defender of icons",
    bio: "Born in Damascus under Muslim rule, where he served at the Caliph's court before becoming a monk at the monastery of St. Sabbas near Jerusalem. Safe from the emperor's reach, he wrote the strongest defense of holy icons: \"I do not worship matter; I worship the Creator of matter, who became matter for my sake.\" His \"Exact Exposition of the Orthodox Faith\" summed up the Fathers. Many hymns of the Resurrection and the Paschal Canon are his.",
    works: [
      { title: "Three Treatises on the Divine Images", date: "c. 726–730" },
      { title: "Exact Exposition of the Orthodox Faith (part of the Fount of Knowledge)", date: "c. 743" },
      { title: "The Paschal Canon and Resurrection hymns", date: "c. 730s–740s", find: "John of Damascus Paschal Canon" }
    ] },
  { id: "theodore-studite", type: "father", name: "St. Theodore the Studite", year: 800, life: "759 – 826", feast: "November 11",
    title: "Abbot of the Studion Monastery",
    bio: "Abbot of the great Studion monastery in Constantinople, which he made a model of community life whose rule spread to Mount Athos and Russia. He defended icons during the second period of iconoclasm and suffered exile and beatings for it. He also wrote many hymns of the Lenten Triodion.",
    works: [
      { title: "On the Holy Icons (Refutations of the Iconoclasts)", date: "c. 815–820", find: "Theodore the Studite On the Holy Icons" },
      { title: "Small Catecheses (talks to his monks)", date: "c. 800–826", find: "Theodore the Studite catecheses" }
    ] },
  { id: "photius", type: "father", name: "St. Photius the Great", year: 867, life: "c. 810 – c. 893", feast: "February 6",
    title: "Patriarch of Constantinople",
    bio: "The most learned man of his age, made patriarch of Constantinople in 858. He sent Sts. Cyril and Methodius to the Slavs and was the first to fully answer the Western addition of the filioque to the Creed. Rome deposed him; the Council of 879–880, with papal legates present, restored him. His \"Mystagogy\" defends the teaching that the Holy Spirit proceeds from the Father alone.",
    works: [
      { title: "The Bibliotheca (reviews of 279 books)", date: "c. 845–858", find: "Photius Bibliotheca" },
      { title: "Encyclical Letter to the Eastern Patriarchs", date: "867", find: "Photius Encyclical to the Eastern Patriarchs 867" },
      { title: "Mystagogy of the Holy Spirit", date: "c. 886", find: "Photius Mystagogy of the Holy Spirit" }
    ] },
  { id: "symeon", type: "father", name: "St. Symeon the New Theologian", year: 1000, life: "949 – 1022", feast: "March 12",
    title: "Abbot of St. Mamas, mystic",
    bio: "One of only three people the Church calls \"Theologian\" (with St. John and St. Gregory). Symeon taught boldly that every Christian, not only saints of the past, is called to a conscious experience of God, even to the vision of the divine light, through repentance, tears, prayer and obedience.",
    works: [
      { title: "The Catechetical Discourses", date: "c. 980–998", find: "Symeon the New Theologian Discourses" },
      { title: "Ethical Discourses", date: "c. 990s–1000s", find: "Symeon the New Theologian Ethical Discourses" },
      { title: "Hymns of Divine Love", date: "c. 1000–1022", find: "Symeon the New Theologian Hymns of Divine Love" }
    ] },
  { id: "theophylact", type: "father", name: "Bl. Theophylact of Ohrid", year: 1090, life: "c. 1050 – c. 1107", feast: "December 31",
    title: "Archbishop of Ohrid (Bulgaria)",
    bio: "A Constantinople-trained scholar sent to be archbishop of Ohrid. His clear verse-by-verse commentaries on the Gospels, built on St. John Chrysostom, are still loved by Orthodox readers. He was notably gentle toward the Latins, saying many differences were minor, but held firm that the filioque must not be added to the Creed.",
    works: [
      { title: "Explanation of the Holy Gospels", date: "c. 1090s", find: "Theophylact Explanation of the Gospel" },
      { title: "On the Errors of the Latins", date: "c. 1090", find: "Theophylact of Ohrid errors of the Latins" }
    ] },
  { id: "palamas", type: "father", name: "St. Gregory Palamas", year: 1340, life: "1296 – 1359", feast: "November 14 & 2nd Sunday of Great Lent",
    title: "Archbishop of Thessalonica, defender of Hesychasm",
    bio: "A monk of Mount Athos who defended the hesychasts, monks who practiced the quiet Jesus Prayer and said they saw the uncreated light of Christ's Transfiguration. Against Barlaam the Calabrian, he taught the distinction between God's essence, which no creature can know, and His uncreated energies, in which we truly share God's life. Councils in 1341, 1347 and 1351 confirmed his teaching, and the Church celebrates him during Great Lent.",
    works: [
      { title: "The Triads in Defense of the Holy Hesychasts", date: "c. 1338–1341", find: "Gregory Palamas Triads" },
      { title: "One Hundred and Fifty Chapters", date: "c. 1349–1350", find: "Gregory Palamas One Hundred Fifty Chapters" },
      { title: "Homilies", date: "c. 1350–1359", find: "Gregory Palamas Homilies" }
    ] },
  { id: "cabasilas", type: "father", name: "St. Nicholas Cabasilas", year: 1360, life: "c. 1322 – c. 1392", feast: "June 20",
    title: "Lay theologian",
    bio: "A layman and friend of the hesychasts in Thessalonica. He explained how the sacraments of baptism, chrismation and the Eucharist unite us with Christ and are the heart of the spiritual life, for all believers, not only monks.",
    works: [
      { title: "Commentary on the Divine Liturgy", date: "c. 1350s", find: "Nicholas Cabasilas Commentary on the Divine Liturgy" },
      { title: "The Life in Christ", date: "c. 1360s", find: "Nicholas Cabasilas Life in Christ" }
    ] },
  { id: "mark-ephesus", type: "father", name: "St. Mark of Ephesus", year: 1439, life: "1392 – 1444", feast: "January 19",
    title: "Metropolitan of Ephesus, \"Pillar of Orthodoxy\"",
    bio: "At the Council of Florence (1438–1439) he was the leading Orthodox theologian and the only bishop who refused to sign the union with Rome, because it required accepting the filioque, purgatorial fire and papal supremacy. When the Pope heard, he reportedly said, \"Then we have accomplished nothing.\" Back home he led the people and clergy in rejecting the union.",
    works: [
      { title: "Homilies against purgatorial fire (at Ferrara)", date: "1438", find: "Mark of Ephesus purgatorial fire" },
      { title: "Encyclical Letter to All Orthodox Christians", date: "1440", find: "Mark of Ephesus Encyclical Letter" }
    ] },
  { id: "nicodemus", type: "father", name: "St. Nicodemus the Hagiorite", year: 1782, life: "1749 – 1809", feast: "July 14",
    title: "Monk of Mount Athos",
    bio: "A brilliant Athonite monk who gathered and published the treasures of the Orthodox tradition during Ottoman rule. With St. Macarius of Corinth he compiled the Philokalia, the classic collection of writings on prayer, and he edited the Pedalion (the Rudder), the standard Greek collection of church canons with commentary.",
    works: [
      { title: "The Philokalia (with St. Macarius of Corinth)", date: "1782", find: "Philokalia" },
      { title: "The Pedalion (The Rudder)", date: "1800", find: "Pedalion Rudder canons" }
    ] },
  { id: "seraphim", type: "father", name: "St. Seraphim of Sarov", year: 1825, life: "1754 – 1833", feast: "January 2 & July 19",
    title: "Monk and wonderworker of Russia",
    bio: "One of the most loved Russian saints. After years of prayer in the forest and silence, he received countless visitors, greeting each with \"Christ is risen, my joy!\" He taught that \"the true goal of the Christian life is the acquisition of the Holy Spirit.\"",
    works: [
      { title: "Conversation with Nicholas Motovilov on the Acquisition of the Holy Spirit", date: "1831 (published 1903)", find: "Seraphim of Sarov Motovilov acquisition of the Holy Spirit" }
    ] },
  { id: "theophan", type: "father", name: "St. Theophan the Recluse", year: 1870, life: "1815 – 1894", feast: "January 10",
    title: "Bishop, spiritual writer",
    bio: "A Russian bishop who retired to a monastery to pray and write. He translated the Philokalia into Russian and wrote thousands of letters of practical spiritual advice to ordinary people about prayer of the heart.",
    works: [
      { title: "The Path to Salvation", date: "1868", find: "Theophan the Recluse Path to Salvation" },
      { title: "The Spiritual Life and How to Be Attuned to It (letters)", date: "1878", find: "Theophan the Recluse The Spiritual Life" }
    ] }
];

/* =====================================================================
   3. THE SEVEN ECUMENICAL COUNCILS
   ===================================================================== */
const COUNCILS = [
  { id: "nicaea1", type: "council", number: 1, name: "First Ecumenical Council (Nicaea I)", year: 325, date: "May – July 325", location: "Nicaea, Asia Minor (modern İznik, Turkey)",
    summary: "About 318 bishops gathered by Emperor Constantine declared that the Son of God is true God, of one essence with the Father, and condemned Arius.",
    decided: [
      "Condemned the teaching of Arius, who said the Son was a created being (\"there was a time when He was not\").",
      "Declared that the Son is \"of one essence\" (homoousios) with the Father: \"God from God, Light from Light, true God from true God.\"",
      "Wrote the first part of the Nicene Creed.",
      "Agreed on a common way to calculate the date of Pascha (Easter), and issued 20 canons on church order."
    ],
    matters: "If Christ were only a creature, He could not unite us to God. Nicaea guards the truth that in Jesus we meet God Himself. St. Nicholas of Myra is traditionally remembered as one of the Fathers present.",
    links: [{ label: "Learn about the council (OrthodoxWiki)", url: OW("First Ecumenical Council") }, { label: "Read the Creed and canons", needed: true }] },
  { id: "constantinople1", type: "council", number: 2, name: "Second Ecumenical Council (Constantinople I)", year: 381, date: "May – July 381", location: "Constantinople (modern Istanbul)",
    summary: "Completed the Nicene Creed, confessing that the Holy Spirit is Lord and Giver of Life, \"who proceeds from the Father.\"",
    decided: [
      "Confessed the full divinity of the Holy Spirit, against the \"Pneumatomachi\" (\"fighters against the Spirit\").",
      "Completed the Creed we say today, the Nicene-Constantinopolitan Creed.",
      "Condemned Apollinarius, who denied that Christ had a human mind.",
      "Canon 3 gave Constantinople, the \"New Rome,\" second place of honor after Old Rome."
    ],
    matters: "The Creed of 381 is the shared confession of the whole Church. It says the Spirit \"proceeds from the Father,\" using Christ's own words in John 15:26. This is why the later Western addition \"and the Son\" (filioque) is so serious to the Orthodox.",
    links: [{ label: "Learn about the council (OrthodoxWiki)", url: OW("Second Ecumenical Council") }, { label: "Read the Creed and canons", needed: true }] },
  { id: "ephesus", type: "council", number: 3, name: "Third Ecumenical Council (Ephesus)", year: 431, date: "June – July 431", location: "Ephesus, Asia Minor",
    summary: "Proclaimed the Virgin Mary to be the Theotokos, \"Birth-giver of God,\" because the One born of her is God the Word made flesh.",
    decided: [
      "Condemned Nestorius, who split Christ into a man and God joined together and refused to call Mary Theotokos.",
      "Approved St. Cyril of Alexandria's letters: there is one Christ, the eternal Son made man.",
      "Canon 7 forbade anyone to write or present a different creed from the one of Nicaea."
    ],
    matters: "Calling Mary \"Theotokos\" is really a statement about Christ: the baby in her arms is God. Canon 7 also matters later, because the Orthodox see the Western change to the Creed as breaking it.",
    links: [{ label: "Learn about the council (OrthodoxWiki)", url: OW("Third Ecumenical Council") }, { label: "Read the acts and canons", needed: true }] },
  { id: "chalcedon", type: "council", number: 4, name: "Fourth Ecumenical Council (Chalcedon)", year: 451, date: "October – November 451", location: "Chalcedon, across the Bosporus from Constantinople",
    summary: "Defined that Christ is one Person in two natures, divine and human, \"without confusion, without change, without division, without separation.\"",
    decided: [
      "Condemned Eutyches, who taught that Christ's humanity was swallowed up in His divinity.",
      "Issued the Definition of Faith on Christ's two natures in one Person (hypostasis).",
      "Received the Tome of St. Leo of Rome after checking that it agreed with St. Cyril.",
      "Canon 28 gave Constantinople equal privileges with Old Rome, second in order, because it was the imperial city."
    ],
    matters: "Christ is fully God and fully man, so humanity is truly healed and united to God in Him. Sadly, the Coptic, Armenian, Syriac and Ethiopian churches (the \"Oriental Orthodox\") did not accept Chalcedon's wording, and that division remains today, though modern dialogue shows much shared faith.",
    links: [{ label: "Learn about the council (OrthodoxWiki)", url: OW("Fourth Ecumenical Council") }, { label: "Read the definition and canons", needed: true }] },
  { id: "constantinople2", type: "council", number: 5, name: "Fifth Ecumenical Council (Constantinople II)", year: 553, date: "May – June 553", location: "Constantinople",
    summary: "Under Emperor Justinian, confirmed Chalcedon in the sense of St. Cyril and condemned the \"Three Chapters\" that leaned toward Nestorianism.",
    decided: [
      "Condemned the writings of Theodore of Mopsuestia, and certain writings of Theodoret of Cyrrhus and Ibas of Edessa (the \"Three Chapters\").",
      "Clarified that the one Person in Christ is the eternal Word: \"One of the Holy Trinity suffered in the flesh.\"",
      "Condemned Origen and the speculative \"Origenist\" teachings, such as the pre-existence of souls."
    ],
    matters: "It made clear that Chalcedon's \"two natures\" never means two persons. The Son of God Himself was crucified for us.",
    links: [{ label: "Learn about the council (OrthodoxWiki)", url: OW("Fifth Ecumenical Council") }, { label: "Read the anathemas and acts", needed: true }] },
  { id: "constantinople3", type: "council", number: 6, name: "Sixth Ecumenical Council (Constantinople III)", year: 680, date: "November 680 – September 681", location: "Constantinople (in the domed hall called the Trullo)",
    summary: "Declared that Christ has two wills and two energies, divine and human, working in harmony, vindicating St. Maximus the Confessor.",
    decided: [
      "Condemned Monothelitism, the teaching that Christ has only one will.",
      "Taught that Christ's human will freely and always follows His divine will.",
      "Condemned by name Pope Honorius of Rome, together with several patriarchs of Constantinople, for supporting the error."
    ],
    matters: "Our salvation needs a healed human will. In Gethsemane (\"not my will, but Yours\") Christ's human will freely obeys. The condemnation of a pope by an Ecumenical Council is also important evidence in later debates about papal infallibility.",
    links: [{ label: "Learn about the council (OrthodoxWiki)", url: OW("Sixth Ecumenical Council") }, { label: "Read the definition and acts", needed: true }] },
  { id: "nicaea2", type: "council", number: 7, name: "Seventh Ecumenical Council (Nicaea II)", year: 787, date: "September – October 787", location: "Nicaea, Asia Minor",
    summary: "Restored the veneration of holy icons and explained the difference between honoring images and worshipping God alone.",
    decided: [
      "Condemned iconoclasm (the destruction of icons).",
      "Taught that icons of Christ, the Theotokos, angels and saints should be honored with veneration (proskynesis), while true worship (latreia) belongs to God alone.",
      "Explained that \"the honor given to the image passes to its prototype,\" the person shown.",
      "Issued 22 canons, including that relics be placed in every altar."
    ],
    matters: "Because God the Word became visible in the flesh, He can be depicted. Denying icons quietly denies the reality of the Incarnation. The final victory over iconoclasm in 843 is celebrated each year on the first Sunday of Lent.",
    links: [{ label: "Learn about the council (OrthodoxWiki)", url: OW("Seventh Ecumenical Council") }, { label: "Read the definition and canons", needed: true }] }
];

/* =====================================================================
   4. OTHER IMPORTANT SYNODS AND COUNCILS
   ===================================================================== */
const SYNODS = [
  { id: "jerusalem-council", type: "synod", name: "Apostolic Council of Jerusalem", year: 49, date: "c. AD 49", location: "Jerusalem",
    summary: "The Apostles and elders met to decide whether Gentile converts had to keep the Jewish Law. Their answer: no, salvation is by the grace of the Lord Jesus.",
    decided: ["Gentile Christians do not need circumcision.", "They should avoid food offered to idols, blood, strangled animals and sexual immorality.", "The letter begins: \"It seemed good to the Holy Spirit and to us.\""],
    matters: "This is the model for every later council: the Church gathers, discusses, and decides together in the Holy Spirit. Note that St. James, not St. Peter, gave the final judgment.",
    links: [{ label: "Read Acts 15", needed: true }] },
  { id: "carthage", type: "synod", name: "Council of Carthage", year: 419, date: "419", location: "Carthage, North Africa",
    summary: "A large African council whose collected canons (including earlier African canons) were later approved for the whole Church by the Council in Trullo.",
    decided: ["Collected 133 canons on clergy, church discipline and the books read in church.", "Condemned the Pelagian teaching that people can be saved by their own effort without grace."],
    matters: "It shows that local councils, once received by the wider Church, become part of the Church's shared canon law.",
    links: [{ label: "Search for the canons (OrthodoxWiki)", url: OW("Council of Carthage") }] },
  { id: "trullo", type: "synod", name: "Council in Trullo (Quinisext)", year: 692, date: "692", location: "Constantinople (the domed Trullo hall of the palace)",
    summary: "Issued 102 canons to complete the Fifth and Sixth Councils, which had made no disciplinary rules. The Orthodox regard its canons as part of the Sixth Ecumenical Council.",
    decided: [
      "Canon 2 confirmed the earlier canons of the Apostles, councils and Fathers as the Church's canon law.",
      "Canon 13 allowed married men to be ordained priests and keep living with their wives, against the Roman practice.",
      "Canon 36 repeated that Constantinople has equal privileges with Rome, second in order.",
      "Canon 55 rejected Rome's practice of fasting on Saturdays."
    ],
    matters: "\"Quinisext\" means \"fifth-sixth.\" Its canons are a foundation of Orthodox church life. Rome never fully accepted it, an early sign of East and West drifting apart in practice.",
    links: [{ label: "Learn about the council (OrthodoxWiki)", url: OW("Quinisext Council") }, { label: "Read the canons", needed: true }] },
  { id: "triumph", type: "synod", name: "Council of Constantinople and the Triumph of Orthodoxy", year: 843, date: "March 843", location: "Constantinople",
    summary: "Under Empress Theodora, a council finally restored the icons after the second wave of iconoclasm. The Synodikon of Orthodoxy proclaimed the faith of the Seven Councils.",
    decided: ["Icons restored for good, and the decrees of Nicaea II upheld.", "Deposed the iconoclast patriarch and installed St. Methodius.", "Began the yearly celebration of the Triumph of Orthodoxy."],
    matters: "Every year on the first Sunday of Great Lent, Orthodox churches process with icons and read from the Synodikon: \"This is the faith of the Apostles, this is the faith of the Fathers, this is the faith of the Orthodox.\"",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Sunday of Orthodoxy") }, { label: "Search for the Synodikon", url: FIND("Synodikon of Orthodoxy") }] },
  { id: "photian", type: "synod", name: "The Photian Councils", year: 879, date: "867, 869–870, and 879–880", location: "Constantinople",
    summary: "A series of councils over St. Photius. Rome counts the 869–870 council that deposed him as \"ecumenical\"; the Orthodox follow the 879–880 council, which restored him with papal legates present and confirmed the Creed without any addition.",
    decided: [
      "867: Photius' council condemned the Western filioque and Latin interference in Bulgaria.",
      "869–870: a council deposed Photius. It was later annulled.",
      "879–880: a larger council, with the legates of Pope John VIII, restored Photius, annulled the 869–870 council, and declared that nothing may be added to or taken from the Creed."
    ],
    matters: "Many Orthodox theologians call the 879–880 council the \"Eighth Ecumenical Council,\" because East and West together forbade changing the Creed. Rome later revived the 869 council instead.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Fourth Council of Constantinople") }, { label: "Search for the acts", url: FIND("Council of Constantinople 879 880 Photius") }],
    views: {
      otherLabel: "Roman Catholic view",
      other: "The Catholic Church counts the council of 869–870 as the Eighth Ecumenical Council (Constantinople IV), which condemned Photius. In the late 1000s, Western canon lawyers began to cite it, in part for its support of papal authority.",
      orthodox: "The 869–870 council was small and was annulled by the much larger council of 879–880, which Pope John VIII's own legates attended and accepted. For centuries after, Rome itself did not list 869 as ecumenical. The 879 council's ban on any addition to the Creed is exactly what the later filioque broke."
    } },
  { id: "hesychast", type: "synod", name: "The Hesychast (Palamite) Councils", year: 1341, date: "1341, 1347 and 1351", location: "Constantinople",
    summary: "Councils that confirmed St. Gregory Palamas' teaching that believers can truly share in God's uncreated energies and see the uncreated light, while God's essence remains beyond reach.",
    decided: [
      "1341: Barlaam the Calabrian condemned for attacking the hesychast monks.",
      "1347: Gregory Akindynos condemned; Palamas' teaching upheld.",
      "1351: The distinction between God's essence and His uncreated energies proclaimed as the faith of the Church; it was added to the Synodikon of Orthodoxy."
    ],
    matters: "This teaching explains how theosis is possible: we never become God by essence, but by grace we truly participate in God's own life and light, as the disciples saw on Mount Tabor (Matthew 17).",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Hesychast controversy") }, { label: "Search for the Tomos of 1351", url: FIND("Hesychast councils 1351 Tomos") }],
    views: {
      otherLabel: "Barlaam's view, and later Western theology",
      other: "Barlaam argued that God can be known only indirectly, through creation and reason, and that the monks' claim to see the uncreated light was a delusion; the light of Tabor was created. Much Western theology later spoke of grace as \"created grace\" and of the saints in heaven seeing God's essence directly.",
      orthodox: "Scripture says God \"dwells in unapproachable light\" (1 Timothy 6:16) and that we become \"partakers of the divine nature\" (2 Peter 1:4). Both are true because God is unknowable in His essence, yet truly gives Himself in His energies. The light of the Transfiguration was God's own glory, not a created thing. St. Basil wrote that \"His energies come down to us, but His essence remains beyond our reach.\""
    } },
  { id: "council-1484", type: "synod", name: "Council of Constantinople (rejection of Florence)", year: 1484, date: "1484", location: "Constantinople",
    summary: "The four Eastern patriarchs formally rejected the Council of Florence and its union with Rome.",
    decided: ["Declared the Council of Florence invalid.", "Set out a service for receiving converts from the Latin church by chrismation."],
    matters: "It made official what the clergy and people had already decided: the union signed at Florence was not the faith of the Orthodox Church.",
    links: [{ label: "Search (OrthodoxWiki)", url: OW("Council of Constantinople 1484") }] },
  { id: "council-1583", type: "synod", name: "Council of Constantinople on the Calendar", year: 1583, date: "1583", location: "Constantinople",
    summary: "Under Patriarch Jeremias II, Orthodox patriarchs rejected the Gregorian calendar introduced by Pope Gregory XIII in 1582, especially its new way of dating Pascha.",
    decided: ["Kept the Julian calendar and the Paschal reckoning received from Nicaea."],
    matters: "This is why Orthodox Easter is usually on a different date from Western Easter. (Several Orthodox churches later adopted the Revised Julian calendar for fixed feasts, but all keep the same Pascha.)",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Calendar") }] },
  { id: "iasi", type: "synod", name: "Council of Iași (Jassy)", year: 1642, date: "1642", location: "Iași, Moldavia (modern Romania)",
    summary: "Greek and Russian-Ukrainian bishops examined and corrected the Orthodox Confession of Peter Mogila of Kiev, answering Catholic and Protestant challenges.",
    decided: ["Approved a corrected Orthodox Confession of Faith.", "Rejected the Calvinist confession circulated under the name of Patriarch Cyril Lucaris."],
    matters: "It shows the Orthodox Church answering the questions raised by the Reformation and Counter-Reformation in its own terms.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Synod of Iasi") }, { label: "Search for the Confession of Peter Mogila", url: FIND("Orthodox Confession Peter Mogila") }] },
  { id: "jerusalem-1672", type: "synod", name: "Synod of Jerusalem (Confession of Dositheus)", year: 1672, date: "1672", location: "Jerusalem (Bethlehem)",
    summary: "Called by Patriarch Dositheus II to reject Calvinist teachings that had been published under the name of Patriarch Cyril Lucaris. Its Confession sets out Orthodox teaching on salvation, Scripture and the sacraments.",
    decided: [
      "Rejected Calvinist predestination and justification by faith alone.",
      "Affirmed the real presence of Christ in the Eucharist, the seven mysteries, and the veneration of saints and icons.",
      "Listed the Septuagint books (like Tobit, Judith, Wisdom and Sirach) as genuine parts of Scripture."
    ],
    matters: "It is one of the clearest Orthodox statements on the questions of the Reformation. It also confirms the fuller Orthodox Old Testament.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Synod of Jerusalem") }, { label: "Search for the Confession of Dositheus", url: FIND("Confession of Dositheus") }],
    views: {
      otherLabel: "Reformed (Calvinist) view",
      other: "The Confession published under Lucaris' name taught that God predestines some to salvation without regard to their response, that we are justified by faith alone, and that Scripture alone is the rule of faith.",
      orthodox: "God \"desires all people to be saved\" (1 Timothy 2:4). Salvation is a living union with Christ in which God's grace and our free response work together (Philippians 2:12–13). \"Faith without works is dead\" (James 2:26). Scripture is the heart of Holy Tradition and is read within the Church, which is \"the pillar and ground of the truth\" (1 Timothy 3:15)."
    } },
  { id: "encyclical-1848", type: "synod", name: "Encyclical of the Eastern Patriarchs", year: 1848, date: "1848", location: "Constantinople",
    summary: "The four Eastern patriarchs and their synods answered Pope Pius IX's call for the Orthodox to submit to Rome.",
    decided: [
      "Restated the Orthodox objections to the filioque and to papal claims.",
      "Declared that the guardian of the faith is the whole body of the Church, the people of God themselves."
    ],
    matters: "Its line that \"the protector of religion is the very body of the Church, even the people themselves\" is often quoted to explain how the Orthodox understand authority: no single bishop is the guarantee of truth.",
    links: [{ label: "Read the Encyclical (OrthodoxInfo)", url: "https://www.orthodoxinfo.com/ecumenism/encyc_1848.aspx" }] },
  { id: "phyletism-1872", type: "synod", name: "Council of Constantinople on Phyletism", year: 1872, date: "1872", location: "Constantinople",
    summary: "Condemned \"phyletism\": organizing the Church by ethnic group or nationality instead of by place.",
    decided: ["Declared that the Church must not be divided by race or nation."],
    matters: "In Christ \"there is neither Jew nor Greek\" (Galatians 3:28). This principle is still important as Orthodox Christians of many backgrounds live side by side around the world.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Phyletism") }] }
];

/* =====================================================================
   5. KEY EVENTS
   ===================================================================== */
const EVENTS = [
  { id: "nativity", type: "event", name: "The Nativity, Death and Resurrection of Christ", year: -4, era: "apostolic", date: "c. 4 BC – c. AD 33",
    summary: "The eternal Son of God is born of the Virgin Mary in Bethlehem, teaches, heals, is crucified under Pontius Pilate, and rises from the dead on the third day. This is the center of all history.",
    links: [{ label: "Read the Gospel of Luke", needed: true }] },
  { id: "pentecost", type: "event", name: "Pentecost: the birth of the Church", year: 33, date: "c. AD 30–33",
    summary: "Fifty days after Pascha, the Holy Spirit descends on the Apostles as tongues of fire. St. Peter preaches and about 3,000 are baptized. The Church is born.",
    links: [{ label: "Read Acts 2", needed: true }] },
  { id: "peter-paul", type: "event", name: "Martyrdom of Sts. Peter and Paul in Rome", year: 65, date: "c. 64–67",
    summary: "Under Emperor Nero, St. Peter is crucified upside down and St. Paul beheaded. The church of Rome, founded on their witness, becomes honored above others. Both are celebrated together on June 29.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Peter and Paul") }] },
  { id: "temple", type: "event", name: "Destruction of the Temple in Jerusalem", year: 70, date: "AD 70",
    summary: "Roman armies destroy Jerusalem and its Temple, as Christ foretold (Matthew 24:2). The sacrifices end, and the Church spreads ever wider in the Roman world.",
    links: [{ label: "Read Matthew 24", needed: true }] },
  { id: "great-persecution", type: "event", name: "The Great Persecution", year: 303, date: "303 – 311",
    summary: "Emperor Diocletian orders churches destroyed and Scriptures burned, and thousands are martyred, including St. George and St. Demetrius. \"The blood of the martyrs is the seed of the Church.\"",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Diocletian") }] },
  { id: "antony", type: "event", name: "St. Antony and the birth of monasticism", year: 270, date: "c. 270 onward",
    summary: "St. Antony the Great goes into the Egyptian desert to give his whole life to God. Thousands follow; St. Pachomius founds community monasteries. The sayings of the Desert Fathers still guide Orthodox spiritual life.",
    links: [{ label: "Read the Life of Antony", needed: true }] },
  { id: "milan", type: "event", name: "Edict of Milan", year: 313, date: "313",
    summary: "St. Constantine the Great and Licinius grant freedom of worship to Christians. Persecution ends, and the Church can now gather openly in great councils.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Constantine the Great") }] },
  { id: "constantinople-founded", type: "event", name: "Founding of Constantinople", year: 330, date: "May 11, 330",
    summary: "Constantine dedicates his new capital, \"New Rome,\" on the Bosporus. For over a thousand years it is the center of the Christian Roman (Byzantine) Empire and of Eastern Christianity.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Constantinople") }] },
  { id: "thessalonica", type: "event", name: "Edict of Thessalonica", year: 380, date: "380",
    summary: "Emperor Theodosius makes the Nicene Christian faith the official faith of the Roman Empire, ending decades of Arian rule in Constantinople.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Theodosius the Great") }] },
  { id: "hagia-sophia", type: "event", name: "Hagia Sophia dedicated", year: 537, date: "December 27, 537",
    summary: "Emperor Justinian completes the great Church of Holy Wisdom. Four centuries later, envoys of Prince Vladimir of Kiev said of its worship: \"We knew not whether we were in heaven or on earth.\"",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Hagia Sophia") }] },
  { id: "islam", type: "event", name: "The Arab conquests", year: 636, date: "634 – 642",
    summary: "Arab Muslim armies take Syria, Palestine and Egypt. The ancient patriarchates of Antioch, Jerusalem and Alexandria now live under Muslim rule, as their Christians still do today.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Patriarchate of Jerusalem") }] },
  { id: "iconoclasm", type: "event", name: "Iconoclasm", year: 726, date: "726 – 787, and 815 – 843",
    summary: "Byzantine emperors order icons destroyed, and monks and lay people who resist are persecuted. The Seventh Ecumenical Council (787) and the Triumph of Orthodoxy (843) restore the icons.",
    links: [{ label: "Read St. John of Damascus on the Divine Images", needed: true }],
    views: {
      otherLabel: "Iconoclast view (and many later Protestants)",
      other: "The iconoclasts said images break the commandment against \"graven images\" (Exodus 20:4), and that a picture of Christ either shows only His humanity (splitting Him) or tries to draw His divinity (impossible). Many later Protestants, especially Reformed churches, also rejected images in worship.",
      orthodox: "The commandment forbids idols, false gods, not every image; God Himself ordered golden cherubim on the Ark (Exodus 25:18). Above all, the invisible God became visible: Christ is \"the image of the invisible God\" (Colossians 1:15), and \"we have seen His glory\" (John 1:14). An icon depicts the Person of the Word in the flesh He truly took. As St. Basil said, the honor given to the image passes to its prototype. Veneration is not worship, which belongs to God alone."
    } },
  { id: "filioque", type: "event", name: "The Filioque Controversy", year: 809, date: "589 (Toledo) → 809 (Aachen) → 867 (Photius) → 1014 (Rome)",
    summary: "The Latin word \"filioque\" means \"and the Son.\" It was added in the West to the Creed's line about the Holy Spirit \"who proceeds from the Father.\" It began in Spain (Toledo, 589), spread in Charlemagne's empire, was answered by St. Photius, and was finally sung in Rome in 1014. It is the main doctrinal cause of the schism.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Filioque") }, { label: "Read the Creed of 381", needed: true }],
    views: {
      otherLabel: "Roman Catholic view",
      other: "The Catholic Church teaches that the Holy Spirit proceeds eternally from the Father and the Son \"as from one principle\" (Council of Florence; Catechism 246–248). It sees this as a legitimate expression of the Father giving everything, including the procession of the Spirit, to the Son, and regards it as compatible with the Greek \"from the Father through the Son.\" Many Catholics hold that the Pope had authority to add it to the Creed.",
      orthodox: "1) Christ Himself says the Spirit \"proceeds from the Father\" (John 15:26), and the Creed of 381 uses exactly those words. 2) The Father is the one source (\"monarchy\") of the Son and the Spirit; making the Son a second source of the Spirit's eternal existence confuses the persons. 3) The Son sends the Spirit into the world in time (John 15:26; 16:7), but that is different from the Spirit's eternal origin. 4) Canon 7 of Ephesus forbade any change to the Creed, and the 879–880 council (with papal legates) confirmed this. 5) Even Pope Leo III refused to add it around 810, and had the Creed without it engraved on silver shields in St. Peter's. Changing the common Creed of the whole Church without an Ecumenical Council is itself the deeper problem."
    } },
  { id: "slavs", type: "event", name: "Sts. Cyril and Methodius, Apostles to the Slavs", year: 863, date: "863 onward",
    summary: "Two brothers from Thessalonica go to Moravia, create an alphabet for the Slavic language, and translate the Scriptures and services. Church Slavonic opens the way for the baptism of Bulgaria (864), Serbia and Rus'.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Cyril and Methodius") }] },
  { id: "athos", type: "event", name: "Great Lavra founded on Mount Athos", year: 963, date: "963",
    summary: "St. Athanasius the Athonite founds the first great monastery on the \"Holy Mountain\" in Greece. Athos becomes the spiritual heart of Orthodox monasticism, as it still is today.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Mount Athos") }] },
  { id: "rus", type: "event", name: "The Baptism of Rus'", year: 988, date: "988",
    summary: "Prince St. Vladimir of Kiev is baptized and leads his people into the Orthodox faith after his envoys are overwhelmed by the beauty of worship in Hagia Sophia. It is the root of the Russian, Ukrainian and Belarusian churches.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Baptism of Rus") }] },
  { id: "schism", type: "event", name: "The Great Schism", year: 1054, date: "July 16, 1054 (a gradual process, c. 800–1204)",
    summary: "Papal legate Cardinal Humbert lays a bull of excommunication on the altar of Hagia Sophia against Patriarch Michael Cerularius, who answers in kind. It came after centuries of drifting apart over the filioque, papal claims, and practices like unleavened bread. The split became permanent in hearts after the sack of 1204.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Great Schism") }],
    views: {
      otherLabel: "Roman Catholic view (papal supremacy)",
      other: "The Catholic Church teaches that Christ made St. Peter head of the Apostles (\"You are Peter, and on this rock I will build my Church,\" Matthew 16:18) and that the bishop of Rome, as Peter's successor, has full, supreme and universal jurisdiction over the whole Church, and, since the First Vatican Council (1870), can teach infallibly on his own. From this view, communion with Rome is the mark of the true Church, so the East broke away.",
      orthodox: "Rome truly had a primacy of honor, \"first among equals,\" and the Orthodox would gladly give that back to an Orthodox Rome. But: 1) Many Fathers, like St. John Chrysostom (Homily 54 on Matthew), read the \"rock\" as Peter's confession of faith in Christ, which every faithful bishop shares; St. Cyprian taught that all bishops hold the one episcopate together. 2) The councils that ranked the great sees gave Rome first place because it was the old imperial capital (Constantinople canon 3, Chalcedon canon 28), not by divine law. 3) The Ecumenical Councils, not the pope, settled doctrine, and they examined papal letters before accepting them; the Sixth Council even condemned Pope Honorius. 4) Apostolic Canon 34 says the first bishop should do nothing important without the consent of all. From this view, it was Rome that departed by changing the Creed and claiming powers the early Church never gave it."
    } },
  { id: "crusades", type: "event", name: "The First Crusade", year: 1095, date: "1095 – 1099",
    summary: "Emperor Alexios I asks the West for help against the Seljuk Turks, and Pope Urban II calls a crusade. The crusaders take Jerusalem in 1099 but set up Latin bishops in place of the Orthodox in Antioch and Jerusalem, deepening the division.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Crusades") }] },
  { id: "1204", type: "event", name: "The Fourth Crusade and the Sack of Constantinople", year: 1204, date: "April 1204",
    summary: "Crusaders bound for Egypt turn on Constantinople, the greatest Christian city in the world. For three days they loot churches, steal relics, and place a prostitute on the patriarch's throne in Hagia Sophia. A Latin emperor and patriarch are installed until 1261. For ordinary Orthodox people, this, more than 1054, made the schism real.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Fourth Crusade") }],
    views: {
      otherLabel: "A note on reconciliation",
      other: "Pope Innocent III condemned the violence of the sack at the time, even while accepting the Latin Empire it created. In 2001 Pope John Paul II publicly expressed sorrow for it, and in 2004 Ecumenical Patriarch Bartholomew accepted this apology in the spirit of Pascha.",
      orthodox: "The Orthodox remember 1204 not to keep anger alive, but because it shows how the schism moved from a quarrel among bishops to a wound in the life of whole peoples, and why later unions imposed from above failed."
    } },
  { id: "lyon", type: "event", name: "Second Council of Lyon and its rejection", year: 1274, date: "1274",
    summary: "Emperor Michael VIII, desperate for Western help, sends envoys to a council in Lyon who accept the filioque and papal supremacy. Clergy, monks and people refuse it. Monks of Mount Athos, including the Zographou martyrs, die for refusing the union. It is formally renounced in 1285.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Second Council of Lyons") }],
    views: {
      otherLabel: "Roman Catholic view",
      other: "Catholics count Lyon II as their Fourteenth Ecumenical Council, which defined that the Spirit proceeds from Father and Son as from one principle, and recognized Roman primacy.",
      orthodox: "The union was a political deal made by an emperor, not a free agreement of the Church. Truth in the Church is confirmed by its reception by the whole body of believers, and the Orthodox people, monks and bishops rejected it."
    } },
  { id: "florence", type: "event", name: "Council of Ferrara-Florence and its rejection", year: 1438, date: "1438 – 1439",
    summary: "With the Turks closing in, the Byzantine emperor, the patriarch and many bishops travel to Italy hoping for help. After long debates they sign a union accepting the filioque, purgatory, papal primacy and unleavened bread. Only St. Mark of Ephesus refuses. At home, people and clergy reject it; the Eastern patriarchs condemn it in 1443, and a council formally rejects it in 1484.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Council of Florence") }, { label: "Search for St. Mark's Encyclical", url: FIND("Mark of Ephesus Encyclical") }],
    views: {
      otherLabel: "Roman Catholic view (purgatory)",
      other: "The Catholic Church teaches that those who die in God's grace but are not yet fully purified undergo a purification after death, called purgatory, before entering heaven (Florence, Trent; Catechism 1030–1032). The prayers of the living help them. In the medieval West this was often described as a place of fire where temporal punishment owed for sins is paid, which is linked to indulgences.",
      orthodox: "The Orthodox also pray for the departed and believe that prayers, the Divine Liturgy and almsgiving truly help them (see 2 Maccabees 12:43–45). But St. Mark of Ephesus argued at Ferrara that there is no purgatorial fire and no paying off of punishment that Christ has not already borne. Salvation is healing and union with God, not a legal debt to be paid. The Fathers spoke of the state of souls before the Last Judgment with reverent restraint; the Church does not define it in detail. The union also failed because it was not received by the Church: unity in truth cannot be signed under political pressure."
    } },
  { id: "fall-1453", type: "event", name: "The Fall of Constantinople", year: 1453, date: "May 29, 1453",
    summary: "After a 53-day siege, the Ottoman Sultan Mehmed II takes the city. The last emperor, Constantine XI, dies fighting at the walls. Hagia Sophia becomes a mosque. The Byzantine Empire ends, but the Church lives on: St. Gennadios Scholarios, a disciple of St. Mark of Ephesus, becomes the first patriarch under the Sultan.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Fall of Constantinople") }] },
  { id: "reformation", type: "event", name: "The Protestant Reformation and the Orthodox reply", year: 1517, date: "1517 onward; Orthodox replies 1576–1581",
    summary: "Martin Luther challenges indulgences and papal authority in the West. In 1576–1581, Lutheran scholars from Tübingen write to Patriarch Jeremias II of Constantinople hoping for agreement. He answers kindly but clearly, holding to the Orthodox faith.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Jeremias II") }],
    views: {
      otherLabel: "Protestant view",
      other: "The Reformers taught \"Scripture alone\" as the final authority for faith, salvation by grace alone through faith alone, and rejected the papacy, purgatory, and (in many churches) prayers to the saints and the full sacramental priesthood.",
      orthodox: "The Orthodox agree with the Reformers that the papacy overreached and that indulgences were wrong. But Scripture was written, gathered and interpreted within the Church's living Tradition (2 Thessalonians 2:15), so it cannot be set against it. Faith is never alone but works through love (Galatians 5:6), and salvation is union with Christ through the mysteries (John 6:53). Patriarch Jeremias answered the Lutherans with the Fathers and the councils."
    } },
  { id: "moscow", type: "event", name: "The Patriarchate of Moscow", year: 1589, date: "1589",
    summary: "With Constantinople under Ottoman rule, Patriarch Jeremias II raises the Metropolitan of Moscow to patriarch. Russia becomes the largest Orthodox nation and protector of Orthodox Christians in the East.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Church of Russia") }] },
  { id: "philokalia", type: "event", name: "The Philokalia is published", year: 1782, date: "1782 (Venice)",
    summary: "Sts. Nicodemus the Hagiorite and Macarius of Corinth publish an anthology of writings on prayer from the 4th to 15th centuries. Translated into Slavonic by St. Paisius Velichkovsky (1793), it sparks a revival of the Jesus Prayer across the Orthodox world.",
    links: [{ label: "Search for free copies", url: FIND("Philokalia") }] },
  { id: "alaska", type: "event", name: "Orthodox mission to Alaska", year: 1794, date: "1794",
    summary: "Monks from Valaam arrive on Kodiak Island. St. Herman of Alaska lives among the native Alutiiq people, defending them and teaching the faith. It is the beginning of Orthodoxy in North America.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Herman of Alaska") }] },
  { id: "papal-dogmas", type: "event", name: "Rome's new dogmas of 1854 and 1870", year: 1854, date: "1854 and 1870",
    summary: "Pope Pius IX defines the Immaculate Conception of Mary (1854), and the First Vatican Council defines papal infallibility and universal jurisdiction (1870). Both widen the gap with the Orthodox.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Papal infallibility") }],
    views: {
      otherLabel: "Roman Catholic view",
      other: "The Immaculate Conception teaches that, by a unique grace in view of Christ's merits, Mary was preserved from all stain of original sin from the first moment of her conception. Papal infallibility teaches that when the pope defines a doctrine of faith or morals \"ex cathedra\" for the whole Church, he is protected from error, and such definitions are unchangeable \"of themselves, and not from the consent of the Church.\"",
      orthodox: "The Orthodox honor the Theotokos as \"all-holy\" (Panagia) and believe she never sinned, by God's grace and her own free cooperation. But the Orthodox do not understand Adam's sin as inherited guilt; we inherit mortality and a wounded nature. So the dogma answers a question the East never posed in that way, and could seem to set Mary apart from the humanity Christ came to save. On infallibility: the Church as a whole, guided by the Holy Spirit, is preserved in truth (John 16:13), and councils are proven true by their reception by the faithful, as the Patriarchs said in 1848. The condemnation of Pope Honorius by the Sixth Ecumenical Council shows that the early Church did not think a pope could not err."
    } },
  { id: "anathemas-lifted", type: "event", name: "Anathemas of 1054 lifted", year: 1965, date: "December 7, 1965",
    summary: "Pope Paul VI and Ecumenical Patriarch Athenagoras jointly remove the excommunications of 1054 \"from the memory of the Church.\" A gesture of love, but full communion is not restored: the differences in faith remain to be resolved in truth.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Athenagoras I of Constantinople") }] }
  ,

  /* ---------- Entries added for the Study Paths ---------- */
  { id: "septuagint", type: "event", name: "Translation of the Septuagint", year: -250, date: "c. 280–130 BC, in Alexandria",
    summary: "Jewish scholars in Alexandria translate the Hebrew Scriptures into Greek, starting with the five books of the Law. Tradition says there were seventy-two translators, so it is called the Septuagint (\"the Seventy,\" written LXX). Books first written in Greek, or kept in Greek, joined the collection. It was the Bible of Greek-speaking Jews, of the Apostles, and of the early Church: most Old Testament quotations in the New Testament follow it.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Septuagint") }, { label: "Search for the Brenton English Septuagint", url: FIND("Brenton Septuagint English") }],
    views: {
      otherLabel: "Later Jewish and Protestant view",
      other: "In the centuries after Christ, Jewish teachers settled on a shorter list of books found in Hebrew, and the standard Hebrew text (the Masoretic text) was fixed later still, by about AD 1000. In the 1500s the Protestant Reformers adopted that shorter list. They moved the other books into a separate section called the \"Apocrypha\" (useful reading, but not Scripture), and later many Protestant Bibles left them out.",
      orthodox: "The Church received its Old Testament from the Apostles, who used the Greek Bible. The New Testament echoes these books: compare Wisdom 2:12–20 with Matthew 27:43, and Hebrews 11:35 with the Maccabean martyrs of 2 Maccabees 7. The Church read them in worship from the start, and the Fathers quote them as Scripture. A later rabbinic decision did not determine the Church's Bible. The Dead Sea Scrolls also show that some Septuagint readings go back to ancient Hebrew texts, and St. Matthew quotes the Septuagint's \"a virgin shall conceive\" (Isaiah 7:14; Matthew 1:23)."
    } },
  { id: "stephen", type: "event", name: "St. Stephen, the first martyr", year: 34, date: "c. AD 34",
    summary: "Stephen, one of the first seven deacons, is stoned in Jerusalem after preaching Christ, and dies praying for his killers as Christ did. Saul, the future St. Paul, stands by approving. The Church calls him the Protomartyr, the first martyr. His feast is December 27.",
    links: [{ label: "Read Acts 6–7", needed: true }] },
  { id: "arius", type: "event", name: "The Arian controversy begins", year: 318, date: "c. 318–325",
    summary: "Arius, a priest of Alexandria, teaches that the Son of God is the first and greatest creature: \"there was a time when He was not.\" His catchy songs spread the idea through the city. Bishop Alexander and his deacon Athanasius oppose him, and the dispute grows until Emperor Constantine calls the Council of Nicaea.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Arianism") }],
    views: {
      otherLabel: "Arius' view (shared today by groups such as Jehovah's Witnesses)",
      other: "The Son is a divine and exalted being, made by the Father before all ages, and through Him the Father created everything else. But He is not eternal and not God in the same sense as the Father. Arius pointed to verses like \"the Father is greater than I\" (John 14:28) and \"the firstborn of all creation\" (Colossians 1:15).",
      orthodox: "\"In the beginning was the Word, and the Word was with God, and the Word was God\" (John 1:1). \"I and the Father are one\" (John 10:30). As St. Athanasius argued, only God can save: a creature could not unite us to God or give us divine life. \"The Father is greater\" speaks of the Father as the source of the Son, or of Christ's humanity. \"Firstborn\" means first in rank, and the same passage says all things were created through Him (Colossians 1:16). The Church had always worshipped Christ, and worshipping a creature would be idolatry."
    } },
  { id: "desert-sayings", type: "event", name: "The Sayings of the Desert Fathers", year: 400, date: "Collected c. 400–500",
    summary: "Short sayings and stories of the monks and nuns of the deserts of Egypt, Palestine and Syria were collected as the \"Sayings of the Fathers\" (Apophthegmata Patrum). Among them are St. Macarius the Great, Abba Poemen, St. Moses the Black and Amma Syncletica. In plain, memorable words they teach humility, repentance, stillness, unceasing prayer, and love that refuses to judge.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Desert Fathers") }, { label: "Search for a free copy", url: FIND("Sayings of the Desert Fathers") }] },
  { id: "anselm", type: "event", name: "Anselm and the Western theory of atonement", year: 1098, date: "c. 1098 (Why God Became Man)",
    summary: "Anselm, Archbishop of Canterbury, writes \"Why God Became Man\" (Cur Deus Homo). He explains the Cross as Christ paying the \"satisfaction\" owed to God's offended honor, a debt sinful humans could not pay. This approach deeply shaped later Western theology, both Roman Catholic and Protestant.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Atonement") }, { label: "Search for a free copy of Cur Deus Homo", url: FIND("Anselm Cur Deus Homo") }],
    views: {
      otherLabel: "Western view (satisfaction and penal substitution)",
      other: "Anselm taught that sin robs God of the honor due to Him, and justice requires that this be made right. Only someone who is both God and man could do it, so the Son became man and freely offered His life, whose infinite worth satisfies the debt. The Reformers developed this into penal substitution: on the Cross Christ bore, in our place, the punishment that God's justice requires for sin, so that His righteousness can be credited to all who believe.",
      orthodox: "The Orthodox Church confesses that Christ died \"for us and for our salvation\" as a true sacrifice, bearing our sins (Isaiah 53; 1 Peter 2:24), and uses the Bible's language of ransom and sacrifice. But the Fathers did not mainly explain the Cross as a payment to satisfy God's justice or honor. St. Gregory the Theologian asks to whom the ransom was paid, and says it was not demanded by the Father, though He accepted it for the sake of our salvation (Oration 45). The main enemy is death and corruption, not only a legal debt. Christ, who is Life itself, enters death to destroy it from within (Hebrews 2:14–15): \"trampling down death by death,\" as the Paschal hymn sings. The Cross shows the Father's love (John 3:16; Romans 5:8). It does not resolve a conflict between His mercy and His justice."
    } },
  { id: "scholasticism", type: "event", name: "Thomas Aquinas and Western scholasticism", year: 1265, date: "c. 1265–1274 (the Summa Theologiae)",
    summary: "Thomas Aquinas, a Dominican friar, writes the Summa Theologiae, a vast system of theology built with the tools of Aristotle's philosophy. It becomes the backbone of Roman Catholic teaching. On several points, including grace and how the saints see God, its framework differs from the Greek Fathers.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Essence-Energies distinction") }, { label: "Search for the Summa Theologiae", url: FIND("Thomas Aquinas Summa Theologiae") }],
    views: {
      otherLabel: "Roman Catholic (Thomist) view",
      other: "God is absolutely simple: there is no real distinction in Him between His essence and His attributes or acts. Grace in the soul is a gift God creates and pours in (a \"habit\") that heals and lifts our nature so we can share in God's life. In heaven the blessed see God's very essence directly (the \"beatific vision\"), made able to do so by the \"light of glory.\"",
      orthodox: "The Orthodox also confess that God is simple and undivided. But with St. Basil and the Hesychast councils they teach a real distinction between God's essence, which no creature will ever know, and His uncreated energies, which He truly shares. Grace is not a created thing given in God's place: grace is God Himself giving His own life. If what unites us to God were created, we would never truly be united to God. The saints will never see or grasp God's essence, yet they behold His uncreated glory \"face to face\" forever (1 Corinthians 13:12)."
    } },
  { id: "calvin", type: "event", name: "John Calvin and the Reformed tradition", year: 1536, date: "1536 (first edition of the Institutes) – 1564",
    summary: "John Calvin, a French reformer working in Geneva, publishes the Institutes of the Christian Religion, revised until 1559. It became the founding text of the Reformed tradition (Presbyterian, Reformed, and many Baptist and evangelical churches), with its strong emphasis on God's sovereignty, the authority of Scripture, and predestination.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Calvinism") }, { label: "Search for the Institutes", url: FIND("Calvin Institutes of the Christian Religion") }] },
  { id: "trent", type: "event", name: "The Council of Trent", year: 1545, date: "1545 – 1563",
    summary: "The Roman Catholic Church's answer to the Reformation. It defined Catholic teaching on Scripture and Tradition, justification, the seven sacraments, the Mass and purgatory, and launched the Counter-Reformation.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Council of Trent") }, { label: "Search for the canons and decrees", url: FIND("Canons and Decrees of the Council of Trent") }],
    views: {
      otherLabel: "Roman Catholic view",
      other: "Trent taught that justification is not only forgiveness but the inner renewal of the person by grace poured in through the Holy Spirit, beginning in baptism. Faith must be joined with hope and love. This grace can grow through good works done in grace, can be lost by mortal sin, and is restored through the sacrament of penance. Trent affirmed both Scripture and unwritten apostolic Tradition, the longer Old Testament, and purgatory.",
      orthodox: "On many points the Orthodox stand close to Trent and against the Reformers: salvation is real transformation, not only a legal declaration; faith works through love; Scripture and Tradition belong together; and the longer Old Testament is Scripture. But the Orthodox describe salvation as theosis, sharing in God's uncreated life, rather than in terms of merit, created grace and temporal punishment. They reject the teaching on purgatory and papal authority that frames Trent's decrees. Trent was a council of the Western Church alone, not of the whole Church."
    } },
  { id: "ottoman", type: "event", name: "Orthodoxy under Ottoman rule and the New Martyrs", year: 1550, date: "1453 – 1800s",
    summary: "Under the Ottoman system, the Patriarch of Constantinople became the civil head of all Orthodox Christians in the empire. Christians could worship, but paid heavy taxes, lived as second-class subjects, and in some regions lost boys to the devshirme levy. Leaving Islam was punishable by death, and hundreds of \"New Martyrs\" died for Christ. Saints like St. Cosmas of Aetolia (d. 1779) walked from village to village, preaching and opening schools to keep the faith alive.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("New Martyrs") }] },
  { id: "dort", type: "event", name: "The Synod of Dort", year: 1618, date: "1618 – 1619",
    summary: "A Reformed synod in the Netherlands answers the followers of Jacob Arminius. Its canons are often summarized as the \"five points of Calvinism\" (TULIP): total depravity, unconditional election, limited atonement, irresistible grace, and perseverance of the saints.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Calvinism") }, { label: "Search for the Canons of Dort", url: FIND("Canons of Dort") }],
    views: {
      otherLabel: "Reformed (Calvinist) view",
      other: "Because of the Fall, every part of human nature is corrupted, so no one can turn to God by their own power (total depravity). Out of pure grace, God chose before creation those He would save, not because of any faith or works He foresaw (unconditional election). Christ's death was designed to secure the salvation of the elect in particular, though it is sufficient for all (limited or \"particular\" atonement). God's saving grace effectively brings the elect to faith (irresistible grace), and they will persevere to the end. Reformed Christians see this as giving all the glory to God and real comfort to believers.",
      orthodox: "God \"desires all people to be saved\" (1 Timothy 2:4), and Christ \"gave Himself as a ransom for all\" (1 Timothy 2:6; 1 John 2:2). Predestination follows God's foreknowledge (Romans 8:29) and is not a decree that makes our response meaningless. St. John of Damascus taught that God foreknows all things but does not predetermine all things. Grace always comes first, yet it never forces: \"I stand at the door and knock\" (Revelation 3:20). The Fathers call this synergy, cooperation with God (1 Corinthians 3:9). The Fall wounded the image of God in us but did not destroy it or our freedom. The Orthodox gave their official answer at the Synod of Jerusalem in 1672."
    } },
  { id: "lucaris", type: "event", name: "The Confession of Cyril Lucaris", year: 1629, date: "1629 (published in Geneva)",
    summary: "Cyril Lucaris, Patriarch of Constantinople, opposed Jesuit influence in the East and kept close contacts with Reformed theologians. A strongly Calvinist confession of faith was published in Geneva under his name. Orthodox councils in 1638, 1642 (Iași) and 1672 (Jerusalem) condemned its teaching. Historians still debate how much of it Lucaris himself wrote.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("Cyril Lucaris") }] },
  { id: "russia-1917", type: "event", name: "The Russian Revolution and the New Martyrs", year: 1917, date: "1917 – 1991",
    summary: "After the 1917 Revolution, the Soviet state set out to destroy religion. Tens of thousands of bishops, priests, monastics and lay believers were killed, and most churches were closed or destroyed. The New Martyrs and Confessors include St. Tikhon, Patriarch of Moscow, and St. Elizabeth the New Martyr. Similar persecution followed in other Communist countries. After 1991, churches reopened by the thousands.",
    links: [{ label: "Learn more (OrthodoxWiki)", url: OW("New Martyrs and Confessors of Russia") }] }

];

/* Everything combined (the page reads this). You do not need to edit this line. */
const TIMELINE = [...BIBLE, ...FATHERS, ...COUNCILS, ...SYNODS, ...EVENTS];
