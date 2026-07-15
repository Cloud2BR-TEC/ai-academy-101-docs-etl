(function () {
  function applyExternalLinkTargets() {
    document.querySelectorAll("a[href]").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href && (href.startsWith("http://") || href.startsWith("https://"))) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyExternalLinkTargets);
  } else {
    applyExternalLinkTargets();
  }
})();
