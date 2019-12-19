import React from 'react';
import PropTypes from 'prop-types';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faThumbtack } from '@fortawesome/free-solid-svg-icons';

import EditItemModal from '../modal/EditItemModal';

import './ItemListElement.css';

const styles = themes => ({
  nameCell: {
    width: '30%'
  },
  locationcell: {
    width: '25%'
  },
  actionsCell: {
    padding: '0px',
    width: '125px'
  },
  actionButton: {
    width: '40px',
    height: '40px'
  }
});

class ItemListElement extends React.Component {
  constructor (props) {
    super(props);

    this.editItemModal = React.createRef();
    this.state = {};
  }

  handleDeleteButtonClick = () => {
    this.props.onDeleteItem(this.props.item.key);
  }

  handleEditButtonClick = () => {
    this.editItemModal.current.handleModalOpen(
      this.props.item
    );
  }

  handleRowDoubleClick = () => {
    this.editItemModal.current.handleModalOpen(
      this.props.item
    );
  }

  render () {
    const { classes } = this.props;
    return (
      <TableRow
        className="table-row"
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onDoubleClick={this.handleRowDoubleClick}
      >
        <TableCell className={classes.nameCell}>
          {this.props.item.name}
        </TableCell>
        <TableCell className={classes.locationCell}>
          {this.props.item.location}
        </TableCell>
        <TableCell>
          <ul className="tag-list">
            {this.props.item.tags.map(
              tag =>
                <li className="tag-badge" key={tag.key}>
                  {tag.value}
                </li>
            )}
          </ul>
        </TableCell>
        <TableCell align="right" className={classes.actionsCell}>
          <IconButton className={classes.actionButton}>
            <FontAwesomeIcon
              className="icon"
              icon={faThumbtack}
            />
          </IconButton>
          <IconButton
            className={classes.actionButton}
            onClick={this.handleEditButtonClick}
          >
            <FontAwesomeIcon
              className="icon"
              icon={faEdit}
            />
          </IconButton>
          <IconButton
            className={classes.actionButton}
            onClick={this.handleDeleteButtonClick}
          >
            <FontAwesomeIcon
              className="icon"
              icon={faTrash}
            />
          </IconButton>
          <EditItemModal
            ref={this.editItemModal}
            onModalFormSubmit={
              this.props.onEditItem
            }
          />
        </TableCell>
      </TableRow>
    );
  }
}

ItemListElement.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  item: PropTypes.object,
  classes: PropTypes.object
};

export default withStyles(styles)(ItemListElement);
