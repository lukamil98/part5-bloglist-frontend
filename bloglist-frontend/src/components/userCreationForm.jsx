import React, { useState } from "react" // Import useState

const UserCreationForm = ({ createUser }) => {
  const [newUsername, setNewUsername] = useState("") // Use useState hook
  const [newPassword, setNewPassword] = useState("") // Use useState hook

  const handleSubmit = (event) => {
    event.preventDefault()
    createUser(newUsername, newPassword) // Pass newUsername and newPassword to createUser
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button type="submit">Create User</button>
    </form>
  )
}

export default UserCreationForm
