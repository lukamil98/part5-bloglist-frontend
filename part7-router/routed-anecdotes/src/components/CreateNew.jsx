// src/components/CreateNew.js
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import { useField } from "../hooks"

const CreateNew = ({ addAnecdote }) => {
  const content = useField("text")
  const author = useField("text")
  const info = useField("text")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAnecdote = {
      id: Math.floor(Math.random() * 10000), // Or use a better ID generation method
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    }
    addAnecdote(newAnecdote)
    navigate("/")
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={content.value}
            type={content.type}
            onChange={content.onChange}
            placeholder="Anecdote content"
          />
        </div>
        <div>
          <input
            value={author.value}
            type={author.type}
            onChange={author.onChange}
            placeholder="Author"
          />
        </div>
        <div>
          <input
            value={info.value}
            type={info.type}
            onChange={info.onChange}
            placeholder="Info URL"
          />
        </div>
        <button type="submit">Create</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  )
}

CreateNew.propTypes = {
  addAnecdote: PropTypes.func.isRequired,
}

export default CreateNew
