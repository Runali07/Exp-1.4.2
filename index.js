require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
const cardSchema = new mongoose.Schema({
  suit: {
    type: String,
    required: true
  },
  rank: {
    type: String,
    required: true
  }
});
const Card = mongoose.model("Card", cardSchema);
app.post("/cards", async (req, res) => {
  try {
    const card = new Card({
      suit: req.body.suit,
      rank: req.body.rank
    });
    const savedCard = await card.save();
    res.status(201).json(savedCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.get("/cards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/cards/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card)
      return res.status(404).json({ message: "Card not found" });
    res.json(card);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
});
app.put("/cards/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      {
        suit: req.body.suit,
        rank: req.body.rank
      },
      { new: true }
    );
    if (!card)
      return res.status(404).json({ message: "Card not found" });
    res.json(card);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
});
app.delete("/cards/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card)
      return res.status(404).json({ message: "Card not found" });
    res.json({ message: "Card deleted" });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
