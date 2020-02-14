import React, { useState } from 'react';

import dayjs from 'dayjs';


// import Loading from '../loadingScreen/loading.js';

import './style.css';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const currentDay = dayjs();

const Calendar = ({events , data}) => {
	// Component state
	const [date, setDate] = useState(dayjs());
	// const [loading, setLoading] = useState(false);

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
		setDate(date.subtract(1, 'month'));
	};

	const handleNext = () => {
		setDate(date.add(1, 'month'));
	};

	return (
		<div>
      <img src={data && data.photoUrl} alt="" width="90" />
        <div>
          <h6>{data && data.name}</h6>
          <span>{data && data.email}</span>
          <br />
        </div>
			<div className='calendar'>
				<div className='header'>
					<button type='button' className='nav prev' onClick={handlePrev}>
						&lt;
					</button>
					<h3 className='heading'>{date.format('MMM DD YYYY')}</h3>
					<button type='button' className='nav nav next' onClick={handleNext}>
						&gt;
					</button>
				</div>
				<div className='labels'>
					{weekDays.map(d => (
						<span key={d}>{d}</span>
					))}
				</div>
				<div className='dates'>
					{[...Array(weekDayOfFirstDay).keys()].map(i => (
						<span className='faded' key={i}>
							{/* {firstDayOfMonth.subtract(weekDayOfFirstDay - i, "day").date()} */}
						</span>
					))}
					{[...Array(daysInMonth).keys()].map(i => {
						const isToday =
							i + 1 === currentDay.date() &&
							currentMonth === currentDay.month() &&
							currentYear === currentDay.year();
						const style = {
							color: isToday ? 'indianred' : 'inherit'
						};
						return (
							<span style={style} key={i}>
								{events &&
									events.map(e => {
										{
											const event =
												i + 1 === dayjs(e && e.start.dateTime).date() &&
												currentMonth === dayjs(e && e.start.dateTime).month() &&
												currentYear === dayjs(e && e.start.dateTime).year()
													? e.summary
													: null;
											return event;
										}
									})}

								{/* {event && event.start.dateTime} */}
								{i + 1}
							</span>
						);
					})}
					{[...Array(6 - weekDayOfLastDay).keys()].map(i => (
						<span className='faded' key={i}>
							{/* {lastDayOfMonth.add(i + 1, "day").date()} */}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};
export default Calendar;
