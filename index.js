const express = require('express');
const cors = require('cors');
const path = require('path');
const analyzeAccessibility = require('./analyzer');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files like style.css

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/analyze', async (req, res) => {
  const { url } = req.body;
  console.log("🔍 Analyzing:", url);

  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    const results = await analyzeAccessibility(url);
    console.log("✅ Results:", results);
    res.json(results);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log('✅ Server running on http://localhost:3001');
});
