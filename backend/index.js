const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
connectToMongo();


const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello vipul!')
})
app.use('/api/auth', require('./routes/auth')) // making apis using router
app.use('/api/notes', require('./routes/notes')) // making apis using router
// app.get('/login', (req, res) => {
//   res.send('Hello login!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})