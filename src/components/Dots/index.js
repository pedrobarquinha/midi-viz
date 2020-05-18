import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

import './index.css';

const minHertz = 87.30705785825097;
const maxHertz = 1046.5022612023945;
const hertzExtent = [minHertz, maxHertz];

const minVelocity = 1;
const maxVelocity = 127;
const velocityExtent = [minVelocity, maxVelocity];

const width = 500;
const height = 500;

const colorScale = d3
  .scaleLinear()
  .domain(velocityExtent)
  .range(['purple', 'yellow']);
const yScale = d3.scaleLinear().domain(hertzExtent).range([height, 0]);

function Dots({ notes }) {
  function handleMidiMessage(midiMessage) {
    const { hZ, velocity } = midiMessage || {};

    return { fill: colorScale(velocity), circleY: yScale(hZ) || height / 2 };
  }

  return (
    <svg width={width} height={height}>
      <g className="dots">
        {notes.map((message, idx) => {
          const { fill, circleY } = handleMidiMessage(message);

          return (
            <circle
              key={idx + circleY}
              transform={`translate(${width / 2}, ${circleY})`}
              r="10"
              fill={fill}
              stroke="white"
            />
          );
        })}
      </g>
    </svg>
  );
}

export default Dots;
