import { Routes , Route } from "react-router-dom"
import Banner from "./components/banner/banner"
import Header from "./components/header/header"
import Products from "./components/products/products"
import ProductDetails from "./components/products/productDetails"
import Cart from "./components/cart/cart"
import About from "./components/about/about"
import NotFound from "./components/404/pageNotFound"
import Login from "./components/login/login"
import Register from "./components/register/register"
import ProtectedRoutes from "./protectedRoutes/protectedRoutes"
import PublicRoutes from "./publicRoutes/publicRoutes"
import SideBarCart from "./components/cart/sideBarCart"
import Contact from "./components/contact/contact"
function App(){
    return (
        <>
<Routes>
    <Route element = {<ProtectedRoutes/>} >
     <Route path="/" element = {<>
     {/* <Header/> */}

        <Banner/>
        <Products/>
    
    </>} />
    <Route path="/products" element = {<Products/>} />
    <Route path="/products/:id" element = {<ProductDetails/>} />
    <Route path="/cart" element = {<Cart/>} />
    <Route path="/about" element = {<About/>} />
    <Route path="/contact" element = {<Contact/>} />

    </Route>
    <Route element = {<PublicRoutes/>}>
        <Route path="/login" element = {<Login/>} />
    <Route path="/register" element = {<Register/>} />
    </Route>
    <Route path="*" element = {<NotFound/>} />
</Routes>
       
        </>
    )
}

export default App