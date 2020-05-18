import React from 'react';
import * as d3 from 'd3';

import './index.css';
import { hertzExtent, velocityExtent } from '../../lib/constants';

const width = 500;
const height = 500;

const colorScale = d3
  .scaleLinear()
  .domain(velocityExtent)
  .range(['purple', 'yellow']);
const yScale = d3.scaleLinear().domain(hertzExtent).range([height, 0]);

function getAttributesFromMidi(midiMessage) {
  const { hZ, velocity } = midiMessage || {};

  return { fill: colorScale(velocity), circleY: yScale(hZ) || height / 2 };
}

function Dots({ notes }) {
  return (
    <g className="dots">
      {notes.map((midiNote, idx) => {
        const { fill, circleY } = getAttributesFromMidi(midiNote);

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
  );
}

export default Dots;
