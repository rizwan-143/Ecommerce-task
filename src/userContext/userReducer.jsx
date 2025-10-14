
export const initialState = {
    registeredUsers : localStorage.getItem('registeredUsers') 
    ? JSON.parse(localStorage.getItem('registeredUsers')) : [],
    loginUserData : localStorage.getItem('currentUserLogin') ? JSON.parse(localStorage.getItem('currentUserLogin')) : null,
    isUserLogin : localStorage.getItem('currentUserLogin') ? true : false ,
};


export const userReducer = (state , action) => {
    switch (action.type) {
        case 'REGISTER_USER':
        return {
            ...state ,
            registeredUsers : [...state.registeredUsers , action.payload]
        }

        case "LOGIN_USER" :
            return {
                ...state ,
                isUserLogin : true,
                loginUserData : {...action.payload}
            }

            case "LOGOUT" :
                return {
                    ...state ,
                    loginUserData : null,
                    isUserLogin : false
                }
            
    
        default:
            return state;
     }
}