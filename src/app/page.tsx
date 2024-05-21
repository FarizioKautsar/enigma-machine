"use client";
import Image from "next/image";
import AlphabetRotorSelect from "./components/AlphabetRotorSelect";
import { useForm } from "react-hook-form";
import LightUpKeyboard from "./components/LightUpKeyboard";
import { useState } from "react";
import Plugboard from "./components/Plugboard";
import { PlugboardType } from "./types/Plugboard";

export default function Home() {
  const { register } = useForm();
  const [count, setCount] = useState(0);
  const [plugboard, setPlugboard] = useState<PlugboardType>({});

  function handleKeyUp() {
    setCount((prev) => prev + 1);
  }

  function handleChangePlugboard(
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

  return (
    <main>
      <div className="container mx-auto">
        <div className="flex justify-center gap-4 mb-4">
          <AlphabetRotorSelect {...register("rotorA")} />
          <AlphabetRotorSelect {...register("rotorB")} />
          <AlphabetRotorSelect {...register("rotorC")} />
        </div>
        <LightUpKeyboard onKeyUp={handleKeyUp} plugboard={plugboard} />
        <div className="mt-4"></div>
        <Plugboard onChange={handleChangePlugboard} plugboard={plugboard}/>
      </div>
    </main>
  );
}
