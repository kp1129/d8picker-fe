import React, { useState } from 'react'

const StateContext = React.createContext()

const StateProvider = ({ children })  =>  {
  const [selected, setSelected] = useState([])


  return(
    <StateContext.Provider
    value = {{
      selected: selected,
      setSelected: setSelected
    }}
    >
      {children}
    </StateContext.Provider>
  )
}

export {StateContext, StateProvider}