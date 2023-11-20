import React, { useState, useEffect } from 'react';
import './App.css';
import * as Tone from 'tone';

function App() {
  const [text, setText] = useState('');
  const [instrumentType, setInstrumentType] = useState('sine');
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [beatNoteValue, setBeatNoteValue] = useState(4);
  
  const [synth, setSynth] = useState(new Tone.Synth().toDestination());

  useEffect(() => {
    const newSynth = new Tone.Synth({
      oscillator: { type: instrumentType }
    }).toDestination();
    setSynth(newSynth);
  }, [instrumentType]);
  
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const playNote = (note, duration = '8n', time) => {
    Tone.Transport.scheduleOnce((time) => {
        synth.triggerAttackRelease(note, duration, time);
    }, time);
  };

  const handleSubmit = () => {
    Tone.Transport.cancel(); // Clears existing events
    let startTime = Tone.now();
  
    const textUpperCase = text.toUpperCase();
    const duration = `${beatNoteValue}n`; 
    let time = 0; // Start time for the first note
  
    for (const char of textUpperCase) {
        const note = char + '4'; 
        if (Tone.Frequency(note).toFrequency()) {
            playNote(note, duration, `+${time}`);
            time += Tone.Time(duration).toSeconds();
        }
    }

    Tone.Transport.start(startTime);
  };

  
  const handleStop = () => {
    Tone.Transport.cancel(); // Clears scheduled events
    Tone.Transport.stop();   // Stops the Transport if it's running
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
        <div>
          <label htmlFor="beats-per-measure-select">Beats per Measure: </label>
            <select 
              id="beats-per-measure-select" 
              value={beatsPerMeasure} 
              onChange={(e) => setBeatsPerMeasure(e.target.value)}
            >
            <option value="2">2 Beats</option>
            <option value="3">3 Beats</option>
            <option value="4">4 Beats</option>
          </select>
        </div>

        <div>
          <label htmlFor="beat-note-value-select">Note Value per Beat: </label>
          <select 
            id="beat-note-value-select" 
            value={beatNoteValue} 
            onChange={(e) => setBeatNoteValue(e.target.value)}
          >
            <option value="1">Whole Note (1)</option>
            <option value="2">Half Note (2)</option>
            <option value="4">Quarter Note (4)</option>
            <option value="8">Eighth Note (8)</option>
          </select>
        </div>

        <button onClick={handleSubmit}>Play</button>
        <button onClick={handleStop}>Stop</button>

      </main>
      <footer>
        <a target="_blank" href="https://icons8.com/icon/12783/music">Music</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      </footer>
    </div>
  );
}

export default App;
