const mongoose = require("mongoose")

// Define the schema for the Blog model
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
})

// Create the Blog model using the schema
const Blog = mongoose.model("Blog", blogSchema)

// Export the Blog model
module.exports = Blog
