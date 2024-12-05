import { Routes, Route, BrowserRouter } from "react-router-dom";
import ReduxProvider from "./redux/store/provider";
import { Toaster } from "@/components/ui/sonner";
import VisitorLayout from "./layout/visitor/VisitorLayout";
import TraditionPage from "./pages/tradition/Tradition";
import CreatricePage from "./pages/creatrice/Creatrice";
import NotFound from "./pages/notFound/NotFound";

function App() {
  return (
    <ReduxProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            {/* Layout principal pour les visiteurs */}
            <Route element={<VisitorLayout />}>
              <Route path="tradition" element={<TraditionPage />} />
              <Route path="creatrice" element={<CreatricePage />} />
            </Route>
            {/* Page non trouvée */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Toaster />
    </ReduxProvider>
  );
}

export default App;
