import { useContext, useEffect, useState } from "react";
import { userContext } from "../../userContext/userContext";
import { BeatLoader } from "react-spinners";
import { NavLink } from "react-router-dom";

function Register() {


  const {state , dispatch} = useContext(userContext)
  const [isRegister , setIsRegister] = useState(false)


  function handleForm(e){
    e.preventDefault()

    const registerUser = {
      userName : e.target.registerName.value,
      userEmail : e.target.registerEmail.value,
      userPassword : e.target.registerPassword.value,
    }

    // here to check exists email
    const existsEmail = state.registeredUsers.find((user) => user.userEmail === registerUser.userEmail)
    if(existsEmail){
      alert('please provide another email')
      return
    };

    // check password length 
    if(registerUser.userPassword.length < 8) {
      alert('password can not be less then 8 ')
      return
    }

    setIsRegister(true)
    setTimeout(() => {
      dispatch({type : "REGISTER_USER" , payload : registerUser})
      setIsRegister(false)
      alert('registered successfully !')
      e.target.reset()
    }, 2000);

  }

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl my-5">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Register</h2>
        <form className="space-y-6" onSubmit={handleForm}>
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="registerName"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="registerEmail"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="registerPassword"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            {
              isRegister ? <BeatLoader color="#fff" size={8} /> : 'register'
            }
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?
          <span className="text-blue-600 hover:underline cursor-pointer">
            <NavLink to = '/login' >Login</NavLink>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
