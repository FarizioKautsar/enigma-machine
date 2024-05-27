import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { PlugboardType } from "../types/Plugboard";
import { alphabet } from "./AlphabetRotorSelect";

export const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const keysArr = keys.flatMap((key) => key.map((l) => l.toLowerCase()));

// DISC CONFIGURATION
// examples:
// ["a", "b", "d", ...]
const rotorsDisc = [
  [...keys[0], ...keys[1], ...keys[2]],
  [...keys[1], ...keys[0], ...keys[2]],
  [...keys[2], ...keys[0], ...keys[1]],
  [...keys[1], ...keys[2], ...keys[0]],
];

export default function LightUpKeyboard({
  onKeyDown,
  onKeyUp,
  plugboard,
  rotorOffsets,
}: {
  onKeyDown?: (event?: KeyboardEvent) => any;
  onKeyUp?: () => any;
  plugboard: PlugboardType;
  rotorOffsets: number[];
}) {
  const originKeys = Object.keys(plugboard);
  const targetKeys = Object.values(plugboard).map(({ target }) => target);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const pressedKeyIdx = alphabet.findIndex(
    (k) => k.toLowerCase() === pressedKey
  );
  const rotorLetters = rotorOffsets.map((rotorOffset, rIdx) => {
    return rotorsDisc[rIdx][(pressedKeyIdx + rotorOffset) % 26];
  });

  const getOutput = () => {
    if (pressedKeyIdx >=0) {
      let nextLetter = rotorLetters[0];
      rotorLetters.forEach((rotorLetter, rIdx) => {
        const nextRotor = rotorsDisc[rIdx + 1];
        if (nextRotor) {
          const nextLetterIdx = alphabet.findIndex(
            (k) => k.toLowerCase() === rotorLetter
          );
          if (nextLetterIdx >= 0) {
            nextLetter =
              nextRotor[nextLetterIdx] ||
              nextLetter;
          }
        }
      });
      return nextLetter;
    }
  };
  const output = getOutput();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Applying the plug board
      const originKeyIdx = originKeys.findIndex((k) => k === event.key);
      const targetKeyIdx = targetKeys.findIndex((k) => k === event.key);
      const key = originKeys[targetKeyIdx] || targetKeys[originKeyIdx];
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
  }, [originKeys, targetKeys, onKeyDown, onKeyUp, plugboard]);

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
                output?.toLowerCase() === key.toLowerCase()
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
