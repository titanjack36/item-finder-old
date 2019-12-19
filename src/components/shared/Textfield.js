import React from 'react';
import PropTypes from 'prop-types';

import './Textfield.css';

export default class Textfield extends React.Component {
  constructor (props) {
    super(props);

    this.inputElement = React.createRef();
    this.state = {
      textfieldStyle: null,
      inputStyle: null,
      containerStyle: null,
      error: false
    };

    if (this.props.containerProps) {
      this.state.containerStyle = this.props.containerProps.style;
    }
    if (this.props.textFieldProps) {
      this.state.textfieldStyle = this.props.textFieldProps.style;
    }
    if (this.props.inputProps) {
      this.state.inputStyle = this.props.inputProps.style;
    }
  }

  componentDidUpdate (prevProps) {
    if (
      this.props.error !== undefined &&
      this.props.error !== prevProps.error
    ) {
      if (this.props.error) {
        const textfieldStyle = { ...this.state.textfieldStyle };
        textfieldStyle.backgroundColor = '#f5baba';
        this.setState({ textfieldStyle: textfieldStyle });
      } else {
        this.resetStyles();
      }
      this.setState({ error: this.props.error });
    }
  }

  setFocusToInput = delay => {
    if (delay === undefined) {
      this.inputElement.current.focus();
    } else {
      setTimeout(() => {
        this.inputElement.current.focus();
      }, delay);
    }
  }

  handleInputFocus = () => {
    if (!this.state.error) {
      const textfieldStyle = { ...this.state.textfieldStyle };
      textfieldStyle.backgroundColor = '#e0e0e0';
      textfieldStyle.WebkitBoxShadow =
        '0px 5px 15px -1px rgba(0,0,0,0.37)';
      textfieldStyle.boxShadow =
        '0px 5px 15px -1px rgba(0,0,0,0.1)';

      this.setState({ textfieldStyle: textfieldStyle });
    }
  }

  handleInputFocusOut = () => {
    if (!this.state.error) {
      this.resetStyles();
    }
  }

  resetStyles = () => {
    this.setState({
      textfieldStyle: (this.props.textFieldProps
        ? this.props.textFieldProps.style : null)
    });
  }

  handleInputChange = event => {
    if (this.props.onChange !== undefined) {
      this.props.onChange(event);
    }
  }

  render () {
    return (
      <div style={this.state.containerStyle}>
        <div
          className="shared-textfield"
          style={this.state.textfieldStyle}
        >
          <input
            ref={this.inputElement}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputFocusOut}
            style={this.state.inputStyle}
            value={this.props.value}
            onChange={this.handleInputChange}
            placeholder={
              (this.state.error &&
              this.props.showErrorInPlaceholder ===
                true)
                ? this.props.errorLabel
                : null
            }
          />
          {this.props.children}
        </div>
        {
          (this.state.error &&
          this.props.showErrorInPlaceholder !== true)
            ? <p className="error-label">
              {this.props.errorLabel}
            </p>
            : (
              this.props.enableErrorLabelFiller ===
                true
                ? <div className="error-placeholder" />
                : null
            )
        }
      </div>
    );
  }
}

Textfield.propTypes = {
  containerProps: PropTypes.object,
  textFieldProps: PropTypes.object,
  inputProps: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  errorLabel: PropTypes.string,
  showErrorInPlaceholder: PropTypes.bool,
  enableErrorLabelFiller: PropTypes.bool,
  children: PropTypes.element
};
