/* eslint-disable react/prop-types */
const Button = ({ children }) => {
  return <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 cursor-pointer">{children}</button>;
};

export default Button;
