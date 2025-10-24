import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Activities from "./pages/Activities";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); //evitando redireccion cuando user es null

  // leyndo user con useEffect
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false); 
  }, []);

  // Guardamos en el localStorage el use
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Al hacer logout remover parametros, user y token
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // status loading cuando user es null
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Cargando...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/activities" /> : <Login onLogin={handleLogin} />} // si ya hay user redirigir
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/activities" /> : <Register onRegistered={() => (window.location.href = "/login")} />} 
        />
        <Route //acceso cuando el user esta autenticado
          path="/activities"
          element={
            user ? (
              <Activities user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to={user ? "/activities" : "/login"} />} />
      </Routes>
    </Router>
  );
}