import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { vi } from "vitest"
import Blog from "./Blog"

test("renders title and author but not URL or likes by default", () => {
  const blog = {
    id: 1,
    title: "Test Blog",
    author: "Test Author",
    url: "http://example.com/test",
    likes: 10,
    user: { username: "Test User" },
  }

  render(<Blog blog={blog} user={blog.user} />)

  const titleElement = screen.getByText(/Test Blog/i)
  const authorElement = screen.getByText(/Test Author/i)
  expect(titleElement).toBeInTheDocument()
  expect(authorElement).toBeInTheDocument()

  const urlElement = screen.queryByText(/http:\/\/example\.com\/test/i)
  const likesElement = screen.queryByText(/Likes: 10/i)
  expect(urlElement).not.toBeInTheDocument()
  expect(likesElement).not.toBeInTheDocument()
})

test("shows URL and likes when the 'Show Details' button is clicked", () => {
  const blog = {
    id: 1,
    title: "Test Blog",
    author: "Test Author",
    url: "http://example.com/test",
    likes: 10,
    user: { username: "Test User" },
  }

  render(<Blog blog={blog} user={blog.user} />)

  const button = screen.getByText(/Show Details/i)
  fireEvent.click(button)

  const urlElement = screen.getByText(/http:\/\/example\.com\/test/i)
  const likesElement = screen.getByText(/Likes: 10/i)
  expect(urlElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
})

test("calls the like button event handler twice when clicked twice", () => {
  const blog = {
    id: 1,
    title: "Test Blog",
    author: "Test Author",
    url: "http://example.com/test",
    likes: 10,
    user: { username: "Test User" },
  }

  const mockLikeBlog = vi.fn()

  render(<Blog blog={blog} user={blog.user} likeBlog={mockLikeBlog} />)

  const detailsButton = screen.getByText(/Show Details/i)
  fireEvent.click(detailsButton)

  const likeButtons = screen.getAllByText(/Like/i)
  const likeButton = likeButtons[likeButtons.length - 1] // Select the last "Like" button

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockLikeBlog).toHaveBeenCalledTimes(2)
})
