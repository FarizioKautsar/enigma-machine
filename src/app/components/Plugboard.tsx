import React, { useState } from "react";
import { keys } from "./LightUpKeyboard";
import classNames from "classnames";
import { PlugboardType } from "../types/Plugboard";
import generateRandomColor from "../utils/generateRandomColor";

export default function Plugboard({
  onAddPlug,
  onRemovePlug,
  plugboard,
}: {
  onAddPlug?: (key1: string, key2: string, colorHex: string) => any;
  onRemovePlug?: (key: string) => any;
  plugboard: PlugboardType;
}) {
  const originKeys = Object.keys(plugboard);
  const targetKeys = Object.values(plugboard).map(({ target }) => target);
  const [selectedOriginKey, setSelectedOriginKey] = useState<string | null>(
    null
  );

  const [selectedColorHex, setSelectedColorHex] = useState<string>("");

  function handleChangeKey(targetKey: string) {
    const originKeyIdx = originKeys.findIndex(
      (k) => k === targetKey.toLowerCase()
    );
    const targetKeyIdx = targetKeys.findIndex(
      (k) => k === targetKey.toLowerCase()
    );
    const isOrigin = originKeyIdx >= 0 && targetKeyIdx < 0;
    const originKey = isOrigin ? targetKey : originKeys[targetKeyIdx];
    const isPlugged = originKeyIdx >= 0 || targetKeyIdx >= 0;
    if (isPlugged) {
      onRemovePlug && onRemovePlug(originKey);
    } else {
      setSelectedColorHex(generateRandomColor());
      if (selectedOriginKey === targetKey) {
        setSelectedOriginKey(null);
      } else {
        if (!selectedOriginKey) {
          setSelectedOriginKey(targetKey);
        } else {
          onAddPlug &&
            onAddPlug(selectedOriginKey, targetKey, selectedColorHex);
          setSelectedOriginKey(null);
        }
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
            const isOrigin = Boolean(plug);
            return (
              <button
                key={key}
                // disabled={isPlugged}
                style={{
                  backgroundColor:
                    color ||
                    (selectedOriginKey === key ? selectedColorHex : ""),
                }}
                className={classNames(
                  "transition-all relative",
                  "px-4 py-2 bgborder bg-gray-700 text-white rounded"
                )}
                onClick={() => handleChangeKey(key)}
              >
                {key}
                {isOrigin && (
                  <div className="w-[10px] h-[10px] absolute top-1 right-1 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
