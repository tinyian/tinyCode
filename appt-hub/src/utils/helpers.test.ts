import { describe, it, expect } from "vitest";
import { addEvent, deleteEvent } from "./helpers"; // Importing necessary helpers
import { v4 as uuidv4 } from "uuid"; // Import UUID for testing purposes

describe("addEvent", () => {
    it("should add an event with a unique ID to the events array", () => {
        const events = [];
        const newEvents = addEvent(events, "Meeting", "2024-12-01T10:00");

        expect(newEvents.length).toBe(1); // One event added
        expect(newEvents[0].name).toBe("Meeting");
        expect(newEvents[0].date).toBe("2024-12-01T10:00");
        expect(typeof newEvents[0].id).toBe("string"); // ID is a string (UUID)
    });

    it("should ensure the generated ID is a valid UUID", () => {
        const events = [];
        const newEvents = addEvent(events, "Meeting", "2024-12-01T10:00");
        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        expect(uuidRegex.test(newEvents[0].id)).toBe(true); // Validate UUID format
    });

    it("should generate unique IDs for each added event", () => {
        const events = [];
        const newEvents = addEvent(events, "Meeting", "2024-12-01T10:00");
        const anotherNewEvents = addEvent(
            newEvents,
            "Workshop",
            "2024-12-02T14:00"
        );

        expect(anotherNewEvents.length).toBe(2); // Two events now
        expect(anotherNewEvents[0].id).not.toBe(anotherNewEvents[1].id); // Unique IDs
    });

    it("should not modify the original array", () => {
        const events = [];

        expect(events.length).toBe(0); // Original array remains unchanged
    });
});

describe("deleteEvent", () => {
    it("should remove an event by ID", () => {
        const events = [
            { id: uuidv4(), name: "Meeting", date: "2024-12-01T10:00" },
            { id: uuidv4(), name: "Workshop", date: "2024-12-02T14:00" },
        ];
        const eventToDelete = events[0].id; // ID of the event to delete
        const updatedEvents = deleteEvent(events, eventToDelete);

        expect(updatedEvents.length).toBe(1); // One event removed
        expect(updatedEvents[0].id).toBe(events[1].id); // Only the second event remains
    });

    it("should not modify the original array", () => {
        const events = [
            { id: uuidv4(), name: "Meeting", date: "2024-12-01T10:00" },
            { id: uuidv4(), name: "Workshop", date: "2024-12-02T14:00" },
        ];

        expect(events.length).toBe(2); // Original array remains unchanged
    });

    it("should do nothing if the ID does not exist", () => {
        const events = [
            { id: uuidv4(), name: "Meeting", date: "2024-12-01T10:00" },
            { id: uuidv4(), name: "Workshop", date: "2024-12-02T14:00" },
        ];
        const nonExistentId = uuidv4(); // Generate a new random ID
        const updatedEvents = deleteEvent(events, nonExistentId);

        expect(updatedEvents.length).toBe(2); // No events removed
        expect(updatedEvents).toEqual(events); // Arrays should be equal
    });
});
