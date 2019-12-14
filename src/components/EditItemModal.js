import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

import './EditItemModal.css';

const styles = themes => ({
  modal: {
    oTransition: '1s',
    msTransition: '1s',
    mozTransition: '1s',
    webkitTransition: '1s',
    transition: '1s'
  },
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',

    backgroundColor: '#ffffff',
    borderRadius: '10px',
    outline: 'none',

    webkitBoxShadow: '0px 5px 15px -1px rgba(0,0,0,0.37)',
    boxShadow: '0px 5px 15px -1px rgba(0,0,0,0.1)',

    width: '600px',
    height: '400px'
  }
});

class EditItemModal extends React.Component {
  constructor(props) {
    super(props);

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
