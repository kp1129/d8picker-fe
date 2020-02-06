import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  parse,
  addDays
} from "date-fns";
const Cells = props => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const monthStart = startOfMonth(props.currDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";
  const onDateClick = day => {
    setSelectedDate(day);
  };
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      days.push(
        <div
          className={`column cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : ""
          }`}
          key={day}
          onClick={() => {
            onDateClick(parse("", "", cloneDay));
            toggle();
          }}
        >
          <span className="number">{formattedDate}</span>
          <span className="bg">{formattedDate}</span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {" "}
        {days} 
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}
  </div>;
};
export default Cells;