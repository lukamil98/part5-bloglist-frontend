import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import Footer from "./components/Footer"
import blogService from "./services/blogs"
import loginService from "./services/login"

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
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

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
      setBlogs(initialBlogs)
    })
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog({
        title: "",
        author: "",
        url: "",
        likes: 0,
      })
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
    const blogToToggle = blogs.find((blog) => blog.id === id)
    const updatedBlog = { ...blogToToggle, important: !blogToToggle.important }

    try {
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

  const blogsToShow = showAll ? blogs : blogs.filter((blog) => blog.important)

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
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
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
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
            {blogsToShow.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                toggleImportance={toggleImportance}
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
