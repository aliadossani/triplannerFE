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
import appLogo from "./assets/applogo_color.png";

import ChatBot from 'react-simple-chatbot';

const Review = ({ steps}) => {
  console.warn(steps);
  return (
    <div style={{ width: '100%' }}>
      <h3>Summary</h3>
      {/* <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{name.value}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{gender.value}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{age.value}</td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      
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
      <ChatBot
        botAvatar={appLogo}
        floatingIcon={appLogo}
        floating={true}
        floatingStyle={{
          background: "aqua",
        }}
        bubbleStyle={{
          background: "aqua",
          color: "black"
        }}
        headerTitle={"Plan your trip with us!"}
        steps={[
          {
            id: '0',
            message: 'Are you planning a trip?',
            trigger: "1",
          },
          {
            id: '1',
            options: [
              { value: 'yes', label: 'Yes', trigger: '2' },
              { value: 'no', label: 'No', trigger: 'end-message-reject' },
            ],
          },
          {
            id: '2',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Nice! ',
            trigger: '4',
          },
          {
            id: '4',
            user: true,
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Review />,
            asMessage: true,
            trigger: 'end-message',
          },
          {
            id: 'end-message-reject',
            message: 'Have a nice day!',
            end: true,
          },
          {
            id: 'end-message',
            message: 'Have a nice trip!',
            end: true,
          },
        ]}
      />
      <hr />
      <Footer />
    </>
  );
}

export default App;
