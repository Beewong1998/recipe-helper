import React, { useState } from "react";

const IngredientsForm = ({ onSubmit }) => {
  const [ingredientsList, setIngredientsList] = useState("");
  const [originalServings, setOriginalServings] = useState();
  const [desiredServings, setDesiredServings] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ ingredientsList, originalServings, desiredServings });
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label for="ingredients" className="pl-1 underline">
        Ingredients List:
      </label>
      <div className="leading-loose ">
        <textarea
          id="ingredients"
          className="w-full p-2 border-y-2 border-gray-300 mb-4"
          value={ingredientsList}
          onChange={(e) => setIngredientsList(e.target.value)}
          rows={10}
          cols={40}
          required
        />
      </div>

      <label className="pl-4">
        Original Servings:
        <input
          className="ml-8 text-center placeholder-center border-gray-300 border-2 rounded-xl"
          type="number"
          placeholder="Enter original servings"
          value={originalServings}
          onChange={(e) => setOriginalServings(parseInt(e.target.value))}
          min={1}
          required
        />
      </label>
      <br />
      <label className="pl-4">
        Desired Servings:
        <input
          type="number"
          className="ml-8 text-center placeholder-center border-gray-300 border-2 rounded-xl"
          placeholder="Enter desired servings"
          value={desiredServings}
          onChange={(e) => setDesiredServings(parseInt(e.target.value))}
          min={1}
          required
        />
      </label>
      <br />
      <button
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        type="submit"
      >
        Adjust Quantities
      </button>
    </form>
  );
};

export default IngredientsForm;
