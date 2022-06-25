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

app.listen(port, () => {
  console.log("Server running on port", port, "🚀");
});
