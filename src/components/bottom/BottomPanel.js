import React from 'react'
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './BottomPanel.css'

const styles = themes => ({
    fab: {
        textTransform: 'none',
        color: '#6A6A6A',
    },
});

class BottomPanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {isMouseInside: false};
    }
    
    mouseEnter = () => {
        this.setState({ isMouseInside: true });
    }
    
    mouseLeave = () => {
        this.setState({ isMouseInside: false });
    }

    render() {
        const { classes } = this.props;

        return (
            <div 
                className="bottom-panel" 
                onMouseEnter={this.mouseEnter} 
                onMouseLeave={this.mouseLeave}
            >
                <Slide 
                    direction="up" 
                    in={this.state.isMouseInside} 
                    mountOnEnter 
                    unmountOnExit
                >
                    <div className="add-item-button">
                        <Fab
                            variant="extended"
                            size="medium"
                            color="default"
                            aria-label="add"
                            className={classes.fab}
                        >
                            <FontAwesomeIcon  className="plus-icon" icon={faPlus} />
                            &nbsp;&nbsp;&nbsp;Add Item
                        </Fab>
                    </div>
                </Slide>
            </div>
        )
    }
}

BottomPanel.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(BottomPanel);