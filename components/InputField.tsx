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
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
      placeholder={placeholder}
      required={required}
    />
  );
};
