const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database'); // SQLite database connection

const app = express();
const PORT = 3000;

// Inject the database into the app
app.set('db', db);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes

// Get all events
app.get('/api/v1/appointment-collection', (req, res) => {
    const db = app.get('db');
    db.all('SELECT * FROM events', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Add a new event
app.post('/api/v1/appointment-collection/create', (req, res) => {
    const db = app.get('db');
    const { name, date } = req.body;

    if (!name || !date) {
        return res.status(400).json({ error: 'Name and date are required.' });
    }

    db.run('INSERT INTO events (name, date) VALUES (?, ?)', [name, date], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, name, date });
    });
});

// Update an event by ID
app.patch('/api/v1/appointment-collection/update/:id', (req, res) => {
    const db = app.get('db');
    const { id } = req.params;
    const { name, date } = req.body;

    db.run(
        'UPDATE events SET name = COALESCE(?, name), date = COALESCE(?, date) WHERE id = ?',
        [name, date, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: 'Event not found.' });
            }

            res.json({ id, status: 'updated', name, date });
        }
    );
});

// Delete an event by ID
app.post('/api/v1/appointment-collection/delete', (req, res) => {
    const db = app.get('db');
    const { id } = req.body;

    db.run('DELETE FROM events WHERE id = ?', [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Event not found.' });
        }

        res.json({ id, status: 'deleted' });
    });
});

// Test route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // Export for testing