import React, { useState } from 'react';

import dayjs from 'dayjs';

// import Loading from '../loadingScreen/loading.js';

import './style.css';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const currentDay = dayjs();

const Day = ({num, selected, events, setSelected, templateFormOpen}) => {
  const [date, setDate] = useState(dayjs());
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
    //dateTime: "2020-02-28T08:30:00-08:00"

    const newdate = `${currentYear}-${currentMonth+1}-${num}`

    templateFormOpen
    ?(selected.includes(newdate)
      ? setSelected(selected.filter(day => day !== newdate))
      : setSelected(selected.concat(newdate)))
    :alert('pick a template')
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

const Calendar = ({ events, templateFormOpen, selected, setSelected, date, setDate}) => {
  // Component state
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


  console.log(currentYear, currentMonth)
  console.log(date)
  console.log(selected)

  

  return (
    <div>
      <div className="calendar">
       {/* Header contains PrevMonth, NextMonth and Current Date */}
        <div className="header">
          <button type="button" className="nav prev" onClick={handlePrev}>
            &lt;
          </button>
          <h3 className="heading">{date.format('MMMM YYYY')}</h3>
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
                events={events}
                selected={selected}
                setSelected={setSelected}
                templateFormOpen={templateFormOpen}
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
