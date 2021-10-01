
console.log(window.location);

/* Doesn't work
chrome.runtime.getBackgroundPage((backgroundPage?: Window) => {
    if(backgroundPage){
        window['solana'] = backgroundPage['solana']; // Avoid typescript error,  access as collection 
    }
    console.log("Callback");
    console.log(backgroundPage.location);
});
*/




