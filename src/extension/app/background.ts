window['pageLocation'] = "";

chrome.extension['onConnect'].addListener(function(port) {
  port.onMessage.addListener(function(msg) {
       console.log("message recieved: " + msg);
       port.postMessage("Hi Popup.js");
  });
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  if (message.source === 'FROM_PAGE'){
    switch(message.command){
      case 'LOCATION': // switch to our page where bg logic is
        console.log(message.text);
        if (message.text !== 'localhost:9000'){
          // chrome.tabs.create({ url: 'http://localhost:9000/'}); // TODO: Save in config and host the page
        }    
        break;     
    }
  }

});

/*
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { type: "FROM_EXT", text: "Hi"}, null);
          */
