const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') res.sendStatus(200);
  else next();
});

// Test route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
