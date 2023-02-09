const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

//surpress strictQuery

mongoose.set('strictQuery', false);

//connect database
(async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
    console.log('MongoDB connected...');
} catch (err) {
    console.error(err.message);
    //Exit Process with failure
    process.exit(1);
}
})();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))