const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 8080;
const mongoURI = 'mongodb+srv://nyk16001:Fortnite12@cluster0.mhbiosc.mongodb.net/team_mod_1';

app.use(cors());

// Connect to MongoDB
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');

    const db = client.db('team_mod_1');
    const collection = db.collection('professional_data');

    // REST endpoint to get professional data
    app.get('/professional', async (req, res) => {
      try {
        const data = await collection.findOne();
        res.json(data);
      } catch (err) {
        console.error('Error fetching data from MongoDB:', err);
        res.status(500).json({ error: 'Failed to fetch data from MongoDB' });
      }
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });
