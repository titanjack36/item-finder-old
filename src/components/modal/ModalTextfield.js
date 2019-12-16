import React from 'react';
import PropTypes from 'prop-types';

import './ModalTextfield.css'

export default class ModalTextfield extends React.Component {

  constructor(props) {
    super(props);

    this.modalInput = React.createRef();
    this.state = { textfieldStyle: null, inputStyle: null };

    if (this.props.textFieldProps) {
      this.state.textfieldStyle = this.props.textFieldProps.style;
    }
    if (this.props.inputProps) {
      this.state.inputStyle = this.props.inputProps.style;
    }
  }

  getTextfieldInputRef = () => {
    return this.modalInput;
  }

  handleInputFocus = () => {
    let textfieldStyle = {...this.state.textfieldStyle};
    textfieldStyle['backgroundColor'] = '#e0e0e0';
    textfieldStyle['WebkitBoxShadow'] =
      '0px 5px 15px -1px rgba(0,0,0,0.37)';
    textfieldStyle['boxShadow'] =
      '0px 5px 15px -1px rgba(0,0,0,0.1)';

    this.setState({ textfieldStyle: textfieldStyle });
  }

  handleInputFocusOut = () => {
    this.setState({
      textfieldStyle: this.props.textFieldProps ?
        this.props.textFieldProps.style : null
    });
  }

  render() {
    return (
      <div
        
        className="modal-textfield"
        style={this.state.textfieldStyle}
      >
        <input
          ref={this.modalInput}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputFocusOut}
          style={this.state.inputStyle}
        />
        {this.props.children}
      </div>
    )
  }
}

ModalTextfield.propTypes = {
  textFieldProps: PropTypes.object,
  inputProps: PropTypes.object
}