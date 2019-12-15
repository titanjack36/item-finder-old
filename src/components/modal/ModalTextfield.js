import React from 'react';
import PropTypes from 'prop-types';

export default class ModalTextfield extends React.Component {

  defaultStyle = {}

  onFocusStyle = {
    backgroundColor: '#e0e0e0',
    '-webkit-box-shadow': '0px 5px 15px -1px rgba(0,0,0,0.37)',
    boxShadow: '0px 5px 15px -1px rgba(0,0,0,0.1)'
  }

  constructor(props) {
    super(props);

    this.state = { textfieldStyle: null, inputStyle: null };

    if (this.props.textFieldProps) {
      this.state.textfieldStyle = this.props.textFieldProps.style;
    }
    if (this.props.inputProps) {
      this.state.inputStyle = this.props.inputProps.style;
    }
  }

  handleInputFocus = () => {
    let textfieldStyle = this.state.textfieldStyle;
    textfieldStyle['backgroundColor'] = '#e0e0e0';
    textfieldStyle['-webkit-box-shadow'] =
      '0px 5px 15px -1px rgba(0,0,0,0.37)';
    textfieldStyle['boxShadow'] =
      '0px 5px 15px -1px rgba(0,0,0,0.1)';

    this.setState({ textfieldStyle: textfieldStyle });
  }

  handleInputFocusOut = () => {
    this.setState({
      textfieldStyle: this.props.textfieldProps ?
        this.props.textfieldProps.style : null
    });
  }

  render() {
    return (
      <div
        className="modal-textfield"
        style={this.state.textfieldStyle}
      >
        <input
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputFocusOut}
        />
      </div>
    )
  }
}

ModalTextfield.propTypes = {
  textFieldProps: PropTypes.object,
  inputProps: PropTypes.object
}