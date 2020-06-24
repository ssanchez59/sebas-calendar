import React from 'react';
import './Reminder.css';

export function Reminder(props) {
  const prevLabel = props.label;
  const length = 20;
  var trimmedLabel =
    prevLabel.length > length
      ? prevLabel.substring(0, length - 3) + '...'
      : prevLabel;

  return (
    <div
      className="reminder"
      onClick={() => props.editReminder(props.id)}
      style={{
        fontSize: '15px',
        textAlign: 'left',
        borderRadius: '5px',
        backgroundColor: props.color.color,
        padding: '2px',
        display: 'flex',
      }}
    >
      <div style={{ color: '#FFF' }}>{trimmedLabel}</div>
    </div>
  );
}
