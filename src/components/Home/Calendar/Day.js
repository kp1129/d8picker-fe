import React from 'react'
import dayjs from 'dayjs';
import { useTemplate } from '../../../hooks/useTemplate'


const Day = ({num, events, templateFormOpen, month, year}) => {
  const {selected, setSelected} = useTemplate()
  const {date, setDate} = useTemplate()
  const currentDay = dayjs();

  const isToday = num === currentDay.date()
    && month === currentDay.month() 
    && year === currentDay.year();
  const isPicked = selected.includes(`${year}-${month+1 < 10 ? 0 : ''}${month+1}-${num < 10 ? 0 : ''}${num}`);
  const style = {
    color: isToday ? 'indianred' : 'inherit',
    background: isPicked ?'green': null
  };
  const handleSelected = i => {
    //dateTime: "2020-02-28T08:30:00-08:00"

    //concatinated to w/ turnary to put into correct format
    const newdate = date.format('YYYY-MM').concat(`-${num < 10 ? 0 : ''}${num}`)

    templateFormOpen
    ?(selected.includes(newdate)
      ? setSelected(selected.filter(day => day !== newdate))
      : setSelected(selected.concat(newdate)))
    :alert('pick a template')
    console.log(selected)
  }

  return (
    <span style={style} onClick={()=> handleSelected(num)}>
      {events && events.map(e => {
        const event =
          num === dayjs(e && e.start.dateTime).date() &&
          month === dayjs(e && e.start.dateTime).month() &&
          year === dayjs(e && e.start.dateTime).year()
            ? e.summary
            : null;
        return event;
      })}

      {/* {event && event.start.dateTime} */}
      {num}
    </span>
  )
}

export default Day
