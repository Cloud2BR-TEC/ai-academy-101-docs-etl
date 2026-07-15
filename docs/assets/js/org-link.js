(function () {
  var HOME_URL = "/ai-academy-101-docs-etl/";

  function pointLogoToHome() {
    document
      .querySelectorAll('a.md-logo, a[data-md-component="logo"], a.md-header__button.md-logo')
      .forEach(function (logo) {
        logo.setAttribute("href", HOME_URL);
        logo.removeAttribute("target");
        logo.removeAttribute("rel");
      });
  }

  function pointTitleToHome() {
    document.querySelectorAll(".md-header__title .md-ellipsis").forEach(function (title) {
      title.style.cursor = "pointer";
      title.addEventListener("click", function () {
        window.location.href = HOME_URL;
      });
    });
  }

  function init() {
    pointLogoToHome();
    pointTitleToHome();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
