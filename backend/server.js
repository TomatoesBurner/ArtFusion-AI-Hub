/*****************************************************
 *                 SERVER STARTUP
 *****************************************************/
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app')

dotenv.config({path:'./config.env'})
console.log(process.env.DATABASE_PASSWORD)
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB)
    .then(() => console.log('DB connection successful!'))
    .catch(err => console.error('DB connection error:', err));



const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App running on port ${port}...`)
});