import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import chroma from 'chroma-js';

import { cities, colorOptions } from './data';

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colorStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const ModalImplementation = (props) => {
  const [label, setLabel] = useState('');
  const [city, setCity] = useState(cities[0]);
  const [color, setColor] = useState(colorOptions[2]);
  const [time, setTime] = useState(moment().hour(0).minute(0));

  const onTimeChange = (value) => {
    setTime(value);
  };

  return (
    <Modal show={props.show} onHide={() => props.hide()} size="sm">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Reminder Label</label>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="form-control"
                maxLength="30"
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <div>
                <TimePicker
                  defaultValue={moment().hour(0).minute(0)}
                  value={time}
                  showSecond={false}
                  className="xxx"
                  onChange={onTimeChange}
                  format={'h:mm a'}
                  use12Hours
                  inputReadOnly
                />
              </div>
            </div>
            <div className="form-group">
              <label>City</label>
              <Select
                instanceId="city"
                placeholder={'Please select the City'}
                name="singleSelect"
                options={cities}
                onChange={(e) => setCity(e)}
                value={city}
                clearable={false}
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <Select
                defaultValue={color}
                label="Single select"
                options={colorOptions}
                styles={colorStyles}
                onChange={(e) => setColor(e)}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => props.addReminder(uuidv4(), label, city, time, color)}
        >
          Add Reminder
        </Button>
        <Button onClick={() => props.hide()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalImplementation;
