//   const interceptor = chrome.runtime.getURL("interceptor.js");
//   const script = document.createElement('script');
// //   const textnode = document.createTextNode(interceptor);
// //   script.appendChild(textnode);
//   script.src = interceptor;
//   document.documentElement.append(script);
//   script.onload = function(){
//     console.log('Script interceptor.js injected.')
//   }

//   chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
//     console.log(tabs[0].url);
//     console.log(tabs[0].id);
//     my_tabid=tabs[0].id;
// }); 
// alert(my_tabid);

// chrome.scripting.executeScript(
// {
//     target: {tabId: my_tabid},
//     files: ['interceptor.js'],
// });

/*
 * Copyright © 2022 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 */

const nullthrows = (v) => {
  if (v == null) throw new Error("it's a null");
  return v;
}

function injectCode(src) {
  const script = document.createElement('script');
  // This is why it works!
  script.type = "text/javascript";
  script.src = src;
  script.onload = function () {
        console.log("script injected");
        //this.remove();
  };

  // This script runs before the <head> element is created,
  // so we add the script to <html> instead.
  nullthrows(document.head || document.documentElement).appendChild(script);
}


injectCode(chrome.runtime.getURL("/static/js/interceptor.js"));