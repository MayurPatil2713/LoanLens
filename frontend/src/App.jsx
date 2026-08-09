import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Comparison from "./pages/Comparison";
import Amortization from "./pages/Amortization";
import History from "./pages/History";
import Banks from "./pages/Banks";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <div className="container mt-4">

                <Routes>

                    <Route path="/" element={<Home />} />

                    <Route path="/calculator" element={<Calculator />} />

                    <Route path="/comparison" element={<Comparison />} />

                    <Route path="/amortization" element={<Amortization />} />

                    <Route path="/history" element={<History />} />

                    <Route path="/banks" element={<Banks />} />

                    <Route path="/about" element={<About />} />

                    <Route path="/contact" element={<Contact />} />

                </Routes>

            </div>

            <Footer />

        <ToastContainer
            position="top-right"
            autoClose={3000}
        />            

        </BrowserRouter>
    );
}

export default App;