require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(cors());
app.use(express.json());

// Health check route (required for keep-alive ping)
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const contactRoute = require('./routes/contactRoute');
app.use('/api/contact', contactRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Contact server running on port ${PORT}`);

  // Keep Render free tier warm — pings every 14 minutes
  const BACKEND_URL = 'https://portfolio-backend-zf7v.onrender.com';
  setInterval(() => {
    fetch(`${BACKEND_URL}/health`)
      .then(() => console.log('[keep-alive] ping ok'))
      .catch(() => console.log('[keep-alive] ping failed'));
  }, 14 * 60 * 1000);
});