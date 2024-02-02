const nullthrows = (v) => {
  if (v == null) throw new Error("it's a null");
  return v;
}

function injectCode(src) {
  const script = document.createElement('script');
  script.type = "text/javascript";
  script.src = src;
  script.onload = function () {
        console.log("script injected");
        //this.remove();
  };
  nullthrows(document.head || document.documentElement).appendChild(script);
}


injectCode(chrome.runtime.getURL("/static/js/interceptor.js"));