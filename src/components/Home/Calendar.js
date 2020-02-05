import React, {useState} from 'react'
import dateFns from 'date-fns'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils'

function Calendar() {
    const [ cal , setCal] = useState({
        currentMonth: new Date(),
        selectedDate: new Date ()
    })

    renderHeader() {}

    renderDays() {}

    renderCells() {}

    onDateClick = day => {}

    nextMonth = () => {}

    prevMonth = () => {

    }
    return (
        <div className="calendar">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    )
}

export default Calendar
