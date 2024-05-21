"use client";
import AlphabetRotorSelect from "./components/AlphabetRotorSelect";
import { useFieldArray, useForm } from "react-hook-form";
import LightUpKeyboard from "./components/LightUpKeyboard";
import { useState } from "react";
import Plugboard from "./components/Plugboard";
import { PlugboardType } from "./types/Plugboard";
import Button from "./components/Button";

export default function Home() {
  const { register, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      rotors: [{ value: 0 }, { value: 0 }, { value: 0 }],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: "rotors",
  });
  const [plugboard, setPlugboard] = useState<PlugboardType>({});

  function handleAddRotor() {
    append({ value: 0 });
  }

  function handleIncrement() {
    const values = getValues('rotors').map((rotor) => rotor.value);

    // Increment the first rotor
    values[0] += 1;

    // Check for multiple of 26 and increment the next rotor
    for (let i = 0; i < values.length - 1; i++) {
      if (values[i] % 26 === 0 && values[i] !== 0) {
        values[i + 1] += 1;
        values[i] = 0; // Reset the current rotor
      } else {
        break;
      }
    }

    // Update the form values
    values.forEach((value, index) => {
      setValue(`rotors.${index}.value`, value);
    });
  }

  function handleKeyUp() {
    handleIncrement();
  }

  function handleAddPlug(
    originKey: string,
    targetKey: string,
    colorHex: string
  ) {
    setPlugboard((prev) => ({
      ...prev,
      [originKey.toLowerCase()]: {
        color: colorHex,
        target: targetKey.toLowerCase(),
      },
    }));
  }

  function handleRemovePlug(key: string) {
    setPlugboard((prev) => {
      const prevClone = { ...prev };
      delete prevClone[key.toLowerCase()];
      return prevClone;
    });
  }

  return (
    <main>
      <div className="container mx-auto">
        <div className="flex justify-center gap-4 mb-4">
          {fields.map((rotor, rIdx) => (
            <AlphabetRotorSelect
              key={rIdx}
              {...register(`rotors.${rIdx}.value`, { valueAsNumber: true })}
              value={watch(`rotors.${rIdx}.value`) % 26}
              defaultValue={"0"}
            />
          ))}
          <Button onClick={handleAddRotor}>+</Button>
        </div>
        <LightUpKeyboard onKeyUp={handleKeyUp} plugboard={plugboard} />
        <div className="mt-4"></div>
        <Plugboard
          onAddPlug={handleAddPlug}
          onRemovePlug={handleRemovePlug}
          plugboard={plugboard}
        />
      </div>
    </main>
  );
}
