/*
 * CB² REPORT — renders BRIEFS (from js/data.js) into the page.
 * You shouldn't need to edit this file — add content in js/data.js instead.
 */

(function () {
  // ---- Masthead date line (updates to "today" automatically) ----
  const LAUNCH_YEAR = 2026;
  const today = new Date();
  const vol = Math.max(1, today.getFullYear() - LAUNCH_YEAR + 1);
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const mastheadMeta = document.getElementById("masthead-meta");
  if (mastheadMeta) {
    mastheadMeta.textContent = `Vol. ${vol} · ${dateStr}`;
  }

  // ---- Render briefs ----
  const container = document.getElementById("briefs-container");
  const briefs = (typeof BRIEFS !== "undefined" ? BRIEFS : []).slice();

  if (!briefs.length) {
    container.innerHTML = `
      <div class="empty-state">
        <p class="empty-state-title">No briefs published yet.</p>
        <p class="empty-state-sub">
          New intelligence briefs and write-ups will appear here.
          Add your first one in <code>js/data.js</code>.
        </p>
      </div>
    `;
    return;
  }

  // Newest first
  briefs.sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatDate = (iso) => {
    const d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const cardHTML = (brief, isLead) => {
    const tag = brief.category
      ? `<span class="brief-category">${escapeHTML(brief.category)}</span>`
      : "";
    const titleInner = escapeHTML(brief.title || "Untitled brief");
    const titleHTML = brief.link
      ? `<a href="${escapeAttr(brief.link)}" target="_blank" rel="noopener">${titleInner}</a>`
      : titleInner;

    return `
      <article class="brief-card ${isLead ? "brief-card--lead" : ""}">
        ${tag}
        <h3 class="brief-title">${titleHTML}</h3>
        <p class="brief-date">${formatDate(brief.date)}</p>
        <p class="brief-summary">${escapeHTML(brief.summary || "")}</p>
        ${brief.link ? `<a class="brief-readmore" href="${escapeAttr(brief.link)}" target="_blank" rel="noopener">Read brief →</a>` : `<span class="brief-readmore brief-readmore--disabled">Full write-up coming soon</span>`}
      </article>
    `;
  };

  const [lead, ...rest] = briefs;
  let html = `<div class="briefs-lead">${cardHTML(lead, true)}</div>`;
  if (rest.length) {
    html += `<div class="briefs-grid">${rest.map((b) => cardHTML(b, false)).join("")}</div>`;
  }
  container.innerHTML = html;

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function escapeAttr(str) {
    return String(str).replace(/"/g, "&quot;");
  }
})();
