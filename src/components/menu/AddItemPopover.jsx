import React from 'react';
import PropTypes from 'prop-types';

import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import PopoverFormGroup from './PopoverFormGroup';
import EditItemModal from '../modal/EditItemModal';

import './AddItemPopover.css';

const styles = () => ({
  closePopoverButton: {
    width: '30px',
    height: '30px',
    padding: '0px',
    marginLeft: '95px'
  }
});

class AddItemPopover extends React.Component {
  constructor (props) {
    super(props);

    this.popoverFormGroup = React.createRef();
    this.editItemModal = React.createRef();
    this.state = {
      openPopover: false
    };
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    const ESCAPE_KEY = 27; const ENTER_KEY = 13;

    if (event.keyCode !== undefined) {
      switch (event.keyCode) {
        case ESCAPE_KEY:
          this.handlePopoverClose();
          break;

        case ENTER_KEY:
          this.handleSaveAndClose();
          break;

        default:
          break;
      }
    }
  }

  handlePopoverOpen = () => {
    this.setState({ openPopover: true });

    setTimeout(
      () => 
        this.popoverFormGroup.current.setUpPopoverForm(),
      200
    );
  }

  handlePopoverClose = () => {
    if (
      (this.editItemModal.current &&
        !this.editItemModal.current.isModalOpen()) &&
      this.state.openPopover === true
    ) {
      this.setState({
        openPopover: false
      });
    }
  }

  handleAdvancedButtonClick = () => {
    this.editItemModal.current.handleModalOpen({
      key: null,
      name: 
        this.popoverFormGroup.current
          .getItemNameFieldValue(),
      location: 
        this.popoverFormGroup.current
          .getItemLocFieldValue(),
      tags: []
    });
  }

  handleSaveAndClose = () => {
    if (this.state.openPopover === true) {
      const item = this.popoverFormGroup.current
        .handlePopoverFormSubmit();

      if (item !== null) {
        this.props.onNewItemCreated(item);
        this.handlePopoverClose();
      }
    }
  }

  handleModalFormSubmit = item => {
    this.props.onNewItemCreated(item);
  }

  render () {
    const { classes } = this.props;
    return (
      <Slide
        direction="down"
        in={this.state.openPopover}
        mountOnEnter
        unmountOnExit
      >
        <div
          className="popover-backdrop"
          onMouseDown={this.handlePopoverClose}
        >
          <div
            className="popover"
            onMouseDown={e => e.stopPropagation()}
          >
            <PopoverFormGroup 
              ref={this.popoverFormGroup}
            />
            <div className="popover-button-group">
              <IconButton
                className={classes.closePopoverButton}
                onClick={this.handlePopoverClose}
              >
                <FontAwesomeIcon
                  className="times-icon"
                  icon={faTimes}
                />
              </IconButton>
              <button
                className="popover-button done"
                onClick={this.handleSaveAndClose}
              >
                Done
              </button>
              <button
                className="popover-button advanced"
                onClick={this.handleAdvancedButtonClick}
              >
                Advanced
              </button>
            </div>
            <EditItemModal
              ref={this.editItemModal}
              onPopoverClose={this.handlePopoverClose}
              onModalFormSubmit={
                this.handleModalFormSubmit
              }
            />
          </div>
        </div>
      </Slide>
    );
  }
}

AddItemPopover.propTypes = {
  onNewItemCreated: PropTypes.func,
  classes: PropTypes.object
};

export default withStyles(styles)(AddItemPopover);
