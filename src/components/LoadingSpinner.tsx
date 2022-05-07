import React from "react";
import { BallTriangle } from "react-loader-spinner";

const LaodingSpinner = () => {
  return (
    <div className="loader">
      <BallTriangle
        height="100"
        width="100"
        color="green"
        ariaLabel="loading-indicator"
      />
    </div>
  );
};

export default LaodingSpinner;
