import React, {setState} from 'react';

//opens overlay for user to pick dates in calendar.
//user clicks on dates, which get added to list
//when user clicks 'Apply', create event on each day in list


const style = {
  border: "1px red solid",
  margin: 5,
  fontSize:'1.6rem'

}



const Template = ({starttime, endtime, summary, description, templateFormOpen, setTemplateFormOpen, applyTemplate}) => {
  const openTemplate = () => {
    setTemplateFormOpen(!templateFormOpen)
    //console.log(templateFormOpen)
  };


  
  return (
    <div style={style}>
      {summary}
      <br/>
      {starttime}-{endtime}
      <br/>
      <button onClick={() => openTemplate()}> Choose Dates </button>
      
      {templateFormOpen && <button onClick={() => applyTemplate()}>Apply Template</button> }
    </div>
  );
};
export default Template;
