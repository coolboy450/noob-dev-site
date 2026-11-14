/* วาดตัวละครพิกเซลด้วย SVG: H=ผม F=หน้า E=ตา G=แว่น B=เสื้อ L=ขา */
(function () {
  var MAP = ["..HHHH..", ".HHHHHH.", ".HFFFFH.", ".FEFFEF.", ".FFFFFF.", "..BBBB..", ".BBBBBB.", "FBBBBBBF", "..LLLL..", "..L..L.."];
  var GLASSES = ["..HHHH..", ".HHHHHH.", ".HFFFFH.", ".GEGGEG.", ".FFFFFF.", "..BBBB..", ".BBBBBB.", "FBBBBBBF", "..LLLL..", "..L..L.."];
  /* สีผม/เสื้อ/ขาใช้ --muted/--text/--pop/--warn ให้คอนทราสต์ ≥3:1 บน --surface; accent เก็บไว้ที่เคอร์เซอร์ */
  var CREW = [
    { n: "มินท์", h: "var(--pop)", b: "var(--text)" },
    { n: "บิต", h: "var(--muted)", b: "var(--muted)" },
    { n: "ป๊อป", h: "var(--text)", b: "var(--pop)" },    /* hair ≠ face colour in both themes (white on yellow / black on orange) */
    { n: "ครูแว่น", h: "var(--muted)", b: "var(--text)", g: 1 },
    { n: "แบงก์", h: "var(--text)", b: "var(--muted)" }   /* shirt no longer the face colour */
  ];
  function sprite(c, hide) {
    var col = { H: c.h, F: "var(--warn)", E: "var(--bg)", G: "var(--bg)", B: c.b, L: "var(--muted)" };
    var attr = hide ? 'aria-hidden="true"' : 'role="img" aria-label="ตัวละครพิกเซลของ' + c.n + '"';
    var s = '<svg class="spr" viewBox="0 0 8 10" ' + attr + ' shape-rendering="crispEdges">';
    (c.g ? GLASSES : MAP).forEach(function (row, y) {
      for (var x = 0; x < row.length; x++) {
        var k = row[x];
        if (k !== ".") s += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + col[k] + '"/>';
      }
    });
    return s + "</svg>";
  }
  document.querySelectorAll("[data-sprite]").forEach(function (el) {
    var c = CREW[+el.getAttribute("data-sprite")];
    /* svg ในลิงก์ (หน้าแรก) ซ่อนจาก screen reader เพราะชื่ออยู่ในลิงก์แล้ว */
    if (c) el.insertAdjacentHTML("afterbegin", sprite(c, !!el.closest("a")));
  });
})();
