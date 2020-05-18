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

function Dots({ midiMessage }) {
  const [circleY, setCircleY] = useState(600);
  const [circleFill, setCircleFill] = useState('yellow');

  useEffect(() => {
    const colorScale = d3
      .scaleLinear()
      .domain(velocityExtent)
      .range(['purple', 'red']);
    const yScale = d3.scaleLinear().domain(hertzExtent).range([height, 0]);

    const { hZ, velocity } = midiMessage || {};

    setCircleFill(colorScale(velocity));
    setCircleY(yScale(hZ) || height / 2);
  }, [midiMessage]);

  return (
    <svg width={width} height={height}>
      <g className="dots">
        <circle
          transform={`translate(${width / 2}, ${circleY})`}
          r="10"
          fill={circleFill}
          stroke="white"
        />
      </g>
    </svg>
  );
}

export default Dots;
