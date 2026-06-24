/* 凌網 spec 圖片增補：把 Banner 佔位漸層換成海洋主題照（非侵入，僅預覽示意）*/
(function () {
  function enhance() {
    // Banner：找高度 340px 的輪播容器，內層加上主題照
    var banner = document.querySelector('div[style*="height:340px"], div[style*="height: 340px"]');
    if (banner) {
      var inner = banner.querySelector('a > div') || banner.querySelector('a');
      if (inner) {
        inner.style.backgroundImage =
          "linear-gradient(115deg, rgba(8,20,45,.84), rgba(8,30,70,.48)), url('../assets/img/hero-ocean.jpg')";
        inner.style.backgroundSize = "cover";
        inner.style.backgroundPosition = "center";
      }
    }
    // 角落浮水印提示：本頁圖片為預覽示意
    var note = document.createElement('div');
    note.textContent = '＊圖片為預覽示意（凌網 spec 原為純色佔位框）';
    note.style.cssText =
      'position:fixed;left:12px;bottom:12px;z-index:9999;background:rgba(17,17,17,.82);color:#fff;' +
      'font-size:12px;padding:6px 12px;border-radius:8px;font-family:system-ui,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,.25)';
    document.body.appendChild(note);

    // 回提案首頁
    var back = document.createElement('a');
    back.href = '../index.html';
    back.textContent = '← 回版型提案';
    back.style.cssText =
      'position:fixed;right:16px;bottom:16px;z-index:9999;background:#0463b8;color:#fff;text-decoration:none;' +
      'font-size:13px;font-weight:700;padding:10px 18px;border-radius:999px;font-family:system-ui,sans-serif;box-shadow:0 6px 18px rgba(0,0,0,.25)';
    document.body.appendChild(back);
  }
  if (document.readyState !== 'loading') enhance();
  else document.addEventListener('DOMContentLoaded', enhance);
})();
