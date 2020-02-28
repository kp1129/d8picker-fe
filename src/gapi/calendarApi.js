const calendarApi = gapiClient => ({
  listEvents: async () => {
    const data = await gapiClient.calendar.events.list({
      calendarId: 'primary', // controls which calendar to show
      timeMin: new Date().toISOString(), // controls the range of dates to show events from
      maxResults: 25, // controls the amount of events to show
      singleEvents: true,
      orderBy: 'startTime'
    });
    return data.result.items;
  }
});

export default calendarApi;
