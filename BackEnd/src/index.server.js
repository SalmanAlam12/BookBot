const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

env.config();

//mongdb connection
//mongodb+srv://SalmanAlam:<password>@bookdb.0plfzk8.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@bookdb.0plfzk8.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser:true, 
        useUnifiedTopology:true
    }
).then(() => {
    console.log('Database connected');
});


app.use(bodyParser());

app.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Hello from server'
    })
})


app.post('/data', (req, res, next) =>{
    res.status(200).json({
        message: req.body
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});