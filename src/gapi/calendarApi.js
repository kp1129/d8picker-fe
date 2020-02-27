const calendarApi = gapiClient => ({
  listEvents: async () => {
    const data = await gapiClient.calendar.events.list({
      calendarId: 'primary'
    });
    return data.result.items;
  }
});

export default calendarApi;
