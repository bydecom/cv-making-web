const cors = require('cors')
const express = require('express')
const { EnhanceEmail } = require('./testbackend/controller')
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())
app.post('/email', EnhanceEmail)
app.listen(port, () => {
  console.log('Connected to server port 3000')
})
