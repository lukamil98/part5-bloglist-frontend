// src/App.js
import React, { useState } from "react"
import useCountry from "./hooks/useCountry"

const Country = ({ country }) => {
  if (!country) {
    return <div>Country not found...</div> // Update the message here
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <img
        src={country.flags.png}
        height="100"
        alt={`flag of ${country.name.common}`}
      />
    </div>
  )
}

const App = () => {
  const [name, setName] = useState("")
  const { country, found } = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(e.target.countryName.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input name="countryName" />
        <button type="submit">Find</button>
      </form>
      <Country country={country} /> {/* Update here */}
    </div>
  )
}

export default App
