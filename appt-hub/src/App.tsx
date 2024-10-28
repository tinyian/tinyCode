import React, { useState } from "react";
import "./App.css";

// Define an Event type so we know what an event looks like
type Event = {
  id: number; // Unique ID for each event
  name: string; // Name of the event
  date: string; // Date/time of the event
};

const App: React.FC = () => {
  // State to hold the list of events
  const [events, setEvents] = useState<Event[]>([]);

  // Temporary state for form inputs
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");

  // Toggle for showing/hiding the form
  const [showForm, setShowForm] = useState<boolean>(false);

  // Counter to give each event a unique ID
  const [eventIdCounter, setEventIdCounter] = useState<number>(0);

  // Adds a new event to the events list
  const handleAddEvent = () => {
    // Only add if both name and date fields have been filled in
    if (name && date) {
      const newEvent = {
        id: eventIdCounter, // Unique ID based on the current counter value
        name, // The event name entered in the form
        date, // The date/time entered in the form
      };

      // Update the events list with the new event
      setEvents([...events, newEvent]);

      // Increment the counter for the next event, ensuring uniqueness
      setEventIdCounter(eventIdCounter + 1);

      // Clear the form inputs and hide the form
      setName("");
      setDate("");
      setShowForm(false);
    }
  };

  // Deletes an event based on its ID
  const handleDeleteEvent = (id: number) => {
    // Filter out the event we want to delete
    const updatedEvents = events.filter((event) => event.id !== id);

    // Update the state with the new list of events
    setEvents(updatedEvents);
  };

  return (
    <div>
      <h1>Welcome to my calendar app </h1>

      {/* List out each event, along with a Delete button for each */}
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.date} - {event.name}
            <button
              onClick={() => handleDeleteEvent(event.id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Toggle button to show or hide the form */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add"}
      </button>

      {/* Only display the form if showForm is true */}
      {showForm && (
        <form>
          {/* Input for event name */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Input for event date/time */}
          <input
            type="datetime-local"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          {/* Save button that triggers handleAddEvent */}
          <button type="button" onClick={handleAddEvent}>
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default App;
