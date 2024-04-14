if (!self.define) {
  let e,
    s = {};
  const i = (i, n) => (
    (i = new URL(i + ".js", n).href),
    s[i] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, r) => {
    const t =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[t]) return;
    let o = {};
    const l = (e) => i(e, t),
      c = { module: { uri: t }, exports: o, require: l };
    s[t] = Promise.all(n.map((e) => c[e] || l(e))).then((e) => (r(...e), o));
  };
}
define(["https://j4ii.github.io/SkyCast/workbox-7cfec069"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        {
          url: "https://j4ii.github.io/SkyCast/assets/index-DerCBpdt.js",
          revision: null,
        },
        {
          url: "https://j4ii.github.io/SkyCast/assets/index-L84GmXnB.css",
          revision: null,
        },
        {
          url: "https://j4ii.github.io/SkyCast/index.html",
          revision: "e3fb45ea42ea7364fbb5858b922f53c2",
        },
        {
          url: "https://j4ii.github.io/SkyCast/registerSW.js",
          revision: "1872c500de691dce40960bb85481de07",
        },
        {
          url: "https://j4ii.github.io/SkyCast/manifest.webmanifest",
          revision: "aa81a2ef22ec325a1caf9c5fa063cf33",
        },
        {
          url: "https://j4ii.github.io/SkyCast/assets/01d.png",
          revision: null,
        },
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(
        e.createHandlerBoundToURL("https://j4ii.github.io/SkyCast/index.html")
      )
    );
});
