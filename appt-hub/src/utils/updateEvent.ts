import { Event } from "../types/Event.ts";

// Update an event by its ID
const updateEvent = (
    events: Event[], // The current array of events
    id: string,      // The ID of the event to update
    updatedEventData: Partial<Omit<Event, "id">> // Partial object of updated fields (excluding ID)
  ): Event[] => {
    return events.map((event) =>
      event.id === id
        ? { ...event, ...updatedEventData } // Merge existing event data with updated fields
        : event // Return the event as-is if the ID doesn't match
    );
  };

  export default updateEvent;