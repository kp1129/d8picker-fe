import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import "./style.css";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const currentDay = dayjs();

const Calendar = props => {
  const [events, setEvents] = useState(mockEvents.events);
  const [date, setDate] = useState(dayjs());

  const currentYear = date.year();
  const currentMonth = date.month(); // January = 0
  const daysInMonth = date.daysInMonth();

  const firstDayOfMonth = dayjs(`${currentYear}-${currentMonth + 1}-1`);
  const weekDayOfFirstDay = firstDayOfMonth.day(); // Sunday = 0

  const lastDayOfMonth = dayjs(
    `${currentYear}-${currentMonth + 1}-${daysInMonth}`
  );
  const weekDayOfLastDay = lastDayOfMonth.day();
  
  const handlePrev = () => {
    setDate(date.subtract(1, "month"));
  };

  const handleNext = () => {
    setDate(date.add(1, "month"));
  };
  
  return (
    <div className="calendar">
     
    </div>
  );
};
export default Calendar;
