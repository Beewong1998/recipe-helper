import React, { useState } from "react";
import parseFraction from "../utils/fractionParser"; // Adjust the path as needed

const RecipeForm = ({ onSubmit }) => {
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [originalServings, setOriginalServings] = useState("");
  const [desiredServings, setDesiredServings] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const ingredientsList = ingredientsInput
      .split("\n")
      .map((line) => line.trim());
    onSubmit(
      ingredientsList,
      parseFloat(originalServings),
      parseFloat(desiredServings)
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows="10"
        placeholder="Paste or enter ingredients list here..."
        value={ingredientsInput}
        onChange={(e) => setIngredientsInput(e.target.value)}
        required
      ></textarea>
      <label>
        Original Servings:
        <input
          type="number"
          value={originalServings}
          onChange={(e) => setOriginalServings(e.target.value)}
          required
        />
      </label>
      <label>
        Desired Servings:
        <input
          type="number"
          value={desiredServings}
          onChange={(e) => setDesiredServings(e.target.value)}
          required
        />
      </label>
      <button type="submit">Adjust Ingredients</button>
    </form>
  );
};

export default RecipeForm;
