const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Placeholder route to get holdings from Rakuten API
app.get('/api/holdings', async (req, res) => {
  const apiKey = process.env.RAKUTEN_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'RAKUTEN_API_KEY environment variable not set' });
  }

  try {
    // TODO: Replace with actual Rakuten Securities API endpoint
    const response = await axios.get('https://api.rakuten-sec.com/holdings', {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch holdings. Update the API endpoint in server.js.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
