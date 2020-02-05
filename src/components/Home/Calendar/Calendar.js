import React, { useState } from "react";
import Header from "./Header";
import DaysOfWeek from "./DaysOfWeek";
import Cells from './Cells'
import "./calendar.css";

const Calendar = props => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  return (
    <div className="calendar">
      <Header setCurrDate = {setCurrentDate} currDate = {currentDate} />
      <DaysOfWeek currDate = {currentDate}/>
      <Cells currDate = {currentDate} />
    </div>
  );
};
export default Calendar;
