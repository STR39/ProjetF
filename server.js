// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create app
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://usseff:ffessu123@cluster0.oemgxex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Client Schema
const clientSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    phoneNumber: String
});

// Driver Schema
const driverSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    phoneNumber: String,
    carSerial: String,
    licenseId: String
});

const Client = mongoose.model('Client', clientSchema);
const Driver = mongoose.model('Driver', driverSchema);

// Routes

// Create a new client
app.post('/signup/client', async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(201).send({ message: 'Client created', client });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Create a new driver
app.post('/signup/driver', async (req, res) => {
    try {
        const driver = new Driver(req.body);
        await driver.save();
        res.status(201).send({ message: 'Driver created', driver });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
