import { Routes, Route, BrowserRouter } from "react-router-dom";
import ReduxProvider from "./redux/store/provider";
// import { Toaster } from "../components/ui/sonner";
import { Toaster } from "@/components/ui/sonner";
function App() {
  return (
    <ReduxProvider>
      <BrowserRouter>
        {/* <div className="App">
          <Header />
          <Routes>
            <Route
              path="/admin/dashboard"
              element={
                <RequireAuthAdmin>
                  <AdminDashboard />
                </RequireAuthAdmin>
              }
            />
            <Route
              path="/"
              element={
                <InitConfigPage>
                  <Home />
                </InitConfigPage>
              }
            />
            <Route
              path="/account"
              element={
                <RequireAuthUser>
                  <AccountClient />
                </RequireAuthUser>
              }
            />
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/register" element={<Register />} />
            <Route
              path="/account/forgot-password"
              element={<ForgotPassword />}
            />
            <Route
              path="/account/verify-email-register/:token"
              element={<VerifyEmailRegister />}
            />
            <Route
              path="/account/reset-password/:token"
              element={<ResetPassword />}
            />
            <Route
              path="/cart"
              element={
                <InitConfigPage>
                  {" "}
                  <ShoppingCart />
                </InitConfigPage>
              }
            />
            <Route
              path="/cart/payment"
              element={
                <RequireAuthUser>
                  <InitConfigPage>
                    <PaymentCheckout />
                  </InitConfigPage>
                </RequireAuthUser>
              }
            />
            <Route
              path="/cart/payment/success"
              element={
                <RequireAuthUser>
                  <InitConfigPage>
                    <Success />
                  </InitConfigPage>
                </RequireAuthUser>
              }
            />
            <Route
              path="/menu-tab-collections"
              element={
                <InitConfigPage>
                  <Collections />
                </InitConfigPage>
              }
            />
            <Route
              path="/menu-tab-categories"
              element={
                <InitConfigPage>
                  <Categories />
                </InitConfigPage>
              }
            />
            <Route
              path="/menu-tab-collections/:collectionId"
              element={
                <InitConfigPage>
                  <MasterCollection />
                </InitConfigPage>
              }
            />
            <Route
              path="/menu-tab-categories/:categoryId"
              element={
                <InitConfigPage>
                  <MasterCategory />
                </InitConfigPage>
              }
            />
            <Route
              path="/master-product/:productId"
              element={
                <InitConfigPage>
                  <MasterProduct />
                </InitConfigPage>
              }
            />
            <Route
              path="/about"
              element={
                <InitConfigPage>
                  {" "}
                  <About />
                </InitConfigPage>
              }
            />
            <Route
              path="/tradition"
              element={
                <InitConfigPage>
                  {" "}
                  <Tradition />
                </InitConfigPage>
              }
            />
            <Route
              path="/contact"
              element={
                <InitConfigPage>
                  <Contact />
                </InitConfigPage>
              }
            />
            <Route
              path="/products"
              element={
                <InitConfigPage>
                  <AllProductsPage />
                </InitConfigPage>
              }
            />
            <Route
              path="/deliveries&returns"
              element={
                <InitConfigPage>
                  <Deliveries />
                </InitConfigPage>
              }
            />
            <Route
              path="/terms-of-sales"
              element={
                <InitConfigPage>
                  <TermsOfSales />
                </InitConfigPage>
              }
            />
            <Route
              path="/legal-notice"
              element={
                <InitConfigPage>
                  <LegalNotice />
                </InitConfigPage>
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div> */}
      </BrowserRouter>
      <Toaster />  
    </ReduxProvider> 
  );
}

export default App;
