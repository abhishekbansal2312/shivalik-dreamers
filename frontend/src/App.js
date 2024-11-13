import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "../src/components/Header"; // Ensure this path is correct
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
// import Register from "../src/pages/Register";
import { useAuth } from "../src/provider/AuthProvider"; // Ensure the path is correct
import "./index.css";
import Users from "../src/components/user/Users";
import ProfilePage from "./pages/Profile";

const App = () => {
  // Call useAuth and destructure values from it
  const { isAuthenticated, setIsAuthenticated, darkMode, setDarkMode } =
    useAuth();
  const location = useLocation();

  // Pages where we don't want the Header and Footer
  const noHeaderFooterRoutes = ["/login", "/register"];

  return (
    <div
      className={`flex flex-col min-h-screen ${darkMode ? "dark-mode" : ""}`}
    >
      {/* Conditionally render the Header */}
      {isAuthenticated && !noHeaderFooterRoutes.includes(location.pathname) && (
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      {/* Main content with routes */}
      <main className="flex-grow main-content">
        <Routes>
          {/* Home page (public) */}
          <Route
            path="/"
            element={
              <Home
                setIsAuthenticated={setIsAuthenticated}
                darkMode={darkMode}
              />
            }
          />

          {/* Login is a public route */}
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                darkMode={darkMode}
              />
            }
          />
          {/* Profile route (protected) */}
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <ProfilePage darkMode={darkMode} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />


          <Route path="/users" element={<Users darkMode={darkMode} />} />

          {/* Uncomment Register if needed */}
          {/* <Route path="/register" element={<Register darkMode={darkMode} />} /> */}

          {/* Protected routes example (uncomment if using) */}
          {/* <Route
            path="/protected"
            element={
              isAuthenticated ? (
                <ProtectedComponent />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          /> */}

          {/* Fallback route for 404 */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
