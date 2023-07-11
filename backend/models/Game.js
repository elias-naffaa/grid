const mongoose = require("mongoose");

const { Schema } = mongoose;

// Team Schema
const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
});

// Category Schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
});

// Game Schema
const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categories: [categorySchema],
  teams: [teamSchema],
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
