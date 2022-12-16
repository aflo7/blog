const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const devDB = process.env.MONGO_URI
var apiRouter = require("./routes/api")

mongoose.set("strictQuery", false)
const mongoDB = devDB
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"))

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", apiRouter)



app.listen(5000, () => console.log("Server started on port 5000"))
