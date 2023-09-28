const express = require('express')
const app = express()
const port = 3000
const database = require("./database")

app.get('/movies', (req, res) => {
  const request = database`SELECT * FROM movies`;

  console.log(request);
})

app.get('/qin', (req, res) => {
  res.send('example pages')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})