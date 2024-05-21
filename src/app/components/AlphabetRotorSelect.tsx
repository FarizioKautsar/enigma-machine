import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

export default function AlphabetRotorSelect({
  ...rest
}: {} & UseFormRegisterReturn) {
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  return (
    <div>
      <select
        {...rest}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {alphabet.map((letter, aIdx) => (
          <option key={aIdx} value={letter}>
            {letter}
          </option>
        ))}
      </select>
    </div>
  );
}
