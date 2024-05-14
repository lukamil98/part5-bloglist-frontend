import React, { useState } from "react"

const Blog = ({ blog, toggleImportance, user, likeBlog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const label = blog.important ? "make not important" : "make important"

  const handleToggleImportance = () => {
    toggleImportance(blog.id)
  }

  const handleLike = () => {
    likeBlog(blog.id)
  }

  const handleDelete = () => {
    deleteBlog(blog.id)
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <li className="blog">
      <div>
        <strong>{blog.title}</strong> by {blog.author}{" "}
        <button onClick={toggleDetails}>
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>
      {showDetails && (
        <div>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
          <p>Added by: {blog.user ? blog.user.username : user.username}</p>
          <button onClick={handleLike}>Like</button>
          <button onClick={handleToggleImportance}>{label}</button>
          {user && blog.user && user.username === blog.user.username && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </div>
      )}
    </li>
  )
}

export default Blog