import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import Footer from "./components/Footer"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  })
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      // Sort blogs by the number of likes
      initialBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(initialBlogs)
    })
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      // Parse likes value to ensure it's a number
      const newBlogWithLikesAsNumber = {
        ...newBlog,
        likes: parseInt(newBlog.likes),
      }
      const returnedBlog = await blogService.create(newBlogWithLikesAsNumber)
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog({
        title: "",
        author: "",
        url: "",
        likes: 0, // Reset likes to 0 for next blog
      })
      setSuccessMessage(
        `Blog "${returnedBlog.title}" added successfully by ${returnedBlog.author}`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      blogFormRef.current.toggleVisibility() // Hide the blog form after creation
    } catch (exception) {
      console.error("Adding blog failed:", exception)
      setErrorMessage("Failed to add blog")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.error("Login failed:", exception)
      setErrorMessage("Wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
  }

  const toggleImportance = async (id) => {
    try {
      const blogToToggle = blogs.find((blog) => blog.id === id)
      const updatedBlog = {
        ...blogToToggle,
        action: "toggleImportance", // Include the action field
      }

      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
    } catch (exception) {
      console.error("Toggling importance failed:", exception)
      setErrorMessage("Failed to toggle importance")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const likeBlog = async (id) => {
    try {
      const blogToLike = blogs.find((blog) => blog.id === id)
      const updatedBlog = {
        ...blogToLike,
        action: "like",
        likes: parseInt(blogToLike.likes) + 1,
      } // Include action field

      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
    } catch (exception) {
      console.error("Liking blog failed:", exception)
      setErrorMessage("Failed to like blog")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      setSuccessMessage("Blog deleted successfully")
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      console.error("Deleting blog failed:", exception)
      setErrorMessage("Failed to delete blog")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <input
          placeholder="Title"
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
        />
        <input
          placeholder="Author"
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
        />
        <input
          placeholder="URL"
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
        />
        <input
          placeholder="Likes"
          type="number"
          name="likes"
          value={newBlog.likes}
          onChange={handleBlogChange}
        />
        <button type="submit">Save</button>
      </form>
    </Togglable>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      <Notification message={successMessage} className="success" />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged-in <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
        </div>
      )}

      {user && (
        <div>
          <div>
            <button onClick={() => setShowAll(!showAll)}>
              Show {showAll ? "important" : "all"} blogs
            </button>
          </div>
          <ul>
            {blogs
              .filter((blog) => (showAll ? true : blog.important))
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  toggleImportance={toggleImportance}
                  likeBlog={likeBlog}
                  deleteBlog={deleteBlog}
                  user={user}
                />
              ))}
          </ul>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default App
