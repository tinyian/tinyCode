import { Event } from "../types/Event.ts";

// Sort events by their date property
const sortEvents = (events: Event[]): Event[] => {
    return [...events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() // Compare dates
    );
  };

  export default sortEvents;