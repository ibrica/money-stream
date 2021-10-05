window['solanaWatch'] = {};

chrome.extension['onConnect'].addListener(function(port) {
  console.log("Connected .....");
  port.onMessage.addListener(function(msg) {
       console.log("message recieved" + msg);
       port.postMessage("Hi Popup.js");
  });
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'FROM_PAGE'){
    // port.postMessage("Hi Popup.js");
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "FROM_EXT", text: "Hi"}, null);
    }); 
  }
});
