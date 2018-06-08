import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch }
from "react-router-dom";

import * as d3
from 'd3';

import { Navigation, Button, Dropdown }
from '@janus.team/janus-particles';

import '@janus.team/janus-particles/dist/particles.css';
import '@janus.team/janus-particles/dist/canon/canon.css';
import '@janus.team/janus-particles/dist/canon-bootstrap/css/canon-bootstrap.css';

import { MapView, TableView } from "./views";


class App extends Component {
    constructor(props) {
        super(props);
        this.state= {
            nodes: Math.round(d3.randomUniform(50)())
        }
    }

  render() {
    return (
        <div className="App">
            <Navigation>
                <Navigation.Utility>
                    <Navigation.Menu>
                    <Link onClick={() => {}}
                        to='/map'
                    className='particles-navigation-link--primary'>
                        Map View
                    </Link>
                    <Navigation.Link>
                      <Link onClick={() => {}}
                        to='table'>
                        Record View
                      </Link>
                    </Navigation.Link>
                  <Navigation.Dropdown action='Manage'
                    utility={true}
                    caret={true}>
                    <Link to='/add/chore'>
                      Add New Chore
                    </Link>
                    <Link to='/add/user'>
                      Add New User
                    </Link>
                  </Navigation.Dropdown>
                </Navigation.Menu>
                <Navigation.Menu right={true}>
                  <Link onClick={() => {}}
                    to='/feedback'>
                    Feedback
                  </Link>
                  <Navigation.Dropdown action={'Username: ' +  this.props.user.name}
                    utility={true}
                    caret={true}>
                    <Link onClick={() => {}}
                      to='/user-settings'>
                      Admin
                    </Link>
                  </Navigation.Dropdown>
                </Navigation.Menu>
              </Navigation.Utility>
            </Navigation>
            <Button onClick={ this.nodeShuffle }>Shuffle</Button>
                <Switch>
                    <Route path='/map' render={() => {
                  return <MapView nodes={this.state.nodes} />;
                } } />
                <Route path='/table' render={() => {
                  return <TableView />;
                } } />
                </Switch>
        </div>
    );
  }

  nodeShuffle = () => {
        console.log("setting state");
        this.setState({
            nodes: Math.round(d3.randomUniform(50)())
        });
  };
}

export default App;
