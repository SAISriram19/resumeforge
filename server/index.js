require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const profileRoutes = require('./routes/profile');
const geminiRoutes = require('./routes/gemini');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/profile', profileRoutes);
app.use('/api/gemini', geminiRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), supabase: !!require('./config/supabase').supabase });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
