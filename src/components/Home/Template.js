import React, {setState} from 'react';

//opens overlay for user to pick dates in calendar.
//user clicks on dates, which get added to list
//when user clicks 'Apply', create event on each day in list
const applyTemplate = () => {
  console.log('select days on calendar you wish to add this event to');
};

const Template = ({starttime, endtime, summary, description}) => {
  
  return (
    <div>
      {starttime}
      {endtime}
      {summary}
      {description}
      <button onClick={() => applyTemplate()}> + </button>
    </div>
  );
};
export default Template;
