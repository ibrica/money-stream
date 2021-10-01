
/**
 * Send solana wallet object to background
 */
/*
let extensionId = "jjpefebophfhheaocdffklbcjmmddkfd";

chrome.runtime.sendMessage(extensionId, {openUrlInEditor: "https://google.com", solana: window['solana']}, function(response) {
    console.log(response);
    if (!response.success)
        handleError();
});
function handleError() {
    console.log("Send message error!");
}

https://www.freecodecamp.org/news/chrome-extension-message-passing-essentials/

*/
console.log("Sending")
function parseSolanaDetails() {
    let main = {solana: null};

    main.solana = JSON.parse(JSON.stringify(window['solana'])) || null;

    return main;
}

setTimeout(() => {
    let solana = parseSolanaDetails();
    window.postMessage({ type: "FROM_PAGE", solana },"*");
}, 1000);



