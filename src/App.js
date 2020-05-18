import React, { useState, useEffect, useCallback, useRef } from 'react';

import Svg from './components/Svg/index';
import Select from './components/Select/index';
import Line from './components/Line/index';
import Dots from './components/Dots/index';

import './App.css';

import play from './lib/play';

const vizualizations = ['dots', 'line'];
const width = 1000;
const height = 700;

function App() {
  const [vizType, setVizType] = useState(vizualizations[0]);
  const [notes, setNotes] = useState([]);
  const [numberOfNotes, setNumberOfNotes] = useState(5);
  const [playing, setPlaying] = useState(false);
  const numberOfNotesRef = useRef(numberOfNotes);

  function handleVizChange({ target: { value: vizType } }) {
    setVizType(vizType);
  }

  function handleNNoteChange({ target: { value: numberOfNotes } }) {
    setNumberOfNotes(numberOfNotes);
  }

  const handleNotePlay = useCallback(noteData => {
    if (!noteData.play) return;

    setNotes(notes => {
      let newNotes = [...notes, noteData];

      if (notes.length >= numberOfNotesRef.current) {
        newNotes = newNotes.slice(1);
      }

      return newNotes.map((note, idx) => ({ ...note, idx }));
    });
  }, []);

  const clearNotes = useCallback(() => {
    setNotes([]);
  }, []);

  useEffect(() => {
    numberOfNotesRef.current = numberOfNotes;

    if (!playing) {
      setPlaying(play(handleNotePlay));
    }
  }, [playing, handleNotePlay, numberOfNotes]);

  return (
    <div className="App">
      <Select
        handleSelect={handleVizChange}
        options={vizualizations}
        current={vizType}
      />
      <Select
        handleSelect={handleNNoteChange}
        options={[1, 5, 10, 20, 30]}
        current={numberOfNotes}
      />
      <button onClick={clearNotes}>clear</button>

      <div className="viz">
        <Svg width={width} height={height}>
          {vizType === 'dots' ? (
            <Dots notes={notes} width={width} height={height} />
          ) : (
            <Line notes={notes} width={width} height={height} />
          )}
        </Svg>
      </div>
    </div>
  );
}

export default App;
