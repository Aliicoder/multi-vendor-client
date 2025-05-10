import { Route, Routes } from "react-router-dom";
import CategoryProductsPage from "./pages/private/CategoryProductsPage";
import ShopProductsPage from "./pages/private/ShopProductsPage";
import AddressesPage from "./pages/private/AddressesPage";
import ProductsPage from "./pages/private/ProductsPages";
import AISearchPage from "./pages/private/AISearchpage";
import LogInPage from "./pages/public/LogInPage";
import HomePage from "./pages/private/HomePage";
import OrdersPage from "./pages/private/OrdersPage";
import CheckOutPage from "./pages/private/CheckOutPage";
import SellersChatsLayout from "./pages/layouts/SellersChatsLayout";
import SellerChatPage from "./pages/private/SellerChatPage";
import AccountLayout from "./pages/layouts/AccountLayout";
import WishListPage from "./pages/private/WishListPage";
import ProductDetailsPage from "./pages/private/ProductDetailsPage";
import MainLayout from "./pages/layouts/MainLayout";
import TrackOrderPage from "./pages/private/TrackOrderPage";
import SignupPage from "./pages/public/SignupPage";
import PersistLoginMiddleware from "./pages/middlewares/PersistLoginMiddleware";
import LoadRequirements from "./pages/middlewares/LoadRequirementsMiddleware";
import ProtectedRoutesMiddleware from "./pages/middlewares/ProtectedRoutesMiddleware";
import CancelPayment from "./pages/private/CancelPayment";
import CompletePayment from "./pages/private/CompletePayment";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<PersistLoginMiddleware />}>
        <Route element={<LoadRequirements />}>
          <Route element={<ProtectedRoutesMiddleware />}>
            <Route path="/" element={<MainLayout />}>
              <Route path="complete-payment" element={<CompletePayment />} />
              <Route path="cancel-payment" element={<CancelPayment />} />
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="ai-search" element={<AISearchPage />} />
              <Route
                path="products/:productId"
                element={<ProductDetailsPage />}
              />
              <Route
                path="categories/:categoryId"
                element={<CategoryProductsPage />}
              />
              <Route path="shops/:shopName" element={<ShopProductsPage />} />
              <Route path="cart" element={<CheckOutPage />} />
              <Route path="account" element={<AccountLayout />}>
                <Route path="orders" element={<OrdersPage />} />
                <Route path="orders/:orderId" element={<TrackOrderPage />} />
                <Route path="wishList" element={<WishListPage />} />
                <Route path="addresses" element={<AddressesPage />} />
                <Route path="chats" element={<SellersChatsLayout />}>
                  <Route path=":chatId" element={<SellerChatPage />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
