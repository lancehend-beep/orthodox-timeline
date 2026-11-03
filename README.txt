THE ORTHODOX TIMELINE
=====================

A visual timeline of Christian history from an Eastern Orthodox perspective.
It is plain HTML, CSS and JavaScript. There is nothing to install.


WHAT IS IN THIS FOLDER
----------------------
  index.html   The page itself. Open this one.
  style.css    Colors, fonts and layout.
  script.js    Makes the page interactive (both timeline views, filters,
               search, cards, study paths).
  data.js      The timeline content: Bible books, Fathers, councils, synods, events.
  paths.js     The Study Paths (guided walks through one topic).
  README.txt   This file.

Keep all six files together in the same folder.


HOW TO OPEN IT
--------------
1. Download the whole "orthodox-timeline" folder to your computer
   (for example, to your Desktop or Documents).
2. Double-click  index.html
   It opens in your web browser (Chrome, Edge, Safari or Firefox).
   No internet setup is needed, though the fancy fonts and the reading
   links need an internet connection.

   If double-clicking opens it in a text editor instead:
     - Windows: right-click index.html > Open with > Chrome (or Edge).
     - Mac: right-click (or Control-click) index.html > Open With > Safari.

To see changes you make, save the file and press Refresh in the browser
(F5 on Windows, Cmd+R on Mac).


HOW TO ADD A NEW ENTRY
----------------------
1. Open data.js in a plain text editor.
   Good free choices: Visual Studio Code (code.visualstudio.com),
   Notepad on Windows, or TextEdit on Mac (choose Format > Make Plain Text).
2. Find the right section: BIBLE, FATHERS, COUNCILS, SYNODS or EVENTS.
3. Copy an existing entry, from its opening {  to its closing  },
   including the comma right after it, and paste it below.
4. Change the text. The important parts:
     id:      a unique short name, lowercase, no spaces   e.g. "nektarios"
     name:    the name people see
     year:    a number used only to place it in order
              (negative for BC: -700 means 700 BC)
     date:    the date text people read, e.g. "c. 700 BC"
5. Save, then refresh the browser.

Example: adding St. Nektarios of Aegina to the FATHERS list:

  { id: "nektarios", type: "father", name: "St. Nektarios of Aegina", year: 1900,
    life: "1846 – 1920", feast: "November 9",
    title: "Metropolitan of Pentapolis, wonderworker",
    bio: "A humble bishop who founded a convent on the island of Aegina...",
    works: [
      { title: "Christology", date: "1893", find: "Nektarios of Aegina Christology" }
    ] },

Every new entry appears automatically in BOTH views: the Vertical View
and the Full Timeline View (the horizontal one). You do not need to do
anything extra.

For a work, add  link: "https://..."  only if you know an Orthodox online
copy of it. Without a link, the card shows "Orthodox link needed".

If the page goes blank after an edit, a comma or quotation mark is
probably missing. Undo your last change (Ctrl+Z / Cmd+Z), save, and try
again. Text inside "quotes" that itself contains a quotation mark needs
a backslash before it, like this:  \"the Theologian\"


HOW TO MAKE A NEW STUDY PATH
----------------------------
A study path is just a list of timeline entries in the order you want
people to read them, each with a sentence saying why it matters.

1. Open paths.js in your text editor.
2. Copy an existing path, from its opening {  to its closing  },
   including the comma after it, and paste it below the others.
3. Change the id, title, description, level ("Beginner", "Intermediate"
   or "Deeper Study"), minutes, and group ("history" or "compare").
   Add  startHere: true  if it is a good first path for newcomers.
4. Write the steps. Most steps look like this:

     { entry: "athanasius", why: "He defended the Creed for fifty years." },

   "entry" is the id of an entry in data.js. To find one, search
   data.js for the name (e.g. Athanasius) and copy the id next to it.

   For a topic with no single timeline entry, write an explainer step:

     { title: "What is an icon?",
       text: ["First paragraph.", "Second paragraph."],
       related: ["damascene", "nicaea2"] },

   You can also give an explainer a "views" section comparing another
   tradition's view with the Orthodox one. paths.js has examples at the top.
5. Save and refresh. Your path appears on the Study Paths page.

If you mistype an entry id, that step shows a red note telling you so,
and the rest of the site keeps working.

Visitors' progress through paths is remembered in their own browser only.


THE TWO TIMELINE VIEWS
----------------------
Use the "Vertical View" / "Full Timeline View" switch in the bar at the top.
The Full Timeline View draws all of history on one line, to scale:
  - Zoom with the + and - buttons, the mouse wheel, or pinching on a phone.
  - Move sideways by dragging with the mouse or swiping on a phone.
  - "Show all" zooms back out to the whole history.
  - "Jump to era" and "Jump to century" zoom straight to that period.
  - Hover over a marker for a quick preview; click it for the full card.
  - Each card has "Jump to this in Vertical View".
The page remembers which view you used last (in your browser only).


A NOTE ON LINKS
---------------
Reading links point only to Orthodox sources. Right now that means
OrthodoxWiki (searches by topic) and OrthodoxInfo (the 1848 Encyclical).
Anything without a reliable Orthodox online copy shows
"Orthodox link needed". When you find one, add it in data.js:
  - for a writing:       link: "https://..."
  - for a Bible book:    text: "https://..."
  - in a "links" list:   change  { label: "...", needed: true }
                         to      { label: "...", url: "https://..." }
Next to "Orthodox link needed", writings also show a small "general
library search" on archive.org as a temporary help.

The links could not be click-tested when the site was built, because the
build computer had no internet access. If you find a broken one, fix or
remove it in data.js or paths.js.
