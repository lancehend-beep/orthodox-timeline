/* =====================================================================
   ORTHODOX TIMELINE — BEHAVIOR
   You should not need to edit this file to add content.
   Timeline entries live in data.js; study paths live in paths.js.
   ===================================================================== */
(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII"];
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ALL_PATHS = typeof PATHS !== "undefined" ? PATHS : [];
  const GROUPS = typeof PATH_GROUPS !== "undefined" ? PATH_GROUPS : [{ id: "history", name: "Study paths", intro: "" }];

  // ---------- prepare the data ----------
  const eraOf = (e) => e.era || (ERAS.find((er) => e.year >= er.from && e.year <= er.to) || ERAS[ERAS.length - 1]).id;
  function centuryOf(year) {
    if (year < 0) return -Math.ceil(-year / 100);
    return Math.max(1, Math.ceil(year / 100));
  }
  function ordinal(n) {
    const s = ["th", "st", "nd", "rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  const centuryLabel = (c) => (c < 0 ? `${ordinal(-c)} century BC` : `${ordinal(c)} century`);

  const items = TIMELINE
    .map((e) => ({ ...e, _era: eraOf(e), _cent: centuryOf(e.year) }))
    .sort((a, b) => {
      const ea = ERAS.findIndex((x) => x.id === a._era), eb = ERAS.findIndex((x) => x.id === b._era);
      return ea - eb || a.year - b.year;
    });
  const byId = new Map(items.map((e) => [e.id, e]));
  const pathById = new Map(ALL_PATHS.map((p) => [p.id, p]));

  // ---------- saved progress (only in this browser; optional) ----------
  const STORE = "orthodox-timeline-paths";
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (_) { return {}; }
  }
  function saveProgress(id, data) {
    try {
      const all = loadProgress();
      all[id] = Object.assign(all[id] || {}, data);
      localStorage.setItem(STORE, JSON.stringify(all));
    } catch (_) { /* storage unavailable: fine */ }
  }

  // ---------- state ----------
  const state = { type: "all", q: "" };
  let visible = items.slice();
  let path = null;            // { p: pathObject, i: stepIndex }
  let panelMode = null;       // "browse" | "step" | "detour" | "done"
  let currentId = null;
  let lastFocus = null;
  let view = "v";            // "v" vertical, "h" horizontal (full timeline)

  // ---------- filter chips ----------
  const chipDefs = [{ key: "all", label: "Everything" }].concat(
    Object.keys(TYPES).map((k) => ({ key: k, label: TYPES[k].plural }))
  );
  $("#chips").innerHTML = chipDefs.map((c) =>
    `<button type="button" class="chip" data-key="${c.key}" ${c.key !== "all" ? `data-type="${c.key}"` : ""} aria-pressed="${c.key === "all"}">${c.key !== "all" ? icon(c.key) : ""}${esc(c.label)}</button>`
  ).join("");
  function setType(key) {
    state.type = key;
    document.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.key === key)));
  }
  $("#chips").addEventListener("click", (ev) => {
    const b = ev.target.closest(".chip");
    if (!b) return;
    setType(b.dataset.key);
    render();
  });

  // ---------- search ----------
  let t;
  $("#search").addEventListener("input", (ev) => {
    clearTimeout(t);
    t = setTimeout(() => { state.q = ev.target.value.trim().toLowerCase(); render(); }, 120);
  });
  function matches(e) {
    if (state.type !== "all" && e.type !== state.type) return false;
    if (!state.q) return true;
    const hay = [e.name, e.date, e.summary, e.title, e.section, e.location, e.life,
      ...(e.works || []).map((w) => w.title)].join(" ").toLowerCase();
    return state.q.split(/\s+/).every((word) => hay.includes(word));
  }

  // ---------- timeline ----------
  function pathStepsFor(id) {
    if (!path) return [];
    const out = [];
    path.p.steps.forEach((s, i) => { if (s.entry === id) out.push(i + 1); });
    return out;
  }

  function cardHTML(e, side) {
    const steps = pathStepsFor(e.id);
    const pathCls = path ? (steps.length ? " on-path" : " dim") : "";
    const pill = steps.length ? `<span class="step-pill" aria-label="Step ${steps.join(" and ")} of this path">${steps.join(" · ")}</span>` : "";
    const dateText = e.type === "father" ? e.life : e.date;
    if (e.type === "council") {
      return `<div class="entry center${pathCls}" data-type="council" data-id="${e.id}">${pill}
        <button type="button" class="card" data-open="${e.id}">
          <span class="badge">${icon("council")}</span>
          <span class="numeral">${ROMAN[e.number] || ""} · Ecumenical Council</span>
          <span class="card-title">${esc(e.name)}</span>
          <span class="card-date">${esc(e.date)} · ${esc(e.location)}</span>
          <span class="card-sum">${esc(e.summary)}</span>
        </button></div>`;
    }
    const sum = e.type === "father" ? e.title : e.summary;
    return `<div class="entry ${side}${pathCls}" data-type="${e.type}" data-id="${e.id}">${pill}
      <button type="button" class="card" data-open="${e.id}">
        <span class="badge">${icon(e.type)}</span>
        <span class="card-body">
          <span class="card-kind">${esc(TYPES[e.type].label)}</span>
          <span class="card-title">${esc(e.name)}</span>
          <span class="card-date">${esc(dateText)}</span>
          <span class="card-sum">${esc(sum)}</span>
        </span>
      </button></div>`;
  }

  function render() {
    visible = items.filter(matches);
    const centuriesShown = [];
    let html = "";
    let side = 0;

    ERAS.forEach((era) => {
      const list = visible.filter((e) => e._era === era.id);
      if (!list.length) return;
      html += `<section class="era" id="era-${era.id}">
        <div class="era-banner"><p class="eyebrow">${esc(era.range)}</p><h2>${esc(era.name)}</h2><p>${esc(era.intro)}</p></div>`;
      let cent = null, open = false;
      list.forEach((e) => {
        if (e._cent !== cent) {
          if (open) html += `</div>`;
          cent = e._cent;
          const cid = `c-${era.id}-${cent < 0 ? "bc" + -cent : cent}`;
          const label = centuryLabel(cent);
          centuriesShown.push({ id: cid, label: label + (centuriesShown.some((c) => c.label === label) ? " (cont.)" : "") });
          html += `<div class="century" id="${cid}"><span>${esc(label)}</span></div><div class="entries">`;
          open = true;
        }
        html += e.type === "council" ? cardHTML(e, "center") : cardHTML(e, side++ % 2 ? "right" : "left");
      });
      if (open) html += `</div>`;
      html += `</section>`;
    });

    if (!visible.length) html = `<p class="empty">Nothing matches “${esc(state.q)}”. Try a shorter word, or choose “Everything”.</p>`;
    $("#timeline").innerHTML = html;

    $("#era-jump").innerHTML = `<option value="">Jump to era…</option>` +
      ERAS.filter((er) => visible.some((e) => e._era === er.id))
        .map((er) => `<option value="era-${er.id}">${esc(er.name)}</option>`).join("");
    $("#century-jump").innerHTML = `<option value="">Jump to century…</option>` +
      centuriesShown.map((c) => `<option value="${c.id}">${esc(c.label)}</option>`).join("");

    const n = visible.length;
    $("#count").textContent = n === items.length ? `${n} entries` : `${n} of ${items.length} shown`;
    markCurrent();
    observe();
    if (view === "h") hRender();
  }

  // ---------- scroll reveal ----------
  let io = null;
  if (!reduce && "IntersectionObserver" in window) {
    document.documentElement.classList.add("reveal-on");
    io = new IntersectionObserver((list) => {
      list.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
  }
  function observe() {
    if (io) document.querySelectorAll(".entry:not(.in)").forEach((el) => io.observe(el));
  }

  function scrollToEl(el, center) {
    if (!el) return;
    const bar = document.querySelector(".toolbar");
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = center
      ? top - window.innerHeight / 2 + el.offsetHeight / 2
      : top - (bar ? bar.offsetHeight : 0) - 12;
    window.scrollTo({ top: Math.max(0, y), behavior: reduce ? "auto" : "smooth" });
  }
  function jumpSelect(val) {
    if (!val) return;
    if (view !== "h") { scrollToEl(document.getElementById(val)); return; }
    if (val.startsWith("era-")) {
      const er = ERAS.find((x) => "era-" + x.id === val);
      if (er) zoomToRange(Math.max(er.from, Y0), Math.min(er.to, Y1));
    } else {
      const m = val.match(/-(bc)?(\d+)$/);
      if (m) { const c = +m[2]; const a = m[1] ? -c * 100 : (c - 1) * 100; zoomToRange(a, a + 100); }
    }
  }
  $("#era-jump").addEventListener("change", (ev) => { jumpSelect(ev.target.value); ev.target.value = ""; });
  $("#century-jump").addEventListener("change", (ev) => { jumpSelect(ev.target.value); ev.target.value = ""; });

  // ---------- Fathers at a glance ----------
  (function buildGlance() {
    const groups = new Map();
    items.filter((e) => e.type === "father").forEach((f) => {
      if (!groups.has(f._cent)) groups.set(f._cent, []);
      groups.get(f._cent).push(f);
    });
    $("#glance").innerHTML = [...groups.entries()].map(([c, list]) =>
      `<div class="glance-col"><h3>${esc(centuryLabel(c))}</h3><ul>` +
      list.map((f) => `<li><button type="button" class="linkish" data-open="${f.id}">${esc(f.name)}</button><span class="life">${esc(f.life)}</span></li>`).join("") +
      `</ul></div>`).join("");
  })();

  // ---------- detail content ----------
  function linkHTML(label, url, note) {
    return `<a href="${esc(url)}" target="_blank" rel="noopener">${icon("link")}${esc(label)}</a>${note ? ` <span class="small">${esc(note)}</span>` : ""}`;
  }
  const NEEDED = `<span class="needed-tag">link needed</span>`;   // plain text, not a link
  function worksHTML(works, author) {
    const who = (author || "").replace(/^(St\.|Bl\.)\s*/, "").replace(/\s*\(.*\)$/, "");
    return `<ol class="works">` + works.map((w) => {
      let l;
      if (w.link) l = linkHTML("Read online (Orthodox source)", w.link);
      else l = `${NEEDED} <a class="backup" href="${esc(FIND(w.find || (who + " " + w.title)))}" target="_blank" rel="noopener">general library search</a>`;
      return `<li><span class="w-title">${esc(w.title)}</span><span class="w-date">${esc(w.date)}</span><span class="w-link">${l}</span></li>`;
    }).join("") + `</ol>`;
  }
  function viewsHTML(v, heading) {
    if (!v) return "";
    const others = v.others || [{ label: v.otherLabel || "Other view", text: v.other }];
    return `<h3>${esc(heading || "Other views and the Orthodox answer")}</h3><div class="views">` +
      others.map((o) => `<div class="view"><h4>${esc(o.label)}</h4><p>${esc(o.text)}</p></div>`).join("") +
      `<div class="view orth"><h4>The Orthodox position</h4><p>${esc(v.orthodox)}</p></div></div>`;
  }
  function linksList(links) {
    return `<ul class="links">${links.map((l) => `<li>${l.url && !l.needed ? linkHTML(l.label, l.url) : `<span class="needed-label">${esc(l.label)}</span> ${NEEDED}`}</li>`).join("")}</ul>`;
  }

  function detailHTML(e, headingTag) {
    const t = TYPES[e.type];
    const H = headingTag || "h2";
    let h = `<span class="kind" data-type="${e.type}"><span class="badge">${icon(e.type)}</span>${esc(e.type === "council" ? `${ROMAN[e.number]} · ${t.label}` : t.label)}</span>
      <${H} class="entry-title" id="panel-title">${esc(e.name)}</${H}>`;
    if (view === "h") h += `<button type="button" class="btn small jump-v" data-jump="${e.id}">${icon("vertical")}Jump to this in Vertical View</button>`;

    if (e.type === "father") {
      h += `<dl class="facts"><dt>Lived</dt><dd>${esc(e.life)}</dd><dt>Known as</dt><dd>${esc(e.title)}</dd>${e.feast ? `<dt>Feast</dt><dd>${esc(e.feast)}</dd>` : ""}</dl>`;
      h += `<h3>His life</h3><p>${esc(e.bio)}</p>`;
      if (e.works && e.works.length) h += `<h3>Writings, in the order written</h3>${worksHTML(e.works, e.name)}`;
      h += `<h3>Learn more</h3>${linksList([{ label: "Search OrthodoxWiki", url: OW(e.name.replace(/^(St\.|Bl\.)\s*/, "").replace(/\s*\(.*\)$/, "")) }])}`;
      return h;
    }
    if (e.type === "bible") {
      h += `<dl class="facts"><dt>Part</dt><dd>${esc(e.testament)} · ${esc(e.section)}</dd><dt>Written</dt><dd>${esc(e.date)}</dd></dl>`;
      h += `<p>${esc(e.summary)}</p>`;
      const book = e.name.replace(/\s*\(.*\)$/, "");
      h += `<h3>Read it</h3>${linksList([
        e.text ? { label: `Read ${book} (Orthodox source)`, url: e.text } : { label: `Read ${book}`, needed: true },
        { label: `Learn about ${book} (OrthodoxWiki)`, url: OW(book) }
      ])}`;
      h += `<p class="small" style="margin-top:12px">The Orthodox Church reads the Old Testament from the Greek Septuagint, so wording and Psalm numbers can differ from other Bibles.</p>`;
      return h;
    }
    h += `<dl class="facts"><dt>When</dt><dd>${esc(e.date)}</dd>${e.location ? `<dt>Where</dt><dd>${esc(e.location)}</dd>` : ""}</dl>`;
    h += `<p>${esc(e.summary)}</p>`;
    if (e.decided) h += `<h3>What it decided</h3><ul class="decided">${e.decided.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>`;
    if (e.matters) h += `<h3>Why it matters</h3><p>${esc(e.matters)}</p>`;
    h += viewsHTML(e.views);
    if (e.links && e.links.length) h += `<h3>${e.type === "event" ? "Read more" : "Read the canons and decrees"}</h3>${linksList(e.links)}`;
    return h;
  }

  function relatedHTML(ids) {
    const list = (ids || []).map((id) => byId.get(id)).filter(Boolean);
    if (!list.length) return "";
    return `<h3>See on the timeline</h3><div class="related">` +
      list.map((e) => `<button type="button" class="rel" data-type="${e.type}" data-open="${e.id}"><span class="badge">${icon(e.type)}</span>${esc(e.name)}</button>`).join("") +
      `</div>`;
  }

  function explainerHTML(s) {
    const paras = Array.isArray(s.text) ? s.text : s.text ? [s.text] : [];
    let h = `<span class="kind explainer"><span class="badge">${icon("explainer")}</span>Explainer</span>
      <h2 class="entry-title" id="panel-title">${esc(s.title)}</h2>`;
    h += paras.map((p) => `<p>${esc(p)}</p>`).join("");
    h += viewsHTML(s.views, "Comparing the views");
    if (s.links && s.links.length) h += `<h3>Read more</h3>${linksList(s.links)}`;
    h += relatedHTML(s.related);
    return h;
  }

  // ---------- panel ----------
  const panel = $("#panel"), scrim = $("#scrim");

  function showPanel(html) {
    if (!panel.classList.contains("open")) lastFocus = document.activeElement;
    $("#panel-body").innerHTML = html;
    $("#panel-body").scrollTop = 0;
    panel.classList.add("open");
    scrim.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    document.body.classList.add("panel-open");
    $("#close").focus({ preventScroll: true });
  }

  function setNav(prevLabel, prevDisabled, nextLabel, nextDisabled) {
    const prev = $("#prev"), next = $("#next");
    prev.innerHTML = prevLabel ? `${icon("prev")}${esc(prevLabel)}` : "";
    prev.hidden = !prevLabel;
    prev.disabled = !!prevDisabled;
    next.innerHTML = nextLabel ? `${esc(nextLabel)}${icon("next")}` : "";
    next.hidden = !nextLabel;
    next.disabled = !!nextDisabled;
  }

  // fromStep: true when opened from a link inside a path step (shows the entry
  // as a side trip). Otherwise, clicking a timeline card that is part of the
  // active path jumps the path to that step.
  function openEntry(id, fromStep) {
    const e = byId.get(id);
    if (!e) return;
    if (path && !fromStep) {
      const cur = path.p.steps[path.i];
      const idx = cur && cur.entry === id ? path.i : path.p.steps.findIndex((s) => s.entry === id);
      if (idx >= 0) { showStep(idx); return; }
    }
    currentId = id;
    panel.dataset.type = e.type;
    if (path) {
      panelMode = "detour";
      showPanel(`<p class="detour-note">${icon("path")}You are on the path “${esc(path.p.title)}.” This entry is not one of its steps.</p>` + detailHTML(e));
      setNav(`Back to step ${path.i + 1}`, false, "", true);
      return;
    }
    panelMode = "browse";
    showPanel(detailHTML(e));
    const list = visible.some((x) => x.id === id) ? visible : items;
    const i = list.findIndex((x) => x.id === id);
    setNav("Earlier", i <= 0, "Later", i >= list.length - 1);
    try { history.replaceState(null, "", "#" + id); } catch (_) { /* ignore */ }
  }

  function closePanel() {
    panel.classList.remove("open");
    scrim.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("panel-open");
    panelMode = null;
    currentId = null;
    if (!path) { try { history.replaceState(null, "", location.pathname + location.search); } catch (_) { /* ignore */ } }
    if (lastFocus && lastFocus.focus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }

  function browseStep(dir) {
    const list = visible.some((x) => x.id === currentId) ? visible : items;
    const i = list.findIndex((x) => x.id === currentId);
    const n = list[i + dir];
    if (n) openEntry(n.id);
  }

  // ---------- study paths: list page ----------
  const pathsView = $("#paths-view");

  function pathCardHTML(p) {
    const prog = loadProgress()[p.id] || {};
    const steps = p.steps.length;
    let status = "", startLabel = "Start";
    if (prog.done) { status = `<span class="p-status done">${icon("check")}Completed</span>`; startLabel = "Start again"; }
    else if (prog.step > 0) { status = `<span class="p-status">Stopped at step ${prog.step + 1} of ${steps}</span>`; startLabel = "Continue"; }
    const levelCls = p.level === "Beginner" ? "lv-1" : p.level === "Intermediate" ? "lv-2" : "lv-3";
    return `<article class="path-card${p.startHere ? " recommended" : ""}">
      ${p.startHere ? `<span class="ribbon">Start here</span>` : ""}
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.description)}</p>
      <div class="p-meta">
        <span class="level ${levelCls}">${esc(p.level)}</span>
        <span>${icon("clock")}${p.minutes ? `about ${p.minutes} min` : ""}</span>
        <span>${steps} steps</span>
      </div>
      <div class="p-foot">${status}<button type="button" class="btn primary small" data-start="${p.id}">${startLabel}</button></div>
    </article>`;
  }

  function renderPathList() {
    $("#paths-list").innerHTML = GROUPS.map((g) => {
      const list = ALL_PATHS.filter((p) => (p.group || "history") === g.id);
      if (!list.length) return "";
      return `<section class="path-group"><h3 class="group-title">${esc(g.name)}</h3>${g.intro ? `<p class="group-intro">${esc(g.intro)}</p>` : ""}
        <div class="path-grid">${list.map(pathCardHTML).join("")}</div></section>`;
    }).join("");
  }

  let pathsLastFocus = null;
  function openPaths() {
    closePanel();
    renderPathList();
    pathsLastFocus = document.activeElement;
    pathsView.hidden = false;
    document.body.classList.add("paths-open");
    requestAnimationFrame(() => pathsView.classList.add("open"));
    $("#paths-close").focus({ preventScroll: true });
  }
  function closePaths() {
    pathsView.classList.remove("open");
    document.body.classList.remove("paths-open");
    setTimeout(() => { pathsView.hidden = true; }, reduce ? 0 : 250);
    if (pathsLastFocus && pathsLastFocus.focus && document.contains(pathsLastFocus)) pathsLastFocus.focus({ preventScroll: true });
  }

  // ---------- study paths: walking a path ----------
  function startPath(id, fromStep) {
    const p = pathById.get(id);
    if (!p || !p.steps.length) return;
    const prog = loadProgress()[id] || {};
    const begin = typeof fromStep === "number" ? fromStep : (prog.done ? 0 : Math.min(prog.step || 0, p.steps.length - 1));
    if (prog.done) saveProgress(id, { done: false });
    path = { p, i: begin };
    // show the whole timeline so every step is visible
    setType("all");
    state.q = "";
    $("#search").value = "";
    document.body.classList.add("path-mode");
    $("#pathbar").hidden = false;
    if (!pathsView.hidden) closePaths();
    render();
    try { history.replaceState(null, "", "#path-" + id); } catch (_) { /* ignore */ }
    showStep(begin);
  }

  function updatePathbar() {
    if (!path) return;
    const n = path.p.steps.length;
    $("#pb-title").textContent = path.p.title;
    $("#pb-step").textContent = `Step ${path.i + 1} of ${n}`;
    $("#pb-fill").style.width = `${((path.i + 1) / n) * 100}%`;
    $("#pb-prev").disabled = path.i <= 0;
    $("#pb-next").querySelector(".hide-sm").textContent = path.i >= n - 1 ? "Finish" : "Next";
  }

  function markCurrent() {
    document.querySelectorAll(".entry.current").forEach((el) => el.classList.remove("current"));
    if (!path) return;
    const s = path.p.steps[path.i];
    const target = s && (s.entry || (s.related && s.related[0]));
    if (target) {
      const el = document.querySelector(`.entry[data-id="${CSS.escape(target)}"]`);
      if (el) el.classList.add("current");
    }
  }

  function showStep(i) {
    if (!path) return;
    const p = path.p, n = p.steps.length;
    path.i = Math.max(0, Math.min(i, n - 1));
    saveProgress(p.id, { step: path.i });
    const s = p.steps[path.i];
    panelMode = "step";

    let body = `<div class="path-strip">
      <span class="ps-eyebrow">${icon("path")}${esc(p.title)}</span>
      <div class="ps-row"><strong>Step ${path.i + 1} of ${n}</strong><button type="button" class="linkish small" data-action="exit-path">Exit path</button></div>
      <div class="progress"><span style="width:${((path.i + 1) / n) * 100}%"></span></div>
    </div>`;

    if (s.entry) {
      const e = byId.get(s.entry);
      if (e) {
        currentId = e.id;
        panel.dataset.type = e.type;
        if (s.why) body += `<div class="why"><h3>Why this matters here</h3><p>${esc(s.why)}</p></div>`;
        body += detailHTML(e);
      } else {
        currentId = null;
        body += `<p class="missing">This step points to an entry called “${esc(s.entry)}”, which isn't in data.js. Check the spelling of the id in paths.js.</p>`;
        if (s.why) body += `<p>${esc(s.why)}</p>`;
      }
    } else {
      currentId = null;
      panel.dataset.type = "explainer";
      body += explainerHTML(s);
    }
    showPanel(body);
    setNav("Previous", path.i <= 0, path.i >= n - 1 ? "Finish" : "Next", false);
    updatePathbar();
    markCurrent();
    if (view === "h") {
      hMarkCurrent();
      const t = s.entry || (s.related && s.related[0]);
      if (t) hFocus(t, 6);
      bringHviewIntoPlace();
    } else {
      const el = document.querySelector(".entry.current");
      if (el) scrollToEl(el, true);
    }
  }

  function pathStep(dir) {
    if (!path) return;
    if (dir > 0 && path.i >= path.p.steps.length - 1) { finishPath(); return; }
    showStep(path.i + dir);
  }

  function finishPath() {
    const p = path.p;
    saveProgress(p.id, { done: true, step: 0 });
    panelMode = "done";
    panel.dataset.type = "explainer";
    const prog = loadProgress();
    const next = ALL_PATHS.filter((x) => x.id !== p.id && !(prog[x.id] && prog[x.id].done)).slice(0, 3);
    showPanel(`<div class="finish">
      <div class="finish-mark">${icon("check")}</div>
      <p class="ps-eyebrow">${icon("path")}Path complete</p>
      <h2 class="entry-title" id="panel-title">${esc(p.title)}</h2>
      <p>You have walked through all ${p.steps.length} steps. Glory to God for all things!</p>
      <div class="finish-actions">
        <button type="button" class="btn primary small" data-action="exit-path">Back to the full timeline</button>
        <button type="button" class="btn small" data-action="paths">Choose another path</button>
      </div>
      ${next.length ? `<h3>You might try next</h3><div class="related">${next.map((x) => `<button type="button" class="rel" data-start="${x.id}"><span class="badge">${icon("path")}</span>${esc(x.title)}</button>`).join("")}</div>` : ""}
    </div>`);
    setNav("Previous", false, "", true);
    $("#pb-step").textContent = "Complete";
    $("#pb-fill").style.width = "100%";
  }

  function exitPath() {
    if (!path) return;
    const lastStep = path.p.steps[path.i];
    path = null;
    document.body.classList.remove("path-mode");
    $("#pathbar").hidden = true;
    closePanel();
    try { history.replaceState(null, "", location.pathname + location.search); } catch (_) { /* ignore */ }
    render();
    if (view === "h") return;
    const el = lastStep && lastStep.entry && document.querySelector(`.entry[data-id="${CSS.escape(lastStep.entry)}"]`);
    if (el) scrollToEl(el, true);
  }

  // ---------- events ----------
  document.addEventListener("click", (ev) => {
    const jump = ev.target.closest("[data-jump]");
    if (jump) { jumpToVertical(jump.dataset.jump); return; }
    const start = ev.target.closest("[data-start]");
    if (start) { startPath(start.dataset.start); return; }
    const act = ev.target.closest("[data-action]");
    if (act) {
      const a = act.dataset.action;
      if (a === "paths") openPaths();
      else if (a === "exit-path") exitPath();
      return;
    }
    const b = ev.target.closest("[data-open]");
    if (b) openEntry(b.dataset.open, !!(path && b.closest("#panel")));
  });

  $("#close").addEventListener("click", closePanel);
  scrim.addEventListener("click", closePanel);
  $("#prev").addEventListener("click", () => {
    if (panelMode === "step") pathStep(-1);
    else if (panelMode === "done" || panelMode === "detour") showStep(path.i);
    else browseStep(-1);
  });
  $("#next").addEventListener("click", () => {
    if (panelMode === "step") pathStep(1);
    else browseStep(1);
  });
  $("#pb-prev").addEventListener("click", () => pathStep(-1));
  $("#pb-next").addEventListener("click", () => pathStep(1));
  $("#pb-open").addEventListener("click", () => showStep(path.i));
  $("#pb-exit").addEventListener("click", exitPath);
  $("#paths-close").addEventListener("click", closePaths);

  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      if (!pathsView.hidden) closePaths();
      else if (panel.classList.contains("open")) closePanel();
      return;
    }
    if (!panel.classList.contains("open")) return;
    if (ev.target.closest && ev.target.closest("input, select, textarea")) return;
    if (ev.key === "ArrowLeft") $("#prev").hidden || $("#prev").disabled || $("#prev").click();
    else if (ev.key === "ArrowRight") $("#next").hidden || $("#next").disabled || $("#next").click();
  });

  // =====================================================================
  // HORIZONTAL ("FULL TIMELINE") VIEW
  // Reads the same entries as the vertical view. Drawn to scale by date.
  // =====================================================================
  const hv = {
    vp: $("#hv-viewport"),
    track: $("#hv-track"),
    tip: $("#hv-tip"),
    z: 1,          // current (visible) zoom
    Lz: 1,         // zoom the labels were last laid out for
    ox: 150,       // screen position (px from the viewport's left) of the earliest year
    pad: 150,      // empty space kept at each end of the line
    rowH: 46,
    dragged: false
  };
  const years = items.map((e) => e.year);
  const minY = Math.min(...years), maxY = Math.max(...years);
  const Y0 = Math.floor((minY - 60) / 50) * 50;
  const Y1 = Math.ceil((maxY + 40) / 10) * 10;
  const SPAN = Y1 - Y0;
  const MAX_PX_PER_YEAR = 30;   // most zoomed in: about 30 pixels for each year
  const firstItem = items.reduce((a, b) => (b.year < a.year ? b : a));
  const lastItem = items.reduce((a, b) => (b.year > a.year ? b : a));

  const fmtYear = (y) => (y < 0 ? `${Math.round(-y)} BC` : `AD ${Math.round(y)}`);
  function shortDate(e) {
    if (e.type === "father") return e.life;
    const approx = e.type === "bible" || /\bc\.|tradition|uncertain/i.test(e.date) ? "c. " : "";
    return approx + fmtYear(e.year);
  }
  function shortName(e) {
    let n = e.name;
    const m = n.match(/\(([^)]+)\)\s*$/);
    if (e.type === "council" && m) n = m[1];
    else n = n.replace(/\s*\([^)]*\)\s*$/, "");
    return n.length > 30 ? n.slice(0, 28).trimEnd() + "…" : n;
  }

  // ---- geometry ----
  const vpW = () => (hv.track && hv.track.classList.contains("gesturing") && hv.W) || hv.vp.clientWidth || 320;
  const padFor = (w) => (w < 640 ? 56 : 150);
  const baseW = () => Math.max(200, vpW() - 2 * hv.pad);
  const ppyAt = (z) => (baseW() * z) / SPAN;
  const maxZoom = () => Math.max(2, (MAX_PX_PER_YEAR * SPAN) / baseW());
  const clampZ = (z) => Math.max(1, Math.min(maxZoom(), z));
  function clampOx(z, ox) {
    const len = SPAN * ppyAt(z), W = vpW();
    const lo = W - hv.pad - len, hi = hv.pad;
    return lo > hi ? (W - len) / 2 : Math.max(lo, Math.min(hi, ox));
  }
  const yearAtX = (sx) => Y0 + (sx - hv.ox) / ppyAt(hv.z);      // sx: px from the viewport's left
  let vpLeft = null;   // cached during a gesture, so finger moves never force a layout
  const localX = (clientX) => clientX - (vpLeft != null ? vpLeft : hv.vp.getBoundingClientRect().left);

  function ordinalCentury(b) {
    // span [b, b+100)
    if (b >= 0) return { n: ordinal(b / 100 + 1), bc: false };
    return { n: ordinal(-b / 100), bc: true };
  }

  // Full redraw: positions, label stacking. Runs only when a gesture ends,
  // or when filters, search or study paths change.
  function hRender() {
    if (view !== "h") return;
    hv.pad = padFor(vpW());
    hv.z = clampZ(hv.z);
    const H = hv.vp.clientHeight;
    const axisY = Math.round(H / 2) + 10;
    const ppy = ppyAt(hv.z);
    const X = (y) => (y - Y0) * ppy;           // position inside the track
    const len = SPAN * ppy;
    // Fewer label rows when zoomed far out, so labels do not pile up.
    const rowsFit = Math.max(1, Math.floor((H / 2 - 54) / hv.rowH));
    const rowsPerSide = Math.min(rowsFit, 3 + Math.round(Math.log2(hv.z)));
    const q = state.q;
    const steps = new Map();
    if (path) path.p.steps.forEach((s, i) => { if (s.entry) steps.set(s.entry, (steps.get(s.entry) || []).concat(i + 1)); });

    let html = "";
    // era bands
    ERAS.forEach((er, i) => {
      const a = Math.max(Y0, er.from), b = Math.min(Y1, er.to + 1);
      if (b <= a) return;
      const x = X(a), w = X(b) - x;
      const full = er.name, short = er.short || er.name;
      // wide bands get a normal label; narrow ones get the short name written vertically
      const label = w > full.length * 7.2 + 24 ? full : w > short.length * 7.2 + 20 ? short : "";
      html += `<div class="hv-era era-${i % 6}" style="left:${x}px;width:${w}px" title="${esc(full)} (${esc(er.range)})">` +
        (label ? `<span class="hv-era-label"><b>${esc(label)}</b>${w > 170 ? `<small>${esc(er.range)}</small>` : ""}</span>`
          : w >= 16 ? `<span class="hv-era-label vertical"><b>${esc(short)}</b></span>` : "") + `</div>`;
    });
    // axis line and end caps
    html += `<div class="hv-axis" style="top:${axisY}px;left:-40px;width:${len + 80}px"></div>`;
    html += `<div class="hv-end first" style="top:${axisY}px;left:-40px"><span>Earliest<br><b>${esc(shortDate(firstItem))}</b></span></div>`;
    html += `<div class="hv-end last" style="top:${axisY}px;left:${len + 40}px"><span>Latest<br><b>${esc(fmtYear(lastItem.year).replace("AD ", ""))}</b></span></div>`;

    // century ticks
    const ppc = ppy * 100;
    const every = ppc >= 80 ? 1 : ppc >= 40 ? 2 : ppc >= 16 ? 5 : 10;
    for (let b = Math.ceil(Y0 / 100) * 100; b < Y1; b += 100) {
      const x = X(b);
      html += `<div class="hv-tick" style="left:${x}px;top:${axisY - 5}px"></div>`;
      const idx = Math.round(b / 100);
      if (((idx % every) + every) % every !== 0) continue;
      const c = ordinalCentury(b);
      const text = ppc * every >= 120 ? `${c.n} century${c.bc ? " BC" : ""}` : `${c.n}${c.bc ? " BC" : ""}`;
      const lx = every === 1 ? x + ppc / 2 : x;
      if (Math.abs(lx + 40) < 70 || Math.abs(lx - len - 40) < 70) continue; // keep clear of the end labels
      html += `<div class="hv-cent" style="left:${lx}px;top:${axisY + 10}px">${esc(text)}</div>`;
    }

    // markers: decide which get labels (stacked rows above and below);
    // the most important ones are placed first, so the least important are hidden when crowded
    const rank = (e) => (steps.has(e.id) ? 0 : q && matches(e) ? 1 : 2) * 10 +
      ({ council: 0, synod: 1, event: 2, father: 3, bible: 4 })[e.type];
    const order = items.slice().sort((a, b) => rank(a) - rank(b) || a.year - b.year);
    const slots = [];
    for (let r = 0; r < rowsPerSide; r++) { slots.push({ side: -1, r }); slots.push({ side: 1, r }); }
    const occ = slots.map(() => []);
    const placed = new Map();
    order.forEach((e) => {
      if (!matches(e) && !steps.has(e.id)) return; // filtered out or not a search hit: dot only
      const x = X(e.year);
      const nm = shortName(e), dt = shortDate(e);
      const w = Math.min(200, Math.max(nm.length * 6.9, dt.length * 6) + 44);
      const a = x - 14, b = a + w + 8;
      for (let s = 0; s < slots.length; s++) {
        if (occ[s].every(([p, q2]) => b <= p || a >= q2)) { occ[s].push([a, b]); placed.set(e.id, { slot: slots[s], w, nm, dt }); return; }
      }
    });

    items.forEach((e) => {
      const x = X(e.year);
      const inFilter = matches(e);
      const st = steps.get(e.id);
      let cls = `hv-m t-${e.type}`;
      if (path) cls += st ? " on-path" : " dim";
      else if (!inFilter) cls += " dim";
      if (q && inFilter) cls += " hit";
      const pl = placed.get(e.id);
      const pill = st ? `<span class="hv-step">${st.join(" · ")}</span>` : "";
      html += `<button type="button" class="hv-dot ${cls}" data-type="${e.type}" data-open="${e.id}" data-hv="${e.id}" style="left:${x}px;top:${axisY}px" aria-label="${esc(e.name)}, ${esc(shortDate(e))}"></button>`;
      if (!pl) return;
      const top = pl.slot.side < 0 ? axisY - 30 - pl.slot.r * hv.rowH - 36 : axisY + 34 + pl.slot.r * hv.rowH;
      const stemTop = pl.slot.side < 0 ? top + 36 : axisY;
      const stemH = pl.slot.side < 0 ? axisY - stemTop : top - axisY;
      html += `<div class="hv-stem ${cls}" data-type="${e.type}" style="left:${x}px;top:${stemTop}px;height:${stemH}px"></div>`;
      html += `<button type="button" class="hv-label ${cls}" data-type="${e.type}" data-open="${e.id}" data-hv="${e.id}" style="left:${x - 14}px;top:${top}px;max-width:${pl.w}px">${pill}<span class="badge">${icon(e.type === "council" ? "council" : e.type)}</span><span class="hv-txt"><b>${esc(pl.nm)}</b><small>${esc(pl.dt)}</small></span></button>`;
    });

    hv.track.style.width = Math.ceil(len) + "px";
    hv.track.style.height = H + "px";
    hv.track.innerHTML = html;
    hv.Lz = hv.z;
    hv.ox = clampOx(hv.z, hv.ox);
    // remember what was drawn, so the canvas can redraw it quickly while zooming
    hv.model = {
      axisY, H,
      items: items.map((e) => {
        const pl = placed.get(e.id), st = steps.get(e.id), inFilter = matches(e);
        return {
          id: e.id, year: e.year, type: e.type, pl, steps: st,
          dim: path ? !st : !inFilter, hit: !!(q && inFilter),
          top: pl ? (pl.slot.side < 0 ? axisY - 30 - pl.slot.r * hv.rowH - 36 : axisY + 34 + pl.slot.r * hv.rowH) : 0
        };
      }).sort((a, b) => (a.pl ? 1 : 0) - (b.pl ? 1 : 0))   // labels drawn on top of bare dots
    };
    canvasOff();
    paint();
    hMarkCurrent();
    const labeled = placed.size;
    $("#hv-hint").textContent = labeled < items.length ? `${items.length - labeled} more markers show labels as you zoom in` : "All entries labeled";
  }

  // ---- painting during gestures ----
  // Swiping only moves the already-drawn timeline (a GPU transform: fast and sharp).
  // Zooming stretches the era bands and the line with the same transform, and
  // a single canvas redraws markers and labels at their real size each frame,
  // so text never looks squashed. The real, clickable labels are re-stacked
  // once the gesture ends.
  let paintRaf = 0;
  function applyTransform() {
    if (!paintRaf) paintRaf = requestAnimationFrame(paint);
  }
  function paint() {
    cancelAnimationFrame(paintRaf); paintRaf = 0;
    const s = hv.z / hv.Lz;
    hv.track.style.transform = `translate3d(${hv.ox}px,0,0) scaleX(${s})`;
    if (Math.abs(s - 1) > 1e-4 && !hv.canvasOn) canvasOn();
    if (hv.canvasOn) drawCanvas();
    const zl = hv.z <= 1.01 ? "Whole history" : `Zoom ×${hv.z < 10 ? hv.z.toFixed(1) : Math.round(hv.z)}`;
    const lab = $("#hv-zoom-label");
    if (lab.textContent !== zl) lab.textContent = zl;
    $("#hv-out").disabled = hv.z <= 1.01;
    $("#hv-in").disabled = hv.z >= maxZoom() - 0.01;
  }

  const cv = document.createElement("canvas");
  cv.className = "hv-canvas";
  cv.setAttribute("aria-hidden", "true");
  hv.vp.appendChild(cv);
  const ctx2 = cv.getContext("2d");
  let colors = null;
  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    const v = (n) => cs.getPropertyValue(n).trim();
    colors = { surface: v("--surface"), ink: v("--ink"), soft: v("--ink-soft"), gold: v("--gold"), line: v("--line"),
      bible: v("--c-bible"), father: v("--c-father"), council: v("--c-council"), synod: v("--c-synod"), event: v("--c-event") };
  }
  function canvasOn() {
    hv.canvasOn = true;
    readColors();
    const dpr = Math.min(3, window.devicePixelRatio || 1);
    const W = vpW(), H = hv.vp.clientHeight;
    if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) {
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    }
    hv.dpr = dpr;
    hv.track.classList.add("zooming");
    cv.style.display = "block";
  }
  function canvasOff() {
    hv.canvasOn = false;
    hv.track.classList.remove("zooming");
    cv.style.display = "none";
  }
  const FONT_NAME = '600 13.4px "EB Garamond", Georgia, serif';
  const FONT_DATE = '11.5px "EB Garamond", Georgia, serif';
  const FONT_SMALL = '11.8px "EB Garamond", Georgia, serif';
  const FONT_ERA = '600 11.8px "Cinzel", Georgia, serif';
  function fit(text, max) {
    if (ctx2.measureText(text).width <= max) return text;
    let t = text;
    while (t.length > 1 && ctx2.measureText(t + "…").width > max) t = t.slice(0, -1);
    return t.trimEnd() + "…";
  }
  function roundRect(x, y, w, h, r) {
    ctx2.beginPath();
    ctx2.moveTo(x + r, y); ctx2.arcTo(x + w, y, x + w, y + h, r); ctx2.arcTo(x + w, y + h, x, y + h, r);
    ctx2.arcTo(x, y + h, x, y, r); ctx2.arcTo(x, y, x + w, y, r); ctx2.closePath();
  }
  function drawCanvas() {
    const m = hv.model; if (!m) return;
    const c = ctx2, C = colors, W = vpW(), H = m.H, ay = m.axisY;
    const ppy = ppyAt(hv.z), ox = hv.ox, len = SPAN * ppy;
    const sx = (y) => ox + (y - Y0) * ppy;
    c.setTransform(hv.dpr, 0, 0, hv.dpr, 0, 0);
    c.clearRect(0, 0, W, H);
    c.textBaseline = "alphabetic";

    // era names
    ERAS.forEach((er) => {
      const a = Math.max(Y0, er.from), b = Math.min(Y1, er.to + 1);
      if (b <= a) return;
      const x = sx(a), w = sx(b) - x;
      if (x > W || x + w < 0) return;
      c.font = FONT_ERA; c.fillStyle = C.ink;
      const full = er.name.toUpperCase(), short = (er.short || er.name).toUpperCase();
      const fw = c.measureText(full).width, swd = c.measureText(short).width;
      if (w > fw + 24) c.fillText(full, x + 8, 21);
      else if (w > swd + 20) c.fillText(short, x + 8, 21);
      else if (w >= 16) { c.save(); c.translate(x + w / 2 - 5, 10); c.rotate(Math.PI / 2); c.fillText(short, 0, 0); c.restore(); }
    });

    // century ticks and names
    const ppc = ppy * 100;
    const every = ppc >= 80 ? 1 : ppc >= 40 ? 2 : ppc >= 16 ? 5 : 10;
    c.font = FONT_SMALL; c.textAlign = "center";
    for (let bnd = Math.ceil(Y0 / 100) * 100; bnd < Y1; bnd += 100) {
      const x = sx(bnd);
      if (x < -200 || x > W + 200) continue;
      c.globalAlpha = 0.55; c.fillStyle = C.soft; c.fillRect(Math.round(x), ay - 5, 1, 10); c.globalAlpha = 1;
      const idx = Math.round(bnd / 100);
      if (((idx % every) + every) % every !== 0) continue;
      const cc = ordinalCentury(bnd);
      const text = ppc * every >= 120 ? `${cc.n} century${cc.bc ? " BC" : ""}` : `${cc.n}${cc.bc ? " BC" : ""}`;
      const lx = every === 1 ? x + ppc / 2 : x;
      if (Math.abs(lx - (ox - 40)) < 70 || Math.abs(lx - (ox + len + 40)) < 70) continue;
      c.fillStyle = C.soft; c.fillText(text, lx, ay + 22);
    }
    c.textAlign = "left";

    // end caps
    [[ox - 40, "EARLIEST", shortDate(firstItem), "left"], [ox + len + 40, "LATEST", fmtYear(lastItem.year).replace("AD ", ""), "right"]].forEach(([x, k, d, al]) => {
      if (x < -150 || x > W + 150) return;
      c.fillStyle = C.gold; c.beginPath(); c.arc(x, ay, 6, 0, 7); c.fill();
      c.textAlign = al; const tx = al === "left" ? x - 14 : x + 14;
      c.font = FONT_DATE; c.fillStyle = C.soft; c.fillText(k, tx, ay + 25);
      c.font = FONT_NAME; c.fillStyle = C.ink; c.fillText(d, tx, ay + 41);
      c.textAlign = "left";
    });

    // markers and labels
    for (const it of m.items) {
      const x = sx(it.year);
      if (x < -230 || x > W + 30) continue;
      const col = C[it.type];
      c.globalAlpha = it.dim ? 0.22 : 1;
      if (it.pl) {
        const top = it.top, lw = it.pl.w;
        const stemTop = it.pl.slot.side < 0 ? top + 36 : ay, stemBot = it.pl.slot.side < 0 ? ay : top;
        c.globalAlpha = (it.dim ? 0.22 : 1) * 0.55; c.fillStyle = col; c.fillRect(x - 0.5, stemTop, 1, stemBot - stemTop);
        c.globalAlpha = it.dim ? 0.22 : 1;
        if (!it.nm) {
          c.font = FONT_NAME; it.nm = fit(it.pl.nm, lw - 44);
          c.font = FONT_DATE; it.dt = fit(it.pl.dt, lw - 44);
          c.font = FONT_NAME; const w1 = c.measureText(it.nm).width;
          c.font = FONT_DATE; const w2 = c.measureText(it.dt).width;
          it.boxW = Math.min(lw, Math.max(w1, w2) + 46);
        }
        const lx = x - 14;
        roundRect(lx, top, it.boxW, 36, 18);
        c.fillStyle = C.surface; c.fill();
        c.lineWidth = it.type === "council" || it.steps ? 1.5 : 1;
        c.strokeStyle = it.type === "council" || it.steps ? C.gold : col; c.stroke();
        if (it.hit) { c.save(); c.globalAlpha *= 0.55; c.lineWidth = 3; c.strokeStyle = C.gold; roundRect(lx - 2, top - 2, it.boxW + 4, 40, 20); c.stroke(); c.restore(); }
        c.fillStyle = col; c.beginPath(); c.arc(x, top + 18, 13, 0, 7); c.fill();
        c.fillStyle = C.surface; c.beginPath(); c.arc(x, top + 18, 3.2, 0, 7); c.fill();
        c.fillStyle = C.ink; c.font = FONT_NAME; c.fillText(it.nm, x + 21, top + 16.5);
        c.fillStyle = C.soft; c.font = FONT_DATE; c.fillText(it.dt, x + 21, top + 30);
        if (it.steps) {
          const t = it.steps.join(" · ");
          c.font = '600 10.5px "Cinzel", Georgia, serif';
          const pw = Math.max(18, c.measureText(t).width + 10);
          c.fillStyle = C.gold; roundRect(lx - 6, top - 9, pw, 18, 9); c.fill();
          c.fillStyle = C.surface; c.fillText(t, lx - 6 + (pw - c.measureText(t).width) / 2, top + 3.5);
        }
      }
      const r = it.type === "council" ? 7.5 : 5.5;
      c.fillStyle = col; c.beginPath(); c.arc(x, ay, r, 0, 7); c.fill();
      c.lineWidth = 2; c.strokeStyle = C.surface; c.stroke();
      if (it.type === "council") { c.lineWidth = 1.5; c.strokeStyle = C.gold; c.beginPath(); c.arc(x, ay, r + 1.5, 0, 7); c.stroke(); }
    }
    c.globalAlpha = 1;
  }

  function hMarkCurrent() {
    hv.track.querySelectorAll(".current").forEach((el) => el.classList.remove("current"));
    if (!path) return;
    const s = path.p.steps[path.i];
    const target = s && (s.entry || (s.related && s.related[0]));
    if (target) hv.track.querySelectorAll(`[data-hv="${CSS.escape(target)}"]`).forEach((el) => el.classList.add("current"));
  }

  // ---- redraw once the gesture is over ----
  let commitTimer = 0;
  function scheduleCommit(ms) {
    clearTimeout(commitTimer);
    commitTimer = setTimeout(() => {
      if (Math.abs(hv.z - hv.Lz) > 1e-6) hRender();
      else { canvasOff(); paint(); }
      hv.track.classList.remove("gesturing");
      vpLeft = null;
    }, ms);
  }
  function startGesture() {
    clearTimeout(commitTimer);
    stopAnimations();
    hideTip();
    vpLeft = hv.vp.getBoundingClientRect().left;
    hv.W = hv.vp.clientWidth;
    hv.track.classList.add("gesturing");
  }

  // zoom so that the year under screen position sx stays under it
  function zoomAround(z, sx, ya) {
    const year = ya == null ? yearAtX(sx) : ya;
    hv.z = clampZ(z);
    hv.ox = clampOx(hv.z, sx - (year - Y0) * ppyAt(hv.z));
    applyTransform();
  }
  function panBy(dx) {
    hv.ox = clampOx(hv.z, hv.ox + dx);
    applyTransform();
  }

  // ---- smooth animations (buttons, jumps, study-path steps) ----
  let animRaf = 0, wheelRaf = 0, inertiaRaf = 0;
  function stopAnimations() {
    cancelAnimationFrame(animRaf); cancelAnimationFrame(wheelRaf); cancelAnimationFrame(inertiaRaf);
    wheel.active = false;
  }
  function animateTo(z1, centerYear, ms) {
    startGesture();
    z1 = clampZ(z1);
    const W = vpW();
    const zA = hv.z, yA = yearAtX(W / 2), yB = centerYear == null ? yA : centerYear;
    const dur = reduce ? 0 : (ms || 320);
    const t0 = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      const t = dur ? Math.min(1, (now - t0) / dur) : 1, e = ease(t);
      const z = Math.exp(Math.log(zA) + (Math.log(z1) - Math.log(zA)) * e);
      zoomAround(z, W / 2, yA + (yB - yA) * e);
      if (t < 1) animRaf = requestAnimationFrame(step);
      else scheduleCommit(0);
    };
    animRaf = requestAnimationFrame(step);
  }
  function zoomToRange(a, b) { animateTo(SPAN / Math.max(10, (b - a) * 1.08), (a + b) / 2); }
  function hFocus(id, minZoom) {
    const e = byId.get(id);
    if (e) animateTo(Math.max(hv.z, minZoom || 1), e.year, 450);
  }

  $("#hv-in").addEventListener("click", () => animateTo(hv.z * 2));
  $("#hv-out").addEventListener("click", () => animateTo(hv.z / 2));
  $("#hv-fit").addEventListener("click", () => animateTo(1, (Y0 + Y1) / 2));

  // ---- mouse wheel / trackpad: zoom around the cursor, eased; sideways = pan ----
  const wheel = { active: false, target: 1, sx: 0, year: 0 };
  hv.vp.addEventListener("wheel", (ev) => {
    const unit = ev.deltaMode === 1 ? 33 : ev.deltaMode === 2 ? 400 : 1;
    const dx = ev.deltaX * unit, dy = ev.deltaY * unit;
    const sideways = !ev.ctrlKey && (Math.abs(dx) > Math.abs(dy) || ev.shiftKey);
    ev.preventDefault();               // keeps the page (and browser zoom) out of it
    if (sideways) {
      if (!wheel.active) startGesture();
      panBy(-(Math.abs(dx) > Math.abs(dy) ? dx : dy));
      scheduleCommit(150);
      return;
    }
    const sx = localX(ev.clientX);
    if (!wheel.active) {
      startGesture();
      wheel.active = true;
      wheel.target = hv.z;
    }
    wheel.sx = sx;
    wheel.year = yearAtX(sx);
    wheel.target = clampZ(wheel.target * Math.exp(-dy * (ev.ctrlKey ? 0.01 : 0.0022)));
    cancelAnimationFrame(wheelRaf);
    const step = () => {
      const lz = Math.log(hv.z), lt = Math.log(wheel.target);
      const next = Math.abs(lt - lz) < 0.002 ? wheel.target : Math.exp(lz + (lt - lz) * (reduce ? 1 : 0.3));
      zoomAround(next, wheel.sx, wheel.year);
      if (next !== wheel.target) wheelRaf = requestAnimationFrame(step);
      else { wheel.active = false; scheduleCommit(140); }
    };
    wheelRaf = requestAnimationFrame(step);
  }, { passive: false });

  // ---- touch and mouse: drag/swipe to pan, two fingers to pinch-zoom ----
  // The timeline handles sideways moves and pinches itself (CSS touch-action:
  // pan-y), so the browser only scrolls the page up and down here and never
  // zooms the page inside the timeline.
  const ptrs = new Map();
  let g = null;                 // current gesture
  let lastMoves = [];           // for the gentle glide after a swipe
  function gestureBaseline() {
    const p = [...ptrs.values()];
    if (p.length >= 2) {
      const mid = (p[0].x + p[1].x) / 2;
      g = { kind: "pinch", d: Math.max(20, Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y)), z: hv.z, year: yearAtX(localX(mid)) };
    } else if (p.length === 1) {
      g = { kind: "pan", x: p[0].x, ox: hv.ox, started: g ? g.started : false };
    } else g = null;
  }
  hv.vp.addEventListener("pointerdown", (ev) => {
    if (ev.pointerType === "mouse" && ev.button !== 0) return;
    stopAnimations();
    ptrs.set(ev.pointerId, { x: ev.clientX, y: ev.clientY, type: ev.pointerType });
    if (ptrs.size === 1) { hv.dragged = false; lastMoves = []; }
    gestureBaseline();
    if (ptrs.size === 2) { startGesture(); hv.dragged = true; }
  });
  hv.vp.addEventListener("pointermove", (ev) => {
    const p = ptrs.get(ev.pointerId);
    if (!p || !g) return;
    p.x = ev.clientX; p.y = ev.clientY;
    if (g.kind === "pinch" && ptrs.size >= 2) {
      const q2 = [...ptrs.values()];
      const d = Math.max(20, Math.hypot(q2[0].x - q2[1].x, q2[0].y - q2[1].y));
      const mid = (q2[0].x + q2[1].x) / 2;
      zoomAround(g.z * d / g.d, localX(mid), g.year);   // follows the fingers, pans with them too
      return;
    }
    if (g.kind === "pan") {
      const dx = ev.clientX - g.x;
      if (!g.started && Math.abs(dx) > 5) {
        g.started = true; hv.dragged = true; startGesture();
        hv.vp.classList.add("grabbing");
        try { hv.vp.setPointerCapture(ev.pointerId); } catch (_) { /* ignore */ }
      }
      if (g.started) {
        hv.ox = clampOx(hv.z, g.ox + dx);
        applyTransform();
        const now = performance.now();
        lastMoves.push({ t: now, x: ev.clientX });
        while (lastMoves.length > 2 && now - lastMoves[0].t > 100) lastMoves.shift();
      }
    }
  });
  function endPointer(ev, cancelled) {
    if (!ptrs.has(ev.pointerId)) return;
    ptrs.delete(ev.pointerId);
    const wasPinch = g && g.kind === "pinch";
    if (ptrs.size > 0) { gestureBaseline(); if (g && g.kind === "pan") g.started = true; return; }
    const wasPan = g && g.kind === "pan" && g.started;
    g = null;
    hv.vp.classList.remove("grabbing");
    // a gentle glide after a quick swipe, like a map
    if (wasPan && !cancelled && !reduce && lastMoves.length >= 2) {
      const a = lastMoves[0], b = lastMoves[lastMoves.length - 1];
      let v = (b.x - a.x) / Math.max(16, b.t - a.t);          // px per ms
      if (Math.abs(v) > 0.25 && performance.now() - b.t < 80) {
        let tPrev = performance.now();
        const glide = (now) => {
          const dt = now - tPrev; tPrev = now;
          const before = hv.ox;
          panBy(v * dt);
          v *= Math.pow(0.94, dt / 16);
          if (Math.abs(v) > 0.02 && hv.ox !== before) inertiaRaf = requestAnimationFrame(glide);
          else scheduleCommit(0);
        };
        inertiaRaf = requestAnimationFrame(glide);
        return;
      }
    }
    if (wasPan || wasPinch) scheduleCommit(wasPinch ? 0 : 60);
  }
  hv.vp.addEventListener("pointerup", (ev) => endPointer(ev, false));
  hv.vp.addEventListener("pointercancel", (ev) => endPointer(ev, true));
  hv.vp.addEventListener("lostpointercapture", (ev) => { if (ptrs.has(ev.pointerId) && ev.pointerType === "mouse") endPointer(ev, false); });
  // Safari (iPhone) has its own pinch events: keep them from zooming the page here
  ["gesturestart", "gesturechange"].forEach((t) => hv.vp.addEventListener(t, (ev) => ev.preventDefault(), { passive: false }));
  hv.vp.addEventListener("click", (ev) => {
    if (hv.dragged) { ev.stopPropagation(); ev.preventDefault(); hv.dragged = false; }
  }, true);

  // ---- keyboard: + and - zoom, arrows move ----
  hv.vp.addEventListener("keydown", (ev) => {
    const k = ev.key;
    if (k === "+" || k === "=") { ev.preventDefault(); animateTo(hv.z * 1.6); }
    else if (k === "-" || k === "_") { ev.preventDefault(); animateTo(hv.z / 1.6); }
    else if (k === "ArrowLeft" || k === "ArrowRight") {
      ev.preventDefault();
      const W = vpW();
      animateTo(hv.z, yearAtX(W / 2 + (k === "ArrowLeft" ? -1 : 1) * W * 0.3), 220);
    }
    else if (k === "Home") { ev.preventDefault(); animateTo(hv.z, Y0, 300); }
    else if (k === "End") { ev.preventDefault(); animateTo(hv.z, Y1, 300); }
  });

  // hover preview
  function hideTip() { hv.tip.hidden = true; }
  hv.track.addEventListener("pointerover", (ev) => {
    if (ev.pointerType === "touch" || g || hv.track.classList.contains("gesturing")) return;
    const m = ev.target.closest("[data-hv]");
    if (!m) return;
    const e = byId.get(m.dataset.hv);
    const sum = e.type === "father" ? e.title : e.summary;
    hv.tip.dataset.type = e.type;
    hv.tip.innerHTML = `<span class="kind"><span class="badge">${icon(e.type)}</span>${esc(TYPES[e.type].label)}</span>
      <strong>${esc(e.name)}</strong><span class="tip-date">${esc(e.type === "father" ? e.life : e.date)}</span>
      <span class="tip-sum">${esc(sum.length > 170 ? sum.slice(0, 168).trimEnd() + "…" : sum)}</span>
      <span class="tip-hint">Click for details and reading links</span>`;
    hv.tip.hidden = false;
    const r = m.getBoundingClientRect(), tw = hv.tip.offsetWidth, th = hv.tip.offsetHeight;
    let left = Math.min(window.innerWidth - tw - 12, Math.max(12, r.left + r.width / 2 - tw / 2));
    let top = r.top - th - 10;
    if (top < 70) top = r.bottom + 10;
    hv.tip.style.left = left + "px";
    hv.tip.style.top = top + "px";
  });
  hv.track.addEventListener("pointerout", (ev) => {
    const m = ev.target.closest("[data-hv]");
    if (m && !m.contains(ev.relatedTarget)) hideTip();
  });

  // keep the controls just under the sticky toolbar so the whole line is on screen
  function bringHviewIntoPlace(force) {
    const bar = document.querySelector(".toolbar");
    const top = $("#hview").getBoundingClientRect().top - (bar ? bar.offsetHeight : 0);
    if (force || Math.abs(top) > 40) scrollToEl($("#hview"));
  }

  // switching views
  function sizeViewport() {
    const bar = document.querySelector(".toolbar");
    const ctl = $("#hv-controls");
    const pb = path ? 72 : 0;
    const h = window.innerHeight - (bar ? bar.offsetHeight : 0) - (ctl ? ctl.offsetHeight : 0) - pb - 24;
    hv.vp.style.height = Math.max(380, Math.min(820, h)) + "px";
  }
  function setView(v, opts) {
    view = v;
    try { localStorage.setItem("orthodox-timeline-view", v); } catch (_) { /* ignore */ }
    document.querySelectorAll("[data-view]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.view === v)));
    $("#timeline").hidden = v === "h";
    $("#hview").hidden = v !== "h";
    document.body.classList.toggle("hview-on", v === "h");
    if (v === "h") {
      sizeViewport();
      hv.pad = padFor(vpW());
      hv.z = 1;
      hv.ox = hv.pad;
      hRender();
      if (!(opts && opts.stay)) bringHviewIntoPlace(true);
    } else {
      render();
    }
  }
  document.querySelectorAll("[data-view]").forEach((b) => b.addEventListener("click", () => {
    if (b.dataset.view !== view) setView(b.dataset.view);
  }));

  function jumpToVertical(id) {
    if (!visible.some((e) => e.id === id)) { setType("all"); state.q = ""; $("#search").value = ""; }
    closePanel();
    setView("v", { stay: true });
    const el = document.querySelector(`.entry[data-id="${CSS.escape(id)}"]`);
    if (!el) return;
    el.classList.add("in", "flash");
    setTimeout(() => el.classList.remove("flash"), 2600);
    scrollToEl(el, true);
  }

  let rt = 0;
  window.addEventListener("resize", () => {
    if (view !== "h") return;
    clearTimeout(rt);
    rt = setTimeout(() => {
      const mid = yearAtX(vpW() / 2);       // keep the same year in the middle
      sizeViewport();
      hv.pad = padFor(vpW());
      hv.z = clampZ(hv.z);
      hv.ox = vpW() / 2 - (mid - Y0) * ppyAt(hv.z);
      hRender();
    }, 150);
  });

  // ---------- go ----------
  render();
  try { if (localStorage.getItem("orthodox-timeline-view") === "h") setView("h", { stay: true }); } catch (_) { /* ignore */ }

  function fromHash() {
    const h = decodeURIComponent(location.hash.slice(1));
    if (h === "paths") { openPaths(); return; }
    if (h.startsWith("path-") && pathById.has(h.slice(5))) { if (!path || path.p.id !== h.slice(5)) startPath(h.slice(5)); return; }
    if (byId.has(h)) openEntry(h);
  }
  window.addEventListener("hashchange", fromHash);
  fromHash();

  // ---------- installable app: offline support ----------
  // Reading links open other websites, which need internet. If the phone is
  // offline, show a gentle note instead of a browser error page.
  let toastTimer = 0;
  function showToast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.hidden = false;
    requestAnimationFrame(() => t.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => { t.hidden = true; }, 300);
    }, 6000);
  }
  document.addEventListener("click", (ev) => {
    const a = ev.target.closest && ev.target.closest("a[href]");
    if (!a || navigator.onLine !== false) return;
    let url;
    try { url = new URL(a.href, location.href); } catch (_) { return; }
    if (url.origin === location.origin || !/^https?:$/.test(url.protocol)) return;
    ev.preventDefault();
    showToast("You're offline. Reading links open other websites, so they need an internet connection. Everything else in the app works offline.");
  }, true);

  // Register the service worker (only on a real web address, not when the
  // file is opened straight from the computer).
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js")
        .then((reg) => reg.update())
        .catch(() => { /* not available here (for example in a preview): the site still works */ });
    });
  }
})();
