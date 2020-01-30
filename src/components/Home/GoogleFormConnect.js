import React, {useState} from 'react'
import { gapi } from 'gapi-script'
import { web } from '../../credentials.json'
import { useForm } from 'react-hook-form';


const {API_KEY, client_id} = web


  

const authenticate = () => {
  return gapi.auth2.getAuthInstance()
    .signIn({scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"})
    .then(function() { console.log("Sign-in successful"); },
      function(err) { console.error("Error signing in", err); });
}

function loadClient() {
  gapi.client.setApiKey(API_KEY);
  return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
    .then(function() { console.log("GAPI client loaded for API"); },
      function(err) { console.error("Error loading GAPI client for API", err); });
}



gapi.load("client:auth2", function() {
  gapi.auth2.init({client_id: client_id});
});

const Blank = () => {
  const [resource, setResource] = useState({
    "start": {
      "dateTime": "" 
    },
    "end": {
      "dateTime": ""
    },
    "description": "",
    "summary": ""
  })

  const dateTime = (date, time) => {
    const DT =  date + 'T' + time + ':00-08:00'+ ''
    console.log(DT)
    return DT
  }
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log(data)
    const start =  dateTime(data.startDate, data.startTime) 
    const end = dateTime(data.endDate, data.endTime) 
    setResource({
      "start": {
        "dateTime": start
      },
      "end": {
        "dateTime": end
      },
      "description": data.description,
      "summary": data.summary
    })
    console.log(resource)
  }

  console.log(errors);

  // Make sure the client is loaded and sign-in is complete before calling this method.
function execute(resource) {
  console.log(resource)
  return gapi.client.calendar.events.insert({
    "calendarId": "funnyusernamego@gmail.com",
    "resource": resource
    // "resource": {
    //   "start": {
    //     "dateTime": "2020-01-30T15:00:00-08:00" 
    //   },
    //   "end": {
    //     "dateTime": "2020-01-30T16:00:00-08:00"
    //   },
    //   "description": "Doing Shit",
    //   "summary": "bestlife"
    // }
  })
    .then(function(response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);
    },
    function(err) { console.error("Execute error", err); });
}


    
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="date" placeholder="Start Date" name="startDate" ref={register({required: true, maxLength: 80})} />
        <input type="time" placeholder="Start Time" name="startTime" ref={register({required: true, maxLength: 80})} />
        <input type="date" placeholder="End Date" name="endDate" ref={register({required: true, maxLength: 80})} />
        <input type="time" placeholder="End Time" name="endTime" ref={register({required: true, maxLength: 80})} />
        <input type="text" placeholder="Summary" name="summary" ref={register} />
        <textarea name="description" ref={register} />

        <input type="submit" />
      </form>





      <button onClick={() => authenticate().then(loadClient)}>authorize and load</button>
      <button onClick={() => execute(resource)}>execute</button>
    </div>
  )
}
export default Blank