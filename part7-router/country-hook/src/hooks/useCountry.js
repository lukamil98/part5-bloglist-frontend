// src/hooks/useCountry.js
import { useState, useEffect } from "react"
import axios from "axios"

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [found, setFound] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    if (!name) {
      setCountry(null) // Reset country data if no name provided
      setFound(false)
      return
    }

    let isCancelled = false

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${name}`
        )

        if (!isCancelled) {
          console.log("API response:", response.data)
          const countryData = response.data[0]
          if (countryData) {
            setCountry(countryData)
            setFound(true)
            setRetryCount(0)
          } else {
            setCountry(null)
            setFound(false)
          }
        }
      } catch (error) {
        console.error("Error fetching country:", error)
        setCountry(null) // Reset country data on error
        setFound(false)
        if (retryCount < 3) {
          // Retry after a delay
          setTimeout(() => {
            setRetryCount((prevRetryCount) => prevRetryCount + 1)
          }, 1000 * retryCount) // Increase delay with each retry
        }
      }
    }

    fetchData()

    return () => {
      isCancelled = true // Prevent setting state on unmounted component
    }
  }, [name, retryCount])

  console.log("Country:", country)
  console.log("Found:", found)

  return { country, found }
}

export default useCountry
