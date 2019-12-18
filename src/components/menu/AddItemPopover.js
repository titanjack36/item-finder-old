import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '../shared/Textfield';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import EditItemModal from '../modal/EditItemModal';

import './AddItemPopover.css';

const styles = themes => ({
  closePopoverButton: {
    width: '30px',
    height: '30px',
    padding: '0px',
    marginLeft: '95px'
  },
  advancedButton: {
    marginRight: '8px',
    width: '125px'
  },
  doneButton: {
    marginRight: '8px',
    width: '125px'
  },
  textField: {
    marginTop: '0px'
  }
});

class AddItemPopover extends React.Component {
  constructor (props) {
    super(props);

    this.inputNameTextfield = React.createRef();
    this.editItemModal = React.createRef();
    this.state = {
      openPopover: false,
      itemNameValue: '',
      itemLocValue: '',
      itemNameFieldError: false,
      itemLocFieldError: false
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
      () => this.inputNameTextfield.current.setFocusToInput(),
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
        openPopover: false,
        itemNameValue: '',
        itemLocValue: '',
        itemNameFieldError: false,
        itemLocFieldError: false
      });
    }
  }

  handleItemNameFieldChange = event => {
    this.setState({ itemNameValue: event.target.value });
    if (this.state.itemNameFieldError) {
      this.setState({ itemNameFieldError: false });
    }
  }

  handleItemLocFieldChange = event => {
    this.setState({ itemLocValue: event.target.value });
    if (this.state.itemLocFieldError) {
      this.setState({ itemLocFieldError: false });
    }
  }

  handleAdvancedButtonClick = () => {
    this.editItemModal.current.handleModalOpen({
      key: null,
      name: this.state.itemNameValue,
      location: this.state.itemLocValue,
      tags: []
    });
  }

  handleSaveAndClose = () => {
    if (this.state.openPopover === true) {
      let error = false;

      if (this.state.itemNameValue.length === 0) {
        this.setState({ itemNameFieldError: true });
        error = true;
      }

      if (this.state.itemLocValue.length === 0) {
        this.setState({ itemLocFieldError: true });
        error = true;
      }

      if (!error) {
        this.props.onNewItemCreated({
          name: this.state.itemNameValue,
          location: this.state.itemLocValue,
          tags: []
        });
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
            <div className="textfield-group">
              <p className="popover-title">New Item</p>
              <p className="popover-textfield-label">
                Item Name
              </p>
              <TextField
                ref={this.inputNameTextfield}
                textFieldProps={{
                  style: {
                    width: '100%'
                  }
                }}
                containerProps={{
                  style: {
                    marginBottom: '5px'
                  }
                }}
                value={this.state.itemNameValue}
                onChange={this.handleItemNameFieldChange}
                error={this.state.itemNameFieldError}
                errorLabel="Item name field cannot be empty"
                showErrorInPlaceholder={true}
              />
              <p className="popover-textfield-label">
                Item Location
              </p>
              <TextField
                textFieldProps={{
                  style: {
                    width: '100%'
                  }
                }}
                value={this.state.itemLocValue}
                onChange={this.handleItemLocFieldChange}
                error={this.state.itemLocFieldError}
                errorLabel="Item location field cannot be empty"
                showErrorInPlaceholder={true}
              />
            </div>
            <div className="button-group">
              <IconButton
                className={classes.closePopoverButton}
                onClick={this.handlePopoverClose}
              >
                <FontAwesomeIcon
                  className="times-icon"
                  icon={faTimes}
                />
              </IconButton>
              <Button
                variant="contained"
                className={classes.doneButton}
                color="primary"
                onClick={this.handleSaveAndClose}
              >
                Done
              </Button>
              <Button
                variant="contained"
                className={classes.advancedButton}
                color="primary"
                onClick={this.handleAdvancedButtonClick}
              >
                Advanced
              </Button>
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
