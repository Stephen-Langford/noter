import React, { useState } from 'react';
import './App.css';
import * as Tone from 'tone';

function App() {
  const [text, setText] = useState('');
  const [instrumentType, setInstrumentType] = useState('sine');
  const synth = new Tone.Synth().toDestination();

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const playNote = (note, duration = '8n', time = Tone.now()) => {
    synth.oscillator.type = instrumentType;
    synth.triggerAttackRelease(note, duration, time);
  };

  const handleSubmit = () => {
    Tone.start();

    let time = Tone.now();
    const textUpperCase = text.toUpperCase();

    for (const char of textUpperCase) {
      const note = char + '4';
      if (Tone.Frequency(note).toFrequency()) {
        playNote(note, '8n', time);
        time += Tone.Time('8n').toSeconds();
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Noter</h1>
      </header>
      <main>
        <textarea value={text} onChange={handleTextChange} placeholder="Type your notes here..." />
        <div>
          <label htmlFor="instrument-select">Choose an instrument: </label>
          <select id="instrument-select" value={instrumentType} onChange={(e) => setInstrumentType(e.target.value)}>
            <option value="sine">Sine Wave</option>
            <option value="square">Square Wave</option>
            <option value="sawtooth">Sawtooth Wave</option>
            <option value="triangle">Triangle Wave</option>
          </select>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </main>
      <footer>
        <a target="_blank" href="https://icons8.com/icon/12783/music">Music</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      </footer>
    </div>
  );
}

export default App;
