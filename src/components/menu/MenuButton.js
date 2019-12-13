import React from 'react';

import './MenuButton.css';

export default class MenuButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    onButtonPress = event => {
        if (this.props.onButtonPress != undefined) {
            this.props.onButtonPress(event);
        }
    }

    render() {
        return (
            <button 
                className="button-container"
                onClick={this.onButtonPress}
                style={this.props.customStyles}
            >
                {this.props.children}
            </button>
        );
    }
}