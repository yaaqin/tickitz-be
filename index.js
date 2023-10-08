const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const port = 3000
const database = require("./database")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secretToken = "65edec039e950ec2b10ca6fe29f558bbf1d0c49a9f293177297de977384568f3"

// app.use(express.urlencoded({ extende: false}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))




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
      } = req.body
  
      const isInputValid = 
      first_name &&
      last_name &&
      phone_number &&
      email &&
      password &&
      photo_profile
  
      if(!isInputValid) {
        res.status(502).json({
          status: false,
          message: "make sure your input is valid",
          data: error,
        })
        return
      }else {
  
        
        const checkEmail = await database`SELECT * FROM users WHERE email=${email}`
      if (checkEmail.length > 0) {
        res.status(400).json({
          status: false,
          message: "Email is Already Registered",
        })
        return
      }
  
      const saltRounds = 10
      const salt = bcrypt.genSaltSync(saltRounds)
      const hash = bcrypt.hashSync(password, salt)
      
      const request =
      await database`INSERT INTO users (first_name, last_name, phone_number, email, password, photo_profile) values(${first_name}, ${last_name}, ${phone_number}, ${email}, ${hash}, ${photo_profile})`
  
      res.status(201)
      res.json({
        status: true,
        message: "post data user success",
      })
    }
    } catch (error) {
      console.log(error)
      res.status(502).json({
        status: false,
        message: "any problem in your server",
        data: error,
      })
    }
  })
  
  //login
  app.post("/users/login", async (req, res) => {
    try {
      const {email, password} = req.body
  
      const checkEmail = await database`SELECT * FROM users WHERE email=${email}`
      const checkPass = bcrypt.compareSync(password, checkEmail[0].password)
  
      //check email
      if(checkEmail.length == 0) {
        res.status(400).json({
          status: false,
          message: "Email not registered",
        })
  
        return
      }
  
      //check password
      if(checkPass) {
        const token = jwt.sign(checkEmail[0], secretToken)
        res.status(200)
        res.json({
          status: true,
          message: "login success",
          aksesToken: token
        })
        
      }else {
        res.status(400)
        res.json({
          status: false,
          message: "password incorrect",
        })
        return
      }
  
      
  
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "any problem in your server",
      })
    }
  })

const cekJWT = (req, res, next) => {
    try {
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImZpcnN0X25hbWUiOiJhaG1hZCIsImxhc3RfbmFtZSI6InlhcWluMjciLCJwaG9uZV9udW1iZXIiOiIwODU3OTg3NjY0MjEiLCJlbWFpbCI6InlhcWlubWUyN0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRYLm8ydlFZaE01Z0x6d2pEQmIzSjNPUE5IbmM0S3FuYU1aeGZ6MDl1ZVRRdEpjaEVJL0Y5LiIsInBob3RvX3Byb2ZpbGUiOiJodHRwczovL2U3LnBuZ2VnZy5jb20vcG5naW1hZ2VzLzc5OS85ODcvcG5nLWNsaXBhcnQtY29tcHV0ZXItaWNvbnMtYXZhdGFyLWljb24tZGVzaWduLWF2YXRhci1oZXJvZXMtY29tcHV0ZXItd2FsbHBhcGVyLXRodW1ibmFpbC5wbmciLCJpYXQiOjE2OTY3NzcyNjN9.iQHoF6HWc_b8htR7LzFZN0B8zYJ5dYKTivs5lrkQZWE"
        const { authorization } = req.headers

         if (authorization && authorization.startsWith('Bearer ')) {
          const token = authorization.slice(7, authorization.length)
          console.log(token)
          const decoded = jwt.verify(token, secretToken)
          if (decoded) {
              next()
            } else {
                res.status(400).json({
                    status: false,
                    message: "TOKEN ERROR"
                })
            }
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "TOKEN ERROR"
        })
    }
  }
  


//users/me
app.get("/users/me", cekJWT, (req, res) => {
    try {
      return res.status(200).json({
        status: true,
        message: "token is valid",
      })
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "any problem in your server",
      })
    }
  })
  

  app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })