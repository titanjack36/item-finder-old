import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

import './EditItemModal.css';

const styles = themes => ({
  textField: {
    height: '100px',
    width: '50%'
  },
  labelRoot: {
    fontSize: '30px'
  },
  labelFocused: {
    fontSize: '20px'
  }
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
        this.itemNameTextField.current.focus();
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
            <div
              ref={this.itemNameTextField}
              className="textfield item-name"
            >
              <input type="text" />
            </div>
            <p className="textfield-label">
              Item Location
            </p>
            <div
              ref={this.itemLocTextField}
              className="textfield item-loc"
            >
            </div>
            <p className="textfield-label">
              Item Tags
            </p>
            <div className="item-tags-container">
              <div
                ref={this.itemLocTextField}
                className="textfield item-tag"
                type="text"
              >
              </div>
            </div>
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
