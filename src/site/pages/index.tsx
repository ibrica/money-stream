import * as React from "react"
import {Component, MouseEvent, StrictMode} from "react"
import {render} from "react-dom"
import Wallet from './wallet'
import {StartStreaming} from "./receive"

// Require instead of import, webpack?
import '../styles/popup.css';
/*
window.addEventListener('DOMContentLoaded', () => {
    let bg = chrome.extension.getBackgroundPage();

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        let currentTabId = tabs[0].id;
        chrome.tabs.sendMessage(tabs[0].id, {message: "hello"}, function(response) {
            console.log(response.farewell);
        });
    });
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
      console.log(response.farewell);
    });
  });


let port = chrome.extension['connect']({
    name: "Communication"
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
    console.log("message recieved" + msg);
});
*/

window.addEventListener('message', function(event) {
    // only accept messages from the current tab
    if (event.source != window){
        return;
    }
    if(event.data.source && (event.data.source === "FROM_PAGE")){
           console.log("window is listening")
    }
}, false);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.source){
        console.log("runtime is listening: " + message);
    }
});

export class ConnectButton extends Component {
    render() {
        return (
            <div className="popup-padded">
                <StrictMode>
                    <Wallet />
                    <StartStreaming />
                </StrictMode>
            </div>
        )
    }
}

// render method

render(
    <ConnectButton />,
    document.getElementById('app-container')
);


