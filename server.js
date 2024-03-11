const express = require('express');
const dotenv = require('dotenv');
const {connectDB} = require('./connectDB');
const router = require('./user-routes');

dotenv.config();
const app = express();

connectDB().then(()=>{
    const User = require('./user-model');
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/",router);

app.listen(process.env.PORT,()=>{
    console.log("App listening to "+ process.env.PORT);
});
