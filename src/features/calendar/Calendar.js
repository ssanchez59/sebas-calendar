import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  addReminderAction,
  deleteReminderAction,
  incrementByAmount,
  incrementAsync,
  selectReminders,
} from './calendarSlice';

import moment from 'moment';

//fns imports
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import isSameMonth from 'date-fns/isSameMonth';
import isSameDay from 'date-fns/isSameDay';
import format from 'date-fns/format';

// fortawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import './Calendar.css';
import { Reminder } from '../reminder/Reminder';
import ModalImplementation from '../../components/modal';

export function Calendar() {
  const reminders = useSelector(selectReminders);
  const dispatch = useDispatch();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedReminder, setSelectedReminder] = useState(null);

  const [showReminderModal, setShowReminderModal] = useState(false);

  const header = () => {
    const dateFormat = 'MMM yyyy';
    return (
      <div className="header row flex-middle">
        <div className="column col-start">
          <div className="icon" onClick={prevMonth}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              style={{
                color: '#09adee',
                width: '25px',
                height: '25px',
                marginRight: '15px',
              }}
            />
          </div>
        </div>
        <div className="column col-center">
          <span>{format(currentDate, dateFormat)}</span>
        </div>
        <div className="column col-end">
          <div className="icon" onClick={nextMonth}>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{
                color: '#09adee',
                width: '25px',
                height: '25px',
                marginRight: '15px',
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const days = () => {
    const dateFormat = 'iii';
    const days = [];
    let startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="column col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };

  const cells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = 'd';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`column cell ${
              !isSameMonth(day, monthStart)
                ? 'disabled'
                : isSameDay(day, currentDate)
                ? 'selected'
                : ''
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
            style={{ overflow: 'scroll' }}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '3px',
              }}
            >
              {getReminders(day)}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {' '}
          {days}{' '}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
    setShowReminderModal(true);
  };

  const getReminders = (day) => {
    return reminders
      .filter((reminder) => {
        return isSameDay(Date.parse(reminder.selectedDate), day);
      })
      .sort((a, b) => {
        const temp1 = moment(a, 'hh:mm:ss a');
        const temp2 = moment(b, 'hh:mm:ss a');
        return temp1 - temp2;
      })
      .map((reminder, index) => {
        return (
          <Reminder
            key={index}
            id={reminder.id}
            label={reminder.label}
            color={reminder.color}
            day={day}
            editReminder={editReminder}
            deleteReminder={deleteReminder}
          />
        );
      });
  };

  const addReminder = (id, label, city, time, color) => {
    const stringDate = selectedDate.toString();
    dispatch(
      addReminderAction({
        id,
        label,
        city,
        time,
        color,
        selectedDate: stringDate,
      })
    );
    setShowReminderModal(false);
  };

  const editReminder = (id) => {
    setSelectedReminder(reminders.find((reminder) => reminder.id === id));
    setShowReminderModal(true);
  };

  const deleteReminder = (id) => {
    dispatch(
      deleteReminderAction({
        id,
      })
    );
    setSelectedReminder(null);
    setShowReminderModal(false);
  };

  const deleteReminders = (selectedDate) => {
    const toDelete = reminders.filter((reminder) => {
      return isSameDay(Date.parse(reminder.selectedDate), selectedDate);
    });

    toDelete.forEach(function (arrayItem) {
      const foundIndex = reminders.findIndex((x) => x.id === arrayItem.id);
      reminders.splice(foundIndex, 1);
    });

    setSelectedReminder(null);
    setShowReminderModal(false);
  };

  console.log('reminders', reminders);

  return (
    <div className="calendar">
      <div>{header()}</div>
      <div>{days()}</div>
      <div>{cells()}</div>
      {showReminderModal && (
        <ModalImplementation
          show={showReminderModal}
          hide={() => {
            setShowReminderModal(false);
            setSelectedReminder(null);
          }}
          addReminder={addReminder}
          selectedReminder={selectedReminder}
          deleteReminder={deleteReminder}
          selectedDate={selectedDate}
          handleSelectedDateChange={(value) => {
            setSelectedDate(value);
          }}
          deleteReminders={deleteReminders}
        />
      )}
    </div>
  );
}
