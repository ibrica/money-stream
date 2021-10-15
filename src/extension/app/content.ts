

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
    window.postMessage({ source: 'FROM_PAGE', command: 'LOCATION', text: window.location.host},"*");
}, 1000);








