(function () {
  function initMermaid() {
    if (typeof mermaid === "undefined") {
      return;
    }

    mermaid.initialize({ startOnLoad: true, theme: "default" });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMermaid);
  } else {
    initMermaid();
  }
})();
