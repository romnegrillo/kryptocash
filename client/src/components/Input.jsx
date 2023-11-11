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
      className="w-full my-2 rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );
};

export default Input;
