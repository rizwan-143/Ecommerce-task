import { useContext, useState } from "react";
import { userContext } from "../../userContext/userContext";
import { NavLink } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function Login() {
  const { state, dispatch } = useContext(userContext);
  const [isLogin , setIsLogin] = useState(false)

  function handleForm(e) {
    e.preventDefault();

    const loginUser = {
      loginEmail: e.target.loginEmail.value,
      loginPassword: e.target.loginPassword.value,
    };

    const confirmLogin = state.registeredUsers.find(
      (user) =>
        user.userEmail === loginUser.loginEmail &&
        user.userPassword === loginUser.loginPassword
    );

    if (!confirmLogin) {
      alert("Invalid credentials");
      return;
    }

    setIsLogin(true)
    setTimeout(() => {
      dispatch({ type: "LOGIN_USER", payload: confirmLogin });
    localStorage.setItem("currentUserLogin", JSON.stringify(confirmLogin));
    setIsLogin(false)
    e.target.reset()
    }, 3000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl my-5">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Login
        </h2>
        <form className="space-y-6" onSubmit={handleForm}>
          <div className="relative">
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              name="loginEmail"
              placeholder="Enter your email"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <input
              type="password"
              name="loginPassword"
              placeholder="Enter your password"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            
            {
              isLogin  ? <BeatLoader color="#fff" size={8} /> : 'login'
            }
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer font-medium">
            <NavLink to = '/register' >Register</NavLink>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
