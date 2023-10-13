const jwt = require('jsonwebtoken');
const router = require("express").Router()

//import controller for get response or requesst

const userController = require('../controller/users');


const checkJWT = async (req,res,next) =>{
  try {
    const token = req.headers.authorization.slice(7) // get token from authoriztion and slice 7 string in the front jwt
    const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN)
    console.log("decoded", decoded)
    
    if (decoded) {
      next()
    }
    
  } catch (error) {
    res.status(401).json({
      status : false,
      massage : "token error",
    })
  }
}

router.get("/users/me", checkJWT, userController._getDetailUser);


module.exports = router;