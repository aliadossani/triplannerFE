import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import NewTripPage from "./pages/NewTripPage";
import TripDetailsPage from "./pages/TripDetailsPage";
import UpdateTripPage from "./pages/UpdateTripPage";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import TripsPage from "./pages/TripsPage";
import AboutUsPage from "./pages/AboutUsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import GenerateShoppingListPage from "./pages/GenerateShoppingListPage.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import ChatbotContainer from "./components/ChatbotContainer.jsx";

function App() {
  return (
    <div className="appContainer">
      <Navbar />
      <div className="routesContainer">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/user/:userId/update"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
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
                <TripDetailsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/trips/new"
            element={
              <PrivateRoute>
                <NewTripPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/trips/:tripId/update"
            element={
              <PrivateRoute>
                <UpdateTripPage />
              </PrivateRoute>
            }
          />
          <Route
            path="trips/:tripId/shoppinglist"
            element={<GenerateShoppingListPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
      <ChatbotContainer />
    </div>
  );
}

export default App;
