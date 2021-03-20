import React from 'react';
import './App.css';
import ReactDOM from "react-dom";


class App extends React.Component {
  constructor(props){
    super(props)

  }

  render(){
    return (
      <div>
        <div id="timer-label">
          Session
        </div>
        <div id="time-left"/>

        //decrement
        <button id="break-decrement"></button>
        <button id="session-decrement"></button>
        //increment
        <button id="break-increment"></button>
        <button id="session-increment"></button>

        <div id="break-length">5</div>
        <div id="session-length">25</div>
        <div id="time-left">mm:ss</div>

        <button id="start_stop"> //add onClick </button>
        <button id="reset"> </button>
        //When I click the element with the id of reset,
        //any running timer should be stopped, the value
        //within id="break-length" should return to 5, the value within id="session-length" should return to 25, and the element with id="time-left" should reset to its default state.


      </div>
    )
  }
}





ReactDOM.render(<App />, document.getElementById('app'));



