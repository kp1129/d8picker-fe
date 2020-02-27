import React, { useState, useReducer } from 'react'
import dayjs from 'dayjs';
import axios from 'axios'


const StateContext = React.createContext()

const initialState = {
  templateList:[],
  error:null
}

export function reducer(state = initialState, action) {
  switch (action.type) {
  case 'GET_TEMPLATE_SUCCESS':
    return {
      ...state,
      templateList: action.payload
    }
  case 'GET_TEMPLATE_ERR':
    return {
      ...state,
      error: action.payload
    };
  case 'DELETE_TEMPLATE_SUCCESS':
    return {
      ...state,
      templateList: action.payload
    };
  case 'DELETE_TEMPLATE_ERR':
    return {
      ...state,
      error: action.payload
    };
  default:
    return state;
  }
}




const StateProvider = ({ children })  =>  {
  const [selected, setSelected] = useState([])
  const [date, setDate] = useState(dayjs())
  const [state, dispatch] = useReducer(reducer, initialState);

  
  const currentYear = date.year();
  const currentMonth = date.month(); // January = 0

  // const [templateList, setTemplateList] = useState([
  //   {
  //     summary:'earning income',
  //     description:'getting money',
  //     starttime:'12:30',
  //     endtime:"14:45"
  //   }
  // ]);

  //
  const getTemplateList = async () => {
    try {
      // Test endpoint
      const response = await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/api/template/`);
      console.log(response.data);
      dispatch({
        type: 'GET_TEMPLATE_SUCCESS',
        payload: response.data
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: 'GET_TEMPLATE_ERR',
        payload: err.response
      });
    }
  }  
  const deleteTemplateItem = async id => {
    try {
      // Test endpoint
      const response = await axios.delete(`${process.env.REACT_APP_ENDPOINT_URL}/api/template/${id}`);
      console.log(response.data);
      dispatch({
        type: 'DELETE_TEMPLATE_SUCCESS',
        payload: response.data
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: 'GET_TEMPLATE_ERR',
        payload: err.response
      });
    }
  }
  //   (async () => {
  //     await axiosByGid()
  //       .get(`/api/template`)

  //       .then(res => {
  //         console.log("Template list res.data:", res.data)
  //         setTemplateList(res.data)
  //       })
  //       .catch(err => {console.log(err);});
  //   })();
  return(
    <StateContext.Provider
    value = {{
      selected: selected,
      setSelected: setSelected,

      date: date,
      setDate: setDate,

      currentYear: currentYear,
      currentMonth: currentMonth,

      templateList: state.templateList,
      //setTemplateList: setTemplateList,

      getTemplateList

    }}
    >
      {children}
    </StateContext.Provider>
  )
}

export {StateContext, StateProvider}