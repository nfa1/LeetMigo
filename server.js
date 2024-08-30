// server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Endpoint to get AI suggestions from the LLM
app.post('/api/ai', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await axios.post('https://api.example-llm.com/generate', {
      prompt: prompt,
      max_tokens: 150,
    });

    res.json({ response: response.data });
  } catch (error) {
    res.status(500).send('Error generating AI response');
  }
});

// Endpoint to process Bitcoin payments
app.post('/api/pay', async (req, res) => {
  try {
    const { amount, walletAddress } = req.body;
    const response = await axios.post('https://api.example-bitcoin.com/pay', {
      amount: amount,
      walletAddress: walletAddress,
    });

    res.json({ transactionId: response.data.transactionId });
  } catch (error) {
    res.status(500).send('Error processing payment');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
