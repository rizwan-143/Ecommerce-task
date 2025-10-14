import { useEffect, useState } from "react"
import { fetchProducts } from "../apis/products"
import ProductsList from "./productsList"
import BeatLoader from "react-spinners/BeatLoader";
function Products() {

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)







    useEffect(() => {



        const getProducts = async () => {
            const savedProducts = localStorage.getItem('allProducts');
            if(savedProducts){
                setProducts(JSON.parse(savedProducts));
                setIsLoading(false)
                setIsError(false);
                return;
            }
            try {
                const data = await fetchProducts()
                console.log("API Response:", data);
                setTimeout(() => {
                    const allProducts = data.data.products;
                    setProducts(data.data.products)
                    setIsLoading(false);
                    setIsError(false)
                    localStorage.setItem('allProducts' , JSON.stringify(allProducts))
                }, 2000);
            } catch (error) {

                setIsError(true)
                setIsLoading(false)


            }
        }

        getProducts()

    }, [])

    useEffect(() => {
        console.log('products : ', products)
    }, [])


    if (isLoading) return <p><BeatLoader className="flex items-center my-5 text-center" size={15} margin={10} /></p>
    if (isError) return <p>something went wrong</p>

    const productsPerPage = 8;
    const totalPages = Math.ceil(products.length / productsPerPage);
    const indexOfLast = currentPage * productsPerPage
    const indexOfStart = indexOfLast - productsPerPage
    const currentProducts = products.slice(indexOfStart, indexOfLast)
    console.log('total pages : ', totalPages);


    return (
        <>
            <h3 className="font-bold text-[25px] uppercase my-5 pl-5">products</h3>
            <ProductsList currentProducts={currentProducts} />

            {/* here pagination */}
            <div className="my-5">
                <ul className="flex gap-3 justify-center">
                    {/* {
            
            [...Array(totalPages)].map((_ , index) => {
                return (
                    <li key={index} className={`px-3 py-1  rounded-lg cursor-pointer  ${currentPage === index + 1 ? 'bg-blue-300 text-white' : 'border border-x-gray-500'}`} onClick={() =>setCurrentPage(index + 1)} >{index + 1}</li>
                )
            })
        } */}

                    {
                        <div className="flex justify-center gap-4 items-center">
                            <button onClick={() => {
                                if (currentPage > 1) {
                                    setCurrentPage(currentPage - 1)
                                }
                            }}
                                className={`bg-blue-800 px-3 py-1 rounded-sm text-white text-center ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >prev</button>

                            <p> page {currentPage} of {totalPages}</p>

                            <button
                            className={`bg-blue-800 px-3 py-1 rounded-sm text-white text-center ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            onClick={() => {
                                if (currentPage < totalPages) {
                                    setCurrentPage(currentPage + 1)
                                }
                            }}>next</button>
                        </div>
                    }
                </ul>
            </div>
        </>
    )
}

export default Products