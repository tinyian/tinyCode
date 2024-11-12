import { Event } from "../types/Event.ts"; // Import the Event type from the types folder

// Deletes an event from the list based on its ID.
// Parameters: events array, id of the event to delete.
const deleteEvent = (events: Event[], id: string): Event[] => {
    return events.filter((event) => event.id !== id); // Filters out the specified event.
};

export default deleteEvent;