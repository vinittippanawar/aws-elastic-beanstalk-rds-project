const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Elastic Beanstalk App is Running Successfully!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});