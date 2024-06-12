// Assuming you have Express installed (`npm install express`)
const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch') // Make sure to install node-fetch (`npm install node-fetch`)

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors()) // Enable CORS for all routes

app.post('/proxy-login', async (req, res) => {
  const { username, password } = req.body
  try {
    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error('Error occurred while proxying login:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`)
})
