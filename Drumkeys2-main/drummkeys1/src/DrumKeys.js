// import React, { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './DrumKeys.css';
class Drumkeys extends React.Component {
  state = {
    active: null,
    volume: 0.5,
    pitch: 1,
  };

  playAudio = (e) => {
    e = e.toUpperCase();
    console.log("PLAYAUDIO EVENT:", e);
    let sample = document.getElementById("drum-pad-" + e);
    sample.currentTime = 0;

    sample.volume = this.state.volume;

    sample.playbackRate = this.state.pitch;

    sample.play();
  };

  handleClick = (e) => {
    console.log(e.target);
    console.log(e.target.name);
    this.playAudio(e.target.name);
    this.setState(
      { active: e.target.value },
      () => (document.querySelector("#display").innerText = this.state.active) //set the LED display
    );
  };

  handleKeyDown = (event) => {
    let keyCodes = [ 65, 83, 68, 70, 71, 72,74,75,76];

    if (keyCodes.indexOf(event.keyCode) === -1) return;
    this.playAudio(event.key);
    console.log(event.target);
    //set the LED display
    document.querySelector("#display").innerText = event.target.value;
    this.setState({ active: event.target.value });
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~");
  };

  handleVolume = (e) => {
    this.setState(
      { volume: e.target.value * 0.01 },
      () =>
        //Set the LED display
        (document.querySelector("#display").innerText =
          Math.round(this.state.volume * 100) + "%")
    );
  };

  handlePitch = (e) => {
    this.setState({ pitch: e.target.value });
  };

  // MAIN RENDERING
  render() {
    const { active, volume, pitch } = this.state;
    return (
      <div
        id="drum-machine"
        onKeyDown={(event) => this.handleKeyDown(event)}
        tabIndex={0}
      >
        <div id="wrapper-main">
          <DrumPad btnClick={(e) => this.handleClick(e)} instrument={active} />
          <div className="container-mods">
            <Volume onChange={this.handleVolume} volume={volume} />
            <div className="container-led-pitch">
              <SampleDisplay
                instrument={active}
                volume={`${Math.round(volume * 100)}%`}
                pitch={pitch}/>
              <PitchShift pitch={pitch} onChange={this.handlePitch} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const DrumPad = ({ btnClick }) => {
  return (
    <div className="container-drum-pad">
      <div className="row-top">
        <DrumPadBtn
          id="A"
          btnClick={btnClick}
          src="./Assets/sounds/boom.wav"
          instrument="Boom"
        />
        <DrumPadBtn
          id="S"
          btnClick={btnClick}
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Weird%20and%20Interesting%20Hits/40[kb]analogue_bubble.aif.mp3"
          instrument="Hihat"
        />
        <DrumPadBtn
          id="D"
          btnClick={btnClick}
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Rides/87[kb]cleanride.aif.mp3"
          instrument="Openhat"
        />
      </div>
      <div className="row-mid">
        <DrumPadBtn
          id="F"
          btnClick={btnClick}
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Snares/26[kb]clapsnare.aif.mp3"
          instrument="Snare"
        />
      
        <DrumPadBtn
          id="G"
          btnClick={btnClick}
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Hats/27[kb]ec-hat040.wav.mp3"
          instrument="Tom"
        />
      </div>
      <div className="row-bottom">
        <DrumPadBtn
          id="H"
          btnClick={btnClick}
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Kicks/61[kb]bunchakiks18.wav.mp3"
          instrument="clap"
        />
        <DrumPadBtn
          id="J"
          btnClick={btnClick}
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Kicks/67[kb]808sub.aif.mp3"
          instrument="Kick"
        />
        <DrumPadBtn
          id="K"
          btnClick={btnClick}
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Hats/39[kb]707-ohh.aif.mp3"
          instrument="Ride"/>
         < DrumPadBtn
         id = "L"
         btnClick = {
           btnClick
         }
         src = "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Hats/39[kb]707-ohh.aif.mp3"
         instrument = "Tank" />
      </div>
    </div>
  );
};

const DrumPadBtn = ({ id, btnClick, src, instrument }) => {
  return (
    <button
      className="drum-pad"
      name={id}
      value={instrument}
      onClick={btnClick}
    >
      <audio
        className="clip"
        src={src}
        type="audio/mpeg"
        id={`drum-pad-${id}`}
      ></audio>
      {id}
    </button>
  );
};

const Volume = ({ volume, onChange }) => {
  return (
    <div>
      <input
        type="range"
        orient="vertical"
        id="volume-bar"
        value={volume * 100}
        onChange={onChange}
      ></input>
    </div>
  );
};

const SampleDisplay = ({ pitch }) => {
  return (
    <div className="container-display">
      <h1 id="display">{pitch}</h1>
    </div>
  );
};

const PitchShift = ({ pitch, onChange }) => {
  return (
    <div className="container-pitch">
      <input
        id="pitch-bar"
        type="range"
        step={0.01}
        min={0.5}
        max={2}
        value={pitch}
        onChange={onChange}
      ></input>
      <label id="label-pitch">Pitch</label>
    </div>
  );
};
export default Drumkeys;
ReactDOM.render(<Drumkeys />, document.querySelector("#root"));