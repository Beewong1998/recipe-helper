import React from "react";

const IngredientsAdjuster = ({ adjustedIngredients }) => {
  const cleanIngredients = adjustedIngredients.map((ingredient) => {
    // Use regex to remove non-alphanumeric characters from the start of each ingredient
    return ingredient.replace(/^[^a-zA-Z0-9]+/, "");
  });
  const startsWithNumber = (str) => {
    return /^\d/.test(str);
  };

  const startsWithCapitalLetter = (str) => {
    return /^[A-Z]/.test(str);
  };
  return (
    <div>
      <h2 className="mt-4 lg:mb-4 pl-1 underline">Adjusted Ingredients</h2>
      <ul className="w-full p-2 border-y-2 lg:border-2 lg:rounded-2xl border-gray-300 mb-8">
        {cleanIngredients.map((ingredient, index) => {
          if (startsWithNumber(ingredient)) {
            return (
              <li className="my-2 " key={index}>
                {`\u2022 ${ingredient}`}
              </li>
            );
          } else if (ingredient.length === 0) {
            return (
              <li className="my-8 " key={index}>
                {" "}
              </li>
            );
          } else if (startsWithCapitalLetter(ingredient)) {
            return (
              <li className="text-xl font-bold" key={index}>
                {ingredient}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default IngredientsAdjuster;
