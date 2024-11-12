import React, { useState } from "react";
import "./App.css";

import addEvent from "./utils/addEvent.ts"; // Importing the addEvent function
import deleteEvent from "./utils/deleteEvent.ts"; // Importing the deleteEvent function
import updateEvent from "./utils/updateEvent.ts"; 
import sortEvents from "./utils/sortEvents.ts"; 
import { Event } from "./types/Event"; // Importing the Event type from the types folder to ensure that all files referencing it use the same consistent definition.

const App: React.FC = () => {
   // State to hold the list of events
   const [events, setEvents] = useState<Event[]>([]);

   // State to manage the currently edited event
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

   // Toggle for showing/hiding the form
   const [showForm, setShowForm] = useState<boolean>(false);

   // Adds a new event to the events list
   const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Use type casting to explicitly target the input elements
    const name = (e.currentTarget.elements.namedItem("name") as HTMLInputElement)
      .value;
    const date = (e.currentTarget.elements.namedItem("date") as HTMLInputElement)
      .value;
  
    // Update the events list with the new event
    const updatedEvents = addEvent(events, name, date);
    setEvents(sortEvents(updatedEvents)); // Automatically sort events after adding
  };
   
   // Deletes an event based on its ID
   const handleDeleteEvent = (id: string) => {
       setEvents(deleteEvent(events, id)); // Using the deleteEvent function
   };
  
  const handleUpdateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const name = (e.currentTarget.elements.namedItem("name") as HTMLInputElement)
      .value;
    const date = (e.currentTarget.elements.namedItem("date") as HTMLInputElement)
      .value;
  
    if (editingEventId !== null) {
      const updatedEvents = updateEvent(events, editingEventId, { name, date });
      setEvents(sortEvents(updatedEvents)); // Automatically sort events after updating
      setEditingEventId(null); // Exit edit mode
    }
  };

   return (
    <div className="app-container">
  <h1>Welcome to my calendar app!</h1>
  {/* Calendar section */}
  <div className="calendar">
    <h2>Events</h2>
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          <span>
            {event.date} - {event.name}
          </span>
          <div className="event-buttons">
            <button
              onClick={() => setEditingEventId(event.id)}
              className="edit-button"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteEvent(event.id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
  {/* Toggle button to show or hide the form */}
  <button
    onClick={() => setShowForm(!showForm)}
    className="toggle-form-button"
  >
    {showForm ? "Cancel" : "Add Event"}
  </button>
  {/* Form for adding or editing an event */}
  {showForm && (
    <form
      onSubmit={editingEventId === null ? handleAddEvent : handleUpdateEvent}
      className="event-form"
    >
      <input
        name="name"
        type="text"
        placeholder="Event Name"
        defaultValue={
          editingEventId !== null
            ? events.find((event) => event.id === editingEventId)?.name
            : ""
        }
      />
      <input
        name="date"
        type="datetime-local"
        placeholder="Event Date"
        defaultValue={
          editingEventId !== null
            ? events.find((event) => event.id === editingEventId)?.date
            : ""
        }
      />
      <button type="submit" className="submit-button">
        {editingEventId === null ? "Save Event" : "Update Event"}
      </button>
    </form>
  )}
</div>
   );
};

export default App;