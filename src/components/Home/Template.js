import React, {setState} from 'react';

//opens overlay for user to pick dates in calendar.
//user clicks on dates, which get added to list
//when user clicks 'Apply', create event on each day in list

const Template = ({starttime, endtime, summary, description, templateFormOpen, setTemplateFormOpen}) => {
  const openTemplate = () => {
    setTemplateFormOpen(!templateFormOpen)
    console.log(templateFormOpen)
  };
  
  return (
    <div>
      {starttime}
      {endtime}
      {summary}
      {description}
      <button onClick={() => openTemplate()}> + </button>
    </div>
  );
};
export default Template;
