import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCog } from '@fortawesome/free-solid-svg-icons';

import './MainSearchBar.css'

const styles = themes => ({
    inputBase: {
        width: '100%',
    },
    settingsButton: {
        width: '30px',
        height: '30px',
        padding: '0px',
        margin: '0 5px 0 0',
    },
});

class MainSearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {showSearchBar: {display: 'flex'}};
    }

    componentDidMount() {
        this.checkWindowDimensions();
        window.addEventListener(
            'resize', this.checkWindowDimensions
        );
    }
    
    componentWillUnmount() {
        window.removeEventListener(
            'resize', this.checkWindowDimensions
        );
    }
    
    checkWindowDimensions = () => {
        let width = window.innerWidth;
        if (width < 600) {
            this.setState({
                showSearchBar: {display: 'none'}
            });
        } else {
            this.setState({
                showSearchBar: {display: 'flex'}
            });
        }
        this.props.onShowTitle();
    }

    handleToggleSearch = () => {
        if (this.state.showSearchBar.display === 'none') {
            this.setState({
                showSearchBar: {display: 'flex'}
            });
            this.props.onHideTitle();
        } else {
            this.setState({
                showSearchBar: {display: 'none'}
            });
            this.props.onShowTitle();
        }
    }

    updateSearch = event => {
        this.props.onSearchItem(event.target.value);
    }

    render() {
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
                    placeholder="Search by item name"
                    className="text-input"
                    onChange={this.updateSearch}
                />
                <IconButton
                    className={classes.settingsButton}
                >
                    <FontAwesomeIcon
                        className="cogs-icon"
                        icon={faCog}
                    />
                </IconButton>
            </div>
        )
    }
}

export default withStyles(styles)(MainSearchBar);