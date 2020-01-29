import React from 'react'
import { gapi } from 'gapi-script'


const authenticate = () => {
  console.log('authenticate!')

  return gapi.auth2.getAuthInstance()
    .signIn({scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"})
    .then(function() { console.log("Sign-in successful"); },
      function(err) { console.error("Error signing in", err); });
}

function loadClient() {
  gapi.client.setApiKey("YOUR_API_KEY");
  return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
    .then(function() { console.log("GAPI client loaded for API"); },
      function(err) { console.error("Error loading GAPI client for API", err); });
}

function execute() {
  console.log('execute!')
  return gapi.client.calendar.events.insert({
    "calendarId": "danstad2012@gmail.com",
    "resource": {
      "start": {
        "dateTime": "2020-01-29T15:00:00-07:00"
      },
      "end": {
        "dateTime": "2020-01-29T16:00:00-07:00"
      },
      "description": "Doing Shit",
      "summary": "bestlife"
    }
  })
    .then(function(response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);
    },
    function(err) { console.error("Execute error", err); });
}

const Blank = () => {

  // Make sure the client is loaded and sign-in is complete before calling this method.

  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
  });

    
  return (
    <div>
      <button onClick={() => authenticate().then(loadClient)}>authorize and load</button>
      <button onClick={() => execute()}>execute</button>
    </div>
  )
}
export default Blank