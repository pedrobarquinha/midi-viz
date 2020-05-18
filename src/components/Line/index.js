import React from 'react';
import * as d3 from 'd3';

import './index.css';

import { hertzExtent, velocityExtent } from '../../lib/constants';

function Line({ notes, width, height }) {
  const xScale = d3
    .scaleLinear()
    .domain([0, notes.length - 1])
    .range([0, width]);
  const yScale = d3.scaleLinear().domain(hertzExtent).range([height, 0]);
  const strokeWidthScale = d3
    .scaleLinear()
    .domain(velocityExtent)
    .range([1, 5]);

  const drawLine = d3
    .line()
    .x(({ idx }) => xScale(idx))
    .y(({ hZ }) => yScale(hZ));

  const strokeWidth =
    strokeWidthScale((notes.slice(-1)[0] || {}).velocity) || 1;

  return (
    <g className="line">
      <path
        d={drawLine(notes)}
        strokeWidth={strokeWidth}
        stroke="yellow"
        fill="none"
      />
    </g>
  );
}

export default Line;
