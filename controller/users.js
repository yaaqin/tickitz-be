const usersModels = require('../model/users')
// import jwt for make token
const jwt = require('jsonwebtoken');
//import bcrypt for compare password from user with database
const bcrypt = require('bcrypt'); 

const userController ={
    _getDetailUser : async (req, res) => {
  
        try {
      
          const token = req.headers.authorization.slice(7) // get token from authoriztion and slice 7 string in the front jwt
          const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN) //verify the token with env jwt
          const request = await usersModels.getDetailUser(decoded) //get data bye token id
      
          res.json({
            status : "true",
            massage :"get data succes",
            data : request
          })
        } catch (error) {
          res.json({
            status : false,
            massage : "something wron in server",
            data : []
        })
        }
      
      },

}




module.exports = userController;