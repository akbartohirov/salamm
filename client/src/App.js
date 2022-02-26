import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import useRoutes from "./hooks/useRoutes";
import Navbar from "./Components/Navbar";
import AuthContext from "./Context/AuthContext";
import Footer from "./Components/Footer";
import { useAuth } from "./hooks/useAuth";

function App() {
  const auth = useAuth();

  const { login, logout, token, userId, user, addProduct, orderViewer } = auth;

  const isAuthenticated = !!token;

  const routes = useRoutes(isAuthenticated, user, addProduct, orderViewer);

  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, isAuthenticated, user }}
    >
      <Router>
        <Navbar
          isAuthenticated={isAuthenticated}
          isAdmin={user}
          addProduct={addProduct}
          orderViewer={orderViewer}
        />
        <main>{routes}</main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
