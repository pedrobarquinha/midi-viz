import React from 'react';

function Select({ handleSelect, options, current }) {
  return (
    <select value={current} onChange={handleSelect}>
      {options.map(option => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
