import { SupabaseProvider } from "./components/Context/SupabaseContext";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";

import LandingPage from "./components/Pages/LandingPage/LandingPage";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Login from "./components/Pages/LoginPage/LoginPage";
import Sign from "./components/Pages/SignUpPage/SignUpPage";
import Settings from "./components/Pages/Dashboard/Settings/Settings";
import MessageBoard from "./components/Pages/Dashboard/MessageBoard/MessageBoard";

function App() {
  return (
    <div className="App">
      <SupabaseProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <PublicRoute>
                    <LandingPage />
                  </PublicRoute>
                }
              />
              <Route path="dashboard" element={<Dashboard />}>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <MessageBoard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path="login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="signup"
                element={
                  <PublicRoute>
                    <Sign />
                  </PublicRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </SupabaseProvider>
    </div>
  );
}

export default App;
