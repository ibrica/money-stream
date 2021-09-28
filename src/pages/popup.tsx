import * as React from "react"
import {Component, MouseEvent} from "react"
import {render} from "react-dom"
import {Wallet} from './wallet'
import {SendOneLamportToRandomAddress} from "./send"

import "../styles/popup.css"

export class ConnectButton extends Component {
    render() {
        return (
            <div className="popup-padded">
                <h1>Hello</h1>
                <button onClick={showWallet}>Show wallet</button>
                <br />
                <Wallet /><br/><br />
                <SendOneLamportToRandomAddress />
            </div>
        )
    }

}

// render method

render(
    <ConnectButton />,
    document.getElementById('app-container')
)

function showWallet(e : MouseEvent):void {
    e.preventDefault();
}

