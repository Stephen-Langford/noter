import React, { useState, useEffect } from 'react';
import './App.css';
import { tone } from './tones'; // Assuming tones.js is in the src directory

function App() {
  const [text, setText] = useState('');
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    setAudioContext(new (window.AudioContext || window.webkitAudioContext)());
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const playNote = (frequency, duration = 500, delay = 0) => {
    setTimeout(() => {
      const oscillator = audioContext.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration / 1000);
    }, delay);
  };
  
  const handleSubmit = () => {
    const textUpperCase = text.toUpperCase();
    let delay = 0;
    for (const char of textUpperCase) {
      if (tone[char]) {
        const octave = 4;
        const frequency = tone[char][octave];
        playNote(frequency, 500, delay);
        delay += 600; // Add a delay for the next note
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
        <button onClick={handleSubmit}>Submit</button>
      </main>
    </div>
  );
}

export default App;
