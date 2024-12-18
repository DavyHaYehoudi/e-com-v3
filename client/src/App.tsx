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
import Identity from "./pages/customer/profile/Identity";
import Avatar from "./pages/customer/profile/Avatar";
import HomeDashboardCustomer from "@/pages/customer/HomeDashboardCustomer";
import TermsOfSalesDashboard from "./pages/customer/politique/vente/conditions-generales";
import LegalMentionsDashboard from "./pages/customer/politique/vente/mentions-legales";
import ShippingAndReturnsDashboard from "./pages/customer/politique/vente/livraisons-et-retours";
import PaymentsConditionsDashboard from "./pages/customer/politique/securite/paiements";
import PersonalsData from "./pages/customer/politique/securite/donnees-personnelles";
import ShippingAddress from "./pages/customer/addresses/ShippingAddress";
import BillingAddress from "./pages/customer/addresses/BillingAddress";
import OrdersListPage from "./pages/customer/orders/liste/OrdersListPage";
import RewardList from "./pages/customer/advantages/cashback/RewardList";
import CashbackHistoryPage from "./pages/customer/advantages/cashback/CashbackHistoryPage";
import GiftcardManual from "./pages/customer/advantages/giftcards/GiftcardManual";
import GiftcardListPage from "./pages/customer/advantages/giftcards/GiftcardListPage";
import GiftcardDetail from "./pages/customer/advantages/giftcards/GiftcardDetail";
import TrackingNumberPage from "./pages/customer/orders/actions/TrackingNumberPage";
import ContentOrderPage from "./pages/customer/orders/actions/orderDetail/ContentOrderPage";
import HomeDashboardAdmin from "./pages/admin/HomeDashboardAdmin";
import DashboardAdminLayout from "./layout/dashboards/admin/DashboardAdminLayout";
import CustomersPage from "./pages/admin/activity/customers/CustomersPage";
import OrdersPage from "./pages/admin/activity/OrdersPage";
import ProductCreate from "./pages/admin/catalogue/products/ProductCreate";
import CategoriesPage from "./pages/admin/catalogue/classifying/category/CategoriesPage";
import TagsPage from "./pages/admin/catalogue/classifying/tag/TagsPage";
import GiftcardsPage from "./pages/admin/advantages/giftcards/GiftcardsPage";
import GiftcardToOffer from "./pages/admin/activity/customers/GiftcardToOffer";
import PromocodesPage from "./pages/admin/advantages/promocodes/PromocodesPage";
import MarketingPage from "./pages/admin/marketing/MarketingPage";
import MarketingCreate from "./pages/admin/marketing/MarketingCreate";
import ReviewsPage from "./pages/admin/reviews/ReviewsPage";
import ProductsPageAdmin from "./pages/admin/catalogue/products/ProductsPageAdmin";
import CustomerSheet from "./pages/admin/activity/customers/CustomerSheet";
import CustomerHistory from "./pages/admin/activity/customers/CustomerHistory";
import ManageCashback from "./pages/admin/activity/customers/CashbackToOffer";
import LeaveReviewPage from "./pages/customer/orders/actions/LeaveReviewPage";
import GiftcardHistoryPage from "./pages/admin/advantages/giftcards/GiftcardHistoryPage";
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
                <Route
                  path="customer/tableau-de-bord"
                  element={<HomeDashboardCustomer />}
                />
                <Route
                  path="customer/tableau-de-bord/profil/identite"
                  element={<Identity />}
                />
                <Route
                  path="customer/tableau-de-bord/profil/avatar"
                  element={<Avatar />}
                />
                <Route
                  path="customer/tableau-de-bord/adresses/livraison"
                  element={<ShippingAddress />}
                />
                <Route
                  path="customer/tableau-de-bord/adresses/facturation"
                  element={<BillingAddress />}
                />
                <Route
                  path="customer/tableau-de-bord/commandes/liste"
                  element={<OrdersListPage />}
                />
                <Route
                  path="customer/tableau-de-bord/commandes/:orderId/livraison"
                  element={<TrackingNumberPage />}
                />
                <Route
                  path="customer/tableau-de-bord/commandes/:orderId/contenu"
                  element={<ContentOrderPage />}
                />
                <Route
                  path="customer/tableau-de-bord/commandes/:orderId/avis"
                  element={<LeaveReviewPage />}
                />
                <Route
                  path="customer/tableau-de-bord/avantages/cartes-cadeaux/emploi"
                  element={<GiftcardManual />}
                />
                <Route
                  path="customer/tableau-de-bord/avantages/cartes-cadeaux/liste"
                  element={<GiftcardListPage />}
                />
                <Route
                  path="customer/tableau-de-bord/avantages/cartes-cadeaux/:giftcardId"
                  element={<GiftcardDetail />}
                />
                <Route
                  path="customer/tableau-de-bord/avantages/cashback/fonctionnement"
                  element={<RewardList />}
                />
                <Route
                  path="customer/tableau-de-bord/avantages/cashback/historique"
                  element={<CashbackHistoryPage />}
                />
                <Route
                  path="customer/tableau-de-bord/politique/vente/conditions-generales"
                  element={<TermsOfSalesDashboard />}
                />
                <Route
                  path="customer/tableau-de-bord/politique/vente/mentions-legales"
                  element={<LegalMentionsDashboard />}
                />
                <Route
                  path="customer/tableau-de-bord/politique/vente/livraisons-et-retours"
                  element={<ShippingAndReturnsDashboard />}
                />
                <Route
                  path="customer/tableau-de-bord/politique/securite/paiements"
                  element={<PaymentsConditionsDashboard />}
                />
                <Route
                  path="customer/tableau-de-bord/politique/securite/donnees-personnelles"
                  element={<PersonalsData />}
                />
              </Route>
              {/* Layout principal pour l'admin */}
              <Route element={<DashboardAdminLayout />}>
                <Route
                  path="admin/tableau-de-bord"
                  element={<HomeDashboardAdmin />}
                ></Route>
                <Route
                  path="admin/tableau-de-bord/activite/clients/liste"
                  element={<CustomersPage />}
                ></Route>
                <Route
                  path="admin/tableau-de-bord/activite/clients/:customerId/fiche"
                  element={<CustomerSheet />}
                ></Route>
                <Route
                  path="admin/tableau-de-bord/activite/clients/:customerId/historique"
                  element={<CustomerHistory />}
                ></Route>
                <Route
                  path="admin/tableau-de-bord/activite/clients/:customerId/offrir-carte-cadeau"
                  element={<GiftcardToOffer />}
                ></Route>
                <Route
                  path="admin/tableau-de-bord/activite/clients/:customerId/offrir-cashback"
                  element={<ManageCashback />}
                ></Route>
                <Route
                  path="admin/tableau-de-bord/activite/commandes/liste"
                  element={<OrdersPage />}
                ></Route>
                <Route
                  path="admin/tableau-de-bord/catalogue/produits/liste"
                  element={<ProductsPageAdmin />}
                ></Route>
                <Route
                  path="admin/tableau-de-bord/catalogue/produits/ajouter"
                  element={<ProductCreate />}
                ></Route>
                <Route
                  path="admin/tableau-de-bord/catalogue/categories"
                  element={<CategoriesPage />}
                ></Route>
                <Route
                  path="admin/tableau-de-bord/catalogue/tags"
                  element={<TagsPage />}
                ></Route>
                <Route
                  path="admin/tableau-de-bord/avantages/cartes-cadeaux/liste"
                  element={<GiftcardsPage />}
                ></Route>
                <Route
                  path="admin/tableau-de-bord/avantages/cartes-cadeaux/:giftcardId"
                  element={<GiftcardHistoryPage />}
                ></Route>
                <Route
                  path="admin/tableau-de-bord/avantages/code-promo/liste"
                  element={<PromocodesPage />}
                ></Route>
                <Route
                  path="admin/tableau-de-bord/marketing/liste"
                  element={<MarketingPage />}
                ></Route>
                <Route
                  path="admin/tableau-de-bord/marketing/ajouter"
                  element={<MarketingCreate />}
                ></Route>
                <Route
                  path="admin/tableau-de-bord/retours/avis"
                  element={<ReviewsPage />}
                ></Route>
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
