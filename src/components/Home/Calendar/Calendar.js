import React, { useState } from 'react';

import dayjs from 'dayjs';

// import Loading from '../loadingScreen/loading.js';

import './style.css';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const currentDay = dayjs();

const Day = props => {
  const [date, setDate] = useState(dayjs());
  const {num, selected, events, setSelected} = props
  const currentYear = date.year();
  const currentMonth = date.month();
  const isToday = num === currentDay.date()
    && currentMonth === currentDay.month() 
    && currentYear === currentDay.year();
  const isPicked = selected.includes(num);
  const style = {
    color: isToday ? 'indianred' : 'inherit',
    background: isPicked ?'green': null
  };
  const handleSelected = i => { 
    selected.includes(i)
    ? setSelected(selected.filter(day => day !== i))
    : setSelected(selected.concat(i)) 
  }

  return (
    <span style={style} onClick={()=> handleSelected(num)}>
      {events && events.map(e => {
        const event =
          num === dayjs(e && e.start.dateTime).date() &&
          currentMonth === dayjs(e && e.start.dateTime).month() &&
          currentYear === dayjs(e && e.start.dateTime).year()
            ? e.summary
            : null;
        return event;
      })}

      {/* {event && event.start.dateTime} */}
      {num}
    </span>
  )
}

const Calendar = ({ events }) => {
  // Component state
  const [date, setDate] = useState(dayjs());
  const [selected, setSelected] = useState([])
  // const [loading, setLoading] = useState(false);

  const currentYear = date.year();
  const currentMonth = date.month(); // January = 0
  const daysInMonth = date.daysInMonth();

  const firstDayOfMonth = dayjs(`${currentYear}-${currentMonth + 1}-1`);
  const weekDayOfFirstDay = firstDayOfMonth.day(); // Sunday = 0

  const lastDayOfMonth = dayjs(`${currentYear}-${currentMonth + 1}-${daysInMonth}`);
  const weekDayOfLastDay = lastDayOfMonth.day();

  const handlePrev = () => {setDate(date.subtract(1, 'month'));};

  const handleNext = () => {setDate(date.add(1, 'month'));};


  

  return (
    <div>
      <div className="calendar">
       {/* Header contains PrevMonth, NextMonth and Current Date */}
        <div className="header">
          <button type="button" className="nav prev" onClick={handlePrev}>
            &lt;
          </button>
          <h3 className="heading">{date.format('MMM DD YYYY')}</h3>
          <button type="button" className="nav nav next" onClick={handleNext}>
            &gt;
          </button>
        </div>
        {/* Contains List of weekdays */}
        <div className="labels">
          {weekDays.map(d => (
            <span key={d}>{d}</span>
          ))}
        </div>
        {/* holds days of month*/}
        <div className="dates">
          {/* empty days from prevmonth */}
          {[...Array(weekDayOfFirstDay).keys()].map(i => (
            <span className="faded" key={i}>
              {/* {firstDayOfMonth.subtract(weekDayOfFirstDay - i, "day").date()} */}
            </span>
          ))}

          {/* labeled days for current month */}
          {[...Array(daysInMonth).keys()].map(i => {
            
            return (
              <Day 
                key={i+1}
                num={i+1}  
                event={events}
                selected={selected}
                setSelected={setSelected}
              />
            );
          })}
          {[...Array(6 - weekDayOfLastDay).keys()].map(i => (
            <span className="faded" key={i}>
              {/* {lastDayOfMonth.add(i + 1, "day").date()} */}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Calendar;
