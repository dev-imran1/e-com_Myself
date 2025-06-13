require('dotenv').config()
const express = require('express')
const app = express()
const port = 8000
const dbConnection = require('./config/dbConfig')
const route = require("./routes")

app.use(express.json())

app.use(route)
dbConnection()


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log('port connected')
})