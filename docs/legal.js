(function () {
  var LANGS = [
    { code: "es", label: "Español" },
    { code: "en", label: "English" },
    { code: "pt", label: "Português" },
    { code: "fr", label: "Français" },
    { code: "it", label: "Italiano" },
    { code: "de", label: "Deutsch" },
  ];

  var ARIA_LABELS = {
    es: "Idioma",
    en: "Language",
    pt: "Idioma",
    fr: "Langue",
    it: "Lingua",
    de: "Sprache",
  };

  var select = document.getElementById("legal-lang");
  if (!select) return;

  var pageType = select.getAttribute("data-page-type");
  var currentLang = select.getAttribute("data-current-lang");
  if (!pageType || !currentLang) return;

  select.setAttribute("aria-label", ARIA_LABELS[currentLang] || "Language");

  var langFilter = select.getAttribute("data-langs");
  var langs = LANGS;
  if (langFilter) {
    var allowed = langFilter.split(",").map(function (s) {
      return s.trim();
    });
    langs = LANGS.filter(function (lang) {
      return allowed.indexOf(lang.code) >= 0;
    });
  }

  langs.forEach(function (lang) {
    var option = document.createElement("option");
    option.value = pageType + "-" + lang.code + ".html";
    option.textContent = lang.label;
    if (lang.code === currentLang) option.selected = true;
    select.appendChild(option);
  });

  select.addEventListener("change", function () {
    if (select.value) window.location.href = select.value;
  });
})();
