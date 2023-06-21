const express = require('express');
const axios = require('axios');
const app = express();

// Endpoint to retrieve numbers from multiple URLs
app.get('/numbers', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    const urls = Array.isArray(url) ? url : [url];
    const numberPromises = urls.map(fetchNumbersFromUrl);
    const numberArrays = await Promise.all(numberPromises);
    const mergedNumbers = mergeAndSortNumbers(numberArrays);
    res.json({ numbers: mergedNumbers });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Fetch numbers from a URL
async function fetchNumbersFromUrl(url) {
  try {
    const response = await axios.get(url, { timeout: 500 });
    return response.data.numbers;
  } catch (error) {
    console.error(`Failed to fetch data from ${url}:`, error);
    return [];
  }
}

// Merge and sort unique numbers
function mergeAndSortNumbers(numberArrays) {
  const merged = numberArrays.reduce((mergedArray, currentArray) => {
    return [...mergedArray, ...currentArray];
  }, []);
  const uniqueNumbers = [...new Set(merged)];
  uniqueNumbers.sort((a, b) => a - b);
  return uniqueNumbers;
}

// Default route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Number Management Service');
});

// Start the server
app.listen(3000, () => {
  console.log('number-management-service is running on port 3000');
});
