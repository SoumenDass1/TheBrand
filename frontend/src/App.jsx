import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';

import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

import Profile from './pages/Profile';

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/auth';

  return (
    <div className="app">
      {!hideNavbar && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />

          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      {!hideNavbar && <Footer />}
    </div>
  );
}

import { AppProvider } from './context/AppContext';

function App() {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
}

export default App;
