import { useState } from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import AnecdoteList from "./components/AnecdoteList"
import CreateNew from "./components/CreateNew"
import Footer from "./components/Footer"
import Anecdote from "./components/Anecdote"
import Notification from "./components/Notification"

const Menu = () => (
  <div>
    <Link to="/">Anecdotes</Link> | <Link to="/create">Create New</Link>
  </div>
)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      id: 1,
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
    },
    {
      id: 2,
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
    },
  ])
  const [notification, setNotification] = useState("")

  const addAnecdote = (anecdote) => {
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`Anecdote "${anecdote.content}" created!`)
    setTimeout(() => {
      setNotification("")
    }, 5000)
  }

  return (
    <Router>
      <div>
        <Menu />
        {notification && <Notification message={notification} />}
        <Routes>
          <Route
            path="/create"
            element={<CreateNew addAnecdote={addAnecdote} />}
          />
          <Route
            path="/anecdotes/:id"
            element={<Anecdote anecdotes={anecdotes} />}
          />
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
