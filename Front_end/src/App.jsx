import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import TourList from "./pages/TourList";
import TourDetail from "./pages/TourDetail";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours/domestic" element={<TourList />} />
          <Route path="/tour/:id" element={<TourDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
