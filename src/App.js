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
        clockCount: this.state.clockCount - 1,
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

  handleLengthChange = (count, timerType) => {
    const { 
      session_length, 
      break_length, 
      isPlaying, 
      cycle
    } = this.state;
    
    let newCount;
    
    if(timerType === 'session') {
      newCount = session_length + count;
    } else {
      newCount = break_length + count;
    }
    
    if(newCount > 0 && newCount < 61 && !isPlaying) {
      this.setState({
        [`${timerType}_length`]: newCount
      });
      
      if(cycle.toLowerCase() === timerType) {
        this.setState({
          clockCount: newCount * 60
        })
      }
    }
  }

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
          minutes,
          play,
          seconds,
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

  //   document.getElementById("mainLabel").innerHTML = "session in progress";
  //   if (this.state.countdown === false) {
  //     this.setState({
  //       countdown: true,
  //     });

  //     this.myInterval = setInterval(() => {
  //       const { seconds, minutes } = this.state;

  //       if (seconds > 0) {
  //         this.setState(({ seconds }) => ({
  //           seconds: seconds - 1,
  //         }));
  //       }
  //       if (seconds === 0) {
  //         if (minutes === 0) {
  //           if (this.state.cycle === "session") {
  //             this.setState({ cycle: "break" });
  //             this.start_break();
  //             clearInterval(this.myInterval);
  //           }
  //         } else {
  //           this.setState(({ minutes }) => ({
  //             minutes: minutes - 1,
  //             seconds: 59,
  //           }));
  //         }
  //       }
  //     }, 100);
  //   } else if (this.state.countdown === true) {
  //     this.setState({
  //       countdown: false,
  //     });
  //     {
  //       clearInterval(this.myInterval);
  //     }
  //   }
  // };

  // start_break = () => {
  //   if (this.state.cycle === "break") {
  //     this.togglePlay();

  //     let label = (document.getElementById("mainLabel").innerHTML =
  //       "Break Time");
  //     this.breakTimer = setInterval(() => {
  //       const { seconds, minutes, break_length } = this.state;
  //       if (seconds > 0) {
  //         this.setState(({ seconds }) => ({
  //           seconds: seconds - 1,
  //         }));
  //       }
  //       if (seconds === 0) {
  //         if (break_length === 0) {
  //           this.start_stop();
  //           console.log(this.state.session_length)
  //           clearInterval(this.break_Timer);
  //         } else {
  //           let newMinuteValue = break_length - 1;
  //           this.setState(({ minutes }) => ({
  //             minutes: newMinuteValue,
  //             break_length: newMinuteValue, //we need this here so that it doesn't
  //             //keep resetting the minutes value to the value stored
  //             seconds: 59,
  //           }));
  //         }
  //       }
  //     }, 100);
  //   }
  // };

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
    const { 
      break_length,
      session_length,
      minutes,
      play,
      seconds,
      cycle,
      countdown,
      clockCount,
      handleDecrease,
      handleIncrease
    } = this.state;
    
    const breakProps = {
      title: 'Break',
      count: break_length,
      handleDecrease: () => this.handleLengthChange(-1, 'break'),
      handleIncrease: () => this.handleLengthChange(1, 'break')
    }
    
    const sessionProps = {
      title: 'Session',
      count: session_length,
      handleDecrease: () => this.handleLengthChange(-1, 'session'),
      handleIncrease: () => this.handleLengthChange(1, 'session'),
    }

    return (
      <div>
          <h1 id="page-title">Pomodoro Timer</h1>
          <div id="timer-label">
             <h2 id="mainLabel"> you got this! </h2></div>
        <div className="flex">
          <SetTimer {...breakProps} />
          <SetTimer {...sessionProps} />
        </div>
        
        <div id="time-left">
          <h1 id="timer-label">{cycle}</h1>
          <span className="timer">{this.convertToTime(clockCount)}</span>
          
          
          <div className="flex">
            <button id="start_stop" onClick={this.start_stop}>
              <i className={`fas fa-${play ? 'pause': 'play'}`} />
            </button>
            <button id="reset" onClick={this.reset}>
              <i className="fas fa-sync" />
            </button>
             <audio
              src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
              id="beep"
              ref={this.audio}
              preload="auto"
            />
          </div>
        </div>
      </div>);

    // return (
    //   <div>
    //     <div>
    //       <h1 id="page-title">Pomodoro Timer</h1>
    //       <div id="timer-label">
    //         <h2 id="mainLabel"> you got this! </h2>
    //       </div>
    //       <div className="topContainer">
    //       <div  {...breakProps} />
    //       <div {...sessionProps} />
    //         <div id="time-left">
    //           {this.state.cycle}
    //           <h4 class="timer">
    //             {this.convertToTime(this.state.clockCount)}
    //             {/* {minutes}:{seconds < 10 ? `0${seconds}` : seconds}{" "} */}
    //           </h4>
    //         </div>
    //       </div>
    //       <div className="midContainer">
    //         <button
    //           id="start_stop"
    //           class="start"
    //           onClick={this.start_stop}
    //           onClick={this.start_stop.bind(this)}
    //         >
    //           {" "}
    //           Start/Stop
    //         </button>
    //         <button class="reset" id="reset" onClick={this.onClick}>
    //           Reset{" "}
    //         </button>
    //         <audio
    //           src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    //           id="beep"
    //           ref={this.audio}
    //           preload="auto"
    //         />
    //       </div>

    //       <div className="container">
    //         <button id="break-decrement" onClick={this.onClick}>
    //           <FontAwesomeIcon
    //             icon={faSortDown}
    //             id="iconBdown"
    //             onClick={this.break_decrement}
    //           />
    //         </button>
    //         <button id="break-increment" onClick={this.onClick}>
    //           <FontAwesomeIcon
    //             icon={faSortUp}
    //             id="iconBup"
    //             onClick={this.break_increment}
    //           />
    //         </button>

    //         <button id="session-decrement" onClick={this.onClick}>
    //           <FontAwesomeIcon
    //             icon={faSortDown}
    //             id="iconSdown"
    //             onClick={this.handleDecrease}
    //           />
    //         </button>
    //         <button id="session-increment" onClick={this.onClick}>
    //           <FontAwesomeIcon
    //             icon={faSortUp}
    //             id="iconSup"
    //             onClick={this.session_increment}
    //           />
    //         </button>
    //       </div>
    //       <div className="labelContainer">
    //         <div id="break-length" className="break-label">
    //           <div id="break-label">
    //             {" "}
    //             Break Length: {this.state.break_length} mins
    //           </div>
    //         </div>
    //         <div id="session-length" className="session-label">
    //           <div id="session-label">
    //             Session Length: {this.state.session_length} mins
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

const SetTimer = (props) => {
  const id = props.title.toLowerCase();
  
  return (
    <div className="timer-container">
      <h2 id={`${id}-label`}>
        {props.title} Length
      </h2>
      <div className="flex actions-wrapper">
        <button id={`${id}-decrement`} onClick={props.handleDecrease}>
          <i className="fas fa-minus" />
        </button>
        
        <span id={`${id}-length`}>{props.count}</span>
        
        <button id={`${id}-increment`} onClick={props.handleIncrease}>
          {/* <i className="fas fa-plus" /> */}
         <FontAwesomeIcon
                icon={faSortUp}
                id="iconSup"
                onClick={props.handleIncrease}
              />
        </button>
      </div>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("app"));
export default App;
