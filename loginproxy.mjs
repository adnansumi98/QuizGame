import express from 'express'
import cors from 'cors'

function loginProxy() {
  const app = express()
  const PORT = process.env.PORT || 3001

  app.use(express.json())

  const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['POST'],
  }

  app.use(cors(corsOptions))

  const requestEndPoint = 'https://apis.ccbp.in/login'

  app.post('/proxy-login', async (req, res) => {
    const { username, password } = req.body
    try {
      const response = await fetch(requestEndPoint, {
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
}

loginProxy()
