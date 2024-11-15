const express = require('express')
const cors = require('cors')
const extractRouter = require('./api/extract-job-description')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use('/api', extractRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
