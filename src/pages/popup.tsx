import * as React from "react"
import {Component, MouseEvent, StrictMode} from "react"
import {render} from "react-dom"
import Wallet from './wallet'
import {SendOneLamportToRandomAddress} from "./send"

// Require instead of import, webpack?
require('../styles/popup.css');

window.addEventListener('DOMContentLoaded', () => {
    let bg = chrome.extension.getBackgroundPage();

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        console.log(bg['solanaWatch']);
        let currentTabId = tabs[0].id;
        let solanaWatch = bg['solanaWatch'][currentTabId];
        // Finaly insert solana wallet extension data here, so wallet adapter can work
        window['solana'] = solanaWatch.solana;

    });
});



export class ConnectButton extends Component {
    render() {
        return (
            <div className="popup-padded">
            <h1>Hello</h1>
                <StrictMode>
                    <Wallet />
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


