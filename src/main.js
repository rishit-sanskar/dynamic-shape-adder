import Diagram from 'diagram-js';

// 1. Initialize Diagram and get core modules
const diagram = new Diagram({
  canvas: {
    container: document.getElementById('canvas')
  }
});

const canvas = diagram.get('canvas');
const elementFactory = diagram.get('elementFactory');
const elementRegistry = diagram.get('elementRegistry');

// Create a root element (diagram-js requires elements to be attached to a root)
const root = elementFactory.createRoot({ id: 'root' });
canvas.setRootElement(root);

// 2. Render 4 Shapes
const shape1 = elementFactory.createShape({ id: 'shape1', x: 100, y: 100, width: 80, height: 80 });
const shape2 = elementFactory.createShape({ id: 'shape2', x: 300, y: 100, width: 80, height: 80 });
const shape3 = elementFactory.createShape({ id: 'shape3', x: 100, y: 300, width: 80, height: 80 });
const shape4 = elementFactory.createShape({ id: 'shape4', x: 300, y: 300, width: 80, height: 80 });

// Remember: creating alone does not add them to the canvas
canvas.addShape(shape1, root);
canvas.addShape(shape2, root);
canvas.addShape(shape3, root);
canvas.addShape(shape4, root);

// 3. Render 3 Connections
const conn1 = elementFactory.createConnection({
  id: 'conn1',
  source: shape1,
  target: shape2,
  waypoints: [ { x: 180, y: 140 }, { x: 300, y: 140 } ]
});

const conn2 = elementFactory.createConnection({
  id: 'conn2',
  source: shape1,
  target: shape3,
  waypoints: [ { x: 140, y: 180 }, { x: 140, y: 300 } ]
});

const conn3 = elementFactory.createConnection({
  id: 'conn3',
  source: shape3,
  target: shape4,
  waypoints: [ { x: 180, y: 340 }, { x: 300, y: 340 } ]
});

canvas.addConnection(conn1, root);
canvas.addConnection(conn2, root);
canvas.addConnection(conn3, root);

// --- ASSIGNMENT 1: COUNT ELEMENTS ---

// Filter out connections (has waypoints)
const connections = elementRegistry.filter(el => !!el.waypoints);

// Filter out shapes (no waypoints, ignore the 'root' element)
const shapes = elementRegistry.filter(el => !el.waypoints && el.id !== 'root');

// Calculate totals dynamically
const totalElements = shapes.length + connections.length;

// Log the results dynamically (Acceptance Criteria met)
console.log('--- Assignment 1 Results ---');
console.log(`Shape Count: ${shapes.length}`);
console.log(`Connection Count: ${connections.length}`);
console.log(`Total Element Count: ${totalElements}`);