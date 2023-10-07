// endpoint penggguna

//middleware
const database = require("..database");



app.post("/pengguna", async (req, res) => {
    try {
      const {email} = req.body;
  
      const coba =
        await database`INSERT INTO pengguna (email) 
        values(${email})`;
  
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

//endpoint user 
//password hashing
//akses token
//jwt
//env