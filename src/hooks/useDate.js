import { useState } from 'react';
import dayjs from 'dayjs';

const useDate = (date, setDate) => {
  const currentDay = dayjs();

  const currentYear = date.year();
  const currentMonth = date.month(); // January = 0
  const daysInMonth = date.daysInMonth();

  // used to caculate days of prev month
  const firstDayOfMonth = dayjs(`${currentYear}-${currentMonth + 1}-1`);
  const weekDayOfFirstDoM = firstDayOfMonth.day(); // Sunday = 0

  // used to caculate days of prev month
  const lastDayOfMonth = dayjs(
    `${currentYear}-${currentMonth + 1}-${daysInMonth}`
  );
  const weekDayOfLastDoM = lastDayOfMonth.day();

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return {
    currentDay,
    currentMonth,
    currentYear,
    daysInMonth,
    weekDayOfFirstDoM,
    weekDayOfLastDoM,
    weekDays,
    setDate
  };
};

export default useDate;
