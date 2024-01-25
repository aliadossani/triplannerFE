import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import NewTripPage from "./pages/NewTripPage";
import TripsDetailsPage from "./pages/TripsDetailsPage";
import UpdateTripPage from "./pages/UpdateTripPage";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import TripsPage from "./pages/TripsPage";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/trips"
          element={
            <PrivateRoute>
              <TripsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/trips/:tripId"
          element={
            <PrivateRoute>
              <TripsDetailsPage />
            </PrivateRoute>
          }
        />
        <Route path="/trips/new" element={<NewTripPage />} />
        <Route path="/trips/:tripId/update" element={<UpdateTripPage />} />
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
