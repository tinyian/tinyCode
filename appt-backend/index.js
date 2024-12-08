const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const db = require('./database');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Example database simulation (this could be replaced by SQLite integration)
let events = [
    { id: "1", name: "Test Event 1", date: "2024-12-10" },
    { id: "2", name: "Test Event 2", date: "2024-12-11" }
];

// Get all events
app.get('/api/v1/appointment-collection', (req, res) => {
    db.all('SELECT * FROM events', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Add a new event
app.post('/api/v1/appointment-collection/create', (req, res) => {
    const { name, date } = req.body;
    if (!name || !date) {
        return res.status(400).json({ error: 'Name and date are required.' });
    }

    db.run('INSERT INTO events (name, date) VALUES (?, ?)', [name, date], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: this.lastID, name, date });
        }
    });
});

// PATCH route for updating an event by ID
app.patch('/api/v1/appointment-collection/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, date } = req.body;

    // Find the event to update
    const eventIndex = events.findIndex(event => event.id === id);

    if (eventIndex === -1) {
        return res.status(404).json({ error: "Event not found" });
    }

    // Update the event fields
    if (name) events[eventIndex].name = name;
    if (date) events[eventIndex].date = date;

    return res.json({ id, status: "updated", updatedEvent: events[eventIndex] });
});

// POST route to delete an event by ID
app.post('/api/v1/appointment-collection/delete', (req, res) => {
    const { id } = req.body;

    // Find the event to delete
    const eventIndex = events.findIndex(event => event.id === id);

    if (eventIndex === -1) {
        return res.status(404).json({ error: "Event not found" });
    }

    // Remove the event from the list
    const deletedEvent = events.splice(eventIndex, 1);

    return res.json({ id, status: "deleted", deletedEvent });
});

// Test route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});