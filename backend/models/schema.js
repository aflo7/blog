const mongoose = require("mongoose")
const { Schema } = mongoose

const User = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
})

const Post = new Schema({
  poster: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
})

const Comment = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  cpid: { type: Schema.Types.ObjectId, required: true }
})

const userSchema = mongoose.model("User", User)
const postSchema = mongoose.model("Post", Post)
const commentSchema = mongoose.model("Comment", Comment)

module.exports = { User: userSchema, Post: postSchema, Comment: commentSchema }
