const mongoose = require("mongoose");
const express = require("express");
const app = express();
const gameRoutes = require("./api/game");
const cors = require("cors");

app.use(express.json());

// Replace the URL with your MongoDB connection string
const mongoURI =
  "mongodb+srv://deeerbyfootie:P0HbKrxExiXPpY0j@gridgame.xico7uk.mongodb.net/";

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;
app.use(cors());

// Handle connection events
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// For backend and express
console.log("App listen at port 5000");
app.use("/api/game", gameRoutes);

app.listen(5000);
