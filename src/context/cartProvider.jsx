import { useContext, useEffect, useReducer } from "react"
import { CartContext } from "./cartContext"
import { cartReducer, initialState } from "./cartReducer"
export const CartProvider  = ({children}) => {
    const [state , dispatch] = useReducer(cartReducer , initialState)

    useEffect(() => {
        localStorage.setItem('currentUserItems' , JSON.stringify(state.cartProducts))
    } , [state.cartProducts])
    return (
        <>
        <CartContext.Provider value={{state , dispatch}} >
            {children}
        </CartContext.Provider>
        </>
    )
}