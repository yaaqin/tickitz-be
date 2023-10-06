const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
const database = require("./database");

// app.use(express.urlencoded({ extende: false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.json())
//endcode movie

// app.get("/movie", async (req, res) => {
//   try {
//     const request = await database`SELECT * FROM movie`;
//     res.json(request);
//   } catch (error) {}
// });

// app.get("/movie/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const request = await database`SELECT * FROM movie WHERE id = ${id}`;

//     res.json({
//       status: true,
//       message: "get data success",
//       data: request,
//     });
//   } catch (error) {}
// });

// app.post("/movies", async (req, res) => {
//   try {
//     const {
//       name,
//       release_date,
//       duration,
//       genres,
//       directed,
//       casts,
//       synopsis,
//       poster,
//     } = req.body;

//     const coba =
//       await database`INSERT INTO movies (name, release_date, duration, genres, directed, casts, synopsis, poster) 
//       values(${name}, ${release_date}, ${duration}, ${genres}, ${directed}, ${casts}, ${synopsis}, ${poster})`;
//     console.log(coba);

//     res.status(201);
//     res.json({
//       status: true,
//       message: "post data success",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(502).json({
//       status: false,
//       message: "any problem in your server",
//       data: error,
//     });
//   }
// });

//endcode users

// app.get("/users", async (req, res) => {
//   try {
//     const request = await database`SELECT * FROM users`;
//     res.json(request);
//   } catch (error) {}
// });

// app.get("/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const request = await database`SELECT * FROM users WHERE id = ${id}`;

//     res.json({
//       status: true,
//       message: "get data success",
//       data: request,
//     });
//   } catch (error) {}
// });

// app.post("/user022", async (req, res) => {
//   try {
//     const {
//      email
//     } = req.body;

//     const request = await database`INSERT INTO user (email) values(${email})`;

//     res.status(201);
//     res.json({
//       status: true,
//       message: "post data success",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(502).json({
//       status: false,
//       message: "any problem in your server",
//       data: error,
//     });
//   }
// });

//endcode cinemas

app.get("/cinemas", async (req, res) => {
  try {
    const request = await database`SELECT * FROM cinemas`;
    res.json(request);
  } catch (error) {}
});

app.get("/cinemas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const request = await database`SELECT * FROM cinemas WHERE id = ${id}`;

    res.json({
      status: true,
      message: "get data success",
      data: request,
    });
  } catch (error) {}
});

app.post("/cinemas", async (req, res) => {
  try {
    const { movie_id, name, city, address, showtime, price, logo } = req.body;

    const coba =
      await database`INSERT INTO cinemas (movie_id, name, city, address, showtime, price, logo) values(${movie_id}, ${name}, ${city}, ${address}, ${showtime}, ${price}, ${logo})`;
    console.log(coba);
    res.json({
      status: true,
      message: "post data success",
    });
  } catch (error) {
    console.log(error);
    res.status(502).json({
      status: false,
      message: "something wrong in your server",
      data: error,
    });
  }
});

// app.post("/pengguna", async (req, res) => {
//   try {
//     const {email} = req.body;

//     const coba =
//       await database`INSERT INTO pengguna (email) 
//       values(${email})`;

//     res.status(201);
//     res.json({
//       status: true,
//       message: "post data success",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(502).json({
//       status: false,
//       message: "any problem in your server",
//       data: error,
//     });
//   }
// });

//endpoint user 
//password hashing
//akses token
//jwt
//env

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
