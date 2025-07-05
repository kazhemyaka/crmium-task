import { type FC } from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button
      className="p-3 bg-sky-700 text-white rounded-lg shadow-md hover:bg-sky-800 transition-colors duration-300 cursor-pointer"
      {...(onClick ? { onClick } : {})}
      {...(disabled ? { disabled } : {})}
    >
      {label}
    </button>
  );
};

export default Button;
