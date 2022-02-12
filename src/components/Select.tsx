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
      className="relative w-full px-8 py-2 text-center transition-colors rounded-md cursor-pointer select-none bg-gray-200/40 hover:bg-gray-200/50"
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
          className="absolute inset-x-0 z-10 py-2 mt-4 text-left rounded-md bg-gray-200/40"
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => updateValue(option)}
              className="w-full px-4 py-2 transition-colors hover:bg-gray-200"
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
