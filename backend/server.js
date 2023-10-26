const express = require('express');
const cors = require('cors');
const bodyParser=require('body-parser');
const app = express();
const accountRouter = require('./src/routes/accountRoutes');
const PORT = 5000; // You can choose any port you like
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use("/account", accountRouter);

app.post('/', (req,res)=>{
    console.log(req.body)
    res.json({message:`Your new Email is ${req.body.email}`});
});

app.all("*",(req,res)=>{
    console.log('wildcard')
    res.status(404).send("Not Found")
})

app.listen(PORT, () => {
    console.log(`The Server is running on http://localhost:${PORT}`);
});

