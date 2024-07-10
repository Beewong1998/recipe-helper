"use client";
import React, { useState } from "react";
import RecipeForm from "./components/RecipeForm";

const Home = () => {
  const [adjustedIngredients, setAdjustedIngredients] = useState([]);

  const handleSubmit = (ingredientsList, originalServings, desiredServings) => {
    const adjustedIngredientsList = ingredientsList.map((ingredientLine) => {
      // Regular expression to match quantities with fractions or decimals
      const match = ingredientLine.match(
        /^(\d+\/\d+|\d+(\.\d+)?|\u00BC|\u00BD|\u2153|\u2154)\s+(\w+)\s+(.*)$/u
      );
      console.log(match);
      if (!match) {
        // If the line doesn't match the expected format, return it as-is
        return ingredientLine;
      }

      // Extract matched parts
      let quantityStr = match[1];
      if (quantityStr === "\u00BD") {
        quantityStr = 1 / 2;
      } else if (quantityStr === "\u00BC") {
        quantityStr = 1 / 4;
      } else if (quantityStr === "\u00BE") {
        quantityStr = 3 / 4;
      } else if (quantityStr === "\u2153") {
        quantityStr = 1 / 3;
      } else if (quantityStr === "\u2154") {
        quantityStr = 2 / 3;
      }
      const unit = match[3];
      const name = match[4];

      // Parse the quantity (handle fractions)
      let quantity = eval(quantityStr); // Using eval to safely evaluate fractions

      // Calculate adjusted quantity
      const adjustedQuantity = (quantity / originalServings) * desiredServings;

      // Format adjusted ingredient line
      return `${adjustedQuantity} ${unit} ${name}`;
    });

    setAdjustedIngredients(adjustedIngredientsList);
  };

  return (
    <div>
      <h1>Recipe Servings Adjuster</h1>
      <RecipeForm onSubmit={handleSubmit} />
      <div>
        <h2>Adjusted Ingredients:</h2>
        <ul>
          {adjustedIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
