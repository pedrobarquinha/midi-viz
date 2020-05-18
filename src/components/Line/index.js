import React from 'react';
import * as d3 from 'd3';

import { hertzExtent } from '../../lib/constants';

function Line({ notes, width, height }) {
  const xScale = d3
    .scaleLinear()
    .domain([0, notes.length - 1])
    .range([0, width]);
  const yScale = d3.scaleLinear().domain(hertzExtent).range([height, 0]);

  const drawLine = d3
    .line()
    .x(({ idx }) => xScale(idx))
    .y(({ hZ }) => yScale(hZ));

  return (
    <g className="line">
      <path d={drawLine(notes)} fill="none" stroke="pink" />
    </g>
  );
}

export default Line;
