import { useContext, useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import { CartContext } from "../../context/cartContext"
import { userContext } from "../../userContext/userContext"
import './header.css'
function Header({handleSideCart}) {
    const { state } = useContext(CartContext)
    const { state: UserState , dispatch : userDispatch } = useContext(userContext)
    const [isMobileView, setIsMobileView] = useState(true)
    const menuRef = useRef(null)
    const humgergerRef = useRef(null)

    const currentuser = localStorage.getItem('currentUserLogin') ? JSON.parse(localStorage.getItem('currentUserLogin')) : null

    useEffect(() => {
        const handleClick = (e) => {

            if (menuRef.current &&
                !menuRef.current.contains(e.target) &&
                humgergerRef.current &&
                !humgergerRef.current.contains(e.target)) {
                setIsMobileView(true)
            }
        }

        document.addEventListener("mousedown", handleClick)

        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, [])


    const cartCount = state.cartProducts.filter((item) => item.userEmail === currentuser?.userEmail)
    return (
        <>


            <header>
                <nav className="flex justify-between p-4 bg-gray-300">
                    {/* logo */}
                    <div className="">
                        <h2 className="capitalize font-bold" ><NavLink to='/'>shopping web</NavLink></h2>
                    </div>
                    {/* here humgerger */}
                    <div ref={humgergerRef} className="order-1 lg:hidden" onClick={() => setIsMobileView(!isMobileView)}>
                        <i className="ri-menu-fill"></i>
                    </div>

                    {/* nav menu */}
                    <div ref={menuRef} className={`absolute left-0 top-0 bg-gray-400 w-1/2  h-screen pt-5  flex  justify-center transition-all duration-500 z-30
                                  lg:static lg:h-auto lg:pt-0 lg:bg-transparent lg:-translate-x-0 lg:transition-none ${isMobileView ? "-translate-x-full" : "-translate-x-0"}`}>
                        <ul className="flex flex-col lg:flex-row gap-5  capitalize menu-links">
                            <li className="border-b-2 border-transparent hover:border-gray-500 transition-all duration-300" ><NavLink to='/products' >products</NavLink></li>
                            <li className="border-b-2 border-transparent hover:border-gray-500 transition-all duration-300"><NavLink to='/about' >about</NavLink></li>
                            <li className="border-b-2 border-transparent hover:border-gray-500 transition-all duration-300"><NavLink to='/contact'>contact</NavLink></li>
                        </ul>
                    </div>


                    {/* here user information */}
                    <div className="flex gap-3 items-center">
                        {/* cart icon */}
                        <div className="relative">
                            {
                                cartCount.length > 0 &&
                                <p className="absolute text-white -top-3 -right-4 p-1 rounded-full bg-gray-400 w-5 h-5 flex items-center justify-center"><span className="text-[12px]">{cartCount.length}</span></p>

                            }
                            <i class="ri-shopping-cart-2-line" onClick={() => handleSideCart()}></i>
                        </div>

                        {/* here user */}
                        <div className="relative">
                            <div className="group">
                                <i className="ri-user-line relative  "></i>
                                <ul className="absolute -left-14 z-40 rounded-lg divide-y divide-gray-400
                                          bg-gray-200 px-3 py-2  whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                                 <li><NavLink to='/cart'>cart</NavLink></li>
                                    <li onClick={() => {
                                        userDispatch({type : "LOGOUT"})
                                        localStorage.removeItem('currentUserLogin')
                                        window.location.reload()
                                    }}>log out</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

        </>
    )
}

export default Header