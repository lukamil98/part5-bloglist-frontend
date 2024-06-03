// src/hooks/index.js
import { useState } from "react"

export const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue("")
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}

// You can add more custom hooks here if needed
export const useAnotherHook = () => {
  // ...
}
