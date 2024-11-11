import { Event } from "../types/Event";

// Deletes an event from the list based on its ID.
// Parameters: events array, id of the event to delete.
const deleteEvent = (events: Event[], id: number): Event[] => {
    return events.filter((event) => event.id !== id); // Filters out the specified event.
};

export default deleteEvent;