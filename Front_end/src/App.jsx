import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TourList from "./pages/TourList";
import TourDetail from "./pages/TourDetail";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<TourList />} />
          <Route path="/tour/:id" element={<TourDetail />} />
          <Route path="/tour/domestic" element={<TourList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
