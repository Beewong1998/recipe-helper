import React from "react";

const Dropdown = ({
  options,
  selectedOption,
  onChange,
  petOrBoop,
  setPetOrBook,
}) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute w-screen lg:px-40 h-52  bg-red-300 p-2"
    >
      <h2 className="border-2 rounded-xl p-2 bg-white lg:text-center">
        Thank you for {petOrBoop === "boop" ? "booping" : "petting"} me!
      </h2>
      <h2 className="border-2 rounded-xl p-2 mt-2 bg-white lg:text-center">
        As my gratitude, you can now change the background for the app, have
        fun!
      </h2>
      <div className=" flex flex-row justify-center mt-7 ">
        <select
          className="ml-2 rounded-xl w-60 text-center"
          onChange={onChange}
          value={selectedOption}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
