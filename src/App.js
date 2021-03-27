import React, { useState, useEffect } from "react";
import "./App.css";
import ReactDOM from "react-dom";
import { getByDisplayValue } from "@testing-library/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      break_length: 2,
      session_length: 2,
      minutes: 1,
      play: false,
      seconds: 0,
      cycle: "session",
      countdown: false,
      clockCount: 2 * 60,
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


  handleLengthChange = (count, timerType) => {
    const { session_length, break_length, isPlaying, cycle } = this.state;

    let newCount;

    if (timerType === "session") {
      newCount = session_length + count;
    } else {
      newCount = break_length + count;
    }

    if (newCount > 0 && newCount < 61 && !isPlaying) {
      this.setState({
        [`${timerType}_length`]: newCount,
      });

      if (cycle.toLowerCase() === timerType) {
        this.setState({
          clockCount: newCount * 60,
        });
      }
    }
  };

  start_stop = () => {
    const { countdown } = this.state;

    if (countdown) {
      clearInterval(this.loop);
      this.setState({ countdown: false });
    } else {
      this.setState({ countdown: true });

      this.loop = setInterval(() => {
        const {
          break_length,
          session_length,
          cycle,
          countdown,
          clockCount,
        } = this.state;

        if (clockCount === 0) {
          this.setState({
            cycle: cycle === "Session" ? "Break" : "Session",
            clockCount:
              cycle === "Session" ? break_length * 60 : session_length * 60,
          });
          this.togglePlay();
        } else {
          this.setState({
            clockCount: clockCount - 1,
          });
        }
      }, 100);
    }
  };


  reset = () => {
    clearInterval(this.loop);
    this.setState({
      break_length: 5,
      session_length: 25,
      clockCount: 25 * 60,
      minutes: 25,
      seconds: 0,
      cycle: "session",
      countdown: false,
    });
  };

  convertToTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${minutes}:${seconds}`;
  };

  render() {
    const { break_length, session_length, cycle, clockCount } = this.state;

    const handleDecrease = () => this.handleLengthChange(-1, "break");
    const handleIncrease = () => this.handleLengthChange(1, "break");

    const sessionProps = {
      things: "rogers", 
      title: "Session",
      count: session_length,
      handleDecrease: () => this.handleLengthChange(-1, "session"),
      handleIncrease: () => this.handleLengthChange(1, "session"),
    };

    return (
      <div>
        <h1 id="page-title">Pomodoro Timer</h1>
        <div id="timer-label">
          <h2 id="mainLabel"> you got this! </h2>
        </div>
          <div className="flex">
            <SetTimer
              things="Jolly"
              title="Break"
              count={break_length}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease} />
            <SetTimer {...sessionProps}/>
          </div>

        <div id="time-left">
          <h1 id="timer-label">{cycle}</h1>
          <span className="timer">{this.convertToTime(clockCount)}</span>

          <div className="flex">
            <button id="start_stop" onClick={this.start_stop}>
              play/pause
            </button>
            <button id="reset" onClick={this.reset}>
              reset
            </button>
            <audio
              src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
              id="beep"
              ref={this.audio}
              preload="auto"
            />
          </div>
        </div>
      </div>
    );

  }
}

const SetTimer = (props) => {
  const id = props.title.toLowerCase();

  return (
    <div className="timer-container">
      <h2 id={`${id}-label`}>{props.title} Length</h2>
      <h3>{props.things}</h3>
      <div className="flex actions-wrapper">
        <button id={`${id}-decrement`} onClick={props.handleDecrease}>
          <FontAwesomeIcon
            icon={faSortDown}
            id="iconSdown"
            onClick={props.handleDecrease}
          />
        </button>

        <span id={`${id}-length`}>{props.count}</span>
<h2>{props.things}</h2>
        <button id={`${id}-increment`} onClick={props.handleIncrease}>
          <FontAwesomeIcon
            icon={faSortUp}
            id="iconSup"
            onClick={props.handleIncrease}
          />
        </button>
      </div>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
export default App;
