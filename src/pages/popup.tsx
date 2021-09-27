import * as React from "react"
import {render} from "react-dom"

import "../styles/popup.css"

class ConnectButton extends React.Component {
    render() {
        return (
            <div className="popup-padded">
                <h1>Hello</h1>
                <button>Hi, click </button>
            </div>
        )
    }
}

// --------------

render(
    <ConnectButton />,
    document.getElementById('app-container')
)