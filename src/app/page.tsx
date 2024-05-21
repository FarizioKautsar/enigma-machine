"use client";
import Image from "next/image";
import AlphabetRotorSelect from "./components/AlphabetRotorSelect";
import { useForm } from "react-hook-form";
import LightUpKeyboard from "./components/LightUpKeyboard";
import { useState } from "react";
import Plugboard from "./components/Plugboard";
import { PlugboardType } from "./types/Plugboard";

export default function Home() {
  const { register, watch } = useForm();
  const [count, setCount] = useState(0);
  const [plugboard, setPlugboard] = useState<PlugboardType>({});

  const rotorA = watch("rotorA");
  const rotorB = watch("rotorB");
  const rotorC = watch("rotorC");

  console.log("rotorA", rotorA);
  console.log("rotorB", rotorB);
  console.log("rotorC", rotorC);

  function handleKeyUp() {
    setCount((prev) => prev + 1);
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
          <AlphabetRotorSelect {...register("rotorA")} defaultValue="a" />
          <AlphabetRotorSelect {...register("rotorB")} defaultValue="a" />
          <AlphabetRotorSelect {...register("rotorC")} defaultValue="a" />
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
