import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

import ModalTextfield from './ModalTextfield';

import './EditItemModal.css';
import { IconButton } from '@material-ui/core';

const styles = themes => ({
  closeButton: {
    width: '35px',
    height: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 'none'
  },
});

class EditItemModal extends React.Component {
  constructor(props) {
    super(props);

    this.itemNameTextField = React.createRef();
    this.state = { openModal: false };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
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
    if (item !== undefined) {

    } else {
      setTimeout(() => {
        this.itemNameTextField.current.
          getTextfieldInputRef().current.focus();
      }, 200);
    }
    this.setState({ openModal: true });
  }

  handleModalClose = () => {
    if (this.state.openModal) {
      this.setState({ openModal: false });
      setTimeout(this.props.onPopoverClose, 200);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Fade in={this.state.openModal}>
        <div className="modal-backdrop">
          <div className="modal">
            <p className="textfield-label">
              Item Name
            </p>
            <ModalTextfield
              ref={this.itemNameTextField}
              textFieldProps={{ style: {
                height: '50px',
                width: '75%',
              }}}
              inputProps={{ style: {
                fontSize: '25px',
              }}}
            >
              <FontAwesomeIcon
                className="pencil-icon"
                icon={faPencilAlt}
              />
            </ModalTextfield>
            <p className="textfield-label">
              Item Location
            </p>
            <ModalTextfield>
              <FontAwesomeIcon
                className="pencil-icon"
                icon={faPencilAlt}
              />
            </ModalTextfield>
            <p className="textfield-label">
              Item Tags
            </p>
            <ModalTextfield
              textFieldProps={{ style: {
                width: '150px',
                marginRight: '10px'
              }}}
            >
              <IconButton 
                className={classes.closeButton}
              >
                <FontAwesomeIcon
                  className="close-icon"
                  icon={faTimes}
                />
              </IconButton>
            </ModalTextfield>
          </div>
        </div>
      </Fade>
    );
  }
}

EditItemModal.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(EditItemModal);
