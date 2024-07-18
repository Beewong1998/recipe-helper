import React, { useState } from "react";

const IngredientsAdjuster = ({
  adjustedIngredients,
  setAdjustedIngredients,
  checkedItems,
  setCheckedItems,
}) => {
  const startsWithNumber = (str) => {
    return /^\d/.test(str);
  };

  const startsWithLetter = (str) => {
    return /^[A-Za-z]/.test(str);
  };

  const handleToggle = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const handleInputChange = (index, event) => {
    const newIngredients = [...adjustedIngredients];
    newIngredients[index] = event.target.value;
    setAdjustedIngredients(newIngredients);
  };

  return (
    <div>
      <div className="pl-2 lg:border-0 rounded-t-xl font-bold text-2xl mt-4 bg-customRed ">
        Adjusted Ingredients
      </div>
      <ul className="w-full p-2 rounded-b-2xl mb-8 bg-white">
        {adjustedIngredients.map((ingredient, index) => {
          if (startsWithNumber(ingredient)) {
            return (
              <React.Fragment key={index}>
                <div
                  className="my-2 cursor-pointer w-full flex flex-row"
                  onClick={() => handleToggle(index)}
                >
                  <input
                    type="checkbox"
                    className="mr-2 cursor-pointer"
                    id={`checkbox-${index}`}
                    checked={checkedItems[index]}
                    onChange={() => handleToggle(index)}
                  />

                  <input
                    type="text"
                    value={adjustedIngredients[index]}
                    onChange={(e) => handleInputChange(index, e)}
                    onClick={(e) => e.stopPropagation()}
                    className={`cursor-pointer rounded px-2 focus:border-2 focus:border-customRed focus:outline-none transition duration-300 ease-in-out border-2 border-white w-full lg:w-2/4 ${
                      checkedItems[index] ? "line-through text-gray-400" : ""
                    }`}
                  />
                </div>
                {/* <li className="my-2 " key={index}>
                  {`\u2022 ${ingredient}`}
                </li> */}
                <div className="border-b-2 border-gray-100"></div>
              </React.Fragment>
            );
          } else if (ingredient.length === 0) {
            return (
              <li className="my-8 " key={index}>
                {" "}
              </li>
            );
          } else if (startsWithLetter(ingredient)) {
            return (
              <div
                key={index}
                className="my-2 cursor-pointer flex flex-row"
                onClick={() => handleToggle(index)}
              >
                <input
                  type="checkbox"
                  className="mr-2 cursor-pointer"
                  id={`checkbox-${index}`}
                  checked={checkedItems[index]}
                  onChange={() => handleToggle(index)}
                />

                <input
                  type="text"
                  value={adjustedIngredients[index]}
                  onChange={(e) => handleInputChange(index, e)}
                  onClick={(e) => e.stopPropagation()}
                  className={`cursor-pointer rounded px-2 text-xl font-bold focus:border-2 focus:border-customRed focus:outline-none transition duration-300 ease-in-out border-2 border-white w-full lg:w-2/4 ${
                    checkedItems[index] ? "line-through text-gray-400" : ""
                  }`}
                />
              </div>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default IngredientsAdjuster;
