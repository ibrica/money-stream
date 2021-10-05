import * as React from "react"
import {Component, MouseEvent, StrictMode} from "react"
import {render} from "react-dom"
import {SendOneLamportToRandomAddress} from "./send"

// Require instead of import, webpack?
require('../styles/popup.css');
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

*/
let port = chrome.extension['connect']({
    name: "Sample Communication"
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
    console.log("message recieved" + msg);
});


export class ConnectButton extends Component {
    render() {
        return (
            <div className="popup-padded">
            <h1>Hello</h1>
                <StrictMode>
                    <SendOneLamportToRandomAddress />
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


