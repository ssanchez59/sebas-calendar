import React from 'react';

export function Reminder(props) {
  const prevLabel = props.label;
  const length = 20;
  var trimmedLabel =
    prevLabel.length > length
      ? prevLabel.substring(0, length - 3) + '...'
      : prevLabel;

  return (
    <div className="reminder" style={{ fontSize: '15px', textAlign: 'left' }}>
      <div style={{ color: props.color }}>{trimmedLabel}</div>
    </div>
  );
}
