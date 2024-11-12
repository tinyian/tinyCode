import React, { useState } from "react";
import "./App.css";

import addEvent from "./utils/addEvent.ts"; // Importing the addEvent function
import deleteEvent from "./utils/deleteEvent.ts"; // Importing the deleteEvent function
import { Event } from "./types/Event.ts"; // Importing the Event type from the types folder to ensure that all files referencing it use the same consistent definition.

const App: React.FC = () => {
   // State to hold the list of events
   const [events, setEvents] = useState<Event[]>([]);

   // Toggle for showing/hiding the form
   const [showForm, setShowForm] = useState<boolean>(false);

   // Adds a new event to the events list
   const handleAddEvent = (e) => {
       e.preventDefault();

       const name = e.target.name.value;
       const date = e.target.date.value;

       // Update the events list with the new event
       setEvents(addEvent(events, name, date));
   };

   
   // Deletes an event based on its ID
   const handleDeleteEvent = (id: string) => {
       setEvents(deleteEvent(events, id)); // Using the deleteEvent function
   };

   return (
       <div>
           <h1>Welcome to my calendar app!</h1>
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
               <form onSubmit={handleAddEvent}>
                   <input name="name" type="text" placeholder="Name" />
                   <input name="date" type="datetime-local" placeholder="Date" />
                   <button type="submit">Save</button>
               </form>
           )}
       </div>
   );
};

export default App;