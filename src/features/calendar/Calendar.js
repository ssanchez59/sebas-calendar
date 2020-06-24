import React, { useState } from 'react';
import format from 'date-fns/format';

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
import parse from 'date-fns/parse';

// fortawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import './Calendar.css';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
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
                : isSameDay(day, selectedDate)
                ? 'selected'
                : ''
            }`}
            key={day}
            onClick={() => onDateClick(parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
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
    console.log('myDay', day);
    setSelectedDate(day);
  };
  return (
    <div className="calendar">
      <div>{header()}</div>
      <div>{days()}</div>
      <div>{cells()}</div>
    </div>
  );
}
