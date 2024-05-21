import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { PlugboardType } from "../types/Plugboard";

export const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export default function LightUpKeyboard({
  onKeyDown,
  onKeyUp,
  plugboard,
}: {
  onKeyDown?: (event?: KeyboardEvent) => any;
  onKeyUp?: () => any;
  plugboard: PlugboardType;
}) {
  const allOriginKeys = Object.keys(plugboard);
  const allTargetKeys = Object.values(plugboard).map(({ target }) => target);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const originKeyIdx = allOriginKeys.findIndex((k) => k === event.key)
      const targetKeyIdx = allTargetKeys.findIndex((k) => k === event.key)
      const key = allOriginKeys[targetKeyIdx] || allTargetKeys[originKeyIdx];
      setPressedKey(key || event.key);
      if (onKeyDown) onKeyDown(event);
    };

    const handleKeyUp = () => {
      setPressedKey(null);
      if (onKeyUp) onKeyUp();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [plugboard]);

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
                pressedKey?.toLowerCase() === key.toLowerCase()
                  ? "bg-yellow-400 duration-0"
                  : "duration-300"
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
