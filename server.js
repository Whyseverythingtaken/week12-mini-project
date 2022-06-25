const express = require("express");
const mysql = require("mysql2");

const app = express();

const port = process.env.PORT || 3001;

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "the_best_database",
  },
  console.log("Connected to Databse the_best_database")
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// It's done when the /api/movies route renders a list of all movies.
app.get("/api/movies", (request, response) => {
  console.log("Incomming GET request to /api/movies");

  db.query("SELECT * FROM movies;", (err, result) => {
    if (err) {
      response.status(500).send("Something went wrong");
    } else {
      response.status(200).json(result);
    }
  });
});

// It's done when the /api/add-movie route successfully adds a movie when tested using Insomnia.
app.post("/api/add-movie", (request, response) => {
  console.log("Incomming POST request to /api/add-movie", request.body);
  const { movie_name } = request.body;

  if (!movie_name) {
    response.send("Please supply a valid movie_name property");
  }

  // Add it to SQL database
  db.query(
    "INSERT INTO movies (movie_name) VALUES (?)",
    movie_name,
    (err, result) => {
      if (err) {
        response.status(500).send("Error adding movie");
      } else {
        if (result.affectedRows === 1) {
          response.status(201).json({
            status: "success",
            body: request.body,
          });
        } else {
          response.status(500).send("Unable to create new movie record");
        }
      }
    }
  );
});

app.get("/api/reviews", (request, response) => {
  console.log("Incomming GET request to /api/reviews");

  db.query("SELECT * FROM reviews;", (err, result) => {
    if (err) {
      response.status(500).send("Something went wrong");
    } else {
      response.status(200).json(result);
    }
  });
});

// It's done when the /api/update-review route successfully updates a movie when tested using Insomnia.
app.post("/api/update-review", (request, response) => {
  console.log("Incomming POST request to /api/update-review", request.body);
  const { id, review } = request.body;
  if (!id || !review) {
    response.send(
      'Please supply a valid review object with an "id" and "review" properties'
    );
  }

  db.query(
    "INSERT INTO reviews (movie_id, review) VALUES (?, ?)",
    [id, review],
    (error, results) => {
      if (error) {
        response
          .status(500)
          .send(`Error adding review for movie with id = ${id}`);
        console.log(error);
      } else {
        console.log(results);
        response.status(201).json({
          status: "success",
          body: request.body,
        });
      }
    }
  );
});

app.listen(port, () => {
  console.log("Server running on port", port, "🚀");
});
