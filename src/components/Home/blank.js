import React from 'react'
import { gapi } from 'gapi-script'
import { web } from '../../credentials.json'

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

// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.calendar.events.insert({
    "calendarId": "funnyusernamego@gmail.com",
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

gapi.load("client:auth2", function() {
  gapi.auth2.init({client_id: client_id});
});
const boop = () => {
  console.log(gapi.client)
}
const Blank = () => {



    
  return (
    <div>
      <button onClick={() => authenticate().then(loadClient)}>authorize and load</button>
      <button onClick={() => execute()}>execute</button>
      <button onClick={() => boop()}>boop</button>
    </div>
  )
}
export default Blank