require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const app     = express();

const corsOptions = {
  origin: 'https://portfolio-akashghosh.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight

app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const contactRoute = require('./routes/contactRoute');
app.use('/api/contact', contactRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Contact server running on port ${PORT}`);

  const BACKEND_URL = 'https://portfolio-backend-zf7v.onrender.com';
  setInterval(() => {
    fetch(`${BACKEND_URL}/health`)
      .then(() => console.log('[keep-alive] ping ok'))
      .catch(() => console.log('[keep-alive] ping failed'));
  }, 14 * 60 * 1000);
});