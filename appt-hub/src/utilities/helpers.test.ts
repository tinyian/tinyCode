import { describe, it, expect } from 'vitest';
import { getEventId, addEvent, deleteEvent } from './helpers';

describe("getEventId", () => {
    it("should return a number", () => {
        const id = getEventId();
        expect(typeof id).toBe("number");
    });

    it("should return a unique ID each time", () => {
        const id1 = getEventId();
        const id2 = getEventId();
        expect(id1).not.toBe(id2); // Very basic test for uniqueness
    });
});

describe("addEvent", () => {
    it("should add an event to the events array", () => {
        const events = [];
        const newEvents = addEvent(events, "Meeting", "2024-12-01T10:00");
        expect(newEvents.length).toBe(1);
        expect(newEvents[0].name).toBe("Meeting");
        expect(newEvents[0].date).toBe("2024-12-01T10:00");
    });

    it("should not modify the original array", () => {
        const events = [];
        const newEvents = addEvent(events, "Meeting", "2024-12-01T10:00");
        expect(events.length).toBe(0); // Original array remains unchanged
    });
});

describe("deleteEvent", () => {
    it("should remove an event by ID", () => {
        const events = [
            { id: 1, name: "Meeting", date: "2024-12-01T10:00" },
            { id: 2, name: "Workshop", date: "2024-12-02T14:00" },
        ];
        const updatedEvents = deleteEvent(events, 1);
        expect(updatedEvents.length).toBe(1);
        expect(updatedEvents[0].id).toBe(2); // Only the event with ID 2 should remain
    });

    it("should not modify the original array", () => {
        const events = [
            { id: 1, name: "Meeting", date: "2024-12-01T10:00" },
            { id: 2, name: "Workshop", date: "2024-12-02T14:00" },
        ];
        const updatedEvents = deleteEvent(events, 1);
        expect(events.length).toBe(2); // Original array remains unchanged
    });

    it("should do nothing if the ID does not exist", () => {
        const events = [
            { id: 1, name: "Meeting", date: "2024-12-01T10:00" },
            { id: 2, name: "Workshop", date: "2024-12-02T14:00" },
        ];
        const updatedEvents = deleteEvent(events, 3); // ID 3 does not exist
        expect(updatedEvents.length).toBe(2);
    });
});