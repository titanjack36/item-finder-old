import React from 'react';
import PropTypes from 'prop-types';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/styles';

import './SearchSettingsMenu.css';

const styles = themes => ({
  menuItem: {
    oTransition: '.5s',
    msTransition: '.5s',
    mozTransition: '.5s',
    webkitTransition: '.5s',
    transition: '.5s'
  }
});

class SearchSettingsMenu extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      popoverOpen: false,
      currentFocusedElement: 'name',
      anchorEl: null
    };
  }

  handlePopoverOpen = event => {
    this.setState({
      popoverOpen: true,
      anchorEl: event.currentTarget
    });
  }

  handlePopoverClose = () => {
    this.setState({
      popoverOpen: false,
      anchorEl: null
    });
  }

  handleMenuItemClick = (menuItem) => {
    this.setState({ currentFocusedElement: menuItem });
    this.props.onMenuItemSelected(menuItem);
    this.handlePopoverClose();
  }

  determineStyle = (menuItem) => {
    if (this.state.currentFocusedElement ===
        menuItem) {
      return {
        backgroundColor: '#2196f3',
        color: '#ffffff'
      };
    } else {
      return null;
    }
  }

  render () {
    const { classes } = this.props;
    return (
      <Menu
        id="simple-menu"
        className={classes.popover}
        open={this.state.popoverOpen}
        anchorEl={this.state.anchorEl}
        keepMounted
        onClose={this.handlePopoverClose}
      >
        <MenuItem disabled={true}>Search By</MenuItem>
        <MenuItem
          className={classes.menuItem}
          onClick={ () =>
            this.handleMenuItemClick('name')
          }
          style={this.determineStyle('name')}
        >
          Name
        </MenuItem>
        <MenuItem
          className={classes.menuItem}
          onClick={ () =>
            this.handleMenuItemClick('location')
          }
          style={this.determineStyle('location')}
        >
          Location
        </MenuItem>
        <MenuItem
          className={classes.menuItem}
          onClick={ () =>
            this.handleMenuItemClick('tags')
          }
          style={this.determineStyle('tags')}
        >
          Tags
        </MenuItem>
      </Menu>
    );
  }
}

SearchSettingsMenu.propTypes = {
  onMenuItemSelected: PropTypes.func,
  classes: PropTypes.object
};

export default withStyles(styles)(SearchSettingsMenu);
