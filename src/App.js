import React from "react";
import "./App.css";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      break_length: 1,
      session_length: 1,
      minutes: 1,
      seconds: 0,
      cycle: "session",
      countdown: false,
    };

    this.audio = React.createRef();
  }

  onClick = (button) => {
    const id = button.target.id;
    console.log(id);
    if (id === "start_stop") {
      this.start_stop();
    } else if (id === "break-decrement") {
      this.break_decrement();
    } else if (id === "break-increment") {
      this.break_increment();
    } else if (id === "session-decrement") {
      this.session_decrement();
    } else if (id === "session-increment") {
      this.session_increment();
    } else if (id === "reset") {
      this.reset();
    }
  };

  break_decrement = () => {
    if (this.state.break_length > 0) {
      this.setState({
        break_length: this.state.break_length - 1,
      });
    }
  };

  break_increment = () => {
    if (this.state.break_length < 60) {
      this.setState({
        break_length: this.state.break_length + 1,
      });
    }
  };

  session_decrement = () => {
    if (this.state.session_length > 0)
      this.setState({
        session_length: this.state.session_length - 1,
        minutes: this.state.session_length - 1,
      });
  };

  session_increment = () => {
    if (this.state.session_length < 60) {
      this.setState({
        session_length: this.state.session_length + 1,
        minutes: this.state.session_length + 1,
      });
    }
  };

  start_stop = () => {
    if (this.state.countdown === false) {
      this.setState({
        countdown: true,
      });

      this.myInterval = setInterval(() => {
        const { seconds, minutes, cycle } = this.state;

        if (seconds > 0) {
          this.setState(({ seconds }) => ({
            seconds: seconds - 1,
          }));
        }
        if (seconds === 0) {
          if (minutes === 0) {
            if (this.state.cycle === "session") {
              this.setState({ cycle: "break" });
              clearInterval(this.myInterval);
              //here perhaps start the countdown anew using
              //the value stored in state for break length as the minutes
              console.log(this.state.cycle);
              console.log("entered");
            }
          } else {
            this.setState(({ minutes }) => ({
              minutes: minutes - 1,
              seconds: 59,
            }));
          }
        }
      }, 1000);
    } else if (this.state.countdown === true) {
      this.setState({
        countdown: false,
      });
      {
        clearInterval(this.myInterval);
      }
    }
  };

  start_break = () => {
    this.myInterval = setInterval(() => {
      const { cycle } = this.state;
      if (cycle === "break") {
        if (seconds > 0) {
          this.setState(({ seconds }) => ({
            seconds: seconds - 1,
          }));
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(this.myInterval);
          } else {
            this.setState({
              minutes: this.state.break_length - 1,
              seconds: 59,
            });
          }
        }
      }
    }, 1000);
  };

  reset = () => {
    this.setState({
      break_length: 5,
      session_length: 25,
      minutes: 25,
      seconds: 0,
      cycle: "session",
      countdown: false,
    });
    //the reset needs to stop the countdown even when
    //clicked when countdown is already running
  };

  // playSound = () => {
  //   this.audio.play();
  // };

  render() {
    const {
      break_length,
      session_length,
      time_left,
      minutes,
      seconds,
    } = this.state;
    return (
      <div>
        <h1>Pomodoro Timer</h1>
        <div id="timer-label">
          <p> Session In Progress </p>
        </div>

        {/* decrement */}
        <button id="break-decrement" onClick={this.onClick}>
          Decrease Break Length
        </button>
        <button id="session-decrement" onClick={this.onClick}>
          Decrease Session Length
        </button>
        {/* increment */}
        <button id="break-increment" onClick={this.onClick}>
          Increase Break Length
        </button>
        <button id="session-increment" onClick={this.onClick}>
          Increase Session Length
        </button>

        <div id="break-length">
          {this.state.break_length}
          <div id="break-label">Break Length</div>
        </div>
        <div id="session-length">
          {this.state.session_length}
          <div id="session-label">Session Length</div>
        </div>
        <div id="time-left">
          {minutes === 0 && seconds === 0 ? (
            <h4> Finished </h4>
          ) : (
            <h4>
              Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}{" "}
            </h4>
          )}
        </div>

        <button id="start_stop" onClick={this.onClick}>
          {" "}
          Start/Stop
        </button>
        <button id="reset" onClick={this.onClick}>
          {" "}
          Reset{" "}
        </button>

        <audio
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          id="beep"
          ref={this.audio}
          preload="auto"
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
