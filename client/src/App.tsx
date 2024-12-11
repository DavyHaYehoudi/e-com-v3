import { Routes, Route, BrowserRouter } from "react-router-dom";
import ReduxProvider from "./redux/store/provider";
import { ThemeProvider } from "./components/modules/darkMode/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import VisitorLayout from "./layout/visitor/VisitorLayout";
import NotFound from "@/pages/notFound/NotFound";
import TraditionPage from "@/pages/tradition/TraditionPage";
import CreatricePage from "@/pages/creatrice/CreatricePage";
import ContactPage from "@/pages/contact/ContactPage";
import GiftcardPage from "@/pages/giftcard/GiftcardPage";
import HomePage from "./pages/home/HomePage";
import TermsOfSales from "./pages/legals/TermsOfSales";
import LegalMentions from "./pages/legals/LegalMentions";
import ShippingAndReturns from "./pages/legals/ShippingAndReturns";
import ProductsPage from "./pages/products/ProductsPage";
import MasterProduct from "./pages/product/MasterProduct";
import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/payment/PaymentCheckout";
import PaymentSuccess from "./pages/payment/SuccessPage";
import DashboardCustomerLayout from "./layout/dashboards/customer/DashboardCustomerLayout";
import Profile from "./pages/customer/profile/Profile";

function App() {
  return (
    <ThemeProvider>
      <ReduxProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              {/* Layout principal pour les visiteurs */}
              <Route element={<VisitorLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="produits" element={<ProductsPage />} />
                <Route path="produits/:productId" element={<MasterProduct />} />
                <Route path="creatrice" element={<CreatricePage />} />
                <Route path="tradition" element={<TraditionPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="carte-cadeau" element={<GiftcardPage />} />
                <Route path="panier" element={<CartPage />} />
                <Route path="payment/checkout" element={<CheckoutPage />} />
                <Route path="payment/success" element={<PaymentSuccess />} />
                <Route
                  path="conditions-generales-de-vente"
                  element={<TermsOfSales />}
                />
                <Route path="mentions-legales" element={<LegalMentions />} />
                <Route
                  path="livraison-et-retour"
                  element={<ShippingAndReturns />}
                />
              </Route>
              {/* Layout principal pour les clients */}
              <Route element={<DashboardCustomerLayout />}>
              <Route path="customer/tableau-de-bord/profil" element={<Profile />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
        <Toaster position="top-right" />
      </ReduxProvider>
    </ThemeProvider>
  );
}

export default App;
