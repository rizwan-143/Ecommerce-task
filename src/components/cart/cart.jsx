import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/cartContext";
import { userContext } from "../../userContext/userContext";
import SideBarCart from "./sideBarCart";
function Cart() {
  const { state, dispatch } = useContext(CartContext)
  const { state: userState, dispatch: userDispatch } = useContext(userContext);


  useEffect(() => {
    console.log('cart products : ' , state.cartProducts);
    
  } , [state])


  const currentUserItems = state.cartProducts.filter((item) => item.userEmail === userState?.loginUserData?.userEmail)


const cartTotal = currentUserItems.reduce((acc, item) => acc + item.price * item.quantity , 0)
  return (
    <>
    <div className="p-4">
     
     <div className="flex justify-between items-center">
       <h1 className="text-2xl font-bold mb-4">My Cart</h1>
       <button onClick={() => dispatch({type : 'CLEAR_CART'})}
         className={`bg-red-400 px-5  py-1 rounded-lg text-white capitalize hover:bg-red-600 relative z-30 right-20  transition-all duration-500 ${currentUserItems.length > 0 ? '' : 'hidden'} `}>clear cart</button>
     </div>

      {currentUserItems && currentUserItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Price</th>
                {/* <th className="px-4 py-2">stock</th> */}
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUserItems.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 relative">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">${(item.price * item.quantity).toFixed(2)}</td>
                  {/* <td className="px-4 py-2">{item.stock  - item.quantity} </td> */}
                  <td className="px-4 py-2 flex justify-center items-center gap-2">
                    <button
                      className="bg-gray-200 px-2 py-1 rounded"
                      onClick={() => dispatch({type : "DECREASE_QTY" , payload : item})}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="bg-gray-200 px-2 py-1 rounded"
                      onClick={() => {
                        // if(item.quantity >= item.stock){
                        //   alert(`${item.title} is out of stock`)
                        //   return
                        // }
                         dispatch({type : "INCREASE_QTY" , payload : item})
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        dispatch({ type: "REMOVE_ITEM", payload: item })
                      }
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* <tfoot>
              <tr className="font-bold w-full flex justify-end border border-black">
                <td className="px-4 py-2 w-full flex justify-end border border-black" >
                  
                </td>
              </tr>
            </tfoot> */}
          </table>
          <div className="mt-5 flex flex-col items-end px-5 font-bold capitalize">
            <h5><span>cart items : </span>{currentUserItems.length}</h5>
            <h4><span>cart total : </span>$ {(cartTotal).toFixed(2)}</h4>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center text-[30px]">Your cart is empty!</p>
      )}
    </div>
      </>
  );
}

export default Cart;
