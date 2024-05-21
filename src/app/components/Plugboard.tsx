import React, { useState } from "react";
import { keys } from "./LightUpKeyboard";
import classNames from "classnames";
import { PlugboardType } from "../types/Plugboard";
import generateRandomColor from "../utils/generateRandomColor";

export default function Plugboard({
  onChange,
  plugboard,
}: {
  onChange?: (key1: string, key2: string, colorHex: string) => any;
  plugboard: PlugboardType;
}) {
  const [selectedOriginKey, setSelectedOriginKey] = useState<string | null>(
    null
  );

  const [selectedColorHex, setSelectedColorHex] = useState<string>("");

  function handleChangeKey(targetKey: string) {
    setSelectedColorHex(generateRandomColor());
    if (selectedOriginKey === targetKey) {
      setSelectedOriginKey(null);
    } else {
      if (!selectedOriginKey) {
        setSelectedOriginKey(targetKey);
      } else {
        onChange && onChange(selectedOriginKey, targetKey, selectedColorHex);
        setSelectedOriginKey(null);
      }
    }
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-2">
          {row.map((key) => {
            const plug = plugboard[key.toLowerCase()];
            const targetColor = Object.values(plugboard).find(
              (p) => p.target.toLocaleLowerCase() === key.toLocaleLowerCase()
            )?.color;
            const color = plug?.color || targetColor;
            const isPlugged = Boolean(color);
            return (
              <button
                key={key}
                disabled={isPlugged}
                style={{
                  backgroundColor:
                    color ||
                    (selectedOriginKey === key ? selectedColorHex : ""),
                }}
                className={classNames(
                  "transition-all",
                  "px-4 py-2 bgborder bg-gray-700 text-white rounded"
                )}
                onClick={() => handleChangeKey(key)}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
