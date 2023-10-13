const express = require("express");
const app = express();
let port = process.env.PORT;
const cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//using cors for give acces data in another domain
app.use(
  cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

//use helmet for security headers
app.use(helmet());


const moviesRouters = require('./routers/movies')
const userRouters = require('./routers/users')
const cinemasRouters = require('./routers/cinemas')

//call endpoint

app.use(moviesRouters);
app.use(userRouters);
app.use(cinemasRouters);


app.listen(port, ()=>{
  console.log(`http://localhost:${port}`)
})