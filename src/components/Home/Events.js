import React, { useState, useEffect } from "react";
import axios from "axios";


const Events = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/events");
      const results = await res.data;
      localStorage.setItem("googleId:", res.data.googleId)
      console.log("results: ", results);
      setData(results);
    })();
  }, [setData]);
  return (
    <div>
      Events
      {/* <div>
        <img src={data && data.photoUrl} alt="" width="90" />
        <div>
          <h6>{data && data.name}</h6>
          <span>{data && data.email}</span>
          <br />
          <span>{data && data.googleId}</span>
        </div>
        <hr />
      </div> */}
      <div>
        
      </div>
      
      <div>
        <ul>
          {data &&
            data.events.map(event => (
              <li key={event.id}>
                <p>
                  {event.start.dateTime}
                  <strong> - {event.summary}</strong>
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Events;