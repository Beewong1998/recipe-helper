import React, { useState } from "react";

const IngredientsAdjuster = ({ adjustedIngredients }) => {
  const cleanIngredients = adjustedIngredients.map((ingredient) => {
    // Use regex to remove non-alphanumeric characters from the start of each ingredient
    return ingredient.replace(/^[^a-zA-Z0-9]+/, "");
  });
  const startsWithNumber = (str) => {
    return /^\d/.test(str);
  };

  const startsWithLetter = (str) => {
    return /^[A-Za-z]/.test(str);
  };

  const [checkedItems, setCheckedItems] = useState(
    Array(cleanIngredients.length).fill(false)
  );

  const handleToggle = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <div>
      <div className="pl-2 border-t-2 lg:border-0 border-gray-300 font-bold text-2xl mt-4  ">
        Adjusted Ingredients
      </div>
      <ul className="w-full p-2 border-y-2 lg:border-2 lg:rounded-2xl border-gray-300 mb-8">
        {cleanIngredients.map((ingredient, index) => {
          if (startsWithNumber(ingredient)) {
            return (
              <>
                <div className="my-2 ">
                  <input
                    type="checkbox"
                    className="mr-2 cursor-pointer"
                    id={`checkbox-${index}`}
                    checked={checkedItems[index]}
                    onChange={() => handleToggle(index)}
                  />
                  <label
                    htmlFor={`checkbox-${index}`}
                    className={`
                      ${checkedItems[index] ? "line-through text-gray-400" : ""}
                      cursor-pointer`}
                  >
                    {ingredient}
                  </label>
                </div>
                {/* <li className="my-2 " key={index}>
                  {`\u2022 ${ingredient}`}
                </li> */}
                <div className="border-b-2 border-gray-100"></div>
              </>
            );
          } else if (ingredient.length === 0) {
            return (
              <li className="my-8 " key={index}>
                {" "}
              </li>
            );
          } else if (startsWithLetter(ingredient)) {
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
