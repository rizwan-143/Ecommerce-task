import { useContext, useEffect, useRef } from "react"
import { CartContext } from "../../context/cartContext"
import { userContext } from "../../userContext/userContext"

function SideBarCart({showSideCart , setShowSideCart}) {
    const { state, dispatch } = useContext(CartContext)
    const { state: userState, dispatch: userDispatch } = useContext(userContext)

    const sideBarCartRef = useRef()


    const currentUserItems = state.cartProducts.filter((item) => item.userEmail === userState.loginUserData?.userEmail)

    useEffect(() => {
        console.log('side bar cart items : ', currentUserItems);

    }, [])

    const cartTotal = currentUserItems.reduce((acc , item) => acc + item.price * item.quantity , 0)


    useEffect(() => {

        function handleSideCart (e) {
            if(sideBarCartRef.current && !sideBarCartRef.current.contains(e.target)){
            setShowSideCart(false)
        }
        }

        document.addEventListener('mousedown' , handleSideCart )


       return () => document.removeEventListener('mousedown' , handleSideCart)
    }, [])

    return (
        <>
           <div ref={sideBarCartRef}
           className={`fixed top-0  -translate-x-full  h-screen bg-white text-black
            z-50 flex flex-col right-0 transition-all duration-500
            ${showSideCart ? 'translate-x-0' : 'translate-x-full'}`}>
    <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold">My Cart</h2>
        <button onClick={() => setShowSideCart(!showSideCart)}
        className="w-6 h-6 bg-gray-400 rounded-full hover:bg-gray-500
         text-white transition-all duration-300 ease-in-out">
            <i class="ri-close-line"></i>
         </button>
    </div>
    <ul className="gap-4 overflow-y-auto divide-y divide-gray-400 p-6">
        <li><button onClick={() => dispatch({type : 'CLEAR_CART'})}
         className={`bg-red-400 px-5 py-1 rounded-lg text-white capitalize my-3 hover:bg-red-600 transition-all duration-500 ${currentUserItems.length > 0 ? '' : 'hidden'}`}>clear cart</button></li>
        {currentUserItems.map((item) => (
            <li key={item.id} className=" flex flex-col items-center py-5  gap-4 mb-4 shadow-sm shadow-gray-300">
                <div className="relative w-full flex items-center justify-center">
                    <img src={item.thumbnail} className="w-20 h-20" alt={item.title} />
                    {/* <p className="absolute top-1 text-center right-5  w-6 h-6 text-[12px] bg-red-400 p-1 rounded-full text-white">{item.stock - item.quantity}</p> */}

                </div>
                <h4>{item.title}</h4>
                <h4 className="text-red-400">Price: ${(item.price * item.quantity).toFixed(2)}</h4>
                <div>
                    <button
                        className="bg-gray-200 px-2 py-1 rounded"
                        onClick={() => dispatch({ type: "DECREASE_QTY", payload: item })}
                    >
                        -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                        className="bg-gray-200 px-2 py-1 rounded"
                        onClick={() => {
                            // if(item.quantity >= item.stock){
                            //     alert(`${item.title} is out of stock`)
                            //     return
                            // }
                            dispatch({ type: "INCREASE_QTY", payload: item })
                        }}
                    >
                        +
                    </button>
                </div>
                <div>
                    <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item })}
                    >
                        Remove
                    </button>
                </div>
            </li>
        ))}
        <li>
            <h3 className="font-bold capitalize text-[20px]"><span>total items : </span>{currentUserItems.length}</h3>
        <h3 className="font-bold capitalize text-[20px]"><span>cart total : </span>${(cartTotal).toFixed(2)}</h3>
        </li>
    </ul>
</div>


        </>
    )
}

export default SideBarCart