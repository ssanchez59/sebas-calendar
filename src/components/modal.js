import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import chroma from 'chroma-js';
import axios from 'axios';

// day Icons
import clearSkyDay from '../assets/01d@2x.png';
import fewCloudsDay from '../assets/02d@2x.png';
import scatteredCloudsDay from '../assets/03d@2x.png';
import brokenCloudsDay from '../assets/04d@2x.png';
import showerRainDay from '../assets/09d@2x.png';
import rainDay from '../assets/10d@2x.png';
import thunderstormDay from '../assets/11d@2x.png';
import snowDay from '../assets/13d@2x.png';
import mistDay from '../assets/50d@2x.png';

// night Icons
import clearSkyNight from '../assets/01n@2x.png';
import fewCloudsNight from '../assets/02n@2x.png';
import scatteredCloudsNight from '../assets/03n@2x.png';
import brokenCloudsNight from '../assets/04n@2x.png';
import showerRainNight from '../assets/09n@2x.png';
import rainNight from '../assets/10n@2x.png';
import thunderstormNight from '../assets/11n@2x.png';
import snowNight from '../assets/13n@2x.png';
import mistNight from '../assets/50n@2x.png';

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
  const [id] = useState(
    props.selectedReminder ? props.selectedReminder.id : null
  );
  const [label, setLabel] = useState(
    props.selectedReminder ? props.selectedReminder.label : ''
  );
  const [city, setCity] = useState(
    props.selectedReminder ? props.selectedReminder.city : cities[0]
  );
  const [color, setColor] = useState(
    props.selectedReminder ? props.selectedReminder.color : colorOptions[1]
  );
  const [time, setTime] = useState(
    props.selectedReminder
      ? props.selectedReminder.time
      : moment().hour(0).minute(0)
  );

  const [currentWeatherDescription, setCurrentWeatherDescription] = useState(
    ''
  );
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState('');

  const onTimeChange = (value) => {
    setTime(value);
  };

  const weatherSetter = async (e) => {
    const response = await axios['get'](
      `https://api.openweathermap.org/data/2.5/onecall?lat=${e.lat}&lon=${e.lng}&appid=410093601e4f6e50b574cb107349b63a`
    );
    if (response.status === 200) {
      if (response.data.current.weather.length > 0) {
        setCurrentWeatherDescription(response.data.current.weather[0].main);
        setCurrentWeatherIcon(response.data.current.weather[0].icon);
      }
    }
  };

  const getWeatherIcon = () => {
    if (currentWeatherIcon === '01d') {
      return clearSkyDay;
    } else if (currentWeatherIcon === '02d') {
      return fewCloudsDay;
    } else if (currentWeatherIcon === '03d') {
      return scatteredCloudsDay;
    } else if (currentWeatherIcon === '04d') {
      return brokenCloudsDay;
    } else if (currentWeatherIcon === '09d') {
      return showerRainDay;
    } else if (currentWeatherIcon === '10d') {
      return rainDay;
    } else if (currentWeatherIcon === '11d') {
      return thunderstormDay;
    } else if (currentWeatherIcon === '13d') {
      return snowDay;
    } else if (currentWeatherIcon === '50d') {
      return mistDay;
    } else if (currentWeatherIcon === '01n') {
      return clearSkyNight;
    } else if (currentWeatherIcon === '02n') {
      return fewCloudsNight;
    } else if (currentWeatherIcon === '03n') {
      return scatteredCloudsNight;
    } else if (currentWeatherIcon === '04n') {
      return brokenCloudsNight;
    } else if (currentWeatherIcon === '09n') {
      return showerRainNight;
    } else if (currentWeatherIcon === '10n') {
      return rainNight;
    } else if (currentWeatherIcon === '11n') {
      return thunderstormNight;
    } else if (currentWeatherIcon === '13n') {
      return snowNight;
    } else if (currentWeatherIcon === '50n') {
      return mistNight;
    }
  };

  useEffect(() => {
    weatherSetter(
      props.selectedReminder ? props.selectedReminder.city : cities[0]
    );
  }, [props.selectedReminder]);

  return (
    <Modal show={props.show} onHide={() => props.hide()} size="sm">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg">
          {id ? 'Edit' : 'Add'} Reminder
        </Modal.Title>
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
                onChange={(e) => {
                  setCity(e);
                  weatherSetter(e);
                }}
                value={city}
                clearable={false}
              />
            </div>
            <div className="form-group">
              <label>Color</label>
              <Select
                defaultValue={color}
                label="Single select"
                options={colorOptions}
                styles={colorStyles}
                onChange={(e) => setColor(e)}
              />
            </div>
            <div
              className="form-group"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <label>
                <b>Current Weather in {city.label}</b>
              </label>
              <img
                src={getWeatherIcon()}
                alt=""
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
              <label>{currentWeatherDescription}</label>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {id ? (
          <Button onClick={() => props.deleteReminder(id)}>
            Delete Reminder
          </Button>
        ) : null}
        <Button onClick={() => props.addReminder(id, label, city, time, color)}>
          {id ? 'Edit' : 'Add'} Reminder
        </Button>
        <Button onClick={() => props.hide()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalImplementation;
