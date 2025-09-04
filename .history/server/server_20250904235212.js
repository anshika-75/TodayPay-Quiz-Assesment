const path = require("path");
const express = require("express");
const app = express();

require("dotenv").config();
app.use(express.json());

const dbConfig = require("./config/dbConfig");
const usersRoute = require("./routes/usersRoute");
const examsRoute = require("./routes/examsRoute");
const reportsRoute = require("./routes/reportsRoute");

app.use("/api/users", usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", reportsRoute);

const port = process.env.PORT || 5000;

// FIX: use ../client/build instead of client/build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

app.get("/", (req, res) => res.send("Server is running"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
