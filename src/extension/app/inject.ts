/**
 * injectScript - Inject internal script to available access to the `window`, needed for Solana wallet
 * As with content scripts, manifest must be V2!!!
 *
 * @param  {string} file_path Local path of the internal script.
 * @param  {string} tag The tag as string, where the script will be append (default: 'body').
 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
 * @see    {@link https://gist.github.com/devjin0617/3e8d72d94c1b9e69690717a219644c7a}
 */
 function injectScript(file_path: string, tag: string) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}
injectScript(chrome.extension.getURL('content.js'), 'body');
// TODO: New tab problem, maybe something like: https://gist.github.com/danharper/8364399
/* Think about this https://stackoverflow.com/questions/53289557/chrome-extension-best-way-to-send-messages-from-injected-script-to-background

script.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
*/

window.addEventListener('message', function(event) {
    // only accept messages from the current tab
    if (event.source != window){
        return;
    }

    if(event.data.type 
        && (event.data.type === "FROM_PAGE")
        && typeof chrome['app'].isInstalled !== 'undefined') {
           chrome.runtime.sendMessage({type: "FROM_PAGE",text: "Hello from content"});
           console.log("Hello from content");
    
    }
}, false);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type && message.type === "FROM_EXT"){
        console.log("Message from from extension");
    }
});


