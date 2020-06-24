import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

const cities = [
  { label: 'Bogota', value: 'BOG' },
  { label: 'New York', value: 'NYC' },
  { label: 'Barcelona', value: 'BCN' },
  { label: 'Shanghai', value: 'SHA' },
  { label: 'Sydney', value: 'SYD' },
];

const ModalImplementation = (props) => {
  const [label, setLabel] = useState('');
  const [city, setCity] = useState(cities[0]);
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
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.addReminder(uuidv4(), label, city, time)}>
          Add Reminder
        </Button>
        <Button onClick={() => props.hide()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalImplementation;
