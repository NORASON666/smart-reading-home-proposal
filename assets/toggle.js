/* ============================================================
   ⚙ 區塊面板 — 讓使用者即時 show/hide 首頁區塊
   用法：每個可開關區塊加 data-block="id" data-block-label="顯示名稱"
        （可選 data-block-locked 表示「必留」不可關，例如頁首焦點）
   狀態存 localStorage，依頁面 key 區隔（A/B/C 各記各的）
   ============================================================ */
(function () {
  "use strict";

  var pageKey = "smart-reading-blocks:" + (document.body.dataset.version || "x");

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var blocks = Array.prototype.slice.call(document.querySelectorAll("[data-block]"));
    if (!blocks.length) return;

    // 讀取記憶
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(pageKey) || "{}"); } catch (e) {}

    // 建立浮動按鈕
    var btn = document.createElement("button");
    btn.className = "panel-toggle";
    btn.type = "button";
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = '<span class="panel-toggle__gear">⚙</span><span class="label">自由拼版面</span>';

    // 建立面板
    var panel = document.createElement("div");
    panel.className = "panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "首頁區塊調整");

    var head = document.createElement("div");
    head.className = "panel__head";
    head.innerHTML = "<h3>⚙ 自由拼版面</h3><p>勾選＝顯示、取消＝隱藏。試試看拿掉哪些區塊，首頁就清爽了。</p>";
    panel.appendChild(head);

    var list = document.createElement("div");
    list.className = "panel__list";
    panel.appendChild(list);

    blocks.forEach(function (el, i) {
      var id = el.dataset.block;
      var label = el.dataset.blockLabel || id;
      var locked = el.hasAttribute("data-block-locked");

      // 套用記憶
      if (!locked && saved[id] === false) el.classList.add("is-hidden");

      var row = document.createElement("label");
      row.className = "panel__item";
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = !el.classList.contains("is-hidden");
      cb.disabled = locked;
      cb.dataset.target = id;

      var name = document.createElement("span");
      name.textContent = label;
      row.appendChild(cb);
      row.appendChild(name);

      if (locked) {
        var lk = document.createElement("small");
        lk.textContent = "必留";
        row.appendChild(lk);
      }

      cb.addEventListener("change", function () {
        el.classList.toggle("is-hidden", !cb.checked);
        persist();
        updateCount();
      });

      list.appendChild(row);
    });

    var foot = document.createElement("div");
    foot.className = "panel__foot";
    var count = document.createElement("div");
    count.className = "panel__count";
    var reset = document.createElement("button");
    reset.className = "panel__reset";
    reset.type = "button";
    reset.textContent = "↺ 全部還原";
    foot.appendChild(count);
    foot.appendChild(reset);
    panel.appendChild(foot);

    document.body.appendChild(panel);
    document.body.appendChild(btn);

    function persist() {
      var state = {};
      blocks.forEach(function (el) { state[el.dataset.block] = !el.classList.contains("is-hidden"); });
      try { localStorage.setItem(pageKey, JSON.stringify(state)); } catch (e) {}
    }

    function updateCount() {
      var vis = blocks.filter(function (el) { return !el.classList.contains("is-hidden"); }).length;
      count.innerHTML = "目前顯示 <b>" + vis + "</b> / " + blocks.length + " 區塊";
    }

    reset.addEventListener("click", function () {
      blocks.forEach(function (el) { el.classList.remove("is-hidden"); });
      list.querySelectorAll("input").forEach(function (cb) { cb.checked = true; });
      try { localStorage.removeItem(pageKey); } catch (e) {}
      updateCount();
    });

    function open(v) {
      panel.classList.toggle("is-open", v);
      btn.setAttribute("aria-expanded", String(v));
    }
    btn.addEventListener("click", function () { open(!panel.classList.contains("is-open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") open(false); });
    document.addEventListener("click", function (e) {
      if (!panel.contains(e.target) && !btn.contains(e.target)) open(false);
    });

    updateCount();
  });
})();
