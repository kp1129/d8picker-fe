import dayjs from 'dayjs';

const useDate = (date, setDate) => {
  const currentDay = dayjs();
  const currentYear = date.year();
  const currentMonth = date.month(); // January = 0
  const daysInMonth = date.daysInMonth();
  const firstDayOfMonth = dayjs(`${currentYear}-${currentMonth + 1}-1`); // used to caculate days of prev month
  const weekDayOfFirstDoM = firstDayOfMonth.day(); // Sunday = 0
  const lastDayOfMonth = dayjs(
    `${currentYear}-${currentMonth + 1}-${daysInMonth}`
  ); // used to caculate days of prev month
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
