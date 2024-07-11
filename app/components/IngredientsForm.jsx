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
      <div className="leading-loose ">
        <div className="pl-2 border-t-2 lg:border-0 border-gray-300 font-bold text-2xl mt-4  ">
          Ingredients
        </div>
        <textarea
          placeholder="Enter ingredients here that you want to adjust"
          id="ingredients"
          className="w-full pl-2 border-y-2 lg:border-2 lg:rounded-2xl border-gray-300 mb-4 "
          value={ingredientsList}
          onChange={(e) => setIngredientsList(e.target.value)}
          rows={14}
          cols={40}
          required
        />
      </div>
      <div className="flex">
        <label className="pl-2 w-60 ">Original Servings:</label>
        <input
          className="text-center placeholder-center border-gray-300 border-2 rounded-xl w-screen"
          type="number"
          placeholder="Enter original servings"
          value={originalServings}
          onChange={(e) => setOriginalServings(parseInt(e.target.value))}
          min={1}
          required
        />
      </div>

      <br />
      <div className="flex">
        <label className="pl-2 w-60">Desired Servings:</label>
        <input
          type="number"
          className=" text-center placeholder-center border-gray-300 border-2 rounded-xl w-screen"
          placeholder="Enter desired servings"
          value={desiredServings}
          onChange={(e) => setDesiredServings(parseInt(e.target.value))}
          min={1}
          required
        />
      </div>

      <br />
      <button
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        type="submit"
      >
        Adjust Quantities
      </button>
    </form>
  );
};

export default IngredientsForm;
