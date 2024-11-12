import { testEvent } from "../types/testEvent";
import { describe, it, expect } from "vitest";
import { addEvent, deleteEvent, updateEvent, sortEvents } from "./helpers"; // Importing necessary helpers

describe("addEvent", () => {
  it("should add an event to the events array", () => {
    const events: testEvent[] = [];
    const newEvents = addEvent(events, "Meeting", "2024-12-01T10:00");
    expect(newEvents.length).toBe(1);
    expect(newEvents[0].name).toBe("Meeting");
    expect(newEvents[0].date).toBe("2024-12-01T10:00");
  });

  it("should not modify the original array", () => {
    const events: testEvent[] = [];
    expect(events.length).toBe(0);
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
    expect(updatedEvents[0].id).toBe(2);
  });

  it("should not modify the original array", () => {
    const events = [
      { id: 1, name: "Meeting", date: "2024-12-01T10:00" },
      { id: 2, name: "Workshop", date: "2024-12-02T14:00" },
    ];
    expect(events.length).toBe(2);
  });

  it("should do nothing if the ID does not exist", () => {
    const events = [
      { id: 1, name: "Meeting", date: "2024-12-01T10:00" },
      { id: 2, name: "Workshop", date: "2024-12-02T14:00" },
    ];
    const updatedEvents = deleteEvent(events, 3);
    expect(updatedEvents.length).toBe(2);
  });
});

describe("updateEvent", () => {
    it("should update an event by ID", () => {
      const events = [
        { id: 1, name: "Meeting", date: "2024-12-01T10:00" },
        { id: 2, name: "Workshop", date: "2024-12-02T14:00" },
      ];
      const updatedEvents = updateEvent(events, 1, { name: "Updated Meeting" });
      expect(updatedEvents[0].name).toBe("Updated Meeting");
    });
  
    it("should not modify the original array", () => {
      const events = [
        { id: 1, name: "Meeting", date: "2024-12-01T10:00" },
        { id: 2, name: "Workshop", date: "2024-12-02T14:00" },
      ];
      expect(events[0].name).toBe("Meeting");
    });
  
    it("should do nothing if the ID does not exist", () => {
      const events = [
        { id: 1, name: "Meeting", date: "2024-12-01T10:00" },
        { id: 2, name: "Workshop", date: "2024-12-02T14:00" },
      ];
      const updatedEvents = updateEvent(events, 3, { name: "Nonexistent Event" });
      expect(updatedEvents).toEqual(events);
    });
  });
  
  describe("sortEvents", () => {
    it("should sort events by date", () => {
      const events = [
        { id: 1, name: "Later Event", date: "2024-12-02T14:00" },
        { id: 2, name: "Earlier Event", date: "2024-12-01T10:00" },
      ];
      const sortedEvents = sortEvents(events);
      expect(sortedEvents[0].name).toBe("Earlier Event");
      expect(sortedEvents[1].name).toBe("Later Event");
    });
  });