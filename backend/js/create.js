const mongoose = require("mongoose")
require("dotenv").config()
const devDB = ""
const { Post, Comment } = require("../models/schema")

mongoose.set("strictQuery", false)
const mongoDB = devDB
console.log(mongoDB)
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"))

// const p1 = new Post({
//   poster: "Andres Flores",
//   content: "I like node.js",
//   date: new Date(),
//   comments: []
// })

// const p2 = new Post({
//   poster: "Andres Flores",
//   content: "programming is cool",
//   date: new Date(),
//   comments: []
// })

// const p2 = new Post({
//   poster: "Andres Flores",
//   content: "still learning node",
//   date: new Date(),
//   comments: []
// })
// p1.save()
// p2.save()

const c1 = new Comment({
  content: "greattttt post",
  author: "randomguy313",
  cpid: "639bf9a322327509842f57de"
})

const c2 = new Comment({
  content: "I like to program!",
  author: "node_programer2",
  cpid: "639bf9a322327509842f57de"
})


Post.findOneAndUpdate(
  { _id: "639bf9a322327509842f57de" },
  { $push: { comments: c1 } },
  null,
  function (err, docs) {
    if (err) {
      console.log(err)
    } else {
      console.log("Original Doc : ", docs)
    }
  }
)

Post.findOneAndUpdate(
  { _id: "639bf9a322327509842f57de" },
  { $push: { comments: c2 } },
  null,
  function (err, docs) {
    if (err) {
      console.log(err)
    } else {
      console.log("Original Doc : ", docs)
    }
  }
)

c1.save()
c2.save()
