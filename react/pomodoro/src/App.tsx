import React from 'react';
import logo from './logo.svg';
import img from './assets/img/dojoGreen.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <img src={logo} width='200px' alt="logo" />
      Pomodoro Timer

      <img src={img} width='200px' alt="alt" />
    </div>
  );
}

export default App;
