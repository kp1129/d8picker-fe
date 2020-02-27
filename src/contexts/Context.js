import React, { useState } from 'react'
import dayjs from 'dayjs';


const StateContext = React.createContext()

const StateProvider = ({ children })  =>  {
  const [selected, setSelected] = useState([])
  const [date, setDate] = useState(dayjs())
  
  const currentYear = date.year();
  const currentMonth = date.month(); // January = 0

  return(
    <StateContext.Provider
    value = {{
      selected: selected,
      setSelected: setSelected,

      date:date,
      setDate:setDate,

      currentYear:currentYear,
      currentMonth:currentMonth
    }}
    >
      {children}
    </StateContext.Provider>
  )
}

export {StateContext, StateProvider}