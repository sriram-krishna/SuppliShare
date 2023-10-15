const express = require('express');
const database = require('./database');
const app = express();
const PORT = 5000; // You can choose any port you like

app.get('/', (req, res) => {
    res.send('Hello, SuppliShare!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


database.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
});
