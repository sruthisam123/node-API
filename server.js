const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(userRoutes); // Ensure this is added to use the routes


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running!' });
});

app.use(userRoutes); // All user routes prefixed without /api

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
