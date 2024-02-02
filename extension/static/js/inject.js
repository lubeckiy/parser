document.addEventListener("DOMContentLoaded", function() {
  const script = document.createElement('script');
  script.type = "text/javascript";
  script.src = chrome.runtime.getURL("/static/js/interceptor.js");
  script.onload = function () {
    console.log("script injected");
  };
  document.head.appendChild(script)
});