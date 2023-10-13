const database = require("../database");
const bcrypt = require('bcrypt'); 

const usersModels = {
    getDetailUser : async(decoded)=>{
        const request = await database `SELECT * FROM users where id = ${decoded.id}`
        return request;
    },
}

module.exports = usersModels;