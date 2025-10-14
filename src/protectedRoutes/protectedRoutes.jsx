import { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userContext } from "../userContext/userContext";
import Header from "../components/header/header";
import SideBarCart from "../components/cart/sideBarCart";
import Footer from "../components/footer/footer";

function ProtectedRoutes() {
  const { state } = useContext(userContext);
  const [showSideCart, setShowSideCart] = useState(false);

  if (!state.isUserLogin) {
    return <Navigate to='/login' />;
  }

  function handleSideCart() {
    setShowSideCart(!showSideCart);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sidebar Cart */}
      <SideBarCart showSideCart={showSideCart} setShowSideCart={setShowSideCart} />

      {/* Header */}
      <Header handleSideCart={handleSideCart} />

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ProtectedRoutes;
