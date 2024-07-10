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
          return parseInt(part) * ratio;
        } else if (part === "1/4" || part === "¼") {
          let n = 1 * ratio;
          const numerator = n % 4;
          const whole = Math.floor(n / 4);
          if (numerator === 0) {
            return `${whole}`;
          } else if (whole === 0) {
            return `${numerator}/4`;
          } else {
            return `${whole} ${numerator}/4`;
          }
        } else if (!isNaN(part)) {
        } else if (part === "3/4" || part === "¾") {
          let n = 3 * ratio;
          const numerator = n % 4;
          const whole = Math.floor(n / 4);
          if (numerator === 0) {
            return `${whole}`;
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
          } else if (whole === 0) {
            return `${numerator}/2`;
          } else {
            return `${whole} ${numerator}/2`;
          }
        } else if (part === "1/8" || part === "⅛") {
          let n = 1 * ratio;
          const numerator = n % 8;
          const whole = Math.floor(n / 8);
          if (numerator === 0) {
            return `${whole}`;
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
      return adjustedParts.join(" ");
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
      <div className="flex">
        <h1 className="w-100 mx-auto mt-4 mb-8 text-4xl font-bold">
          Recipe Adjuster
        </h1>
      </div>
      <div className="w-100 flex flex-col lg:flex-row">
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
