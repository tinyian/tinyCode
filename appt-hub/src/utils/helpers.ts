import { Event } from "../types/Event";
import { v4 as uuidv4 } from "uuid"; // Import the UUID library

// Add a new event to the event list
export const addEvent = (events: Event[], name: string, date: string): Event[] => {
    const newEvent: Event = {
        id: uuidv4(), // Generate a unique UUID for the event
        name,
        date,
    };
    return [...events, newEvent];
};

// Delete an event by ID
export const deleteEvent = (events: Event[], id: string): Event[] => {
    return events.filter((event) => event.id !== id);
};
