type InputFieldProps = {
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
};

export const InputField = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: InputFieldProps) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-line bg-paper/50 p-3 text-ink placeholder:text-ink-faint transition-shadow focus:border-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary/30"
      placeholder={placeholder}
      required={required}
    />
  );
};
