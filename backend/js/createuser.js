require("dotenv").config()
const devDB = process.env.MONGO_URI
const {User, Post} = require("../models/schema")
const mongoose = require("mongoose")

mongoose.set("strictQuery", false)
// Set up default mongoose connection
const mongoDB = devDB
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
// Get the default connection
var db = mongoose.connection
// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"))

const me = new User({username: "aflo7", password: "pass", name: "Andres Flores"})
me.save(function (err) {
  if (err) {
    console.log(err);
  
  return}
  // saved!
});