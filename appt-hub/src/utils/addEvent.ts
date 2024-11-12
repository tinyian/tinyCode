import { v4 as uuidv4 } from "uuid"; // Import the UUID library
import { Event } from "../types/Event.ts"; // Import the Event type from the types folder

// Adds a new event to the events list.
// Parameters: events array, event name, event date.
const addEvent = (events: Event[], name: string, date: string): Event[] => {
    if (!name || !date) return events; // Ensures both name and date fields are filled.
    
    // Creating a new event object with a unique ID, name, and date
    const newEvent = {
        id: uuidv4(), // Unique ID with UUID library
        name,
        date,
    };
    
    return [...events, newEvent]; // Returns the updated events list.
};

export default addEvent;