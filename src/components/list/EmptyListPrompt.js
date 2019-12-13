import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

import './EmptyListPrompt.css';

export default class EmptyListPrompt extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  render () {
    return (
      <div className="empty-list-container">
        <FontAwesomeIcon className="folder-icon" icon={faFolderOpen} />
        <h2>No Items</h2>
        <p>Items you add will appear here</p>
      </div>
    );
  }
}
