import React from 'react';

import TextField from '../shared/Textfield';

import { FormattedHTMLMessage } from 'react-intl';

import './PopoverFormGroup.css'

export default class PopoverFormGroup extends React.Component {

  constructor (props) {
    super(props);

    this.inputNameTextfield = React.createRef();
    this.state = {
      itemNameValue: '',
      itemLocValue: '',
      itemNameFieldError: false,
      itemLocFieldError: false
    };
  }

  clearPopoverFormValues = () => {
    this.setState({
      itemNameValue: '',
      itemLocValue: '',
      itemNameFieldError: false,
      itemLocFieldError: false
    });
  }

  setUpPopoverForm = () => {
    this.clearPopoverFormValues();
    this.inputNameTextfield.current.setFocusToInput();
  }

  getItemNameFieldValue = () => {
    return this.state.itemNameValue;
  }

  getItemLocFieldValue = () => {
    return this.state.itemLocValue;
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

  handlePopoverFormSubmit = () => {
    let error = false;

    if (this.state.itemNameValue.length === 0) {
      this.setState({ itemNameFieldError: true });
      error = true;
    }

    if (this.state.itemLocValue.length === 0) {
      this.setState({ itemLocFieldError: true });
      error = true;
    }

    if (error) {
      return null;
    } else {
      return ({
        name: this.state.itemNameValue,
        location: this.state.itemLocValue,
        tags: []
      });
    }
  }

  render () {
    return (
      <div className="textfield-group">
        <p className="popover-title">
          <FormattedHTMLMessage
            id="menu.popover.title"
          />
        </p>
        <p className="popover-textfield-label">
          <FormattedHTMLMessage
            id="menu.popover.textfields.itemName.label"
          />
        </p>
        <FormattedHTMLMessage
          id="menu.popover.textfields.itemName.error"
        >
          {msg => (
            <TextField
              ref={this.inputNameTextfield}
              textFieldProps={{ style: { width: '100%' } }}
              containerProps={{
                style: { marginBottom: '5px' }
              }}
              value={this.state.itemNameValue}
              onChange={this.handleItemNameFieldChange}
              error={this.state.itemNameFieldError}
              errorLabel={msg}
              showErrorInPlaceholder={true}
            />
          )}
        </FormattedHTMLMessage>
        <p className="popover-textfield-label">
        <FormattedHTMLMessage
            id="menu.popover.textfields.itemLocation.label"
          />
        </p>
        <FormattedHTMLMessage
          id="menu.popover.textfields.itemName.error"
        >
          {msg => (
            <TextField
              textFieldProps={{ style: { width: '100%' } }}
              value={this.state.itemLocValue}
              onChange={this.handleItemLocFieldChange}
              error={this.state.itemLocFieldError}
              errorLabel={msg}
              showErrorInPlaceholder={true}
            />
          )}
        </FormattedHTMLMessage>
      </div>
    )
  }
}
