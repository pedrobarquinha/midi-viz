import React from 'react';

function Svg({ children, width, height, classes }) {
  return (
    <svg width={width} height={height} className={classes}>
      {children}
    </svg>
  );
}

export default Svg;
