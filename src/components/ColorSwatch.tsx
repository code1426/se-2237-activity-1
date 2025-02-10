import type React from "react";
import "../styles/ColorSwatch.css";

interface ColorSwatchProps {
  color: string;
  onClick: () => void;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, onClick }) => {
  return (
    <div
      className="color-swatch"
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  );
};

export default ColorSwatch;
