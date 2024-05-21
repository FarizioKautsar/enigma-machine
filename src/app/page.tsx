'use client';
import Image from "next/image";
import AlphabetRotorSelect from "./components/AlphabetRotorSelect";
import { useForm } from "react-hook-form";
import LightUpKeyboard from "./components/LightUpKeyboard";

export default function Home() {
  const { register } = useForm();
  return (
    <main>
      <div className="container mx-auto">
        <div className="flex justify-center gap-4">
          <AlphabetRotorSelect {...register("rotorA")} />
          <AlphabetRotorSelect {...register("rotorB")} />
          <AlphabetRotorSelect {...register("rotorC")} />
        </div>
        <LightUpKeyboard/>
      </div>
    </main>
  );
}
