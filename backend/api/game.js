const express = require("express");
const Game = require("../models/Game");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, categories } = req.body;

  // Create a new game instance
  const game = new Game({
    name,
    categories,
  });

  // Save the game instance to the database
  game
    .save()
    .then((savedGame) => {
      res.status(200).json(savedGame);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to save game data" });
    });
});

router.get("/:gameName", async (req, res) => {
  const { gameName } = req.params;
  try {
    const game = await Game.findOne({ name: gameName });
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(game);
  } catch (error) {
    console.error("Error fetching game:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/games/get", async (req, res) => {
  try {
    const games = await Game.find({}).exec();
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching games" });
  }
});

module.exports = router;
