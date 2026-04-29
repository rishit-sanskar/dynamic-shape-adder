import './style.css';

// ==========================================
// MOCK APIS (Simulating your environment)
// ==========================================
class EventBus {
    constructor() { this.listeners = {}; }
    on(event, cb) { (this.listeners[event] = this.listeners[event] || []).push(cb); }
    emit(event, data) { (this.listeners[event] || []).forEach(cb => cb(data)); }
}
const eventBus = new EventBus();

const elementRegistry = {
    elements: [],
    get(id) { return this.elements.find(e => e.id === id); },
    filter(predicate) { return this.elements.filter(predicate); },
    add(el) { this.elements.push(el); },
    remove(id) { this.elements = this.elements.filter(e => e.id !== id); }
};

const elementFactory = {
    createShape(data) { return { ...data, type: 'shape' }; },
    createConnection(data) { return { ...data, type: 'connection' }; }
};

const canvas = {
    addShape(shape) { elementRegistry.add(shape); eventBus.emit('shape.added', shape); },
    addConnection(conn) { elementRegistry.add(conn); eventBus.emit('connection.added', conn); },
    removeShape(id) { elementRegistry.remove(id); eventBus.emit('shape.removed', id); }
};

// ==========================================
// APPLICATION LOGIC & UI
// ==========================================

let addedShapes = [];

// DOM Elements
const inputEl = document.getElementById('shapeIdInput');
const addShapeBtn = document.getElementById('addShapeBtn');
const connectBtn = document.getElementById('connectBtn');
const removeShapeBtn = document.getElementById('removeShapeBtn');
const statusBar = document.getElementById('statusBar');
const shapeIdList = document.getElementById('shapeIdList');

// Canvas Setup
const drawingCanvas = document.getElementById('drawingCanvas');
const ctx = drawingCanvas.getContext('2d');

// 1. Add Shape Handler
addShapeBtn.addEventListener('click', () => {
    const id = inputEl.value.trim();

    if (!id) return alert('Shape ID cannot be empty.');
    if (elementRegistry.get(id)) return alert(`Shape with ID "${id}" already exists.`);

    // Random positions constrained to the canvas size so shapes don't render off-screen
    const randomX = Math.floor(Math.random() * (drawingCanvas.width - 50));
    const randomY = Math.floor(Math.random() * (drawingCanvas.height - 50));

    const newShape = elementFactory.createShape({ 
        id, x: randomX, y: randomY, width: 50, height: 50 
    });

    canvas.addShape(newShape);
    addedShapes.push(newShape);
    inputEl.value = '';
});

// 2. Connect Last 2 Handler
connectBtn.addEventListener('click', () => {
    if (addedShapes.length < 2) return alert('Need at least 2 shapes to make a connection.');

    const sourceShape = addedShapes[addedShapes.length - 2];
    const targetShape = addedShapes[addedShapes.length - 1];

    const sourceCenter = {
        x: sourceShape.x + (sourceShape.width / 2),
        y: sourceShape.y + (sourceShape.height / 2)
    };
    const targetCenter = {
        x: targetShape.x + (targetShape.width / 2),
        y: targetShape.y + (targetShape.height / 2)
    };

    const newConnection = elementFactory.createConnection({
        id: `conn-${Date.now()}`,
        source: sourceShape.id,
        target: targetShape.id,
        waypoints: [sourceCenter, targetCenter]
    });

    canvas.addConnection(newConnection);
});

// 3. Remove Shape Handler
removeShapeBtn.addEventListener('click', () => {
    const id = inputEl.value.trim();
    
    if (!id || !elementRegistry.get(id)) {
        return alert('Please enter a valid existing Shape ID to remove.');
    }

    canvas.removeShape(id);
    addedShapes = addedShapes.filter(shape => shape.id !== id);
    inputEl.value = '';
});

// 4. Subscriptions & UI/Canvas Updates
function updateUI() {
    const allShapes = elementRegistry.filter(element => element.type === 'shape');
    const allConnections = elementRegistry.filter(element => element.type === 'connection');

    // Update Text UI
    statusBar.textContent = `Shapes: ${allShapes.length} | Connections: ${allConnections.length}`;
    shapeIdList.innerHTML = ''; 
    allShapes.forEach(shape => {
        const li = document.createElement('li');
        li.textContent = shape.id;
        shapeIdList.appendChild(li);
    });

    // Clear the canvas completely before drawing the new state
    ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

    // Draw Connections (drawn first so lines go under shapes)
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    allConnections.forEach(conn => {
        ctx.beginPath();
        ctx.moveTo(conn.waypoints[0].x, conn.waypoints[0].y);
        ctx.lineTo(conn.waypoints[1].x, conn.waypoints[1].y);
        ctx.stroke();
    });

    // Draw Shapes
    allShapes.forEach(shape => {
        // Draw the square
        ctx.fillStyle = '#646cff';
        ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
        
        // Draw the ID text perfectly centered
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(shape.id, shape.x + (shape.width / 2), shape.y + (shape.height / 2));
    });
}

// Event Listeners
eventBus.on('shape.added', updateUI);
eventBus.on('connection.added', updateUI);
eventBus.on('shape.removed', updateUI);

// Initial UI render
updateUI();