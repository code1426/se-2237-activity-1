import type React from "react";
import ColorSwatch from "./ColorSwatch";
import "../styles/Palette.css";

interface PaletteProps {
  colors: string[];
  onColorClick: (color: string) => void;
}

const Palette: React.FC<PaletteProps> = ({ colors, onColorClick }) => {
  return (
    <div className="palette">
      {colors.map((color, index) => (
        <ColorSwatch
          key={index}
          color={color}
          onClick={() => onColorClick(color)}
        />
      ))}
    </div>
  );
};

export default Palette;
