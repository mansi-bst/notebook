const { default: mongoose } = require("mongoose");
const dotenv=require('dotenv')
dotenv.config()
const connectToDB = async () => {
  try {
    console.log(process.env.DB_URLS)
    await mongoose.connect(process.env.DB_URLS);
    console.log("Connected to Mongodb");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDB; 