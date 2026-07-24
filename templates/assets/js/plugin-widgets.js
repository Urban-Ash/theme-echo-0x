(function () {
  var patchTimer = null;

  function createCommentBridgeStyle(root) {
    var style = root.getElementById("echo-comment-widget-bridge");
    if (style) {
      return style;
    }

    style = document.createElement("style");
    style.id = "echo-comment-widget-bridge";
    style.textContent =
      ".form-login-link,.form-login,.form-logout{display:none !important;}" +
      ".form__footer{gap:.85rem;align-items:center;}" +
      ".form-actions{margin-left:auto;}" +
      ".form-submit{background:var(--accent-config,#e63946) !important;border-color:var(--accent-config,#e63946) !important;}" +
      ".form-submit:hover{opacity:.92;}" +
      ".input:focus,.form textarea:focus,.form input:focus{outline:none;}";
    root.appendChild(style);
    return style;
  }

  function patchShadowTree(root) {
    if (!root || !root.querySelectorAll) {
      return;
    }

    createCommentBridgeStyle(root);
    root.querySelectorAll("*").forEach(function (node) {
      if (node.shadowRoot) {
        patchShadowTree(node.shadowRoot);
      }
    });
  }

  function patchCommentWidgets() {
    document.querySelectorAll("comment-widget").forEach(function (widget) {
      if (widget.shadowRoot) {
        patchShadowTree(widget.shadowRoot);
      }
    });
  }

  function scheduleCommentPatch() {
    window.clearTimeout(patchTimer);
    patchTimer = window.setTimeout(function () {
      patchCommentWidgets();
      window.setTimeout(patchCommentWidgets, 240);
      window.setTimeout(patchCommentWidgets, 720);
    }, 80);
  }

  function openSearchWidget() {
    var retries = 0;

    function tryOpen() {
      if (window.SearchWidget && typeof window.SearchWidget.open === "function") {
        window.SearchWidget.open();
        return;
      }

      retries += 1;
      if (retries < 12) {
        window.setTimeout(tryOpen, 180);
      }
    }

    tryOpen();
  }

  function init() {
    scheduleCommentPatch();
    if (window.customElements && typeof window.customElements.whenDefined === "function") {
      window.customElements.whenDefined("comment-widget").then(scheduleCommentPatch).catch(function () {});
    }
    document.addEventListener("echo:page-ready", scheduleCommentPatch);
    window.addEventListener("pageshow", scheduleCommentPatch);
  }

  window.EchoPluginWidgets = window.EchoPluginWidgets || {};
  window.EchoPluginWidgets.openSearchWidget = openSearchWidget;
  window.EchoPluginWidgets.scheduleCommentPatch = scheduleCommentPatch;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
