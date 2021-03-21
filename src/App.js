import React from 'react';
import './App.css';
import ReactDOM from "react-dom";


class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      break_length: 5,
      session_length: 59,
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
    else if (id === "break_decrement") {
      console.log("FIRST BREAKS HERE")
      this.break_decrement()
    }
    else if (id === "break_increment") {
      this.break_increment()
    }
    else if (id === "session_decrement"){
      this.session_decrement()
    }
    else if (id === "session_increment"){
      this.session_increment()
    }

  }

  break_decrement = () => {
    // console.log("THEN WE BREAK HERE")
    // console.log(this.state.break_length)
    if (this.state.break_length > 0) {
      this.setState({
        break_length: this.state.break_length - 1
      })
    }
  }

  break_increment = () => {
    if (this.state.break_length < 60) {
    this.setState({
      break_length: this.state.break_length + 1
    })
  }
  }

  session_decrement = () => {
    this.setState({
      session_length: this.state.session_length - 1
    })
  }

  session_increment = () => {
    if (this.state.session_length < 60) {
    this.setState({
      session_length: this.state.session_length + 1
    })
  }
    else if (this.state.break_length === 60) {
      this.setState({
        session_length: 60
      })
    }
  
  }


  start_stop = () => {
    console.log("then this WORKS!")
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
    const { break_length, session_length, time_left} = this.props;
    return (
      <div>
        <div id="timer-label">
        <h1>Pomodoro Timer</h1>
        </div>

        {/* decrement */}
        <button id="break_decrement" onClick={this.onClick}>Decrease Break Length</button>
        <button id="session_decrement" onClick={this.onClick}>Decrease Session Length</button>
        {/* increment */}
        <button id="break_increment" onClick={this.onClick}>Increase Break Length</button>
        <button id="session_increment" onClick={this.onClick}>Increase Session Length</button>

        <div id="break_length">{this.state.break_length}</div>
        <div id="session_length">{this.state.session_length}</div>
        <div id="time_left">{this.state.time_left}</div>

        <button id="start_stop" onClick={this.onClick}> Start/Stop</button>
        <button id="reset" onClick={this.onClick}> Reset </button>


      </div>
    )
  }
}





ReactDOM.render(<App />, document.getElementById('app'));



