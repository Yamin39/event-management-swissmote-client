/* eslint-disable react/prop-types */
const Button = ({ children }) => {
  return <button className="bg-primary text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-primary/90">{children}</button>;
};

export default Button;
