//endpoint movies

app.get("/movies", async (req, res) => {
    try {
      const request = await database`SELECT * FROM movie`;
      res.json(request);
    } catch (error) {}
  });
  
  app.get("/movies/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const request = await database`SELECT * FROM movie WHERE id = ${id}`;
  
      res.json({
        status: true,
        message: "get data success",
        data: request,
      });
    } catch (error) {}
  });
  
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