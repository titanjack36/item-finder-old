import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { withStyles } from '@material-ui/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons';

import MenuSearchBar from './MenuSearchBar';
import AddItemPopover from './AddItemPopover';

import './MainMenu.css';

function ElevationScroll (props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

const styles = themes => ({
  toolbar: {
    padding: '0px',
    color: '#c9c9c9',
    display: 'flex',
    justifyContent: 'space-between'
  }
});

class MainMenu extends React.Component {
  constructor (props) {
    super(props);

    this.addItemPopover = React.createRef();
    this.mainSearchBar = React.createRef();

    this.state = { showTitle: { display: 'initial' } };
  }

    handleShowTitle = () => {
      this.setState({ showTitle: { display: 'initial' } });
    }

    handleHideTitle = () => {
      this.setState({ showTitle: { display: 'none' } });
    }

    handleToggleSearch = () => {
      this.mainSearchBar.current.handleToggleSearch();
    }

    handlePopoverOpen = event => {
      this.addItemPopover.current.handlePopoverOpen(event);
    }

    render () {
      const { classes } = this.props;

      return (
        <ElevationScroll {...this.props}>
          <AppBar className="appbar">
            <Toolbar className={classes.toolbar}>
              <div className="left">
                <button className="menu-button">
                  <FontAwesomeIcon
                    className="bars-icon"
                    icon={faBars}
                  />
                </button>
                <div className="divider"></div>
                <span
                  className="title"
                  style={this.state.showTitle}
                >
                        ItemFinder
                </span>
                <div className="divider"></div>
                <MenuSearchBar
                  ref={this.mainSearchBar}
                  className="menu-component-search-bar"
                  onSearchItem={this.props.onSearchItem}
                  onShowTitle={this.handleShowTitle}
                  onHideTitle={this.handleHideTitle}
                />
                <div className="divider desktop"></div>
              </div>
              <div className="right">
                <button className="menu-button open-search">
                  <FontAwesomeIcon
                    className="appbar-search-icon"
                    icon={faSearch}
                    onClick={this.handleToggleSearch}
                  />
                </button>
                <button
                  className="menu-button add-item"
                  onClick={this.handlePopoverOpen}
                >
                  <FontAwesomeIcon
                    className="add-item-icon"
                    icon={faPlusSquare}
                  />
                </button>
                <AddItemPopover
                  ref={this.addItemPopover}
                  onNewItemCreated=
                    {this.props.onNewItemCreated}
                />
              </div>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
      );
    }
}

MainMenu.propTypes = {
  onSearchItem: PropTypes.func,
  onNewItemCreated: PropTypes.func,
  classes: PropTypes.object
};

export default withStyles(styles)(MainMenu);
