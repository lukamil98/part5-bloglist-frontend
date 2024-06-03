import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { incrementGood, incrementOk, incrementBad, reset } from "./actions"

const App = () => {
  const dispatch = useDispatch()
  const { good, ok, bad } = useSelector((state) => state)

  return (
    <div>
      <h1>Unicafe</h1>
      <button onClick={() => dispatch(incrementGood())}>good</button>
      <button onClick={() => dispatch(incrementOk())}>ok</button>
      <button onClick={() => dispatch(incrementBad())}>bad</button>
      <button onClick={() => dispatch(reset())}>reset stats</button>
      <div>
        <p>good: {good}</p>
        <p>ok: {ok}</p>
        <p>bad: {bad}</p>
      </div>
    </div>
  )
}

export default App
