const Input = ({ type, placeholder, value, name, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      step="0.00001"
      onChange={(e) => {
        onChange(e, name);
      }}
      className="white-glassmorphism my-2 w-full rounded-lg border-none bg-transparent px-4 py-2 text-sm text-white outline-none"
    />
  );
};

export default Input;
