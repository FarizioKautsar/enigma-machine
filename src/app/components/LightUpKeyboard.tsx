import classNames from "classnames";
import React, { useEffect, useState } from "react";

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export default function LightUpKeyboard() {
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setPressedKey(event.key);
    };

    const handleKeyUp = () => {
      setPressedKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-2">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-2">
          {row.map((key) => (
            <button
              key={key}
              className={classNames(
                "transition-all",
                "px-4 py-2 bgborder bg-gray-700 text-white rounded",
                pressedKey === key.toLowerCase() ? "bg-yellow-400 duration-0" : "duration-300"
              )}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
