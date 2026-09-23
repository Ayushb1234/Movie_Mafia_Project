import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-shell">
          <Navbar />

          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />

              <Route
                path="/movie/:id"
                element={<MovieDetails />}
              />

              <Route
                path="/login"
                element={<Login />}
              />

              <Route
                path="/register"
                element={<Register />}
              />

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/movies/add"
                element={
                  <AdminRoute>
                    <AddMovie />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/movies/:id/edit"
                element={
                  <AdminRoute>
                    <EditMovie />
                  </AdminRoute>
                }
              />

              <Route
                path="*"
                element={
                  <div className="page-center">
                    <div className="empty-state">
                      <h2>404</h2>
                      <p>Page not found.</p>
                    </div>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;