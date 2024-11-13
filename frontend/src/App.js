import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "../src/components/Header";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import { useAuth } from "../src/provider/AuthProvider";
import "./index.css";
import Users from "../src/components/user/Users";
import ProfilePage from "./pages/Profile";
import MealForm from "../src/components/order/MealForm";
import MealList from "../src/components/order/MealList";
import ProtectedRoute from "../src/components/ProtectedRoute";
import ProtectedRouteAdminOnly from "../src/components/ProtectedRouteAdminOnly";
import Review from "../src/pages/Review";

const App = () => {
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
              <ProtectedRoute>
                <ProfilePage darkMode={darkMode} />
              </ProtectedRoute>
            }
          />

          {/* Users route (admin-only protected) */}
          <Route
            path="/users"
            element={
              <ProtectedRouteAdminOnly>
                <Users darkMode={darkMode} />
              </ProtectedRouteAdminOnly>
            }
          />

          {/* Meal List route (protected) */}
          <Route
            path="/meals"
            element={
              <ProtectedRoute>
                <MealList darkMode={darkMode} />
              </ProtectedRoute>
            }
          />

          {/* Meal Form route (protected) */}
          <Route
            path="/meals/:id"
            element={
              <ProtectedRoute>
                <MealForm darkMode={darkMode} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meals/new"
            element={
              <ProtectedRoute>
                <MealForm darkMode={darkMode} />
              </ProtectedRoute>
            }
          />

          {/* Review route (protected) */}
          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <Review darkMode={darkMode} />
              </ProtectedRoute>
            }
          />

          {/* Fallback route for 404 */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
