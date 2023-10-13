const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
const database = require("./database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const secretToken = "65edec039e950ec2b10ca6fe29f558bbf1d0c49a9f293177297de977384568f3";

// app.use(express.urlencoded({ extende: false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.json())

const cekJWT = async (req, res, next) => {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImZpcnN0X25hbWUiOiJhaG1hZCIsImxhc3RfbmFtZSI6InlhcWluMjciLCJwaG9uZV9udW1iZXIiOiIwODU3OTg3NjY0MjEiLCJlbWFpbCI6InlhcWlubWUyN0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRYLm8ydlFZaE01Z0x6d2pEQmIzSjNPUE5IbmM0S3FuYU1aeGZ6MDl1ZVRRdEpjaEVJL0Y5LiIsInBob3RvX3Byb2ZpbGUiOiJodHRwczovL2U3LnBuZ2VnZy5jb20vcG5naW1hZ2VzLzc5OS85ODcvcG5nLWNsaXBhcnQtY29tcHV0ZXItaWNvbnMtYXZhdGFyLWljb24tZGVzaWduLWF2YXRhci1oZXJvZXMtY29tcHV0ZXItd2FsbHBhcGVyLXRodW1ibmFpbC5wbmciLCJpYXQiOjE2OTY3NzM2MDl9.O8Ry7YgDJ1Qw974HIlieLG2nU5Smuakg6VzIEPH0IRQ";
    const decoded = jwt.verify(token, secretToken);

    if (decoded) {
next()
} else {
res.status(400).json({
      status: false,
      message: "TOKEN ERROR",
    });
}

  } catch (error) {
    res.status(400).json({
      status: false,
      message: "TOKEN ERROR",
    });
  }
}

//endcode movie
//get
app.get("/movies", async (req, res) => {
  try {
    const request = await database`SELECT * FROM movies`;
    res.json(request);
  } catch (error) {}
});

app.get("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const request = await database`SELECT * FROM movies WHERE id = ${id}`;

    res.json({
      status: true,
      message: "get data success",
      data: request,
    });
  } catch (error) {
    res.status(502).json({
      status: false,
      message: "any problem in your server",
      data: error,
    });
  }
});

//post
app.post("/movies", async (req, res) => {
  try {
    const {
      name,
      release_date,
      duration,
      genres,
      directed,
      casts,
      synopsis,
      poster,
    } = req.body;

    const coba =
      await database`INSERT INTO movies (name, release_date, duration, genres, directed, casts, synopsis, poster)
      values(${name}, ${release_date}, ${duration}, ${genres}, ${directed}, ${casts}, ${synopsis}, ${poster})`;
    console.log(coba);

    res.status(201);
    res.json({
      status: true,
      message: "post data success",
    });
  } catch (error) {
    console.log(error);
    res.status(502).json({
      status: false,
      message: "any problem in your server",
      data: error,
    });
  }
});

//put
app.put("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {name, duration} = req.body
    const request = await database`UPDATE movies SET name=${name}, duration=${duration} WHERE id=${id}`;

    res.json({
      status: true,
      message: "edit data success",
      data: request,
    });
  } catch (error) {}
});

//delete
app.delete("/movies/:id", async (req, res) => {
  try {
    const id = (req.params.id);
    const request = await database`DELETE FROM movies WHERE id=${id}`;

    res.json({
      status: true,
      message: "delete data success",
      data: request,
    });
  } catch (error) {}
});



// endcode users
//get
app.get("/users", async (req, res) => {
  try {
    const request = await database`SELECT first_name, last_name, phone_number, photo_profile FROM users`;
    
    res.json({
      status: true,
      message: "get all data success",
      data: request,
    });
  } catch (error) {}
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const request = await database`SELECT first_name, last_name, phone_number, photo_profile FROM users WHERE id = ${id}`;

    res.json({
      status: true,
      message: "get data success",
      data: request,
    });
  } catch (error) {}
});

//post
app.post("/users", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      email,
      password,
      photo_profile,
    } = req.body;

    const request =
      await database`INSERT INTO users (first_name, last_name, phone_number, email, password, photo_profile) values(${first_name}, ${last_name}, ${phone_number}, ${email}, ${password}, ${photo_profile})`;

    res.status(201);
    res.json({
      status: true,
      message: "post data user success",
    });
  } catch (error) {
    console.log(error);
    res.status(502).json({
      status: false,
      message: "any problem in your server",
      data: error,
    });
  }
});

//register
app.post("/users/register", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      email,
      password,
      photo_profile,
    } = req.body;

    const isInputValid = 
    first_name &&
    last_name &&
    phone_number &&
    email &&
    password &&
    photo_profile;

    if(!isInputValid) {
      res.status(502).json({
        status: false,
        message: "make sure your input is valid",
        data: error,
      });
      return;
    }else {

      
      const checkEmail = await database`SELECT * FROM users WHERE email=${email}`;
    if (checkEmail.length > 0) {
      res.status(400).json({
        status: false,
        message: "Email is Already Registered",
      });
      return;
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    
    const request =
    await database`INSERT INTO users (first_name, last_name, phone_number, email, password, photo_profile) values(${first_name}, ${last_name}, ${phone_number}, ${email}, ${hash}, ${photo_profile})`;

    res.status(201);
    res.json({
      status: true,
      message: "Register success",
    });
  }
  } catch (error) {
    console.log(error);
    res.status(502).json({
      status: false,
      message: "Registered fail, please make sure your data is completed",
      data: error,
    });
  }
});

//login
app.post("/users/login", async (req, res) => {
  try {
    const {email, password} = req.body;

    const checkEmail = await database`SELECT * FROM users WHERE email=${email}`;
    const checkPass = bcrypt.compareSync(password, checkEmail[0].password);

    //check email
    if(checkEmail.length == 0) {
      res.status(400).json({
        status: false,
        message: "Email not registered",
      });

      return;
    }

    //check password
    if(checkPass) {
      const token = jwt.sign(checkEmail[0], secretToken);
      res.status(200);
      res.json({
        status: true,
        message: "login success",
        aksesToken: token
      });
      
    }else {
      res.status(400);
      res.json({
        status: false,
        message: "password incorrect",
      });
      return;
    }

    

  } catch (error) {
    res.status(502).json({
      status: false,
      message: "any problem in your server",
    });
  }
});


//users/me
app.get("/users/me", cekJWT, (req, res) => {
try {
  res.status(200).json({
    status: true,
    message: "token is falid",
  });
  return;
} catch (error) {
  res.status(502).json({
    status: false,
    message: "any problem in your server",
  });
}
});



// endcode cinemas

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
  console.log(`http://localhost:${port}`);
});
