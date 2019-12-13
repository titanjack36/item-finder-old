import React from 'react';

import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './AddItemButton.css';

const styles = themes => ({
    addItemButton: {
        //textTransform: 'none',
        //fontWeight: 'bold',
        minWidth: '125px',
        margin: '0 0 0 20px',
    },
    advancedButton: {
        margin: '5px 5px 0 0',
        width: '125px',
    },
    doneButton: {
        margin: '5px 0 0 5px',
        width: '125px',
    },
});

const blueTheme = createMuiTheme({ palette: { primary: {main: '#4A86FF'} } });

class AddItemButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {anchorEl: null, itemNameValue: "", itemLocValue: ""};
        this.openPopper = false;
    }

    handleOpenPopoverButtonClick = event => {
        this.setState({anchorEl: event.currentTarget});
        this.openPopper = true;
    }

    handlePopoverClose = () => {
        this.setState({anchorEl: null});
        this.openPopper = false;
    }

    handleItemNameFieldChange = event => {
        this.setState({itemNameValue: event.target.value});
    }

    handleItemLocFieldChange = event => {
        this.setState({itemLocValue: event.target.value});
    }

    handleDoneButtonClick = () => {
        if (this.state.itemNameValue.length > 0 
                    && this.state.itemLocValue.length > 0) {
            this.props.onNewItemCreated(
                {
                    name: this.state.itemNameValue, 
                    location: this.state.itemLocValue
                }
            )
            this.handlePopoverClose();
            this.setState({itemNameValue: "", itemLocValue: ""});
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="add-item-group">
                <ThemeProvider theme={blueTheme}>
                    <Button 
                        variant="contained"
                        className={classes.addItemButton}
                        color="primary"
                        onClick={this.handleOpenPopoverButtonClick}
                    >
                        <FontAwesomeIcon
                            className="plus-icon"
                            icon={faPlus}
                        />
                        Add Item
                    </Button>
                </ThemeProvider>
                <Popover
                    open={this.openPopper}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <div className="popover-container">
                        <TextField
                            id="outlined-basic"
                            className={classes.textField}
                            label="Item Name"
                            margin="dense"
                            variant="outlined"
                            color="secondary"
                            onChange={this.handleItemNameFieldChange}
                        />
                        <TextField
                            id="outlined-basic"
                            className={classes.textField}
                            label="Item Location"
                            margin="dense"
                            variant="outlined"
                            color="secondary"
                            onChange={this.handleItemLocFieldChange}
                        />
                        <div className="button-group">
                            <Button 
                                variant="contained"
                                className={classes.advancedButton}
                                color="primary"
                            >
                                Advanced
                            </Button>
                            <Button 
                                variant="contained"
                                className={classes.doneButton}
                                color="primary"
                                onClick={this.handleDoneButtonClick}
                            >
                                Done
                            </Button>
                        </div>
                    </div>
                </Popover>
            </div>
        )
    }
}

export default withStyles(styles)(AddItemButton);