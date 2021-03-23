import React from "react";
import "./App.css";
import ReactDOM from "react-dom";
import { getByDisplayValue } from "@testing-library/react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      break_length: 1,
      session_length: 1,
      minutes: 1,
      play: false,
      seconds: 0,
      cycle: "session",
      countdown: false,
    };
  }
  audio = new Audio(
    "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
  );

  componentDidMount() {
    this.audio.addEventListener("ended", () => this.setState({ play: false }));
  }

  componentWillUnmount() {
    this.audio.removeEventListener("ended", () =>
      this.setState({ play: false })
    );
  }

  togglePlay = () => {
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? this.audio.play() : this.audio.pause();
    });
  };

  onClick = (button) => {
    const id = button.target.id;

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
    document.getElementById("mainLabel").innerHTML = "Session";
    if (this.state.countdown === false) {
      this.setState({
        countdown: true,
      });

      this.myInterval = setInterval(() => {
        const { seconds, minutes } = this.state;

        if (seconds > 0) {
          this.setState(({ seconds }) => ({
            seconds: seconds - 1,
          }));
        }
        if (seconds === 0) {
          if (minutes === 0) {
            if (this.state.cycle === "session") {
              this.setState({ cycle: "break" });
              this.start_break();
              clearInterval(this.myInterval);
            }
          } else {
            this.setState(({ minutes }) => ({
              minutes: minutes - 1,
              seconds: 59,
            }));
          }
        }
      }, 100);
    } else if (this.state.countdown === true) {
      this.setState({
        countdown: false,
      });
      {
        clearInterval(this.myInterval);
      }
    }
  }

  start_break = () => {
    if (this.state.cycle === "break") {
      this.togglePlay();
      this.setState({ play: false });
      let label = (document.getElementById("mainLabel").innerHTML =
        "Break Time");
      this.breakTimer = setInterval(() => {
        const { seconds, minutes, break_length } = this.state;
        if (seconds > 0) {
          this.setState(({ seconds }) => ({
            seconds: seconds - 1,
          }));
        }
        if (seconds === 0) {
          if (break_length === 0) {
            clearInterval(this.break_Timer);
          } else {
            let newMinuteValue = break_length - 1;
            this.setState(({ minutes }) => ({
              minutes: newMinuteValue,
              break_length: newMinuteValue,
              seconds: 59,
            }));
            // this.audio.play()
          }
        }
      }, 100);
    }
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
  };

  render() {
    const { minutes, seconds } = this.state;
    return (
      <div>
        <h1 id="page-title">Pomodoro Timer</h1>
        <div id="timer-label">
          <h2 id="mainLabel"> Session In Progress </h2>
        </div>

        <button id="break-decrement" onClick={this.onClick}>
          Decrease Break Length
        </button>
        <button id="session-decrement" onClick={this.onClick}>
          Decrease Session Length
        </button>
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
          <h4 class="timer">
            Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}{" "}
          </h4>
        </div>

        <button
          id="start_stop"
          onClick={this.onClick}
          onClick={this.start_stop.bind(this)}
        >
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
