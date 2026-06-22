/* ============================================================
   ⚙ 自由拼版面 — 開關區塊 + 滑鼠拖曳排序
   用法：每個可開關區塊加 data-block="id" data-block-label="顯示名稱"
        （可選 data-block-locked 表示「必留」不可隱藏，但仍可排序）
   狀態（顯示/隱藏 + 順序）存 localStorage，依頁面 key 區隔（各版各記）
   ============================================================ */
(function () {
  "use strict";

  var version = (document.body.dataset.version || "x");
  var keyVis = "smart-reading-blocks:" + version;
  var keyOrd = "smart-reading-order:" + version;

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var blocks = Array.prototype.slice.call(document.querySelectorAll("[data-block]"));
    if (!blocks.length) return;

    var parent = blocks[0].parentNode;          // 所有區塊的共同父層（<main>）
    var map = {};
    blocks.forEach(function (b) { map[b.dataset.block] = b; });

    // ── 載入記憶 ──
    var savedVis = {}, savedOrd = [];
    try { savedVis = JSON.parse(localStorage.getItem(keyVis) || "{}"); } catch (e) {}
    try { savedOrd = JSON.parse(localStorage.getItem(keyOrd) || "[]"); } catch (e) {}

    // 套用儲存的排序（把區塊依序 append 回父層）
    if (savedOrd.length) {
      savedOrd.forEach(function (id) { if (map[id]) parent.appendChild(map[id]); });
      blocks.forEach(function (b) { if (savedOrd.indexOf(b.dataset.block) < 0) parent.appendChild(b); });
      // 依新 DOM 順序重排 blocks 陣列
      blocks = Array.prototype.slice.call(parent.querySelectorAll(":scope > [data-block]"));
    }

    // ── 浮動按鈕 ──
    var btn = document.createElement("button");
    btn.className = "panel-toggle";
    btn.type = "button";
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = '<span class="panel-toggle__gear">⚙</span><span class="label">自由拼版面</span>';

    // ── 面板 ──
    var panel = document.createElement("div");
    panel.className = "panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "首頁區塊調整");

    var head = document.createElement("div");
    head.className = "panel__head";
    head.innerHTML = "<h3>⚙ 自由拼版面</h3><p>勾選＝顯示、取消＝隱藏；拖曳左側 ⠿ 可調整區塊上下順序。</p>";
    panel.appendChild(head);

    var list = document.createElement("div");
    list.className = "panel__list";
    panel.appendChild(list);

    blocks.forEach(function (el) {
      var id = el.dataset.block;
      var label = el.dataset.blockLabel || id;
      var locked = el.hasAttribute("data-block-locked");

      if (!locked && savedVis[id] === false) el.classList.add("is-hidden");

      var row = document.createElement("div");
      row.className = "panel__item";
      row.draggable = true;
      row.dataset.target = id;

      var handle = document.createElement("span");
      handle.className = "panel__drag";
      handle.textContent = "⠿";
      handle.title = "拖曳排序";

      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = !el.classList.contains("is-hidden");
      cb.disabled = locked;

      var name = document.createElement("span");
      name.className = "panel__name";
      name.textContent = label;

      row.appendChild(handle);
      row.appendChild(cb);
      row.appendChild(name);

      if (locked) {
        var lk = document.createElement("small");
        lk.textContent = "必留";
        row.appendChild(lk);
      }

      cb.addEventListener("change", function () {
        el.classList.toggle("is-hidden", !cb.checked);
        persistVis();
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

    // ── 拖曳排序 ──
    var dragging = null;
    list.addEventListener("dragstart", function (e) {
      var row = e.target.closest(".panel__item");
      if (!row) return;
      dragging = row;
      row.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    });
    list.addEventListener("dragend", function () {
      if (!dragging) return;
      dragging.classList.remove("dragging");
      dragging = null;
      syncSections();
      persistOrder();
    });
    list.addEventListener("dragover", function (e) {
      e.preventDefault();
      if (!dragging) return;
      var after = getAfter(e.clientY);
      if (after == null) list.appendChild(dragging);
      else list.insertBefore(dragging, after);
    });

    function getAfter(y) {
      var rows = Array.prototype.slice.call(list.querySelectorAll(".panel__item:not(.dragging)"));
      var closest = { offset: -Infinity, el: null };
      rows.forEach(function (row) {
        var box = row.getBoundingClientRect();
        var offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) closest = { offset: offset, el: row };
      });
      return closest.el;
    }

    function syncSections() {
      list.querySelectorAll(".panel__item").forEach(function (row) {
        var sec = map[row.dataset.target];
        if (sec) parent.appendChild(sec);   // 依面板順序重排版面區塊
      });
    }

    // ── 記憶 ──
    function persistVis() {
      var state = {};
      blocks.forEach(function (el) { state[el.dataset.block] = !el.classList.contains("is-hidden"); });
      try { localStorage.setItem(keyVis, JSON.stringify(state)); } catch (e) {}
    }
    function persistOrder() {
      var order = Array.prototype.slice.call(list.querySelectorAll(".panel__item")).map(function (r) { return r.dataset.target; });
      try { localStorage.setItem(keyOrd, JSON.stringify(order)); } catch (e) {}
    }
    function updateCount() {
      var vis = blocks.filter(function (el) { return !el.classList.contains("is-hidden"); }).length;
      count.innerHTML = "目前顯示 <b>" + vis + "</b> / " + blocks.length + " 區塊";
    }

    reset.addEventListener("click", function () {
      try { localStorage.removeItem(keyVis); localStorage.removeItem(keyOrd); } catch (e) {}
      location.reload();   // 還原成原始版面順序與顯示
    });

    // ── 開關面板 ──
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
