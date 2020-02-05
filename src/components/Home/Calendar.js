import React, {useState} from 'react'
import dateFns from 'date-fns'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils'

function Calendar() {
    const [ cal , setCal] = useState({
        currentMonth: new Date(),
        selectedDate: new Date ()
    })

    renderHeader() {
        const dateFormat = 'MMMM YYYY';

        return(
            <div className="header row flex-middle">
      <div className="col col-start">
        <div className="icon" onClick={this.prevMonth}>
          chevron_left
        </div>
      </div>
      <div className="col col-center">
        <span>
          {dateFns.format(this.state.currentMonth, dateFormat)}
        </span>
      </div>
      <div className="col col-end" onClick={this.nextMonth}>
        <div className="icon">chevron_right</div>
      </div>
    </div>
        );
    }

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
