import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoadingModal from "../../components/shared/LoadingModal/LoadingModal";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const Login = () => {
  const { currentUser, profileLoader, setProfileLoader } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const axios = useAxios();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);

    axios
      .post("/auth/login", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.result?.isLogin) {
          toast.success("Login Successful");
          localStorage.setItem("token", res.data.token);
          e.target.reset();
          setProfileLoader(!profileLoader);
          navigate("/");
          setIsLoading(false);
        } else {
          toast.error(res?.data?.result?.message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setIsLoading(false);
        toast.error("Login failed, please try again");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <>
      {isLoading && <LoadingModal text={"Logging in..."} />}

      <div className="bg-gradient-to-b from-gray-50 to-blue-50 mb-20 flex items-center justify-center p-10 md:p-20 rounded-2xl">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-medium text-gray-900">Welcome back</h1>
            <p className="mt-2 text-gray-600">Please enter your details to login</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
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
                    minLength={6}
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
                <div className="flex justify-end mt-1">
                  <a href="#" className="text-sm text-gray-900 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            >
              Login
            </button>
          </form>

          <div className="text-sm text-center">
            <span className="text-gray-500">Don&apos;t have an account? </span>
            <Link to="/register" className="text-gray-900 hover:underline">
              Register
            </Link>
            <div className="mt-2">
              <Link to="" className="text-gray-900 hover:underline">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
