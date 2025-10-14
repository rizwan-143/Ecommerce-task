import { useContext, useEffect, useState } from "react"
import { fetchProducts } from "../apis/products"
import { NavLink, useParams } from "react-router-dom"
import ProductsCard from "./productsCard"
import './productDetails.css'
import { CartContext } from "../../context/cartContext"
import BeatLoader from "react-spinners/BeatLoader";

function ProductDetails() {

    const { dispatch } = useContext(CartContext)
    const [mainImg, setMainImg] = useState('')
    const [product, setProduct] = useState(
        localStorage.getItem('allProducts') ? JSON.parse(localStorage.getItem('allProducts')) : []
    )
    const { id } = useParams()
      useEffect(() => {
    const localData = localStorage.getItem('allProducts');
    if (localData) {
      setProduct(JSON.parse(localData));
    } else {
      const getProduct = async () => {
        try {
          const currentProduct = await fetchProducts();
          setProduct(currentProduct.data.products);
          localStorage.setItem('allProducts', JSON.stringify(currentProduct.data.products));
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      };
      getProduct();
    }
  }, [id]);

    const currentProduct = product.find((currentProduct) => currentProduct.id === +id)
    
    const relatedProducts = currentProduct ? product.filter((item) => item.category === currentProduct.category && item.id !== +id) : [];
    console.log("related products : ", relatedProducts);
    
    
    useEffect(() => {
        console.log('current product : ', currentProduct)
    }, [])
    
    useEffect(() => {
        if (currentProduct) setMainImg(currentProduct.thumbnail)
        }, [currentProduct])
        if(!currentProduct) return <p className="my-10 capitalize font-bold text-red-600 text-center">sorry product not found !</p>
    return (
        <>
            {currentProduct ? (
                <ProductsCard>
                    <div className="w-full flex justify-center px-4">

                        <div className="card  w-full flex flex-col lg:flex-row gap-5 p-4 items-center h-auto">
                            <div className="card-header flex flex-col items-start relative">

                                {/* main iamge */}
                                <img src={mainImg} className="w-80 h-80" alt="" />
                                {/* related images */}
                                <div className="">
                                    <ul className="flex gap-3">
                                        {
                                            currentProduct.images.map((img, index) => {
                                                return (
                                                    <li key={index} onClick={() => setMainImg(img)} ><img src={img} className="w-20 h-20 border border-gray-400  rounded-xl" alt="" /></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>


                            </div>
                            <div className="card-body flex flex-col justify-evenly h-full">
                                <p><span>sku </span> : {currentProduct.sku}</p>
                                <p><span>title</span> : {currentProduct.title}</p>
                                <p><span>brand</span> : {currentProduct.brand}</p>
                                <p><span>price</span> : {currentProduct.price}</p>
                                <p><span>discount</span> : {currentProduct.discountPercentage}%</p>
                                <p><span>discounted Price</span> : {(currentProduct.price * currentProduct.discountPercentage / 100).toFixed(2)}</p>
                                <p><span>return policy </span> : {currentProduct.returnPolicy}</p>
                                <p><span>shipping information  </span> : {currentProduct.shippingInformation}</p>
                                {/* <p><span>dimenstion </span> :
                                  {
                                    currentProduct.dimenstions.map((item) => {
                                        return (
                                            <>
                                            <p>{item}</p>
                                            </>
                                        )
                                    })
                                  }
                                  </p> */}
                                {
                                    currentProduct.stock > 0 ? <p><span>available stock :</span> : {currentProduct.stock}</p> : <p className="text-red-600 capitalize font-bold">out of stock</p>
                                }
                                <button onClick={() => {
                                    if (currentProduct.stock <= 0) {
                                        alert(`${currentProduct.title} is out of stock`)
                                        return
                                    }
                                    const updatedProduct = product.map((p) => p.id === currentProduct.id ? { ...p, stock: p.stock - 1 } : p);
                                    setProduct(updatedProduct)
                                    localStorage.setItem('allProducts' , JSON.stringify(updatedProduct))
                                    dispatch({ type: 'ADD_TO_CART', payload: currentProduct })
                                }}
                                    className={`bg-green-500 px-5 py-1 text-white capitalize rounded-2xl ${currentProduct.stock <= 0 ? 'cursor-not-allowed' : 'cursor-auto'}`}>add to cart</button>
                            </div>
                        </div>
                    </div>

                    {/* here goes product description */}
                    <div className="mt-5 px-4">
                        <h3 className="font-bold text-[30px] uppercase">product description</h3>
                        <p className="text-[12px]">{currentProduct.description}</p>
                    </div>


                    <ProductsCard>
                        <h3 className="font-bold uppercase text-[25px] pl-5 mt-5">you may also like</h3>
                        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 px-3 my-10 ">
                            {
                                relatedProducts?.map((item, index) => {
                                    return (

                                        <ProductsCard key={index}>
                                            <div className="card flex flex-col py-5 
                                                    cursor-pointer shadow-lg rounded-2xl shadow-gray-300 p-3 overflow-hidden group">
                                                <div className="card-header relative group">
                                                    <div className="absolute -right-full bg-gray-400 p-1 rounded-full
                                         text-white w-5 h-5 flex justify-center items-center transition-all duration-700 ease-in-out
                                              group-hover:right-2 "><NavLink to={`/products/${item.id}`} >  <i className="ri-eye-line relative z-10"></i></NavLink></div>
                                                    <img src={item.thumbnail} alt="" className="w-fit object-cover transition-all duration-500 ease-in-out group-hover:scale-110" />
                                                    {
                                                        item.stock > 0 ? <p className="capitalize absolute top-2">in stock : <span>{item.stock}</span></p> :
                                                            <p className="text-red-600 font-bold capitalize absolute top-2">out of stock</p>
                                                    }
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
                                                            return
                                                        }

                                                        const updatedProducts = product.map((p) =>
                                                            p.id === item.id ? { ...p, stock: p.stock - 1 } : p
                                                        );
                                                        setProduct(updatedProducts);
                                                        localStorage.setItem('allProducts' , JSON.stringify(updatedProducts))
                                                        dispatch({ type: 'ADD_TO_CART', payload: item })
                                                    }}
                                                        className={`bg-green-500 px-5 py-1 text-white capitalize rounded-2xl ${item.stock <= 0 ? 'cursor-not-allowed' : 'cursor-auto'} `}>add to cart</button>

                                                </div>
                                            </div>
                                        </ProductsCard>
                                    )
                                })
                            }

                        </div>

                    </ProductsCard>
                </ProductsCard>
            ) : (
                <p><BeatLoader className="flex items-center my-5 text-center" size={15} margin={10} /></p>
            )}
        </>
    )
}

export default ProductDetails