import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import supertest from 'supertest';
import app from './src/index.js'; // Assumes your Express app is exported from index.js

let db;
let request;

beforeEach(async () => {
    // Set up an in-memory database before each test
    db = await open({
      filename: ':memory:',
      driver: sqlite3.Database
    });
  
    // Log the db object to understand its structure
    console.log('DB Object:', db);
  
    // Initialize the events table
    await db.exec(`
      CREATE TABLE events (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        date TEXT NOT NULL
      );
    `);
  
    // Log the available tables (to confirm the table creation)
    const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table';");
    console.log('Tables in DB:', tables);
  
    // Inject the in-memory database into your app for testing
    app.set('db', db);
  
    // Use supertest to test the API endpoints
    request = supertest(app);
  });  

afterEach(async () => {
  // Close the database connection after each test
  await db.close();
});

describe('Appointment Hub Backend API Tests', () => {
  it('should create a new appointment', async () => {
    const response = await request.post('/api/v1/appointment-collection/create').send({
      id: '123',
      name: 'Test Appointment',
      date: '2025-01-10'
    });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('saved');

    const rows = await db.all('SELECT * FROM events');
    expect(rows.length).toBe(1);
    expect(rows[0]).toEqual({ id: '123', name: 'Test Appointment', date: '2025-01-10' });
  });

  it('should retrieve all events', async () => {
    await db.run('INSERT INTO events (id, name, date) VALUES (?, ?, ?)', ['123', 'Test Appointment', '2025-01-10']);

    const response = await request.get('/api/v1/appointment-collection');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: '123', name: 'Test Appointment', date: '2025-01-10' }
    ]);
  });

  it('should update an existing appointment', async () => {
    await db.run('INSERT INTO events (id, name, date) VALUES (?, ?, ?)', ['123', 'Old Appointment', '2025-01-09']);

    const response = await request.patch('/api/v1/appointment-collection/update/123').send({
      name: 'Updated Appointment',
      date: '2025-01-11'
    });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('saved');

    const rows = await db.all('SELECT * FROM events WHERE id = ?', ['123']);
    expect(rows[0]).toEqual({ id: '123', name: 'Updated Appointment', date: '2025-01-11' });
  });

  it('should delete an appointment by ID', async () => {
    await db.run('INSERT INTO events (id, name, date) VALUES (?, ?, ?)', ['123', 'Test Appointment', '2025-01-10']);

    const response = await request.post('/api/v1/appointment-collection/delete').send({
      id: '123'
    });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('deleted');

    const rows = await db.all('SELECT * FROM events');
    expect(rows.length).toBe(0);
  });
});
