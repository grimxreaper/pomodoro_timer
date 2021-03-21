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


  onClick = (button) => {
    const id = button.target.id;
    console.log(id)
    if (id === "start_stop") {
      console.log("FIRST this WORKS!")
      this.start_stop()
    }
    else if (id === "break-decrement") {
      this.break_decrement()
    }
    else if (id === "break-increment") {
      this.break_increment()
    }
    else if (id === "session-decrement"){
      this.session_decrement()
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
    console.log("this WORKS!")
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

        <button id="start_stop" onClick={this.onClick}> Start/Stop</button>
        <button id="reset"> Reset </button>


      </div>
    )
  }
}





ReactDOM.render(<App />, document.getElementById('app'));



