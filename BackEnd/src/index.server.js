const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');


env.config();

//mongdb connection
//mongodb+srv://SalmanAlam:<password>@bookdb.0plfzk8.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@bookdb.0plfzk8.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser:true, 
        useUnifiedTopology:true,
    }
).then(() => {
    console.log('Database connected');
});


app.use(bodyParser());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});