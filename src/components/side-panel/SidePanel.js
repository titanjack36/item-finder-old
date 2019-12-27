import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faPlus } from '@fortawesome/free-solid-svg-icons';

import Slide from '@material-ui/core/Slide';

import './SidePanel.css';

export default class SidePanel extends React.Component {

  constructor(props) {
    super(props);

    this.nextId = 1;
    this.state = {
      showPanel: false,
      homes: [{ id: 0, name: "Home" }],
      selectedHome: 0
    };
  }

  handleToggleSidePanel = () => {
    this.setState(state => ({
      showPanel: !state.showPanel
    }));
  }

  handleSelectHomeClick = id => {
    this.setState({
      selectedHome: id
    });
    this.props.onSelectHome(id);
  }

  handleAddNewHome = () => {
    let homes = this.state.homes;
    let newHome = {
      id: this.nextId,
      name: ("Home " + this.nextId)
    };
    homes.push(newHome);
    this.setState({
      homes: homes
    });
    this.props.onAddNewHome(newHome);
    this.nextId++;
  }

  render() {
    return (
      <Slide
        direction="right"
        in={this.state.showPanel}
        mountOnEnter
        unmountOnExit
      >
        <div className="side-panel">
          <p className="panel-title">
            My Homes
          </p>
          <div className="button-group">
            {this.state.homes.map(home =>
              <button
                key={home.id}
                className="panel-button main"
                onClick={() =>
                  this.handleSelectHomeClick(home.id)
                }
                style={
                  this.state.selectedHome
                    === home.id
                    ?
                    {
                      backgroundColor: '#0066ff',
                      border: '1px solid #0066ff',
                      WebkitBoxShadow:
                        '0px 5px 15px -1px rgba(0,0,0,0.37)',
                      boxShadow:
                        '0px 5px 15px -1px rgba(0,0,0,0.4)'
                    }
                    :
                    null
                }
              >
                <FontAwesomeIcon
                  className="pin-icon"
                  icon={faMapPin}
                  style={
                    this.state.selectedHome
                      === home.id
                      ?
                      { color: '#ffffff' }
                      :
                      null
                  }
                />
                <p
                  style={
                    this.state.selectedHome
                      === home.id
                      ?
                      { color: '#ffffff' }
                      :
                      null
                  }
                >{home.name}</p>
              </button>
            )}
            <button
              className="panel-button add"
              onClick={this.handleAddNewHome}
            >
              <FontAwesomeIcon
                className="add-home-icon"
                icon={faPlus}
              />
            </button>
          </div>
        </div>
      </Slide>
    )
  }
}