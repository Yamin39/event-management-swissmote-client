/* eslint-disable react/prop-types */
const Button = ({ children }) => {
  return <button className="bg-[#007bff] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#007bff]/90">{children}</button>;
};

export default Button;
