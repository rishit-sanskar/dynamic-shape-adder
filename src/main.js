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
// console.log('--- Assignment 1 Results ---');
// console.log(`Shape Count: ${shapes.length}`);
// console.log(`Connection Count: ${connections.length}`);
// console.log(`Total Element Count: ${totalElements}`);

// --- ASSIGNMENT 2: FIND BY POSITION ---

function findShapeAt(x, y) {
  // 1. Get all shapes (ignoring connections and the root element)
  const allShapes = elementRegistry.filter(el => !el.waypoints && el.id !== 'root');

  // 2. Find the first shape whose bounding box contains the (x, y) coordinates
  const foundShape = allShapes.find(el => {
    return x >= el.x && 
           x <= (el.x + el.width) && 
           y >= el.y && 
           y <= (el.y + el.height);
  });

  return foundShape;
}

// --- Acceptance Test ---
const testX = 150;
const testY = 120;
const shapeAtPoint = findShapeAt(testX, testY);

// console.log('\n--- Assignment 2 Results ---');
// if (shapeAtPoint) {
//   console.log(`Success! Found shape at (${testX}, ${testY}):`, shapeAtPoint.id);
//   console.log('Shape details:', shapeAtPoint);
// } else {
//   console.log(`No shape found at (${testX}, ${testY}). Returned: undefined`);
// }

// --- ASSIGNMENT 3: FACTORY THEN CANVAS ---

// Array to store our created descriptors
const shapeDescriptors = [];

// Step 1: Factory Step (Create descriptors)
// We create the shapes and store them in memory, but they do NOT appear on the canvas yet.
for (let i = 0; i < 3; i++) {
  const desc = elementFactory.createShape({
    id: `node-${i}`,
    x: 100 + (i * 100), // Spacing them out horizontally (100, 200, 300)
    y: 450,             // Placing them below our shapes from Assignment 1
    width: 60,
    height: 40
  });
  
  shapeDescriptors.push(desc);
}

// Step 2: Canvas Step (Render descriptors)
// Now we iterate through our stored descriptors and actually draw them.
shapeDescriptors.forEach(descriptor => {
  canvas.addShape(descriptor, root);
});

// --- Acceptance Test ---
console.log('\n--- Assignment 3 Results ---');
console.log('Successfully created and rendered shapes:', shapeDescriptors.map(s => s.id).join(', '));

// --- ASSIGNMENT 4: REMOVE AND RE-ADD ---

// 1. Retrieve the shape by its ID from the registry
const targetShape = elementRegistry.get('shape1');

if (targetShape) {
  console.log('\n--- Assignment 4 Results ---');
  console.log('Removing shape1...');
  
  // 2. Remove the shape from the canvas
  canvas.removeShape(targetShape);

  // 3. Wait 2 seconds using setTimeout, then re-add it
  setTimeout(() => {
    console.log('2 seconds passed. Re-adding shape1...');
    
    // ⚠️ Important: When re-adding a shape, you must specify its parent again.
    // In our case, the parent is the 'root' element we created in Assignment 1.
    canvas.addShape(targetShape, root);
    
    console.log('Assignment 4 Complete: Shape reappeared!');
  }, 2000);
  
} else {
  console.log('Shape not found! Make sure "shape1" was created in Assignment 1.');
}