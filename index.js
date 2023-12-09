const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const statementRoute = require("./routes/index.js");

const app = express();
const port = process.env.PORT || 3000;

// Configure body-parser to parse request bodies
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

app.get("/", (req, res) => {
  res.send("root file of server");
});

app.use("/api", statementRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
