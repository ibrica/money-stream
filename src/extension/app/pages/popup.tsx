import * as React from "react"
import {Component, MouseEvent, StrictMode} from "react"
import {render} from "react-dom"
import {Wallet} from './wallet'


// Require instead of import, webpack?
import '../../styles/popup.css';

let port = chrome.extension['connect']({
    name: "Communication"
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
    console.log("message recieved" + msg);
});

export class ConnectButton extends Component {
    render() {
        return (
            <div className="popup-padded">
                <StrictMode>
                    <br />
                    <Wallet /><br/>   
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



