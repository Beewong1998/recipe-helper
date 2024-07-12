import React from "react";

const Background = ({ selectedOption }) => {
  const setBackground = (option) => {
    switch (option) {
      case "option1":
        return 'url("/path/to/your/image1.jpg")';
      case "option2":
        return 'url("/path/to/your/image2.jpg")';
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

  return <div style={backgroundStyle}></div>;
};

export default Background;
