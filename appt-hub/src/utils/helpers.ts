import { testEvent } from "../types/testEvent";

// Generate a unique event ID (for production)
export const getEventId = (): number => {
    return Math.floor(Math.random() * 10000);
  };
  
  // Add a new event to the event list
  export const addEvent = (events: testEvent[], name: string, date: string): testEvent[] => {
    const newEvent = {
      id: getEventId(), // In production, this generates a random ID
      name,
      date,
    };
    return [...events, newEvent];
  };
  
  // Delete an event by ID
  export const deleteEvent = (events: testEvent[], id: number): testEvent[] => {
    return events.filter((event) => event.id !== id);
  };
  
  // Edit/Update an event
  export const updateEvent = (
    events: testEvent[],
    id: number,
    updatedEventData: Partial<Omit<testEvent, "id">>
  ): testEvent[] => {
    return events.map((event) =>
      event.id === id ? { ...event, ...updatedEventData } : event
    );
  };
  
  // Sort events by date
  export const sortEvents = (events: testEvent[]): testEvent[] => {
    return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };
