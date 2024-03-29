import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import Textfield from '../shared/Textfield';

import './ModalFormGroup.css';
import { IconButton } from '@material-ui/core';
import { FormattedHTMLMessage } from 'react-intl';

const styles = themes => ({
  closeButton: {
    width: '35px',
    height: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px'
  },
  addTagButton: {
    width: '35px',
    height: '35px',
    padding: '0px'
  }
});

class ModalFormGroup extends React.Component {
  constructor(props) {
    super(props);

    this.nextTagKey = 0;
    this.itemNameTextField = React.createRef();
    this.state = {
      openModal: false,
      itemId: null,
      itemName: '',
      itemLoc: '',
      itemTags: [],
      itemNameFieldError: false,
      itemLocFieldError: false
    };
  }

  setUpModalItemForm = item => {
    if (item !== undefined) {
      this.setState({
        itemId: item.key,
        itemName: item.name,
        itemLoc: item.location,
        itemTags: item.tags
      });
      this.nextTagKey = this.getNextTagKey(item.tags);
    } else {
      this.clearModalItemValues();
    }

    this.itemNameTextField.current.setFocusToInput(200);
  }

  clearModalItemValues = () => {
    this.setState({
      itemId: null,
      itemName: '',
      itemLoc: '',
      itemTags: [],
      itemNameFieldError: false,
      itemLocFieldError: false
    });
  }

  handleItemNameFieldChange = event => {
    this.setState({
      itemName: event.target.value,
      itemNameFieldError: false
    });
  }

  handleItemLocFieldChange = event => {
    this.setState({
      itemLoc: event.target.value,
      itemLocFieldError: false
    });
  }

  getNextTagKey = (tags) => {
    if (tags.length === 0) {
      return 0;
    } else {
      return tags[tags.length - 1].key + 1;
    }
  }

  handleAddTag = () => {
    const tags = this.state.itemTags;
    tags.push({ key: this.nextTagKey, value: '' });
    this.setState({ itemTags: tags });
    this.nextTagKey++;
  }

  handleDeleteTag = index => {
    const tags = this.state.itemTags;
    tags.splice(index, 1);
    this.setState({ itemTags: tags });
  }

  handleItemTagFieldChange = (index, event) => {
    const tags = this.state.itemTags;
    tags[index].value = event.target.value;
    this.setState({ itemTags: tags });
  }

  handleModalFormSubmit = () => {
    let error = false;

    if (this.state.itemName.length === 0) {
      this.setState({ itemNameFieldError: true });
      error = true;
    }

    if (this.state.itemLoc.length === 0) {
      this.setState({ itemLocFieldError: true });
      error = true;
    }

    if (error) {
      return null;
    } else {
      const itemTags = this.state.itemTags.filter(tag =>
        tag.value.length !== 0
      ).map((tag, index) =>
        ({ key: index, value: tag.value })
      );

      return ({
        key: this.state.itemId,
        name: this.state.itemName,
        location: this.state.itemLoc,
        tags: itemTags
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="modal-form-group">
        <p className="modal-textfield-label">
          <FormattedHTMLMessage
            id="modal.textfields.itemName.label"
          />
        </p>
        <FormattedHTMLMessage
          id="modal.textfields.itemName.error"
        >
          {msg => (
            <Textfield
              ref={this.itemNameTextField}
              textFieldProps={{
                style: {
                  height: '50px',
                  width: '75%'
                }
              }}
              inputProps={{
                style: {
                  fontSize: '25px'
                }
              }}
              value={this.state.itemName}
              onChange={this.handleItemNameFieldChange}
              error={this.state.itemNameFieldError}
              errorLabel={msg}
              enableErrorLabelFiller={true}
            >
              <FontAwesomeIcon
                className="pencil-icon"
                icon={faPencilAlt}
              />
            </Textfield>
          )}
        </FormattedHTMLMessage>
        <p className="modal-textfield-label">
          <FormattedHTMLMessage
            id="modal.textfields.itemLocation.label"
          />
        </p>
        <FormattedHTMLMessage
          id="modal.textfields.itemLocation.error"
        >
          {msg => (
            <Textfield
              value={this.state.itemLoc}
              onChange={this.handleItemLocFieldChange}
              error={this.state.itemLocFieldError}
              errorLabel={msg}
              enableErrorLabelFiller={true}
            >
              <FontAwesomeIcon
                className="pencil-icon"
                icon={faPencilAlt}
              />
            </Textfield>
          )}
        </FormattedHTMLMessage>
        <p className="modal-textfield-label">
          <FormattedHTMLMessage
            id="modal.textfields.itemTags.label"
          />
        </p>
        <div className="item-tags-container">
          {
            this.state.itemTags.map((tag, index) =>
              <Textfield
                key={tag.key}
                textFieldProps={{
                  style: {
                    width: '150px',
                    paddingRight: '0px'
                  }
                }}
                containerProps={{
                  style: {
                    margin: '0 10px 10px 0'
                  }
                }}
                value={tag.value}
                onChange={event =>
                  this.handleItemTagFieldChange(index, event)
                }
              >
                <IconButton
                  className={classes.closeButton}
                  onClick={() => this.handleDeleteTag(index)}
                >
                  <FontAwesomeIcon
                    className="close-icon"
                    icon={faTimes}
                  />
                </IconButton>
              </Textfield>
            )
          }
          <IconButton
            className={classes.addTagButton}
            onClick={this.handleAddTag}
          >
            <FontAwesomeIcon
              className="add-tag-icon"
              icon={faPlusCircle}
            />
          </IconButton>
        </div>
      </div>
    );
  }
}

ModalFormGroup.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(ModalFormGroup);
