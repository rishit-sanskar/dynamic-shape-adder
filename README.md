# Dynamic Shape Adder 🎨

A lightweight, interactive web application built with Vanilla JavaScript and Vite. This project demonstrates state management, event-driven architecture (via a mock EventBus), and dynamic HTML5 Canvas rendering. 

## ✨ Features

* **Add Shapes:** Generate and render shapes (squares) dynamically on an HTML5 canvas by providing a unique ID.
* **Connect Shapes:** Draw visual connections between the last two added shapes with an auto-generated connection ID.
* **Remove Shapes:** Delete existing shapes from the canvas and the internal registry by their ID.
* **Live Status Board:** Real-time updates displaying the total count of active shapes and connections.
* **Live Registry List:** A dynamically updating list showing the IDs of all shapes currently on the board.
* **Event-Driven Architecture:** Uses a mock `EventBus` to decouple state changes from UI updates.

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Create/Navigate to your project directory:**
   ```bash
   cd dynamic-shape-adder
   npm install
   npm run dev