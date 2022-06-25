const express = require("express");
const mysql = require("mysql2");

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// It's done when the /api/movies route renders a list of all movies.
app.get("/api/movies", (request, response) => {
  response.send("Hello");
});

app.listen(port, () => {
  console.log("Server running on port", port, "🚀");
});
