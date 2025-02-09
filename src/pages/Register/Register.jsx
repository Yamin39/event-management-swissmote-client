import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoadingModal from "../../components/shared/LoadingModal/LoadingModal";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const axios = useAxios();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);

    axios
      .post("/auth/register", formData)
      .then((res) => {
        if (res.data.result?.insertedId) {
          console.log("Registration successful:", res.data);
          setIsLoading(false);
          localStorage.setItem("token", res.data.token);
          e.target.reset();
          toast.success("Registration successful");
          navigate("/");
        } else {
          setIsLoading(false);
          toast.error(res?.data?.result?.message);
          console.error("Registration failed:", res?.data?.result?.message);
        }
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        setIsLoading(false);
        toast.error("Registration failed, please try again");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {isLoading && <LoadingModal text="Creating account..." />}

      <div className="bg-gradient-to-b from-gray-50 to-blue-50 mb-20 flex items-center justify-center p-10 md:p-20 rounded-2xl">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-medium text-gray-900">Create an account</h1>
            <p className="mt-2 text-gray-600">Fill up the form to create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="text-sm text-gray-500">
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm text-gray-500">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="text-sm text-gray-500">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </form>

          <div className="text-sm text-center">
            <span className="text-gray-500">Have any account? </span>
            <Link to="/login" className="text-gray-900 hover:underline">
              Log in
            </Link>
            <div className="mt-2">
              <a href="#" className="text-gray-900 hover:underline">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
