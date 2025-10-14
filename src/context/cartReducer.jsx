const currentUser = localStorage.getItem('currentUserLogin') ? JSON.parse(localStorage.getItem("currentUserLogin")) : {};
export const initialState = {
    cartProducts : localStorage.getItem('currentUserItems') ? JSON.parse(localStorage.getItem('currentUserItems')) : [],
}

export const cartReducer = (state , action) => {
  switch (action.type) {
    case 'ADD_TO_CART':

    const existsItem = state.cartProducts.find((item) => item.id === action.payload.id && item.userEmail === currentUser.userEmail )
        if(existsItem){
            return {
                ...state ,
                cartProducts : state.cartProducts.map((item) => item.id === existsItem.id ? {...item , quantity : item.quantity + 1 , stock : item.stock - 1} : item),
                
            }
        }

        return {
            ...state ,
            cartProducts : [...state.cartProducts , {...action.payload , quantity : 1 , userEmail : currentUser.userEmail , stock : action.payload.stock - 1  }]
        }

        case 'REMOVE_ITEM' :

        return {
            ...state,
            cartProducts : state.cartProducts.filter((item) => item.id !== action.payload.id)
        }

        case "INCREASE_QTY" : 
        return {
            ...state,
            cartProducts : state.cartProducts.map((item) => item.id === action.payload.id ? {...item , quantity : item.quantity + 1} : item)
        }

        case "DECREASE_QTY" :
            return {
                ...state ,
                cartProducts : state.cartProducts.map((item) => item.id === action.payload.id ? {...item , quantity : item.quantity -1} : item).filter(item => item.quantity > 0)
            }

            case 'CLEAR_CART' :
                return {
                    ...state,
                    cartProducts : [],
                }
  
    default:
        return {...state};
  }
}