// index.js

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const logger = require("./utils/logger")
const config = require("./utils/config")
const Blog = require("./models/blog")

const app = express()

// MongoDB connection
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to MongoDB")
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error)
  })

// Middleware
app.use(cors())
app.use(express.json())

// Define a route handler for the root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Blog API")
})

// Routes
app.get("/api/blogs", async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    logger.error("Error fetching blogs:", error)
    response.status(500).json({ error: "Internal server error" })
  }
})

app.post("/api/blogs", async (request, response) => {
  try {
    const { title, author, url, likes } = request.body
    const newBlog = new Blog({ title, author, url, likes })
    const savedBlog = await newBlog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    logger.error("Error creating blog:", error)
    response.status(500).json({ error: "Internal server error" })
  }
})

// Start the server
const PORT = config.PORT || 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
