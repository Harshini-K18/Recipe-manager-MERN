// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Replace with your MongoDB Atlas connection string
const MONGODB_URI = "ADD YOUR URL HERE";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ DB connection error:", err));

// Mongoose schema
const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
  instructions: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// 🔁 ROUTES

// Get all recipes
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new recipe
app.post("/recipes", async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  const newRecipe = new Recipe({ title, ingredients, instructions });
  try {
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a recipe
app.put("/recipes/:id", async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  try {
    const updated = await Recipe.findByIdAndUpdate(
      req.params.id,
      { title, ingredients, instructions },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a recipe
app.delete("/recipes/:id", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
