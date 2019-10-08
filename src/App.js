import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react'
// import styles from './App.module.scss';
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import TicTacToe from './Components/TicTacToe/TicTacToe';
import History from './Components/History';
import Message from './Components/Message';

class App extends Component {

  state = {
    activeItem: ''
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Router>
        <Segment inverted>
          <Menu inverted pointing secondary>
            <Menu.Item
              as={NavLink}
              to="/"
              exact
              name='TicTacToe'
              active={activeItem === 'TicTacToe'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={NavLink}
              to="/messages"
              name='messages'
              active={activeItem === 'messages'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={NavLink}
              to="/history"
              name='history'
              active={activeItem === 'history'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Segment>
        <Switch>
          <Route path="/" component={TicTacToe} exact />
          <Route path="/messages" component={Message} />
          <Route path="/history" component={History} />
        </Switch>
      </Router>
    );
  }
}

export default App;
