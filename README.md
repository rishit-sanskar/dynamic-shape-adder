# Diagram-js Assignment: Element Counting

This project is a solution for "Assignment 1: Count Elements" using [Vite](https://vitejs.dev/) and [diagram-js](https://github.com/bpmn-io/diagram-js). 

It demonstrates how to initialize a diagram canvas, programmatically render shapes and connections using `ElementFactory`, and dynamically query the canvas using `ElementRegistry`.

## Assignment Requirements
- Render **4 shapes**.
- Render **3 connections**.
- Use `elementRegistry.filter` to dynamically log the total element count, shape count, and connection count.
- **Acceptance Criteria**: Log three correct numbers without hardcoding them.

## Tech Stack
- Vanilla JavaScript
- [Vite](https://vitejs.dev/) (Build tool and dev server)
- [diagram-js](https://github.com/bpmn-io/diagram-js) (Canvas and element rendering engine)

## Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

## Installation

1. Clone or download this repository.
2. Navigate to the project directory in your terminal:
   ```bash
   cd diagram-assignment
   npm install
   npm run dev