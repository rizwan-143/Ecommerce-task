import { NavLink } from "react-router-dom"
import ProductsCard from "./productsCard"
import { CartContext } from "../../context/cartContext"
import { useContext, useState, useEffect } from "react"
function ProductsList({ currentProducts }) {
    const { dispatch } = useContext(CartContext);
    const [localProducts, setLocalProducts] = useState(
        localStorage.getItem('allProducts') ? JSON.parse(localStorage.getItem('allProducts')) : []
    )

    // here i have created the copy of products to manage stock on ui
    useEffect(() => {

        if (currentProducts.length > 0) {
            const saved = localStorage.getItem('allProducts')

            if (saved) {
                const savedProducts = JSON.parse(saved);
                const updatedVisibleProducts = currentProducts.map((p) => {
                    const savedProduct = savedProducts.find((sp) => sp.id === p.id)
                    return savedProduct || p
                });
                setLocalProducts(updatedVisibleProducts)
            } else {
                setLocalProducts(currentProducts)
            }
        }
    }, [currentProducts]);

    return (
        <>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 px-3 ">
                {
                    localProducts.map((item, index) => {
                        return (

                            <ProductsCard key={index}>
                                <div className="card flex flex-col py-5 
                                                    cursor-pointer shadow-lg rounded-2xl shadow-gray-300 p-3 overflow-hidden group">
                                    <div className="card-header relative group">
                                        <div className="absolute -right-full bg-gray-400 p-1 rounded-full
                                         text-white w-5 h-5 flex justify-center items-center transition-all duration-700 ease-in-out
                                              group-hover:right-2 "><NavLink to={`/products/${item.id}`} onClick={() => window.scrollTo({top : 0 , behavior : 'smmoth'})}>  <i className="ri-eye-line relative z-10"></i></NavLink></div>
                                        <div>
                                            {
                                                item.stock > 0 ? <p className="capitalize">in stock : <span>{item.stock}</span></p> :
                                                    <p className="text-red-600 font-bold capitalize">out of stock</p>
                                            }
                                        </div>
                                        <img src={item.thumbnail} alt="" className="w-fit object-cover transition-all duration-500 ease-in-out group-hover:scale-110" />
                                    </div>
                                    <div className="card-body">
                                        <h4>{item.title}</h4>
                                        <h6><span className="font-bold">Brand</span> : {item.brand}</h6>
                                        <h5 className="text-red-500 font-bold" >Price : ${item.price}</h5>
                                    </div>
                                    <div className="card-footer mt-2">

                                        <button onClick={() => {
                                            if (item.stock <= 0) {
                                                alert(`${item.title} is out of stock`)
                                                return;
                                            }
                                            const updatedProduct = localProducts.map((p) => p.id === item.id ? { ...p, stock: p.stock - 1 } : p);
                                            setLocalProducts(updatedProduct)

                                            // Update localStorage
                                            localStorage.setItem('allProducts', JSON.stringify(
                                                JSON.parse(localStorage.getItem('allProducts')).map(p =>
                                                    p.id === item.id ? { ...p, stock: p.stock - 1 } : p
                                                )
                                            ))

                                            dispatch({ type: 'ADD_TO_CART', payload: item })
                                        }}
                                            className={`bg-green-500 px-5 py-1 text-white capitalize rounded-2xl ${item.stock <= 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`} >add to cart</button>

                                    </div>
                                </div>

                            </ProductsCard>
                        )
                    })
                }

            </div>
        </>
    )
}

export default ProductsList