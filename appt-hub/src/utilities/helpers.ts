// Generate a unique event ID
export const getEventId = () => {
  return Math.floor(Math.random() * 10000); // Adjusted for a broader range
};

// Add a new event to the event list
export const addEvent = (events: Event[], name: string, date: string): Event[] => {
  const newEvent = {
      id: getEventId(),
      name,
      date,
  };
  return [...events, newEvent];
};

// Delete an event by ID
export const deleteEvent = (events: Event[], id: number): Event[] => {
  return events.filter((event) => event.id !== id);
};