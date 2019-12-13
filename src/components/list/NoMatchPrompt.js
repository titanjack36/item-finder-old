import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './NoMatchPrompt.css'

export default class NoMatchPrompt extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="no-match-container">
                <FontAwesomeIcon className="search-icon" icon={faSearch} />
                <h2>No Match</h2>
                <p>There are no items matching your search</p>
            </div>
        )
    }
}