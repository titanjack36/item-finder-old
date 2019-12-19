import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCog } from '@fortawesome/free-solid-svg-icons';

import SearchSettingsMenu from './SearchSettingsMenu';

import './MainSearchBar.css';

const styles = themes => ({
  inputBase: {
    width: '100%'
  },
  settingsButton: {
    width: '30px',
    height: '30px',
    padding: '0px',
    margin: '0 5px 0 0'
  }
});

class MenuSearchBar extends React.Component {
  constructor (props) {
    super(props);

    this.searchSettingsMenu = React.createRef();
    this.state = {
      showSearchBar: { display: 'flex' },
      searchValue: '',
      searchBy: 'name'
    };
  }

  componentDidMount () {
    this.checkWindowDimensions();
    window.addEventListener(
      'resize', this.checkWindowDimensions
    );
  }

  componentWillUnmount () {
    window.removeEventListener(
      'resize', this.checkWindowDimensions
    );
  }

    checkWindowDimensions = () => {
      const width = window.innerWidth;
      if (width < 600) {
        this.setState({
          showSearchBar: { display: 'none' }
        });
      } else {
        this.setState({
          showSearchBar: { display: 'flex' }
        });
      }
      this.props.onShowTitle();
    }

    handleToggleSearch = () => {
      if (this.state.showSearchBar.display === 'none') {
        this.setState({
          showSearchBar: { display: 'flex' }
        });
        this.props.onHideTitle();
      } else {
        this.setState({
          showSearchBar: { display: 'none' }
        });
        this.props.onShowTitle();
      }
    }

    updateSearch = (event, searchBy) => {
      if (event !== undefined) {
        this.setState({
          searchValue: event.target.value
        });
        this.props.onSearchItem(
          event.target.value,
          this.state.searchBy
        );
      }
      if (searchBy !== undefined) {
        this.setState({ searchBy: searchBy });
        this.props.onSearchItem(
          this.state.searchValue,
          searchBy
        );
      }
    }

    handleSettingsButtonClick = event => {
      this.searchSettingsMenu.current
        .handlePopoverOpen(event);
    }

    handleMenuItemSelected = (menuItem) => {
      this.updateSearch(undefined, menuItem);
    }

    render () {
      const { classes } = this.props;
      return (
        <div
          className="searchbox"
          style={this.state.showSearchBar}
        >
          <FontAwesomeIcon
            className="search-icon"
            icon={faSearch}
          />
          <input
            type="text"
            placeholder={
              'Search by item ' + this.state.searchBy
            }
            className="text-input"
            value={this.state.searchValue}
            onChange={this.updateSearch}
          />
          <IconButton
            className={classes.settingsButton}
            onClick={this.handleSettingsButtonClick}
          >
            <FontAwesomeIcon
              className="cogs-icon"
              icon={faCog}
            />
          </IconButton>
          <SearchSettingsMenu
            ref={this.searchSettingsMenu}
            onMenuItemSelected={
              this.handleMenuItemSelected
            }
          />
        </div>
      );
    }
}

MenuSearchBar.propTypes = {
  onShowTitle: PropTypes.func,
  onHideTitle: PropTypes.func,
  onSearchItem: PropTypes.func,
  classes: PropTypes.object
};

export default withStyles(styles)(MenuSearchBar);
