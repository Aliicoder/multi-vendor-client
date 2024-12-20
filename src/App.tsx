import { Route, Routes } from "react-router-dom"
import { lazy } from "react"
import PersistLoginMiddleware from "./components/middlewares/PersistLoginMiddleware";
import CategoryProductsPage from "./pages/private/CategoryProductsPage";
import ShopProductsPage from "./pages/private/ShopProductsPage";
import AddressesPage from "./pages/private/AddressesPage";
import LoadCartAndWishlistMiddleware from "./components/middlewares/LoadCartAndWishlistMiddleware";
const CartPage = lazy(() =>import("@/pages/private/CartPage"));
const LogInPage = lazy(()=>import("./pages/public/LogInPage"))
const SignUpPage = lazy(()=>import("./pages/public/SignUpPage"))
const HomePage = lazy(()=>import("./pages/private/HomePage"))
const CheckOutPage = lazy(()=>import("./pages/private/CheckOutPage"))
const ProductDetailsPage = lazy(()=>import("./pages/private/ProductDetailsPage"))
const WishListPage = lazy(()=>import("@/pages/private/WishListPage"));
const ProtectedRoutesMiddleware = lazy(()=>import("@/components/middlewares/ProtectedRoutes"));
const OrdersPage = lazy(()=>import("@/pages/private/OrdersPage"));
const SellersChatsLayout = lazy(()=>import("@/pages/layouts/SellersChatsLayout"));
const SellerChatPage = lazy(()=>import("@/pages/private/SellerChatPage"));
const MainLayout = lazy(()=>import("@/pages/layouts/MainLayout"));
const RootLayout = lazy(()=>import("@/pages/layouts/RootLayout"));
const AccountLayout = lazy(()=>import("@/pages/layouts/AccountLayout"));


function App() {
  return (
    <Routes>
      <Route element={<RootLayout/>}>
        <Route path="/login" element={<LogInPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route element={<PersistLoginMiddleware/>}>
        <Route element={<LoadCartAndWishlistMiddleware/>}>
        <Route element={<ProtectedRoutesMiddleware/>}>
        <Route path="/" >  
        <Route path="/home"  element={<MainLayout/>}  >
          <Route index element={<HomePage/>} />
          <Route path="products/:productId" element={<ProductDetailsPage/>} />
          <Route path="categories/:categoryId" element={<CategoryProductsPage/>} />
          <Route path="shops/:shopId" element={<ShopProductsPage/>} />
          <Route path="cart" element={<CartPage/>} />
          <Route path="cart/checkout" element={<CheckOutPage/>} />
          <Route path="account" element={<AccountLayout/>}>
            <Route path="orders" element={<OrdersPage/>} />
            <Route path="wishList" element={<WishListPage/>} />
            <Route path="addresses" element={<AddressesPage/>} />
            <Route path="sellersChats" element={<SellersChatsLayout/>}>
              <Route path=":chatId" element={<SellerChatPage/>} />
            </Route>
          </Route>
        </Route>
        </Route>
        </Route>
        </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App


