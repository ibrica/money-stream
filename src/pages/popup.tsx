import * as React from "react"
import {Component, MouseEvent, StrictMode} from "react"
import {render} from "react-dom"
import Wallet from './wallet'
import {SendOneLamportToRandomAddress} from "./send"

// Require instead of import, webpack?
require('../styles/popup.css');

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
)


