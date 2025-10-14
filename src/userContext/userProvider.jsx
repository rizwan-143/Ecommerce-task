import { useEffect, useReducer, useState } from "react";
import { userContext } from "./userContext"
import { initialState, userReducer } from "./userReducer"
export const UserProvider = ({children}) => {
  const [state , dispatch] = useReducer(userReducer , initialState);

useEffect(() => {
  console.log( 'register user :' ,  state.registeredUsers);
  console.log( 'is user login : ' ,  state.isUserLogin);
  console.log('login user data : ' , state.loginUserData);
  localStorage.setItem("registeredUsers" , JSON.stringify(state.registeredUsers))
} , [state])

  return (
    <>

    <userContext.Provider value={{state , dispatch}}>
      {children}
    </userContext.Provider>
    
    </>
  )
}
export default UserProvider