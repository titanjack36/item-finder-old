import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FormattedHTMLMessage } from 'react-intl';

import './EmptyListPrompt.css';


export default class EmptyListPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="empty-list-container">
        <FontAwesomeIcon className="folder-icon" icon={faFolderOpen} />
        <h2>
          <FormattedHTMLMessage
            id="prompts.emptyList.title"
          />
        </h2>
        <p>
          <FormattedHTMLMessage
            id="prompts.emptyList.subtitle"
          />
        </p>
      </div>
    );
  }
}
