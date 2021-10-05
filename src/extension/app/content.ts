

// Using approach https://www.freecodecamp.org/news/chrome-extension-message-passing-essentials/
// Stringify-ing functions too
/*
function parseSolanaDetails() {
    let main = {solana: null};

    main.solana = JSONStringifyFunctions(window['solana']) || null;

    return main;
}

setTimeout(() => {
    let solanaJSON = parseSolanaDetails();
    window.postMessage({ type: "FROM_PAGE", solanaJSON },"*");
}, 1000);
*/

setTimeout(() => {
    window.postMessage({ type: "FROM_PAGE", text: "Hi"},"*");
}, 1000);

/*
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting === "hello")
        sendResponse({farewell: "goodbye"});
    }
  );
  */

/*
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(window.location);
    console.log(message.message)
   //    sendResponse({"message": "Alles gute"})
})  
*/






