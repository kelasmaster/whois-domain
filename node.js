const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle WHOIS lookup
app.post('/lookup', async (req, res) => {
  const { domain } = req.body;

  // Validate domain
  if (!domain || !/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(domain)) {
    return res.status(400).json({ error: 'Invalid domain name' });
  }

  try {
    // Use a WHOIS API (replace with your API key)
    const response = await axios.get(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=YOUR_API_KEY&domainName=${domain}&outputFormat=JSON`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch WHOIS data' });
  }
});

// Serve static files
app.use(express.static('public'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
