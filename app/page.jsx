"use client";
import React, { useState, useRef, useEffect } from "react";
import IngredientsForm from "./components/IngredientsForm";
import IngredientsAdjuster from "./components/IngredientsAdjuster";

const App = () => {
  const [adjustedIngredients, setAdjustedIngredients] = useState([]);
  const adjusterRef = useRef(null); // Create a ref for IngredientsAdjuster

  const handleFormSubmit = ({
    ingredientsList,
    originalServings,
    desiredServings,
  }) => {
    // Split the ingredients list into lines
    const lines = ingredientsList.split("\n");
    const cleanLines = lines.filter((line) => {
      return line !== "";
    });

    const ratio = desiredServings / originalServings;

    // Adjust quantities for each line
    const adjusted = cleanLines.map((line) => {
      const parts = line.match(/\d+(?:\.\d+)?(?:\/\d+)?|[^\s\d\/()]+|\S/g);
      const adjustedParts = parts.map((part) => {
        if (part === "") {
          return "";
        } else if (part === null) {
          return "";
        } else if (!isNaN(part)) {
          let number = parseInt(part) * ratio;
          number = Math.round(number * 4) / 4;
          return number;
        } else if (part === "1/4" || part === "¼") {
          let n = 1 * ratio;
          const numerator = n % 4;
          const whole = Math.floor(n / 4);
          if (numerator === 0) {
            return `${whole}`;
          } else if (numerator !== 0) {
            let top = 1;
            let denominator = Math.round(4 / numerator);
            if (top === denominator) {
              return "1";
            }

            return `${top}/${denominator}`;
          } else if (whole === 0) {
            return `${numerator}/4`;
          } else {
            return `${whole} ${numerator}/4`;
          }
        } else if (part === "3/4" || part === "¾") {
          let n = 3 * ratio;
          const numerator = n % 4;
          const whole = Math.floor(n / 4);
          if (numerator === 0) {
            return `${whole}`;
          } else if (numerator !== 0) {
            let top = 1;
            let denominator = Math.round(4 / numerator);
            if (top === denominator) {
              return "1";
            }

            return `${top}/${denominator}`;
          } else if (whole === 0) {
            return `${numerator}/4`;
          } else {
            return `${whole} ${numerator}/4`;
          }
        } else if (part === "1/3" || part === "⅓") {
          let n = 1 * ratio;
          const numerator = n % 3;
          const whole = Math.floor(n / 3);
          if (numerator === 0) {
            return `${whole}`;
          } else if (numerator !== 0) {
            let top = 1;
            let denominator = Math.round(3 / numerator);

            return `${top}/${denominator}`;
          } else if (whole === 0) {
            return `${numerator}/3`;
          } else {
            return `${whole} ${numerator}/3`;
          }
        } else if (part === "2/3" || part === "⅔") {
          let n = 2 * ratio;
          const numerator = n % 3;
          const whole = Math.floor(n / 3);
          if (numerator === 0) {
            return `${whole}`;
          } else if (numerator !== 0) {
            let top = 1;
            let denominator = Math.round(3 / numerator);

            return `${top}/${denominator}`;
          } else if (whole === 0) {
            return `${numerator}/3`;
          } else {
            return `${whole} ${numerator}/3`;
          }
        } else if (part === "1/2" || part === "½") {
          let n = 1 * ratio;
          const numerator = n % 2;
          const whole = Math.floor(n / 2);
          if (numerator === 0) {
            return `${whole}`;
          } else if (numerator !== 0) {
            let top = 1;
            let denominator = Math.round(2 / numerator);
            if (top === denominator) {
              return "1";
            }
            return `${top}/${denominator}`;
          }
        } else if (part === "1/8" || part === "⅛") {
          let n = 1 * ratio;
          const numerator = n % 8;
          const whole = Math.floor(n / 8);
          if (numerator === 0) {
            return `${whole}`;
          } else if (numerator !== 0) {
            let top = 1;
            let denominator = Math.round(8 / numerator);

            return `${top}/${denominator}`;
          } else if (whole === 0) {
            return `${numerator}/8`;
          } else {
            return `${whole} ${numerator}/8`;
          }
        } else {
          return part;
        }
      });
      console.log(adjustedParts);
      let result = [];
      for (let i = 0; i < adjustedParts.length; i++) {
        if (
          typeof adjustedParts[i] === "number" &&
          i + 1 < adjustedParts.length &&
          typeof adjustedParts[i + 1] === "string" &&
          !isNaN(adjustedParts[i + 1])
        ) {
          // If current element is a number and next element is a string containing digits
          let sumOfNumbers =
            adjustedParts[i] + parseInt(adjustedParts[i + 1], 10);
          result.push(sumOfNumbers);
          // Skip the next element since we have already processed it
          i++;
        } else {
          // Otherwise, just append the current element to the result array
          result.push(adjustedParts[i]);
        }
      }
      console.log(result);
      return result.join(" ");
    });

    setAdjustedIngredients(adjusted);
  };

  useEffect(() => {
    // Scroll to IngredientsAdjuster component when adjustedIngredients updates
    if (adjusterRef.current) {
      adjusterRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [adjustedIngredients]);

  return (
    <>
      <div className="flex p-2 justify-start lg:justify-center lg:mr-6 lg:mt-6">
        <img src="./favicon.ico" className="w-20" />
        <h1 className="w-100  mt-6 mb-4 text-4xl font-bold ml-4">
          Recipe Helper
        </h1>
      </div>
      <div className="w-100 flex flex-col lg:px-40 ">
        <IngredientsForm onSubmit={handleFormSubmit} />
        {adjustedIngredients.length > 0 && (
          <div ref={adjusterRef}>
            <IngredientsAdjuster adjustedIngredients={adjustedIngredients} />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
