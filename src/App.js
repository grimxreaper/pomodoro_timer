import React from 'react';
import './App.css';
import ReactDOM from "react-dom";


class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      break_length: 5,
      session_length: 25,
      time_left: "25:00"
      
    }
  }

  break_decrement = () => {
    this.setState({
      break_length: this.state.break_length - 1
    })
  }

  break_increment = () => {
    this.setState({
      break_length: this.state.break_length + 1
    })
  }

  session_decrement = () => {
    this.setState({
      session_length: this.state.session_length - 1
    })
  }

  session_increment = () => {
    this.setState({
      session_length: this.state.session_length + 1
    })
  }


  start_stop = () => {
    this.setState({
      // fix this
      time_left: this.state.session_length + ":00"
    })
  }
  reset = () => {
    this.setState({
      break_length: 5,
      session_length: 25
    })
  }

  render(){
    return (
      <div>
        <div id="timer-label">
        <h1>Pomodoro Timer</h1>
        </div>

        {/* decrement */}
        <button id="break-decrement">Decrease Break Length</button>
        <button id="session-decrement">Decrease Session Length</button>
        {/* increment */}
        <button id="break-increment">Increase Break Length</button>
        <button id="session-increment">Increase Session Length</button>

        <div id="break-length">5</div>
        <div id="session-length">25</div>
        <div id="time-left">mm:ss</div>

        <button id="start_stop"> Start/Stop</button>
        <button id="reset"> Reset </button>


      </div>
    )
  }
}





ReactDOM.render(<App />, document.getElementById('app'));



