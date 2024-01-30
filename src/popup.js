// popup.js
document.addEventListener("DOMContentLoaded", function () {
    var parseButton = document.getElementById("parseButton");
    if (parseButton) {
      parseButton.addEventListener("click", function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          const port = chrome.tabs.connect(tabs[0].id);
          port.postMessage({ action: "parsePage" });
        });
      });
    }
  });
  