const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data - in production, this would come from a database
let orders = [
  {
    id: '1',
    code: 'ORD001',
    customerName: 'Nguyễn Văn A',
    email: 'customer1@email.com',
    status: 'confirmed',
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    totalAmount: 5000000,
    createdAt: new Date('2024-03-10'),
  },
  {
    id: '2',
    code: 'ORD002',
    customerName: 'Trần Thị B',
    email: 'customer2@email.com',
    status: 'pending',
    paymentMethod: 'bank_transfer',
    paymentStatus: 'pending',
    totalAmount: 3500000,
    createdAt: new Date('2024-03-15'),
  },
];

let users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@tourbooking.com',
    role: 'admin',
    status: 'active',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Demo User',
    email: 'user@tourbooking.com',
    role: 'user',
    status: 'active',
    createdAt: new Date('2024-02-15'),
  },
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Tour Booking API' });
});

// Basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Orders Endpoints
app.get('/api/orders', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  let filtered = [...orders];

  // Apply search filter
  if (req.query.search) {
    filtered = filtered.filter(
      (order) =>
        order.code.includes(req.query.search) ||
        order.customerName.includes(req.query.search) ||
        order.email.includes(req.query.search)
    );
  }

  // Apply status filter
  if (req.query.status) {
    filtered = filtered.filter((order) => order.status === req.query.status);
  }

  // Apply payment status filter
  if (req.query.paymentStatus) {
    filtered = filtered.filter(
      (order) => order.paymentStatus === req.query.paymentStatus
    );
  }

  const total = filtered.length;
  const data = filtered.slice(skip, skip + limit);

  res.json({
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

app.post('/api/orders', (req, res) => {
  const newOrder = {
    id: String(orders.length + 1),
    ...req.body,
    createdAt: new Date(),
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.put('/api/orders/:id', (req, res) => {
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  Object.assign(order, req.body);
  res.json(order);
});

app.delete('/api/orders/:id', (req, res) => {
  const index = orders.findIndex((o) => o.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }
  const deleted = orders.splice(index, 1);
  res.json(deleted[0]);
});

// Users Endpoints
app.get('/api/users', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  let filtered = [...users];

  // Apply search filter
  if (req.query.search) {
    filtered = filtered.filter(
      (user) =>
        user.name.includes(req.query.search) || user.email.includes(req.query.search)
    );
  }

  // Apply role filter
  if (req.query.role) {
    filtered = filtered.filter((user) => user.role === req.query.role);
  }

  // Apply status filter
  if (req.query.status) {
    filtered = filtered.filter((user) => user.status === req.query.status);
  }

  const total = filtered.length;
  const data = filtered.slice(skip, skip + limit);

  res.json({
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const newUser = {
    id: String(users.length + 1),
    ...req.body,
    createdAt: new Date(),
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  Object.assign(user, req.body);
  res.json(user);
});

app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const deleted = users.splice(index, 1);
  res.json(deleted[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
