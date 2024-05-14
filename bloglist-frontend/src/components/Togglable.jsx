import React, { useState, forwardRef, useImperativeHandle } from "react"

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  const style = {
    display: visible ? "" : "none",
  }

  return (
    <div>
      <div style={style}>{props.children}</div>
      <button onClick={toggleVisibility}>{props.buttonLabel}</button>
    </div>
  )
})

export default Togglable
