const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const port = 3000
const database = require("./database")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secretToken = "65edec039e950ec2b10ca6fe29f558bbf1d0c49a9f293177297de977384568f3"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


const cekJWT = (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (authorization && authorization.startsWith('Bearer ')) {
            const token = authorization.slice(7, authorization.length)
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




//users/me
app.get("/users/me", cekJWT, (req, res) => {
    try {
        const { authorization } = req.headers
        if (authorization && authorization.startsWith('Bearer ')) {
            const token = authorization.slice(7, authorization.length)
            const decoded = jwt.verify(token, secretToken)

            const request = database`SELECT * FROM users WHERE id = ${decoded.id}`
            
            res.status(200).json({
                status: true,
                message: "token is falid",
                data: request
            })
        }
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