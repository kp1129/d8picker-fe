import React, {setState, useEffect} from 'react';
import axios from 'axios'
import { useTemplate } from '../../hooks/useTemplate'


//opens overlay for user to pick dates in calendar.
//user clicks on dates, which get added to list
//when user clicks 'Apply', create event on each day in list


const style = {
  border: "1px red solid",
  margin: 5,
  fontSize:'1.6rem'
}

const Template = ({id, starttime, endtime, summary, description, templateFormOpen, setTemplateFormOpen, applyTemplate}) => {
  const {selected, getTemplateList} = useTemplate()
  const openTemplate = () => {
    setTemplateFormOpen(!templateFormOpen)
    //console.log(templateFormOpen)
  };


  //What is wrong with our ID???
  //maybe do a findById, accesss Id, then delete? idk
  const deleteTemplate = id => { 

    axios.delete(`${process.env.REACT_APP_ENDPOINT_URL}/api/template/${id}`)
    .then(res => {
      console.log(res)
      getTemplateList()
    })
    .catch(err => console.log(err))
    
  }

  
  return (
    <div style={style}>
      {summary}
      <br/>
      {starttime}-{endtime}
      <br/>
      <button onClick={() => openTemplate()}> Choose Dates </button>
      <button style={{background:"red"}}  onClick={() => deleteTemplate(id)}> X </button>
      
      {templateFormOpen && <button onClick={() => applyTemplate(summary, description, starttime, endtime, selected)}>Apply Template</button> }
    </div>
  );
};
export default Template;
