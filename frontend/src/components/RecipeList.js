import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const API = "http://localhost:5000/recipes";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    quantity: "",
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState(""); // <-- Add search state

  const fetchRecipes = async () => {
    const res = await axios.get(API);
    setRecipes(res.data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editId) {
      await axios.put(`${API}/${editId}`, form);
    } else {
      await axios.post(API, form);
    }
    setForm({ title: "", ingredients: "", instructions: "", quantity: "" });
    setEditId(null);
    fetchRecipes();
  };

  const handleEdit = (recipe) => {
    setEditId(recipe._id);
    setForm({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      quantity: recipe.quantity || "",
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchRecipes();
  };

  // Filter recipes based on search input
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(search.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(search.toLowerCase()) ||
    recipe.instructions.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2>🥗Recipe Manager</h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />
      <textarea
        name="ingredients"
        placeholder="Ingredients"
        value={form.ingredients}
        onChange={handleChange}
      />
      <textarea
        name="instructions"
        placeholder="Instructions"
        value={form.instructions}
        onChange={handleChange}
      />
      <input
        name="quantity"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        {editId ? "Update" : "Add"} Recipe
      </button>
      {/* Search input just below Add Recipe */}
<input
  type="text"
  className="search-bar"
  placeholder="Search recipes..."
  value={search}
  onChange={e => setSearch(e.target.value)}
/>

      <hr />

      {filteredRecipes.map((recipe) => (
        <div className="recipe-card" key={recipe._id}>
          <h3>{recipe.title}</h3>
          <p>
            <strong>Ingredients:</strong> {recipe.ingredients}
          </p>
          <p>
            <strong>Instructions:</strong> {recipe.instructions}
          </p>
          <p>
            <strong>Quantity:</strong> {recipe.quantity}
          </p>
          <button onClick={() => handleEdit(recipe)}>Edit</button>
          <button className="delete"
            onClick={() => handleDelete(recipe._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;