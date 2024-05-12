import React from "react"

const Blog = ({ blog, toggleImportance }) => {
  const label = blog.important ? "make not important" : "make important"

  const handleToggleImportance = () => {
    toggleImportance(blog.id)
  }

  return (
    <li className="blog">
      <div>Title: {blog.title}</div>
      <div>Author: {blog.author}</div>
      <div>URL: {blog.url}</div>
      <div>Likes: {blog.likes}</div>
      <button onClick={handleToggleImportance}>{label}</button>
    </li>
  )
}

export default Blog
