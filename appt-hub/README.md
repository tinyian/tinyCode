# 📆 Modular Calendar App

Welcome to my Modular Calendar App project! This app started as a simple exploration of React.js and TypeScript, but it has since evolved into a fully modular, scalable application that showcases my ability to write clean, reusable code while implementing modern design patterns. The journey has been a mix of learning, experimentation, and refining based on feedback, with the ultimate goal of creating something functional, testable, and elegant.

## ✨ Overview

This calendar app lets users:

- Add events with a name and date.
- View a list of events with dynamic rendering.
- Delete events by clicking a dedicated button.
- Enjoy a clean, minimalist UI.

Under the hood, it's all about modularity. I’ve broken down the app's functionality into discrete helper functions (addEvent, deleteEvent, etc.), ensuring each part can be individually tested, improved, and reused.

## 🚀 Features and Logic

Here’s how it all works:

### Event Management
- Events are managed in the state, allowing for dynamic updates without page refreshes.
- Each event includes:
  - A UUID-based `id` for uniqueness.
  - A name and date provided by the user.

### Add Events
- The `addEvent` function creates a new event with the user’s input, assigns it a unique UUID, and appends it to the existing list.

### Delete Events
- The `deleteEvent` function uses the event's `id` to filter it out of the array, ensuring no mutations to the original state.

### Testing and Reliability
- Helper functions are thoroughly unit-tested using Vitest, with clear test cases to ensure reliability. Key goals include:
  - Verifying function behavior (e.g., unique ID generation).
  - Preventing unintended mutations of existing data.

## 🎯 Design and Development Goals

This project was driven by a few core principles:

- **Modularity First:** I wanted to create a codebase that prioritizes modularity and reusability, allowing for easy updates and scalability.
- **Testing as a Foundation:** Writing independent, testable functions ensures each piece of logic works as intended and can evolve safely.
- **Feedback-Driven Iteration:** By incorporating advice (shoutout to my mentor, Nufayl!), I’ve implemented industry-standard practices like UUIDs for better long-term reliability.
- **Clean UX:** Minimalist UI/UX keeps the focus on the functionality without unnecessary distractions.

## 🔧 Tech Stack

- React.js for the frontend
- TypeScript for type safety and scalability
- UUID Library for unique event IDs
- Vitest for unit testing
- Vite for fast local development

## 🛠️ What's Next?

The app is functional, but there’s always room to grow! Here are some features I’d love to explore in the future:

- **Dynamic Styling:** Bring in animations or themes to elevate the user experience.
- **Event Details:** Expand events to include descriptions, locations, or categories.
- **Drag-and-Drop:** A drag-and-drop interface for rearranging events.
- **Persisted State:** Save events to local storage or a database for persistent access.

## 💡 Final Thoughts

This project has been an amazing exercise in bridging creativity with technical skills. It’s not just about functionality—it’s about building something polished, reliable, and reflective of my growth as a developer. I hope you enjoy exploring this little app as much as I enjoyed creating it!

Feel free to check out the code, share feedback, or contribute ideas. Happy coding! 😊
