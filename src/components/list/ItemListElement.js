import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';

import { withStyles } from '@material-ui/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faThumbtack } from '@fortawesome/free-solid-svg-icons';

import './ItemListElement.css';

const styles = themes => ({
    actionsCell: {
        padding: '0px',
        width: '125px',
    },
});

class ItemListElement extends React.Component {

    constructor(props) {
        super(props);

        this.state={};
    }

    handleDeleteButtonClick = () => {
        this.props.onDeleteItem(this.props.item.key);
    }

    render() {
        const { classes } = this.props;
        return (
            <TableRow
                className="table-row"
                onMouseEnter={this.mouseEnter} 
                onMouseLeave={this.mouseLeave}
            >
                <TableCell>
                    {this.props.item.name}
                </TableCell>
                <TableCell>
                    {this.props.item.location}
                </TableCell>
                <TableCell>
                    {this.props.item.tags.map(tag => <p>{tag}</p>)}
                </TableCell>
                <TableCell align="right" className={classes.actionsCell}>
                    <IconButton>
                        <FontAwesomeIcon
                            className="icon"
                            icon={faThumbtack}
                        />
                    </IconButton>
                    <IconButton>
                        <FontAwesomeIcon
                            className="icon"
                            icon={faEdit}
                        />
                    </IconButton>
                    <IconButton
                        onClick={this.handleDeleteButtonClick}
                    >
                        <FontAwesomeIcon
                            className="icon"
                            icon={faTrash}
                        />
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    }
}

export default withStyles(styles)(ItemListElement);