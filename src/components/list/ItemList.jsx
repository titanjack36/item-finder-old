import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/styles';

import ItemListElement from './ItemListElement';
import EmptyListPrompt from './EmptyListPrompt';
import NoMatchPrompt from './NoMatchPrompt';

import './ItemList.css';

const styles = themes => ({
  root: {
    width: '80%',
    maxWidth: '800px',
    minWidth: '500px',
    borderRadius: '15px',
    margin: '5px 5px 20px 5px',
    boxShadow: '0px 5px 15px -1px rgba(0,0,0,0.1)'
  },
  table: {

  }
});

class ItemList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  render () {
    const { classes } = this.props;
    if (this.props.totalItemAmt === 0) {
      return (
        <EmptyListPrompt />
      );
    } else if (this.props.items.length === 0) {
      return (
        <NoMatchPrompt />
      );
    } else {
      return (
        <div className="item-list-container">
          <p className="list-title">My Home</p>
          <Paper className={classes.root}>
            <Table>
              <caption>
                <center>
                  End of list, showing&nbsp;
                  {this.props.items.length} of&nbsp;
                  {this.props.totalItemAmt} item(s).
                </center>
              </caption>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  this.props.items.map(item =>
                    <ItemListElement key={item.key}
                      item={item}
                      onDeleteItem={
                        this.props.onDeleteItem
                      }
                      onEditItem={
                        this.props.onEditItem
                      }
                    />
                  )
                }
              </TableBody>
            </Table>
          </Paper>
        </div>
      );
    }
  }
}

ItemList.propTypes = {
  totalItemAmt: PropTypes.number,
  items: PropTypes.array,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  classes: PropTypes.object
};

export default withStyles(styles)(ItemList);
