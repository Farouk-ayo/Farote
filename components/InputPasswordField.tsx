import {
  EyeClosedIcon,
  EyeOpenIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

interface InputPasswordFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

const InputPasswordField: React.FC<InputPasswordFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-ink-faint">
          <LockClosedIcon />
        </span>
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-xl border bg-paper/50 p-3 pl-10 text-ink placeholder:text-ink-faint transition-shadow focus:outline-none focus:ring-2 ${
            error
              ? "border-secondary focus:ring-secondary/30"
              : "border-line focus:border-tertiary focus:ring-tertiary/30"
          }`}
          placeholder={placeholder}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-ink-faint hover:text-ink focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
        </button>
      </div>
      {error && <p className="mt-1 ml-2 text-sm text-secondary">{error}</p>}
    </div>
  );
};

export default InputPasswordField;
