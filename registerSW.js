if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("https://j4ii.github.io/SkyCast/sw.js", {
      scope: "https://j4ii.github.io/SkyCast",
    });
  });
}
