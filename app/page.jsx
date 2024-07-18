"use client";
import React, { useState, useRef, useEffect } from "react";
import IngredientsForm from "./components/IngredientsForm";
import IngredientsAdjuster from "./components/IngredientsAdjuster";
import Dropdown from "./components/Dropdown";
import { CSSTransition } from "react-transition-group";
import styles from "./css/Settings.module.css";

const App = () => {
  const [adjustedIngredients, setAdjustedIngredients] = useState([]);
  const adjusterRef = useRef(null); // Create a ref for IngredientsAdjuster
  const [selectedOption, setSelectedOption] = useState();
  const [settingOpen, setSettingOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState();
  const [petOrBoop, setPetOrBoop] = useState();

  useEffect(() => {
    // Retrieve the selected option from localStorage when the component mounts
    const storedOption = localStorage.getItem("selectedOption");
    if (storedOption) {
      setSelectedOption(storedOption);
    }
  }, []);

  const options = [
    { label: "Default", value: "default" },
    { label: "Cupcakes", value: "cupcakes" },
    { label: "Doughnuts", value: "doughnuts" },
    { label: "Cereal", value: "cereal" },
    { label: "Carrots", value: "carrots" },
    { label: "Tacos and Borgars", value: "tacos" },

    // Add more options as needed
  ];

  const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };

  const handleDropdownChange = (e) => {
    localStorage.setItem("selectedOption", e.target.value);
    setSelectedOption(e.target.value);
  };

  const setBackground = (option) => {
    switch (option) {
      case "default":
        return `url('/backgrounds/default.jpg')`;
      case "cupcakes":
        return `url('/backgrounds/cupcakes.jpg')`;
      case "doughnuts":
        return `url('/backgrounds/doughnuts.jpg')`;
      case "cereal":
        return `url('/backgrounds/cereal.jpg')`;
      case "carrots":
        return `url('/backgrounds/vegetables.jpg')`;
      case "tacos":
        return `url('/backgrounds/tacos_and_burgers.jpg')`;

      // Add more cases for each option
      default:
        return 'url("/path/to/default/image.jpg")';
    }
  };

  const backgroundStyle = {
    backgroundImage: setBackground(selectedOption),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    // Add more styling as needed
  };

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

      return result.join(" ");
    });

    const cleanIngredients = adjusted.map((ingredient) => {
      // Use regex to remove non-alphanumeric characters from the start of each ingredient
      return ingredient.replace(/^[^a-zA-Z0-9]+/, "");
    });

    setAdjustedIngredients(cleanIngredients);
  };

  useEffect(() => {
    // Scroll to IngredientsAdjuster component when adjustedIngredients updates
    if (adjusterRef.current) {
      adjusterRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [adjustedIngredients]);

  const timeoutIdRef = useRef(null);

  return (
    <>
      <div
        style={backgroundStyle}
        onClick={() => {
          if (settingOpen) {
            setSettingOpen(false);
          }
        }}
        className="flex flex-col w-full h-full"
      >
        <div className="flex justify-center bg-white opacity-90 lg:mb-6">
          <img
            onClick={() => {
              toggleSettings();
              setPetOrBoop("boop");
            }}
            onMouseEnter={() => {
              timeoutIdRef.current = setTimeout(() => {
                if (!settingOpen) {
                  toggleSettings();
                }
              }, 1200);
              setPetOrBoop("petting");
            }}
            onMouseOut={() => {
              if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
                timeoutIdRef.current = null;
              }
            }}
            src="./favicon.ico"
            className="w-20 cursor-pointer "
          />
          <h1 className="w-100  mt-6 mb-4 text-4xl font-bold ml-4 mr-6">
            Recipe Helper
          </h1>
        </div>
        <CSSTransition
          in={settingOpen}
          timeout={500}
          classNames={{
            enter: styles["modal-enter"],
            exit: styles["modal-exit"],
          }}
          unmountOnExit
        >
          <>
            <Dropdown
              selectedOption={selectedOption}
              options={options}
              onChange={handleDropdownChange}
              petOrBoop={petOrBoop}
              setPetOrBook={setPetOrBoop}
            />
          </>
        </CSSTransition>

        <div className="w-100 flex flex-col lg:px-40 ">
          <IngredientsForm
            onSubmit={handleFormSubmit}
            setCheckedItems={setCheckedItems}
          />
          {adjustedIngredients.length > 0 && (
            <div ref={adjusterRef}>
              <IngredientsAdjuster
                adjustedIngredients={adjustedIngredients}
                setAdjustedIngredients={setAdjustedIngredients}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
