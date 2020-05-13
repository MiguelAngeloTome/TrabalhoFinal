import React from 'react';
import logo from '../../assets/delete.jpg';
import './Home.css';
import Exa from "../graphs/ex";

export default class App extends React.Component {
  render () {
    return (
      <div className="App">
        <Exa/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>hello <code>src/App.js</code> and save to reload.</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}