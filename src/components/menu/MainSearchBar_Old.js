import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCog } from '@fortawesome/free-solid-svg-icons';

import './MainSearchBar_Old.css'

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

class MainSearchBar_Old extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    updateSearch = event => {
        this.props.onSearchItem(event.target.value);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="searchbox">
                <FontAwesomeIcon
                    className="search-icon"
                    icon={faSearch}
                />
                <InputBase
                    placeholder="Search…"
                    className={classes.inputBase}
                    inputProps={{ 'aria-label': 'search' }}
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

export default withStyles(styles)(MainSearchBar_Old);