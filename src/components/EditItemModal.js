import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import './EditItemModal.css'

const styles = themes => ({
    modal: {
        oTransition: '1s',
        msTransition:'1s',
        mozTransition:'1s',
        webkitTransition: '1s',
        transition:'1s'
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
        height: '400px',
    },
});

class EditItemModal extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {openModal: false};
    }

    handleModalOpen = item => {
        if (item !== undefined) {

        }
        this.setState({openModal: true});
    }

    handleModalClose = () => {
        this.setState({openModal: false});
    }

    render() {
        const { classes } = this.props;
        return(
            <Modal
                aria-labelledby="edit-item-modal"
                aria-describedby="edit-item-attributes"
                open={this.state.openModal}
                onClose={this.handleClose}
                className={classes.modal}
                BackdropProps={{style: {
                    backgroundColor: 'rgba(114, 114, 114, 0.1)'
                }}}
                onEscapeKeyDown={this.handleModalClose}
            >
                <div className={classes.paper}>
                    <h2 id="simple-modal-title">Text in a modal</h2>
                    <p id="simple-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </p>
                </div>
            </Modal>
        )
    }
}

export default withStyles(styles)(EditItemModal);