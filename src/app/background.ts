window['solanaWatch'] = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    window['solanaWatch'][sender.tab.id] = message.solanaJSON || null;
});
