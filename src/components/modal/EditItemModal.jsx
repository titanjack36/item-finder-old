import React from 'react';
import PropTypes from 'prop-types';

import Fade from '@material-ui/core/Fade';

import ModalFormGroup from './ModalFormGroup';

import './EditItemModal.css';
import { FormattedHTMLMessage } from 'react-intl';

export default class EditItemModal extends React.Component {
  constructor(props) {
    super(props);

    this.modalFormGroup = React.createRef();
    this.state = { openModal: false };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    const ESCAPE_KEY = 27;

    if (event.keyCode !== undefined) {
      switch (event.keyCode) {
        case ESCAPE_KEY:
          this.handleModalClose();
          break;

        default:
          break;
      }
    }
  }

  isModalOpen = () => {
    return this.state.openModal;
  }

  handleModalOpen = item => {
    this.modalFormGroup.current
      .setUpModalItemForm(item);

    this.setState({ openModal: true });
  }

  handleModalClose = () => {
    if (this.state.openModal) {
      this.setState({ openModal: false });
      if (this.props.onPopoverClose !== undefined) {
        setTimeout(this.props.onPopoverClose, 200);
      }
    }
  }

  handleModalFormSubmit = () => {
    const item = this.modalFormGroup.current
      .handleModalFormSubmit();

    if (item !== null) {
      this.props.onModalFormSubmit(item);
      this.handleModalClose();
    }
  }

  render() {
    return (
      <Fade in={this.state.openModal}>
        <div className="modal-backdrop">
          <div className="modal">
            <ModalFormGroup
              ref={this.modalFormGroup}
            />
            <div className="modal-button-group">
              <button
                className="modal-button done"
                onClick={this.handleModalFormSubmit}
              >
                <FormattedHTMLMessage
                  id="modal.buttons.done.label"
                />
              </button>
              <button
                className="modal-button cancel"
                onClick={this.handleModalClose}
              >
                <FormattedHTMLMessage
                  id="modal.buttons.cancel.label"
                />
              </button>
            </div>
          </div>
        </div>
      </Fade>
    );
  }
}

EditItemModal.propTypes = {
  onPopoverClose: PropTypes.func,
  onModalFormSubmit: PropTypes.func
};
