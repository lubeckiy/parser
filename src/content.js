// content.js
chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
      if (msg.action === "parsePage") {
        const h1Element = document.querySelector("h1");
        if (h1Element) {
          console.log("H1 Header Content:", h1Element.textContent);
        }
      }
    });
  });
  