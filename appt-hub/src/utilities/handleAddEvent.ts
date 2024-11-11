import { Event } from "../types/Event"; // Make sure to define an Event type if it's not done already.

// Adds a new event to the events list.
// Parameters: events array, event name, event date.
const addEvent = (events: Event[], name: string, date: string): Event[] => {
    if (!name || !date) return events; // Ensures both name and date fields are filled.
    
    // Creating a new event object with a unique ID, name, and date
    const newEvent = {
        id: Math.floor(Math.random() * 1000), // Unique ID
        name,
        date,
    };
    
    return [...events, newEvent]; // Returns the updated events list.
};

export default addEvent;