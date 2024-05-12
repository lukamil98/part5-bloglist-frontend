import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null) // User token or user object

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      // Here you would call your backend service to authenticate the user
      // and obtain a token. For the sake of this example, let's assume
      // the backend returns a user object with a token property.
      const user = { username } // Simulated user object from login
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (error) {
      console.error("Login failed:", error.message)
      // Optionally, you can display an error message to the user
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      </div>
    )
  }

  // If user is logged in, display blogs
  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <h3>blogs</h3>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
