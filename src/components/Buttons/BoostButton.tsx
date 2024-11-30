import React from "react";

interface BoostButtonProps {
  progress: number; // Progress value (0 to 100)
  label: string; // Button label
  onClick?: () => void; // Optional click handler
}

export const BoostButton = ({ progress, label, onClick }: BoostButtonProps) => {
  // Clamp progress between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: "150px",
        height: "50px",
      }}
    >
      <button
        onClick={onClick}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          background: "var(--bg-red-500)",
          color: "white",
          border: "none",
          borderRadius: "16px",
          fontSize: "16px",
          cursor: "pointer",
          outline: "none",
        }}
      >
        {label}
      </button>

      {/* Outer progress border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "25px",
          background: `conic-gradient(
            #4caf50 ${normalizedProgress}%, 
            #e0e0e0 ${normalizedProgress}% 100%
          )`,
          padding: "3px",
          zIndex: 0,
        }}
      ></div>

      {/* Inner overlay to create padding effect */}
      <div
        style={{
          position: "absolute",
          top: "3px",
          left: "3px",
          right: "3px",
          bottom: "3px",
          borderRadius: "25px",
          background: "white",
          zIndex: 0,
        }}
      ></div>
    </div>
  );
};
