import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';
import Slide from '@material-ui/core/Slide';

import EditItemModal from '../EditItemModal';

import './AddItemPopover.css';

const styles = themes => ({
    addItemButton: {
        //textTransform: 'none',
        //fontWeight: 'bold',
        minWidth: '125px',
        margin: '0 0 0 20px',
    },
    advancedButton: {
        //margin: '5px 5px 0 0',
        width: '125px',
    },
    doneButton: {
        //margin: '5px 0 0 5px',
        width: '125px',
    },
});

class AddItemPopover extends React.Component {

    constructor(props) {
        super(props);

        this.editItemModal = React.createRef();

        this.state = {openPopover: false, itemNameValue: "", itemLocValue: ""};
    }

    handlePopoverOpen = event => {
        this.setState({openPopover: true});
    }

    handlePopoverClose = () => {
        this.setState({openPopover: false});
    }

    handleItemNameFieldChange = event => {
        this.setState({itemNameValue: event.target.value});
    }

    handleItemLocFieldChange = event => {
        this.setState({itemLocValue: event.target.value});
    }

    handleAdvancedButtonClick = () => {
        this.editItemModal.current.handleModalOpen();
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
            this.setState({itemNameValue: "", itemLocValue: ""});
        }
        this.handlePopoverClose();
    }

    render() {
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
                onClick={this.handlePopoverClose}
            >
            <div 
                className="popover"
                onClick={e => e.stopPropagation()}
            >
                <div className="textfield-group">
                    <TextField autoFocus
                        id="standard-basic"
                        className={classes.textField}
                        label="Item Name"
                        margin="dense"
                        color="secondary"
                        value={this.state.itemNameValue}
                        onChange={this.handleItemNameFieldChange}
                    />
                    <TextField
                        id="standard-basic"
                        className={classes.textField}
                        label="Item Location"
                        margin="dense"
                        color="secondary"
                        value={this.state.itemLocValue}
                        onChange={this.handleItemLocFieldChange}
                    />
                </div>
                <div className="button-group">
                    <Button 
                        variant="contained"
                        className={classes.doneButton}
                        color="primary"
                        onClick={this.handleDoneButtonClick}
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
                />
            </div>
            </div>
            </Slide>
        )
    }
}

export default withStyles(styles)(AddItemPopover);