import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './components/auth/Login';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import User from './components/admin/User';
import ComptaDashboard from './pages/comptaDashboard/ComptaDashboard';
import GescomDashboard from './pages/gescomDashboard/GescomDashboard';
import store from './store/Store'; // Assurez-vous d'importer le store Redux
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/compta" element={<ComptaDashboard />} />
          <Route path="/gescom" element={<GescomDashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Failed to find the root element');
}