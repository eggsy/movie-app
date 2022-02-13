import { useState } from "react";
import { motion } from "framer-motion";

export const Select: React.FC<{
  value?: string;
  placeholder?: string;
  options: string[];
  updateValue: (newValue: string) => void;
}> = ({ value, placeholder, options, updateValue }) => {
  const [isVisible, setVisible] = useState(false);

  return (
    <div
      className={`relative w-full px-8 py-2 text-center transition-colors bg-gray-200 rounded-md cursor-pointer select-none
      ${isVisible ? "bg-gray-300" : "hover:bg-gray-300"} `}
      onClick={() => setVisible((prev) => !prev)}
    >
      <span>{value || placeholder}</span>

      {isVisible && (
        <motion.div
          initial={{
            opacity: 0,
            y: "20%",
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.2,
              type: "tween",
            },
          }}
          className="absolute inset-x-0 z-10 py-2 mt-4 text-left bg-gray-200 rounded-md shadow-md"
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => updateValue(option)}
              className="w-full px-4 py-2 transition-colors hover:bg-gray-300"
            >
              {option}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Select;
