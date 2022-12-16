require("dotenv").config()
const jwt = require("jsonwebtoken")
var express = require("express")
var router = express.Router()
const jwtSecret = process.env.JWT_SECRET
const { User, Post, Comment } = require("../models/schema")
// const { response } = require("express");

// everything here starts with /api
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API"
  })
})

// give the user the ability to delete a post
// deletes post, and all comments associated with the post
router.delete("/posts/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, jwtSecret, (err, authData) => {
    if (err) {
      return res.sendStatus(403)
    } else {
      // delete post logic goes here
      const postToDelete = req.params.id

      if (postToDelete == null) return res.sendStatus(404)

      Post.deleteOne({ _id: postToDelete }, (err, deleted) => {
        if (err) {
          return res.sendStatus(400)
        }
        Comment.deleteMany({ cpid: postToDelete }, (err, comments) => {
          if (err) {
            return res.sendStatus(400)
          }
          res.sendStatus(200)
        })
      })
    }
  })
})

// create a post, must be logged in
router.post("/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, jwtSecret, (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      // logic to create a post goes here
      const poster = req.body.poster
      const content = req.body.content
      const date = new Date()
      const comments = []

      if (!poster || !content || !date || !comments) return res.sendStatus(400)

      const newPost = new Post({
        poster,
        content,
        date,
        comments
      })

      newPost.save()
      res.sendStatus(200)
    }
  })
})

// get all posts
router.post("/posts/all", verifyToken, (req, res) => {
  jwt.verify(req.token, jwtSecret, (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Post.find({})
        .populate("comments")
        .exec(function (err, posts) {
          if (err) {
            res.sendStatus(404)
          }
          res.json({
            posts
          })
        })
    }
  })
})

router.post("/login", (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.sendStatus(400)
  }
  // Mock user
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) {
      return res.sendStatus(400)
    }
    if (!user) {
      return res.sendStatus(400)
    }
    if (user.password == req.body.password) {
      jwt.sign({ user }, jwtSecret, { expiresIn: "15m" }, (err, token) => {
        res.json({
          token
        })
      })
    } else {
      return res.sendStatus(400)
    }
  })
})

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token coming in from the browser
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"]
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ")
    // Get token from array
    const bearerToken = bearer[1]
    // Set the token
    req.token = bearerToken
    // Next middleware
    next()
  } else {
    // Forbidden
    res.sendStatus(403)
  }
}

module.exports = router
