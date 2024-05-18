// BlogForm.jsx
import React from "react"

const BlogForm = ({ addBlog, newBlog, handleBlogChange }) => {
  return (
    <form onSubmit={addBlog}>
      <label htmlFor="title">Title:</label>
      <input
        id="title"
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
}

export default BlogForm
