import React, { useState, useEffect } from 'react';

import Select from './components/Select/index';
import Dots from './components/Dots/index';

import './App.css';

import play from './lib/play';

const vizualizations = ['dots', 'line'];

function App() {
  const [vizType, setVizType] = useState(vizualizations[0]);
  const [lastNote, setLastNote] = useState({});

  function handleVizChange({ target: { value: vizType } }) {
    setVizType(vizType);
  }

  function handleNotePlay(noteData) {
    setLastNote(noteData);
  }

  useEffect(() => {
    play(handleNotePlay);
  }, []);

  return (
    <div className="App">
      <Select
        handleSelect={handleVizChange}
        options={vizualizations}
        current={vizType}
      />

      <div className="viz">
        {vizType === 'dots' ? <Dots midiMessage={lastNote} /> : <></>}
      </div>
    </div>
  );
}

export default App;
