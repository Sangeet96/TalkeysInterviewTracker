const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const url = process.env.MONGO_URI;
const client = new MongoClient(url);

const dbName = 'TalkeysInterviewTracker';
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.json());

client.connect()
console.log('Connected successfully to server');

app.get('/', async (req, res) => {
    console.log("Hello");
    const db = client.db(dbName);
    const collection = db.collection('candidates');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
});

app.post('/', async (req, res) => {
    const candidate = req.body;
    const db = client.db(dbName);
    const collection = db.collection('candidates');
    const result = await collection.insertOne(candidate);
    res.json({ success: true, result });
});

app.delete('/', async (req, res) => {
    const candidate = req.body;
    const db = client.db(dbName);
    const collection = db.collection('candidates');
    const result = await collection.deleteOne(candidate);
    res.json({ success: true, result });
});
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
module.exports = app;