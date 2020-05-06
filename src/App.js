import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Nav from './components/nav-component';
import Login from './components/login-component';
import AddUser from './components/add-component';
import SearchUpdate from './components/search-update-component';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">User Management App</h1>
        </header>
        <Route exact path="/" component={Login} />
        <Route path="/nav" component={Nav} />
        <Route path="/add" component={AddUser} />
        <Route path="/search" component={SearchUpdate} />
      </div>
    );
  }
}

export default App;
