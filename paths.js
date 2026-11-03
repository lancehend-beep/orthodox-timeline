/* =====================================================================
   ORTHODOX TIMELINE — STUDY PATHS
   =====================================================================
   A study path is a guided walk through one topic, step by step.
   This file holds ONLY the study paths. The timeline entries themselves
   live in data.js.

   HOW TO MAKE A NEW PATH (the short version):
   1. Copy an existing path below, from its opening {  to its closing  },
      including the comma after it, and paste it where you want it.
   2. Change:
        id:          a unique short name, lowercase-with-dashes
        title:       the name on the card
        description: one sentence for the card
        level:       "Beginner", "Intermediate" or "Deeper Study"
        minutes:     a rough reading time
        group:       "history" (History & Faith) or "compare"
                     (What Makes Orthodoxy Unique)
        startHere:   true to mark it as a recommendation for newcomers
   3. List the steps in order. There are two kinds of step:

      a) A step that points to a timeline entry (use the entry's "id"
         from data.js) and says why it matters for this topic:
           { entry: "athanasius", why: "He defended the Creed..." },

      b) An "explainer" step, for a topic that has no single timeline
         entry. It can show the other tradition's view next to the
         Orthodox position, and point to related timeline entries:
           { title: "What is an icon?",
             text: ["First paragraph.", "Second paragraph."],
             views: { otherLabel: "Protestant view", other: "...",
                      orthodox: "..." },                 (optional)
             related: ["damascene", "nicaea2"],          (optional)
             links: [{ label: "Read John 1", needed: true }] },  (optional)

      To compare several traditions in one explainer, use
             views: { others: [ { label: "Lutheran", text: "..." },
                                { label: "Reformed", text: "..." } ],
                      orthodox: "..." }

   4. Save and refresh the browser. If a step names an entry id that does
      not exist, the page shows a short notice in that step instead of
      breaking, so typos are easy to find.

   You can use the same link helpers as in data.js: OW() and FIND().
   For a link with no Orthodox source yet, write  { label: "...", needed: true }
   and the page will show "Orthodox link needed".
   ===================================================================== */

const PATH_GROUPS = [
  { id: "history", name: "History & Faith", intro: "Walk through the great moments and teachings of the Church in order." },
  { id: "compare", name: "What Makes Orthodoxy Unique", intro: "How the Orthodox faith compares with Roman Catholic and Protestant teaching. Each other view is stated fairly, then the Orthodox answer is given from Scripture, the Fathers and the councils." }
];

const PATHS = [

  /* -------------------------------------------------------------------
     1. THE EARLY CHURCH AND THE MARTYRS
     ------------------------------------------------------------------- */
  { id: "early-church", title: "The Early Church and the Martyrs", group: "history", level: "Beginner", minutes: 20, startHere: true,
    description: "From Pentecost to the end of persecution: how the Church grew through the witness of its martyrs.",
    steps: [
      { entry: "pentecost", why: "Everything starts here. The Holy Spirit comes down on the Apostles, and the Church is born as one community gathered around the Apostles' teaching, the breaking of bread and prayer (Acts 2:42)." },
      { entry: "stephen", why: "\"Martyr\" means \"witness.\" St. Stephen is the first to die for Christ, and he dies the way Christ did, forgiving his killers. Every martyr after him follows that pattern." },
      { entry: "jerusalem-council", why: "The first big question the young Church faced was whether non-Jews had to become Jews first. The Apostles met and decided together in the Holy Spirit. This is the pattern for every later council." },
      { entry: "peter-paul", why: "The two chief Apostles die in Rome under Nero. Their martyrdom is why the church of Rome was so honored in the early centuries." },
      { entry: "temple", why: "With the Temple gone, the Church spreads out through the Roman world. Christians now worship wherever the Eucharist is celebrated." },
      { entry: "ignatius", why: "On his way to die in the arena, St. Ignatius writes letters showing what the Church looked like right after the Apostles: bishops, priests and deacons gathered around one Eucharist. He begs the Romans not to try to save him: \"I am God's wheat.\"" },
      { entry: "polycarp", why: "The account of his martyrdom is the oldest outside the New Testament. It shows Christians already gathering the relics of martyrs and celebrating the day of their death as a \"birthday.\"" },
      { entry: "justin", why: "St. Justin explained the faith to the emperors in their own philosophical language and described Sunday worship in detail. Then he too died for Christ." },
      { entry: "great-persecution", why: "The last and worst persecution. Many of the most loved saints, such as St. George and St. Demetrius, come from these years." },
      { entry: "milan", why: "The persecution ends. The Church that grew in the catacombs can now build churches and meet openly in councils. The martyrs' blood had not been wasted." }
    ] },

  /* -------------------------------------------------------------------
     2. THE APOSTOLIC FATHERS
     ------------------------------------------------------------------- */
  { id: "apostolic-fathers", title: "The Apostolic Fathers", group: "history", level: "Beginner", minutes: 15,
    description: "Meet the Church right after the Apostles, through the writings of the people who knew them.",
    steps: [
      { title: "Who are the Apostolic Fathers?",
        text: [
          "The \"Apostolic Fathers\" are the Christian writers of the generation right after the Apostles, roughly AD 70–150. Some of them knew the Apostles personally.",
          "Their writings are not Scripture, but they are precious: they show what the Church was actually like when the Apostles' own disciples led it. Here we find bishops, priests and deacons, the Eucharist at the center, fasting on Wednesdays and Fridays, baptism, and deep love for Christ.",
          "If you want to know whether the Orthodox Church is the same Church as the one in the New Testament, these writings are where to start."
        ],
        related: ["didache", "clement-rome", "ignatius", "polycarp"] },
      { entry: "didache", why: "The Didache is a short manual for church life, perhaps written while some Apostles were still alive. It teaches baptism, fasting on Wednesdays and Fridays, the Lord's Prayer three times a day, and the Eucharist, the same rhythm Orthodox Christians still keep." },
      { entry: "clement-rome", why: "When the Corinthians wrongly removed their clergy, St. Clement wrote that the Apostles had appointed bishops and deacons and arranged for others to succeed them. This is the earliest witness outside the New Testament to apostolic succession." },
      { entry: "ignatius", why: "St. Ignatius says: \"Where the bishop appears, there let the people be, just as where Jesus Christ is, there is the Catholic Church.\" He also calls the Eucharist \"the flesh of our Savior Jesus Christ.\"" },
      { entry: "polycarp", why: "A living link: taught by St. John, he in turn taught St. Irenaeus. His letter is full of Scripture and calls the faithful to stay with the faith handed down." },
      { entry: "irenaeus", why: "Not an Apostolic Father himself, but their direct heir. He shows why their witness matters: the true faith is the one publicly handed down from the Apostles through the bishops in every church." }
    ] },

  /* -------------------------------------------------------------------
     3. THE HOLY TRINITY AND THE NICENE CREED
     ------------------------------------------------------------------- */
  { id: "trinity", title: "The Holy Trinity and the Nicene Creed", group: "history", level: "Beginner", minutes: 25, startHere: true,
    description: "How the Church came to confess one God in three Persons, in the Creed Orthodox Christians say at every Liturgy.",
    steps: [
      { entry: "john", why: "\"In the beginning was the Word, and the Word was with God, and the Word was God.\" St. John's Gospel is where the Church's faith in the Trinity is most clearly revealed: the Father, the Son who is one with Him, and the Spirit who proceeds from the Father (John 15:26)." },
      { entry: "gregory-wonderworker", why: "Long before Nicaea, his short confession of faith already spoke of \"a perfect Trinity\" in glory and eternity, \"neither divided nor estranged.\" It shaped the faith of the Cappadocian Fathers' family." },
      { entry: "arius", why: "The crisis: was the Son truly God, or only the greatest creature? The answer decides whether Christ can really save us." },
      { entry: "athanasius", why: "St. Athanasius gives the key argument: only God can make us partakers of God. If the Son were a creature, we would not be saved. He defends this for fifty years and five exiles." },
      { entry: "nicaea1", why: "The Council confesses the Son \"of one essence with the Father\" and writes the first part of the Creed." },
      { entry: "basil", why: "After Nicaea the question became: is the Holy Spirit also God? St. Basil's \"On the Holy Spirit\" shows from Scripture and the Church's worship that the Spirit is glorified together with the Father and the Son." },
      { entry: "gregory-theologian", why: "His Theological Orations give the Church's clearest words on the Trinity: one God, three Persons, distinguished only by their relations. The Father is unbegotten, the Son is begotten, the Spirit proceeds." },
      { entry: "gregory-nyssa", why: "He explains why three Persons are not three gods: they share one nature and one will and act inseparably, with every act of God coming from the Father, through the Son, in the Spirit." },
      { entry: "constantinople1", why: "The Second Council completes the Creed, confessing the Holy Spirit as \"the Lord, the Giver of Life, who proceeds from the Father, who with the Father and the Son is worshipped and glorified.\"" },
      { title: "The Creed, line by line",
        text: [
          "The Nicene-Constantinopolitan Creed (381) is said or sung at every Divine Liturgy and at baptism. In brief:",
          "\"I believe in one God, the Father Almighty, Maker of heaven and earth, and of all things visible and invisible.\" The Father is the one source of the Godhead.",
          "\"And in one Lord Jesus Christ, the Son of God, the Only-begotten, begotten of the Father before all ages; Light of Light, true God of true God, begotten, not made, of one essence with the Father, by whom all things were made.\" This is Nicaea's answer to Arius.",
          "\"Who for us and for our salvation came down from heaven, and was incarnate of the Holy Spirit and the Virgin Mary, and became man; and was crucified for us under Pontius Pilate, and suffered and was buried; and arose on the third day according to the Scriptures…\"",
          "\"And in the Holy Spirit, the Lord, the Giver of Life, who proceeds from the Father, who with the Father and the Son together is worshipped and glorified, who spoke by the prophets.\" This is Constantinople's answer to those who denied the Spirit's divinity.",
          "\"In one Holy, Catholic and Apostolic Church. I confess one baptism for the remission of sins. I look for the resurrection of the dead, and the life of the age to come. Amen.\""
        ],
        related: ["nicaea1", "constantinople1", "ephesus"],
        links: [{ label: "Read the Creed of 381", needed: true }] },
      { entry: "filioque", why: "Centuries later the West added \"and the Son\" to the line about the Holy Spirit. For the Orthodox this changes the Creed the whole Church agreed on, and the teaching on the Trinity it protects." }
    ] },

  /* -------------------------------------------------------------------
     4. WHO IS CHRIST?
     ------------------------------------------------------------------- */
  { id: "christ", title: "Who Is Christ? The Christological Councils", group: "history", level: "Intermediate", minutes: 30,
    description: "Fully God and fully man in one Person: how five councils guarded the truth about Jesus.",
    steps: [
      { entry: "john", why: "\"The Word became flesh and dwelt among us\" (John 1:14). Every later question about Christ is an attempt to say this faithfully: the eternal Son really became a real human being." },
      { entry: "ignatius", why: "Against those who said Christ only seemed to have a body, St. Ignatius insists that He \"truly\" was born, ate, suffered, died and rose. If His flesh is not real, neither is our salvation." },
      { entry: "irenaeus", why: "St. Irenaeus explains why the Incarnation matters: \"He became what we are, so that He might bring us to be what He is.\" Christ, the new Adam, passes through every stage of human life to heal it." },
      { entry: "gregory-theologian", why: "His rule became the key for all later debates: \"What has not been assumed has not been healed.\" If Christ lacked a human mind or will, our mind and will would not be saved." },
      { entry: "ephesus", why: "Nestorius divided Christ into God and a man joined together. The Council answers: there is one Christ, the eternal Son Himself, so Mary is truly Theotokos, the Mother of God." },
      { entry: "cyril-alexandria", why: "St. Cyril's teaching is the measure of Orthodox belief about Christ: the same One who is begotten eternally of the Father was born in time of the Virgin." },
      { entry: "leo", why: "From Rome, St. Leo's Tome taught that each nature in Christ does what belongs to it, while both belong to one Person. The council received it after checking it against St. Cyril." },
      { entry: "chalcedon", why: "The classic definition: one Person in two natures, \"without confusion, without change, without division, without separation.\"" },
      { entry: "constantinople2", why: "It made sure \"two natures\" is never read as two persons: \"One of the Holy Trinity suffered in the flesh.\"" },
      { entry: "maximus", why: "If Christ is fully human, He has a human will. St. Maximus gave his tongue and hand for this truth. In Gethsemane, Christ's human will freely says yes to the Father, and so our wills can be healed." },
      { entry: "constantinople3", why: "The Sixth Council confirms St. Maximus: two wills and two energies in Christ, in perfect harmony." },
      { entry: "damascene", why: "St. John of Damascus gathers this whole teaching into one clear summary, and draws the next conclusion: because God became visible, He can be pictured in icons." }
    ] },

  /* -------------------------------------------------------------------
     5. ICONOCLASM AND THE TRIUMPH OF ORTHODOXY
     ------------------------------------------------------------------- */
  { id: "icons", title: "The Iconoclast Controversy and the Triumph of Orthodoxy", group: "history", level: "Beginner", minutes: 20,
    description: "Why Orthodox churches are full of icons, and the long struggle that kept them there.",
    steps: [
      { entry: "exodus", why: "The same book that forbids idols (20:4) also commands golden cherubim over the Ark and woven into the Tabernacle's curtains (25:18; 26:1). So the commandment cannot mean that every sacred image is forbidden." },
      { entry: "colossians", why: "Christ is \"the image (icon) of the invisible God\" (1:15). In Him the God no one has seen became visible. This is the foundation of every icon." },
      { title: "What is an icon?",
        text: [
          "An icon is a holy image of Christ, the Theotokos, the angels, the saints or a feast, painted (Orthodox say \"written\") according to the Church's tradition.",
          "Icons are not decorations or realistic portraits. They show their subjects transfigured by God's grace. Gold backgrounds stand for the light of God's Kingdom, and the reversed perspective draws the viewer into the scene.",
          "Orthodox Christians venerate icons: they bow, light candles, and kiss them, as you might kiss a photo of someone you love. This honor is not worship. Worship (latreia) belongs to God alone. As St. Basil said, the honor given to the image passes to the person it shows."
        ],
        related: ["iconoclasm", "nicaea2"] },
      { entry: "iconoclasm", why: "Emperors order icons destroyed, and monks and lay people who resist are tortured and exiled. Here you can read the iconoclast case and the Orthodox answer side by side." },
      { entry: "damascene", why: "From outside the emperor's reach, St. John writes the great defense of icons: \"I do not worship matter; I worship the Creator of matter, who became matter for my sake.\"" },
      { entry: "nicaea2", why: "The Seventh Ecumenical Council restores the icons and explains the difference between veneration and worship." },
      { entry: "theodore-studite", why: "When iconoclasm returns in 815, St. Theodore and his monks lead the resistance, and even process through the city carrying icons." },
      { entry: "triumph", why: "In 843 the icons are restored for good. Each year, on the first Sunday of Lent, Orthodox churches celebrate this \"Triumph of Orthodoxy\" with a procession of icons." }
    ] },

  /* -------------------------------------------------------------------
     6. MONASTICISM AND THE DESERT FATHERS
     ------------------------------------------------------------------- */
  { id: "monasticism", title: "Monasticism and the Desert Fathers", group: "history", level: "Beginner", minutes: 25,
    description: "Why men and women left everything for the desert, and how their wisdom still guides every Orthodox Christian.",
    steps: [
      { title: "Why monks and nuns?",
        text: [
          "Christ told the rich young man: \"If you would be perfect, go, sell what you have and give to the poor… and come, follow Me\" (Matthew 19:21). Some Christians in every age have taken this literally.",
          "Monastics give up marriage, property and their own will, through vows of chastity, poverty and obedience, in order to give their whole lives to prayer and repentance. They follow the example of the prophet Elijah and St. John the Baptist, who lived in the wilderness.",
          "Monasticism is not a separate, higher Christianity. Orthodox monks and nuns live the same Gospel all Christians are called to, only more intensely. Lay people have always visited monasteries for advice, and much of Orthodox prayer, fasting and hymnography comes from them."
        ],
        related: ["antony", "desert-sayings", "athos"] },
      { entry: "antony", why: "St. Antony hears the Gospel about selling everything, does exactly that, and goes into the Egyptian desert. Thousands follow. He is called the father of monks." },
      { entry: "athanasius", why: "St. Athanasius knew Antony and wrote his Life. It became a bestseller across the Christian world and inspired countless conversions, including, indirectly, St. Augustine's." },
      { entry: "desert-sayings", why: "These short sayings are the heart of desert wisdom. A taste: \"Go, sit in your cell, and your cell will teach you everything.\"" },
      { entry: "basil", why: "St. Basil organizes monasteries as communities serving the Church: shared prayer, work and care for the poor and sick. His Rules still guide Orthodox monasteries." },
      { entry: "cassian", why: "St. John Cassian carries what he learned from the Egyptian monks to the West. Through him, desert wisdom also shapes Western monasticism." },
      { entry: "climacus", why: "From Mount Sinai, \"The Ladder\" describes thirty steps of the spiritual life. It is read in Orthodox monasteries every Lent, and many lay people read it too." },
      { entry: "theodore-studite", why: "His Studion monastery in Constantinople became the model for community life that spread to Mount Athos and Russia." },
      { entry: "athos", why: "The Holy Mountain becomes the heart of Orthodox monasticism. It has been a place of unbroken prayer for over a thousand years." },
      { entry: "symeon", why: "A monk and abbot who insisted that the life of prayer leads to a real, conscious experience of God, for every Christian willing to repent." },
      { entry: "philokalia", why: "The Philokalia gathers the wisdom of the monks on prayer and watchfulness, and brings it to lay people as well." },
      { entry: "seraphim", why: "St. Seraphim, a hermit who became an elder sought out by thousands, shows that the desert tradition was alive and well in modern Russia." },
      { entry: "alaska", why: "Monks also became missionaries. St. Herman of Alaska, a simple monk from Valaam, brought Orthodoxy to North America." }
    ] },

  /* -------------------------------------------------------------------
     7. PRAYER, HESYCHASM, AND ST. GREGORY PALAMAS
     ------------------------------------------------------------------- */
  { id: "prayer", title: "Prayer, Hesychasm, and St. Gregory Palamas", group: "history", level: "Intermediate", minutes: 30,
    description: "The Jesus Prayer, the quiet of the heart, and the vision of God's uncreated light.",
    steps: [
      { entry: "psalms", why: "The Psalms are the Church's first school of prayer. Orthodox Christians pray them daily and read the whole Psalter every week in monasteries." },
      { entry: "1thessalonians", why: "\"Pray without ceasing\" (5:17). Orthodox prayer takes this literally. How can anyone pray all the time? The rest of this path is the Church's answer." },
      { title: "The Jesus Prayer",
        text: [
          "\"Lord Jesus Christ, Son of God, have mercy on me, a sinner.\"",
          "This short prayer joins the blind man's cry (\"Jesus, Son of David, have mercy on me,\" Luke 18:38) and the tax collector's prayer (\"God, be merciful to me, a sinner,\" Luke 18:13). It confesses who Christ is and who we are.",
          "It is prayed slowly and attentively, often with a prayer rope, again and again, until it begins to pray itself in the heart. Its aim is not a technique or a feeling, but humble, constant remembrance of God.",
          "\"Hesychasm\" comes from the Greek hesychia, \"stillness.\" Hesychasts are those who seek inner stillness through this prayer. The Fathers warn that it should be practiced with guidance from a spiritual father or mother, within the life of the Church."
        ],
        related: ["desert-sayings", "climacus", "philokalia"],
        links: [{ label: "Read Luke 18", needed: true }] },
      { entry: "desert-sayings", why: "The desert monks practiced short, repeated prayers like \"Lord, have mercy\" as their constant work. The Jesus Prayer grows out of their experience." },
      { entry: "climacus", why: "\"Let the remembrance of Jesus be present with each breath.\" St. John's Ladder is one of the earliest texts to describe the Jesus Prayer and stillness." },
      { entry: "symeon", why: "St. Symeon describes being flooded with divine light in prayer, and insists this is not just for saints of the past but for anyone who truly repents." },
      { entry: "palamas", why: "When the hesychast monks of Athos were mocked for claiming to see the light of Tabor, St. Gregory Palamas defended them with Scripture and the Fathers." },
      { entry: "hesychast", why: "Three councils confirm that we truly share in God's uncreated energies, His very life and light, while His essence stays beyond our reach. This is how theosis is possible." },
      { entry: "cabasilas", why: "St. Nicholas Cabasilas, a layman, shows that the same life in Christ comes to everyone through baptism, chrismation and the Eucharist, not only to monks." },
      { entry: "philokalia", why: "The Philokalia gathers writings on the prayer of the heart from the 4th to the 15th century. Translated into Slavonic and Russian, it sparked a revival of the Jesus Prayer." },
      { entry: "seraphim", why: "\"Acquire a peaceful spirit, and thousands around you will be saved.\" St. Seraphim's own face reportedly shone with the uncreated light as he spoke with his disciple Motovilov." },
      { entry: "theophan", why: "St. Theophan explains the prayer of the heart simply for people living ordinary lives in the world. A good next step after this path." }
    ] },

  /* -------------------------------------------------------------------
     8. THE DIVINE LITURGY AND THE HOLY MYSTERIES
     ------------------------------------------------------------------- */
  { id: "liturgy", title: "The Divine Liturgy and the Sacraments (Holy Mysteries)", group: "history", level: "Beginner", minutes: 25, startHere: true,
    description: "What happens in Orthodox worship, where it comes from, and why the Eucharist is at the center of everything.",
    steps: [
      { title: "What are the Holy Mysteries?",
        text: [
          "Orthodox Christians call the sacraments \"Mysteries\" (in Greek, mysteria). In them God gives us His grace through visible, physical things: water, oil, bread and wine, the laying-on of hands.",
          "The Church usually counts seven: Baptism, Chrismation (anointing with the Holy Spirit, given right after baptism), the Holy Eucharist, Confession, Holy Orders (ordination), Marriage, and Holy Unction (anointing of the sick). But the Orthodox do not limit God's grace to seven: the blessing of water, monastic tonsure and the funeral are also sacred mysteries in a broader sense.",
          "The center of them all is the Eucharist. In the Divine Liturgy the bread and wine truly become the Body and Blood of Christ, and the Church becomes what it is: the Body of Christ."
        ],
        related: ["1corinthians", "john", "cyril-jerusalem"] },
      { entry: "1corinthians", why: "St. Paul hands on what he received: \"This is My Body… This is My Blood\" (11:23–26). Receiving unworthily is a serious matter (11:27–29), because it truly is the Lord's Body." },
      { entry: "john", why: "In John 6 Christ says: \"Unless you eat the flesh of the Son of Man and drink His blood, you have no life in you.\" Many disciples left over these words, but He did not soften them." },
      { entry: "didache", why: "One of the oldest descriptions of Christian worship: baptism in the name of the Trinity, fasting beforehand, and Eucharistic prayers of thanksgiving." },
      { entry: "justin", why: "St. Justin describes Sunday worship around AD 155: readings from the Apostles and Prophets, a sermon, prayers, bread and wine brought, a long thanksgiving prayer, the people's \"Amen,\" and Communion carried to the absent. It is recognizably the Liturgy." },
      { entry: "cyril-jerusalem", why: "His lectures to the newly baptized explain each mystery they just received. He tells them not to see it as plain bread and wine, because it is the Body and Blood of Christ." },
      { entry: "basil", why: "The Divine Liturgy of St. Basil, with its long, beautiful prayer of thanksgiving, is still served ten times a year, including on the Sundays of Lent." },
      { entry: "chrysostom", why: "The Liturgy served most Sundays bears his name. His homilies also tie the altar to the poor: \"Do you wish to honor the Body of Christ? Do not neglect Him when He is naked.\"" },
      { entry: "hagia-sophia", why: "The great church built for this worship. Its architecture, dome and light were designed to make the Liturgy feel like heaven on earth." },
      { entry: "rus", why: "The beauty of the Liturgy in Hagia Sophia led to the baptism of an entire people: \"We knew not whether we were in heaven or on earth.\"" },
      { entry: "maximus", why: "His \"Mystagogy\" explains the church building and the Liturgy as an image of the whole universe and of the soul being drawn into God." },
      { entry: "cabasilas", why: "His Commentary on the Divine Liturgy is still the classic guide to what each part of the service means." }
    ] },

  /* -------------------------------------------------------------------
     9. HOW WE GOT THE BIBLE
     ------------------------------------------------------------------- */
  { id: "bible", title: "How We Got the Bible: the Septuagint and the Canon", group: "history", level: "Beginner", minutes: 25, startHere: true,
    description: "Why Orthodox Bibles have more Old Testament books, and how the Church recognized which books are Scripture.",
    steps: [
      { entry: "septuagint", why: "The Greek translation made in Alexandria is the Old Testament of the Apostles and of the Orthodox Church to this day." },
      { entry: "sirach", why: "Its prologue, written by the author's grandson around 132 BC, describes translating Hebrew wisdom into Greek. It is a window into how the Septuagint came together." },
      { entry: "wisdom", why: "Written in Greek, so it was never in the Hebrew Bible. Yet its prophecy of the righteous one mocked and condemned (Wisdom 2:12–20) is echoed at the Cross (Matthew 27:43), and the Church reads it in Holy Week." },
      { entry: "2maccabees", why: "Hebrews 11:35 points to the martyrs of 2 Maccabees 7. It is also a key witness to prayer for the dead and hope in the resurrection before Christ." },
      { entry: "isaiah", why: "\"A virgin shall conceive\" is the Septuagint's wording, and it is exactly what St. Matthew quotes (Matthew 1:23). The New Testament writers usually quote the Greek Old Testament." },
      { title: "How the New Testament was gathered",
        text: [
          "The New Testament books were written between about AD 48 and 100, mostly letters and accounts passed from church to church and read aloud in worship next to the Old Testament.",
          "No single meeting \"voted\" the Bible into existence. The Church recognized, over time, which writings came from the Apostles and their close companions, agreed with the faith handed down, and were read in the churches everywhere.",
          "By the late 100s, St. Irenaeus already insists on exactly four Gospels. Some books, like Hebrews, James, 2 Peter and Revelation, were questioned in some places for a time. In 367 St. Athanasius lists exactly our 27 books, and later councils confirm the list."
        ],
        related: ["irenaeus", "athanasius", "carthage", "trullo"] },
      { entry: "irenaeus", why: "Against the Gnostics, who had their own secret gospels, St. Irenaeus defends the four Gospels the Church received from the Apostles, no more and no fewer." },
      { entry: "athanasius", why: "His 39th Festal Letter (367) is the earliest list of exactly the 27 New Testament books. He also names the Old Testament books and other books recommended for reading." },
      { entry: "carthage", why: "African councils listed the books to be read in church, including the longer Old Testament. The Council in Trullo later approved these canons for the whole Church." },
      { entry: "trullo", why: "Canon 2 confirms the earlier canons, including the lists of Scripture, as part of the Church's law. The Church settles its Bible by receiving it in common, not by one decree." },
      { entry: "revelation", why: "Accepted as Scripture, but in the East it was questioned longer than any other book and is still not read aloud in services. A good example of how carefully the Church recognized its canon." },
      { entry: "jerusalem-1672", why: "Answering the Reformers' shorter Bible, this synod names Tobit, Judith, Wisdom, Sirach and the Maccabees as genuine parts of Scripture." },
      { title: "Scripture within the Church",
        text: [
          "For the Orthodox, the Bible is the Church's book. The Church did not invent Scripture, but it did recognize it, guard it, and read it in its worship. The same Holy Spirit who inspired the writers guides the Church in understanding them.",
          "That is why Orthodox Christians read Scripture with the Fathers, the councils and the services of the Church as their guides, rather than alone."
        ],
        related: ["2thessalonians", "vincent"],
        links: [{ label: "Read 2 Thessalonians 2", needed: true }] }
    ] },

  /* -------------------------------------------------------------------
     10. THE FALL OF CONSTANTINOPLE AND ORTHODOXY AFTER BYZANTIUM
     ------------------------------------------------------------------- */
  { id: "after-byzantium", title: "The Fall of Constantinople and Orthodoxy after Byzantium", group: "history", level: "Intermediate", minutes: 30,
    description: "How the Orthodox Church survived the end of its empire, centuries of foreign rule, and the twentieth century.",
    steps: [
      { entry: "1204", why: "The beginning of the end. Crusaders sack the city, and the empire never fully recovers its strength." },
      { entry: "florence", why: "In desperation the emperor seeks a union with Rome in exchange for help. The people reject it, and help never really comes." },
      { entry: "mark-ephesus", why: "The one bishop who refused to sign. For the Orthodox he shows that faith cannot be traded for political survival." },
      { entry: "fall-1453", why: "On May 29, 1453 the Christian Roman Empire ends after more than eleven hundred years. Many Greeks still think of Tuesday as an unlucky day because of it." },
      { entry: "ottoman", why: "Under the Sultans, the Church becomes the guardian of its people's identity, language and faith. Many New Martyrs give their lives." },
      { entry: "council-1484", why: "Now under Ottoman rule, the patriarchs formally reject the Florentine union. The faith did not depend on the empire." },
      { entry: "moscow", why: "As the Greek East lives under the Turks, Russia grows into the largest Orthodox nation, with its own patriarch." },
      { entry: "council-1583", why: "The patriarchs reject the new Western calendar's Paschal reckoning, keeping one Pascha with the ancient Church." },
      { entry: "reformation", why: "The West splits again. Lutherans write to Constantinople hoping to find an ally, and the patriarch answers with the Fathers." },
      { entry: "jerusalem-1672", why: "A clear Orthodox statement of faith, written under Ottoman rule, answering both Calvinist and Roman Catholic pressure." },
      { entry: "philokalia", why: "A spiritual renewal begins on Mount Athos and spreads through Russia, Romania and the whole Orthodox world." },
      { entry: "alaska", why: "Orthodoxy reaches America, first through Alaska, then through immigrants from Greece, Russia, Serbia, the Middle East and beyond." },
      { entry: "phyletism-1872", why: "As new national churches form after Ottoman rule, the Church condemns dividing itself by ethnicity." },
      { entry: "russia-1917", why: "The twentieth century brought more martyrs than any before it. The Church survived seventy years of state atheism and was reborn." },
      { entry: "anathemas-lifted", why: "In 1965 the excommunications of 1054 are lifted. Relations with Rome warm, but the questions of faith remain open." }
    ] },

  /* ===================================================================
     COMPARISON PATHS: WHAT MAKES ORTHODOXY UNIQUE
     =================================================================== */

  /* -------------------------------------------------------------------
     11. ORTHODOXY AND ROMAN CATHOLICISM
     ------------------------------------------------------------------- */
  { id: "catholicism", title: "Orthodoxy and Roman Catholicism", group: "compare", level: "Deeper Study", minutes: 45,
    description: "The Great Schism and the questions that still divide East and West: the filioque, the papacy, purgatory, grace, and more.",
    steps: [
      { title: "Two sister churches",
        text: [
          "For the first thousand years, East and West were one Church, sharing the same Seven Ecumenical Councils, the same saints, and the same sacraments. The Orthodox and Roman Catholic Churches still have much in common: apostolic succession, the seven mysteries, the real presence of Christ in the Eucharist, devotion to the Theotokos and the saints, and prayer for the departed.",
          "That is exactly why the differences matter so much. Each side claims to be the continuation of that one undivided Church. This path walks through the main points of disagreement, stating the Roman Catholic view as Catholics themselves would put it, then the Orthodox answer."
        ],
        related: ["schism", "anathemas-lifted"] },
      { entry: "photian", why: "The first open clash over the filioque and papal authority, in the 860s. The council of 879–880, with papal legates present, confirmed the Creed without any addition. Rome later counted a different council instead." },
      { entry: "filioque", why: "The central doctrinal question: does the Holy Spirit proceed from the Father alone as His source, or from the Father and the Son? And may one church change the common Creed?" },
      { entry: "schism", why: "The break of 1054. Its card sets out the Catholic teaching on papal supremacy and the Orthodox answer from the Fathers and councils." },
      { entry: "constantinople3", why: "An Ecumenical Council condemned Pope Honorius as a heretic, and later popes accepted that judgment. The Orthodox see this as strong evidence against papal infallibility." },
      { title: "Unleavened bread (azymes)",
        text: [
          "In 1054 one of the loudest complaints was about the bread used in the Eucharist. Since about the 9th–11th centuries the Latin West has used unleavened bread (wafers), while the East has always used leavened bread."
        ],
        views: {
          otherLabel: "Roman Catholic view",
          other: "Christ instituted the Eucharist at a Passover meal (Matthew 26:17; Mark 14:12; Luke 22:7), when only unleavened bread was allowed, so the Latin Church follows His example. The Catholic Church holds that both leavened and unleavened bread are valid, and Eastern Catholic churches in union with Rome use leavened bread.",
          orthodox: "The Gospels call the bread artos, the ordinary word for (leavened) bread, not azyma, unleavened bread. St. John places the Last Supper before Passover began (John 18:28; 19:14), and the Church of Jerusalem always used leavened bread. The leaven was understood as a sign of the risen, living Christ, and unleavened bread as belonging to the Old Covenant that Christ fulfilled. Today most Orthodox theologians treat this as a serious difference of practice and symbolism, not the heart of the division."
        },
        related: ["schism"],
        links: [{ label: "Read John 18–19", needed: true }] },
      { entry: "1204", why: "The sack of Constantinople made the schism real for ordinary Orthodox people, and explains why later unions imposed from above failed." },
      { entry: "scholasticism", why: "Western theology develops its own framework, with \"created grace\" and the vision of God's essence. Here the Orthodox and Catholic understandings of grace part ways." },
      { entry: "hesychast", why: "The Orthodox answer on grace: we truly share in God's uncreated energies. Its card compares this with the Western view." },
      { entry: "lyon", why: "The first attempted reunion, signed by an emperor for political reasons and rejected by the Orthodox people and monks." },
      { entry: "florence", why: "The second attempted union. Its card compares the Catholic teaching on purgatory with the Orthodox understanding of prayer for the dead." },
      { entry: "mark-ephesus", why: "St. Mark argued against purgatorial fire and the filioque at the council itself, and refused to sign. The Orthodox honor him as a pillar of the faith." },
      { entry: "trent", why: "Rome's answer to the Reformation defines justification, purgatory and the sacraments for Catholics. The Orthodox agree with parts of it and differ on others." },
      { entry: "papal-dogmas", why: "The Immaculate Conception (1854) and papal infallibility (1870) were defined after the schism, by the authority of Rome alone. Its card explains why the Orthodox, who honor the Theotokos as all-holy, still do not accept the first, and why they reject the second." },
      { title: "Where things stand today",
        text: [
          "Since 1965, popes and patriarchs have met as brothers, prayed together, and set up a joint theological commission. Real progress has been made in understanding each other's history and language.",
          "But full communion, sharing one Eucharist, would require agreement in faith. For the Orthodox that means, above all, the Creed without the filioque and an understanding of the primacy of Rome that fits the Church of the first thousand years: a primacy of honor and service within the communion of bishops, not universal jurisdiction or infallibility apart from the Church.",
          "Orthodox Christians are called to speak the truth in love (Ephesians 4:15): to be clear about these differences, and to pray for unity in the truth."
        ],
        related: ["anathemas-lifted", "photian", "encyclical-1848"] }
    ] },

  /* -------------------------------------------------------------------
     12. ORTHODOXY AND PROTESTANTISM
     ------------------------------------------------------------------- */
  { id: "protestantism", title: "Orthodoxy and Protestantism", group: "compare", level: "Intermediate", minutes: 45,
    description: "Scripture and Tradition, faith and works, the sacraments, the saints, icons, and the Church.",
    steps: [
      { entry: "reformation", why: "Where the story begins. The Reformers protested real abuses in the medieval Western Church. Many of their questions are good ones, but the Orthodox answer them differently." },
      { title: "Scripture alone, or Scripture in Tradition?",
        text: [
          "This is the root question, because every other difference follows from how we decide what is true."
        ],
        views: {
          otherLabel: "Protestant view (Sola Scriptura)",
          other: "Scripture alone is the only infallible rule of faith and practice. The creeds, councils and early writers can be valuable and are often respected, but they are human and can err, so they must be tested by Scripture. Scripture is clear enough on what is necessary for salvation that any believer, with the Spirit's help, can understand it. Most classical Protestants affirm the early creeds because they believe those creeds faithfully summarize Scripture.",
          orthodox: "Orthodox Christians love and read Scripture as the written heart of Holy Tradition, God's inspired word. But St. Paul tells us to hold to the traditions taught \"whether by word or by letter\" (2 Thessalonians 2:15), and calls the Church, not the Bible, \"the pillar and ground of the truth\" (1 Timothy 3:15). The Church existed before the New Testament was written, and it was the Church that recognized which books belong in it. Scripture can be read many ways: Arius quoted Scripture too. St. Irenaeus and St. Vincent of Lérins teach that we read it rightly with the faith handed down from the Apostles in the Church, \"what has been believed everywhere, always and by all.\" St. Basil speaks of unwritten traditions, like the sign of the Cross and facing east in prayer, received from the Apostles."
        },
        related: ["2thessalonians", "1timothy", "irenaeus", "vincent", "basil"] },
      { title: "Faith and works",
        text: [
          "How are we saved? Both Orthodox and Protestants say: by God's grace, through Christ alone. The difference is in what salvation is and how we receive it."
        ],
        views: {
          otherLabel: "Protestant view (Sola Fide)",
          other: "Justification is God's legal declaration that a sinner is righteous. It rests entirely on Christ's righteousness, credited (imputed) to the believer, and is received through faith alone, not by any works. Good works necessarily follow as the fruit and evidence of true faith, but they add nothing to our justification. As the saying goes: \"We are saved by faith alone, but the faith that saves is never alone.\"",
          orthodox: "The only place Scripture says \"faith alone\" is to deny it: \"a man is justified by works, and not by faith alone\" (James 2:24). For the Orthodox, salvation is not mainly a legal verdict but a living union with Christ that heals and transforms us: becoming \"partakers of the divine nature\" (2 Peter 1:4). Grace is entirely God's gift; we cannot earn it. But we must freely receive it and cooperate with it: \"work out your own salvation with fear and trembling, for it is God who works in you\" (Philippians 2:12–13). Faith and works are not two competing causes, but faith \"working through love\" (Galatians 5:6). St. Paul's warnings against \"works of the law\" (Galatians, Romans) refer to the Jewish Law as a way to be right with God, not to the good works of love that grace produces in us."
        },
        related: ["james", "romans", "galatians", "jerusalem-1672"] },
      { title: "The sacraments",
        text: [
          "Protestants differ widely here, so it helps to name the main families."
        ],
        views: {
          others: [
            { label: "Lutheran view", text: "Baptism truly regenerates, and Christ's Body and Blood are truly present \"in, with and under\" the bread and wine. Lutherans generally count two sacraments instituted by Christ (Baptism and the Lord's Supper), sometimes also Confession." },
            { label: "Reformed view", text: "The sacraments are signs and seals of God's promises. In the Lord's Supper believers truly feed on Christ spiritually, by the power of the Holy Spirit, but His body is in heaven, not in the bread." },
            { label: "Baptist and many evangelical views", text: "Baptism and the Lord's Supper are \"ordinances\": acts of obedience and remembrance. Baptism is for those old enough to profess faith, and the Supper is a memorial of Christ's death." }
          ],
          orthodox: "Christ said \"This is My Body\" and \"unless you eat the flesh of the Son of Man… you have no life in you\" (John 6:53). Baptism \"now saves you\" (1 Peter 3:21) and is being \"born of water and the Spirit\" (John 3:5). The early Church believed this plainly: St. Ignatius (c. 107), St. Justin (c. 155) and St. Cyril of Jerusalem all speak of the Eucharist as truly Christ's Body and Blood, and baptize infants as well as adults. God, who became flesh, saves us through matter. Water, oil, bread and wine become means of real union with Christ."
        },
        related: ["john", "1corinthians", "ignatius", "justin", "cyril-jerusalem"] },
      { title: "The Theotokos and the saints",
        text: [
          "Visitors to an Orthodox church notice icons of the saints everywhere and hymns to the Virgin Mary. Many Protestants are worried that this takes honor away from Christ."
        ],
        views: {
          otherLabel: "Protestant view",
          other: "Protestants honor Mary as the mother of the Lord and a model of faith; Luther and Calvin themselves held her in high regard. But they reject asking saints for their prayers, because there is \"one mediator between God and men, the man Christ Jesus\" (1 Timothy 2:5), and Scripture gives no command to address the departed. They worry that devotion to Mary and the saints can distract from Christ.",
          orthodox: "Christ is the one Mediator. But Christians ask one another for prayers all the time (James 5:16), and those who have died in Christ are not dead: God \"is not the God of the dead but of the living\" (Luke 20:38). The saints surround us as \"a great cloud of witnesses\" (Hebrews 12:1) and offer prayers before God's throne (Revelation 5:8). Mary is honored because of who her Son is: the Third Ecumenical Council called her Theotokos to protect the truth that Christ is God. She herself said \"all generations will call me blessed\" (Luke 1:48). Every Orthodox prayer to the saints rests on Christ's victory over death."
        },
        related: ["luke", "ephesus", "hebrews", "revelation"] },
      { entry: "iconoclasm", why: "Many Protestant churches, especially Reformed ones, rejected images in worship, for reasons close to those of the Byzantine iconoclasts. The card sets out both sides." },
      { title: "Apostolic succession",
        text: [
          "Who has authority to teach and to celebrate the sacraments?"
        ],
        views: {
          otherLabel: "Protestant view",
          other: "What matters most is succession in apostolic teaching: a church is apostolic if it teaches what the Apostles taught in Scripture. Church structures vary: some churches have bishops, others elders or congregational government. Some (Anglicans and some Lutherans) keep a line of bishops, but most Protestants do not see it as necessary for a true church.",
          orthodox: "Apostolic teaching and apostolic succession go together and protect each other. The Apostles appointed bishops and told them to appoint others (Acts 14:23; 2 Timothy 2:2; Titus 1:5). St. Clement of Rome (c. 96) says this directly. St. Irenaeus (c. 180) answers the heretics by pointing to the list of bishops in each church going back to the Apostles, who all publicly teach the same faith. Through this unbroken laying-on of hands, the Church's sacraments and teaching are passed on as one living whole."
        },
        related: ["clement-rome", "ignatius", "irenaeus", "titus"] },
      { title: "What is the Church?",
        text: [
          "Behind all these questions is one more: what and where is the Church Christ founded?"
        ],
        views: {
          otherLabel: "Protestant view",
          other: "The true Church is the invisible fellowship of all true believers in every time and place, known fully only to God. It becomes visible wherever the Word of God is rightly preached and the sacraments are rightly administered. No single visible church organization can claim to be the one true Church.",
          orthodox: "The Creed confesses \"one, holy, catholic and apostolic Church.\" It is the visible Body of Christ (Ephesians 1:22–23), with real bishops, real sacraments and a real common life, as the Apostolic Fathers show. The Orthodox believe that this Church has continued without a break in the Orthodox communion. This is not a claim that Orthodox Christians are better than others: we know where the Church is, but we do not judge where it is not. God's grace is not limited, and many Christians outside the Orthodox Church love Christ deeply."
        },
        related: ["1timothy", "ephesians", "cyprian", "ignatius"] },
      { entry: "jerusalem-1672", why: "The Orthodox Church's most direct official reply to the Reformation, on Scripture, grace, faith and works, and the sacraments." }
    ] },

  /* -------------------------------------------------------------------
     13. ORTHODOXY AND CALVINISM
     ------------------------------------------------------------------- */
  { id: "calvinism", title: "Orthodoxy and Calvinism", group: "compare", level: "Deeper Study", minutes: 40,
    description: "Predestination, free will, grace, the image of God, ancestral sin, and the meaning of the Cross.",
    steps: [
      { entry: "calvin", why: "Calvin's Institutes founded the Reformed tradition, which shapes Presbyterian, Reformed and many evangelical churches today." },
      { title: "The image of God",
        text: [
          "God made humanity \"in our image, after our likeness\" (Genesis 1:26). Many Fathers distinguished the two: the image is the gift we all have (reason, freedom, the capacity for God), and the likeness is the goal, becoming like God through grace and growth in virtue."
        ],
        views: {
          otherLabel: "Reformed view",
          other: "Humans were created good, in God's image, which included true knowledge, righteousness and holiness. In the Fall, that image was not erased (humans remain human and responsible), but it was deeply corrupted in every part.",
          orthodox: "The image of God in us was darkened and wounded by the Fall, but never destroyed. Every human being, even the worst sinner, still bears God's image and the freedom to turn toward Him. St. Athanasius describes the Incarnation as the Artist coming to restore a portrait that has been damaged, not to paint a new one. Christ, the true Image of the Father (Colossians 1:15), came to restore the image and open the way to the likeness."
        },
        related: ["genesis", "irenaeus", "athanasius"],
        links: [{ label: "Read Genesis 1", needed: true }] },
      { title: "Ancestral sin or original guilt?",
        text: [
          "What did we inherit from Adam? This question, which goes back to St. Augustine in the West, is the root of many later differences."
        ],
        views: {
          otherLabel: "Reformed view (following Augustine)",
          other: "Adam acted as the head and representative of the whole human race. When he sinned, all humanity sinned in him (Romans 5:12–19), so every person inherits both the guilt of Adam's sin and a corrupted nature. Even infants are therefore guilty before God apart from Christ.",
          orthodox: "From Adam we inherit death, corruption, and a nature inclined to sin, but not Adam's personal guilt. \"The son shall not bear the guilt of the father\" (Ezekiel 18:20). We become guilty by our own sins, which all of us commit. Romans 5:12 in Greek says death spread to all \"because all sinned.\" Augustine read a Latin translation that said \"in whom [Adam] all sinned,\" and much Western theology followed that reading. Orthodox baptize infants not to remove inherited guilt, but to unite them to Christ and give them new life."
        },
        related: ["genesis", "romans", "augustine"],
        links: [{ label: "Read Romans 5", needed: true }, { label: "Read Ezekiel 18", needed: true }] },
      { title: "Total depravity",
        text: [
          "How badly did the Fall damage us?"
        ],
        views: {
          otherLabel: "Reformed view",
          other: "Total depravity does not mean people are as evil as possible. It means sin has affected every part of human nature (mind, will and desires), so that no one, left to themselves, can truly love God or choose to turn to Him. Only God's regenerating grace can make a person able to believe (Ephesians 2:1; Romans 3:10–12).",
          orthodox: "The Orthodox agree that we cannot save ourselves and that every part of us needs healing. Without grace we can do nothing (John 15:5). But the Fall wounded our freedom without destroying it. Scripture shows people responding to God, like the pagan Cornelius, whose prayers and alms \"ascended as a memorial before God\" (Acts 10:4), and Gentiles who \"by nature do what the law requires\" (Romans 2:14). \"Dead in sins\" (Ephesians 2:1) describes our separation from God's life, not a total loss of the ability to hear Him call."
        },
        related: ["romans", "ephesians"] },
      { title: "Grace and free will",
        text: [
          "Is God's grace irresistible?"
        ],
        views: {
          otherLabel: "Reformed view (irresistible grace)",
          other: "When God sets out to save one of His elect, His Spirit renews the heart so that the person freely and willingly comes to faith. This grace is \"effectual\": it does not fail. Salvation is entirely God's work (monergism), so no one can boast.",
          orthodox: "Grace always comes first and does everything good in us, yet it never forces. \"Behold, I stand at the door and knock; if anyone hears My voice and opens the door, I will come in\" (Revelation 3:20). \"How often would I have gathered your children… and you were not willing!\" (Matthew 23:37). The Fathers call this synergy: \"we are God's fellow workers\" (1 Corinthians 3:9). St. John Cassian taught that God's grace and our will work together; St. Maximus taught that our will is truly healed precisely because Christ had a fully human will that freely obeyed. Love that is forced is not love."
        },
        related: ["cassian", "maximus", "constantinople3"] },
      { title: "Predestination",
        text: [
          "Did God choose before creation who would be saved and who would be lost?"
        ],
        views: {
          otherLabel: "Reformed view",
          other: "Before creation, out of pure grace and for His own glory, God chose some people for salvation, not because of any faith or goodness He foresaw in them (Ephesians 1:4–5; Romans 9). Calvin taught that God also decreed to pass over others, who are justly condemned for their own sins (\"double predestination\"). Calvinists see this as the strongest comfort for believers: salvation rests on God, not on us.",
          orthodox: "God \"desires all people to be saved and to come to the knowledge of the truth\" (1 Timothy 2:4). \"Those whom He foreknew He also predestined\" (Romans 8:29): predestination follows God's foreknowledge. St. John of Damascus explains that God knows everything in advance, but does not cause everything: He foreknows our free choices without forcing them. St. John Chrysostom, preaching on Romans 9, says Pharaoh was hardened by his own choices, and that no one is lost except by refusing God's mercy. Hell was \"prepared for the devil and his angels\" (Matthew 25:41), not for human beings."
        },
        related: ["chrysostom", "damascene", "romans"],
        links: [{ label: "Read Romans 8–9", needed: true }, { label: "St. Chrysostom's Homilies on Romans", needed: true }] },
      { entry: "anselm", why: "The Western way of explaining the Cross as satisfaction of God's justice begins here. Its card compares it with the Fathers' understanding of the Cross as victory over death." },
      { title: "For whom did Christ die?",
        text: [
          "The Reformed doctrine of \"limited\" or \"particular\" atonement asks what the Cross was meant to accomplish."
        ],
        views: {
          otherLabel: "Reformed view (particular atonement)",
          other: "Christ's death is of infinite worth and sufficient for everyone, and the gospel should be offered to all. But God intended it to actually secure the salvation of the elect: Christ laid down His life \"for the sheep\" (John 10:11). If Christ paid for the sins of all, everyone would be saved, so His saving work must be aimed at those the Father gave Him.",
          orthodox: "Christ \"is the propitiation for our sins, and not for ours only but also for the sins of the whole world\" (1 John 2:2). \"He died for all\" (2 Corinthians 5:15) and \"gave Himself as a ransom for all\" (1 Timothy 2:6). In becoming man, the Word took on human nature itself, and by His death and Resurrection healed it from within: \"as in Adam all die, so in Christ shall all be made alive\" (1 Corinthians 15:22). Everyone will rise. Whether that risen life is joy or torment depends on whether we freely accept His love. As St. John Chrysostom's Paschal homily proclaims, the feast is ready for all, \"let no one go away hungry.\""
        },
        related: ["athanasius", "gregory-theologian", "chrysostom"] },
      { entry: "dort", why: "The Synod of Dort gathered the Reformed teaching into its classic five points. Its card compares them with the Orthodox view." },
      { entry: "lucaris", why: "Calvinism reached the Orthodox East itself, through a confession published under a patriarch's name. The Church's reaction was decisive." },
      { entry: "jerusalem-1672", why: "The Orthodox Church's official reply to Calvinism, point by point, on predestination, grace and free will, Scripture, and the sacraments." }
    ] },

  /* -------------------------------------------------------------------
     14. THEOSIS
     ------------------------------------------------------------------- */
  { id: "theosis", title: "Theosis: Salvation as Union with God", group: "compare", level: "Intermediate", minutes: 35,
    description: "The Orthodox understanding of salvation as becoming like God, compared with Western views of justification.",
    steps: [
      { title: "What is theosis?",
        text: [
          "\"Theosis\" (or deification) is the Orthodox word for salvation in its fullness: being united with God and transformed by His grace, so that we share in His life, holiness and immortality.",
          "We never become God by nature. The Creator and creature remain distinct forever. But by grace we become what God is by nature, the way iron placed in a fire glows with the fire's heat and light while remaining iron.",
          "Theosis is not a special experience for mystics only. It is what every Christian life is for: baptism begins it, the Eucharist feeds it, repentance and love carry it forward, and it continues forever in the age to come."
        ],
        related: ["2peter", "athanasius", "palamas"] },
      { entry: "genesis", why: "We were made \"in the image and likeness\" of God (1:26). Many Fathers saw the likeness as the goal: humanity was created to grow into ever deeper communion with God." },
      { title: "\"You are gods\"",
        text: [
          "\"I said, 'You are gods, sons of the Most High, all of you'\" (Psalm 82:6; Psalm 81 in Orthodox numbering). Christ Himself quotes this verse (John 10:34–35), calling those \"to whom the word of God came\" gods.",
          "The Fathers did not read this as making humans into rival gods. They read it as a promise of what God's grace can make of those who receive His Word."
        ],
        related: ["psalms", "john"],
        links: [{ label: "Read Psalm 82 (Orthodox Psalm 81)", needed: true }, { label: "Read John 10", needed: true }] },
      { entry: "john", why: "Christ prays that His disciples may be one \"as You, Father, are in Me, and I in You, that they also may be in Us\" (17:21), and gives them \"the glory You have given Me\" (17:22)." },
      { entry: "2peter", why: "The key verse: we \"become partakers of the divine nature\" (1:4). This is the plainest statement of theosis in Scripture." },
      { entry: "irenaeus", why: "\"The Word of God… became what we are, so that He might bring us to be what He is.\" The earliest clear statement of the great exchange." },
      { entry: "athanasius", why: "\"God became man so that man might become god.\" St. Athanasius made this the heart of his defense of Nicaea: only if Christ is truly God can we be deified in Him." },
      { entry: "gregory-nyssa", why: "Theosis never ends. Because God is infinite, the soul goes \"from glory to glory\" (2 Corinthians 3:18), always growing, never bored, forever." },
      { entry: "maximus", why: "St. Maximus says God became man so that man might become god \"by grace,\" sharing everything God is \"except identity of essence.\" The whole universe is called into this union through humanity." },
      { entry: "symeon", why: "Theosis is not only a doctrine to learn but a reality to experience, beginning now, through repentance, prayer and the mysteries." },
      { entry: "palamas", why: "St. Gregory explains how theosis can be real without erasing the difference between God and creature: we share in God's uncreated energies, not His essence." },
      { entry: "hesychast", why: "The councils of the 1300s made this teaching the official faith of the Church." },
      { title: "How the West talks about salvation: justification",
        text: [
          "Western Christians usually describe salvation with the word \"justification,\" being made or declared right with God. The Orthodox also use this biblical word, but read it within union with God."
        ],
        views: {
          others: [
            { label: "Roman Catholic view", text: "Justification is both the forgiveness of sins and the inner sanctification and renewal of the person, through grace infused by the Holy Spirit, beginning in baptism. This grace can grow through good works done in grace and the sacraments, and it is completed in heaven with the vision of God. (Council of Trent; Catechism 1987–2029)." },
            { label: "Protestant view", text: "Justification is God's once-for-all legal declaration that the believer is righteous because Christ's perfect righteousness is credited to them, received through faith alone. Sanctification, growth in holiness, follows and is necessary, but is a distinct work. The believer has assurance of salvation because it rests on Christ's finished work, not on their progress." }
          ],
          orthodox: "The Orthodox do not deny forgiveness, God's free grace, or that Christ's work is finished. But they do not separate being declared righteous from being made righteous, or make the law court the main picture of salvation. Salvation is a healing, a new birth, and an adoption into God's family: \"if anyone is in Christ, he is a new creation\" (2 Corinthians 5:17). Justification is the beginning of a life of communion with God that grows forever. It is not measured in merits or credited from a treasury. The goal is not only to be acquitted, but to become \"partakers of the divine nature.\""
        },
        related: ["trent", "reformation", "scholasticism"] },
      { entry: "trent", why: "The Catholic definition of justification, which is close to the Orthodox in seeing real inner change, but framed in the Western language of merit and created grace." },
      { title: "Why theosis matters",
        text: [
          "Theosis ties the whole faith together. The Trinity matters because we are invited into the life of the Father, Son and Holy Spirit. The councils on Christ matter because only if He is fully God and fully man can God and humanity be united in Him. Icons matter because they show matter and people transfigured by grace. The Liturgy and the mysteries matter because they are where this union happens.",
          "\"The glory of God is a human being fully alive\" (St. Irenaeus). That is what salvation looks like for the Orthodox: not just escaping punishment, but becoming fully alive in God."
        ],
        related: ["constantinople1", "chalcedon", "nicaea2", "cabasilas"] }
    ] }
];
