import React, { useState, useEffect } from 'react';

const Events = ({ eventsApi }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadEvents = async () => {
    try {
      const data = await eventsApi.listEvents();
      setEvents(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>Events</h1>
      {events.map(event => (
        <div key={event.id}>
          <h1>{event.summary}</h1>
        </div>
      ))}
    </div>
  );
};

export default Events;
