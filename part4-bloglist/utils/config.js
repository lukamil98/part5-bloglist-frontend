require("dotenv").config()

const config = {
  PORT: process.env.PORT || 3003,
  MONGODB_URI: process.env.MONGODB_URI,
}

module.exports = config
