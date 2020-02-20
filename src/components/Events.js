import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Events = () => {
  const [events, setEvents] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosWithAuth().get("/api/events");
        console.log("data", data);
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  useEffect(() => {
    if (events) console.log("events", events);
  }, [events]);

  return (
    <div>
      <h1>Events</h1>
      <pre>{events && JSON.stringify(events)}</pre>
    </div>
  );
};

export default Events;
