const mongoose = require('mongoose');
require('dotenv').config();
const DB_URL = process.env.DB_URL;

const connectDB = ()=>{
    try {
        mongoose.connect(`${DB_URL}`);
        console.log("MongoDB Connected...");
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}
module.exports= connectDB; 
// module.export is the same as exports in node js