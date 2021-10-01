window['solanaWatch'] = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    window['solanaWatch'][sender.tab.id] = message.solana || null;
});
