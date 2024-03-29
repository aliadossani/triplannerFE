import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { TextInput, Button, Container, Card, Image, Text } from "@mantine/core";
import classes from "../styles/UserProfile.module.css";

const UserProfile = () => {
  const { userId } = useParams();
  const [formData, setFormData] = useState({});
  const [trips, setTrips] = useState([]);
  const { fetchWithToken, setUserDetails } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile();
    getUserTripsCount();
  }, []);

  const getUserProfile = async () => {
    try {
      const response = await fetchWithToken(`/users/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        console.log("User Data:", userData);
        setFormData(userData);
      } else {
        alert("Couldn't fetch user");
        console.log("Something went wrong");
      }
    } catch (error) {
      alert("Couldn't fetch user: " + error);
      console.log(error);
    }
  };

  //Trip Count
  const getUserTripsCount = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/trips/user/${userId}`
      );
      if (response.ok) {
        const tripCountData = await response.json();
        console.log(tripCountData);
        setTrips(tripCountData);
      } else {
        alert("Couldn't fetch user trips count");
        console.log("Something went wrong");
      }
    } catch (error) {
      alert("Couldn't fetch user trips count: " + error);
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with formData:", formData);
    try {
      const response = await fetchWithToken(
        `/users/${userId}`,
        "PUT",
        formData
      );
      console.warn(response);
      if (response.ok) {
        // Navigate to Trips
        navigate("/trips");
        const userDetails = await response.json();
        setUserDetails(userDetails);
      } else {
        alert("Couldn't update user");
        console.log("Something went wrong");
      }
    } catch (error) {
      alert("Couldn't update user: " + error);
      console.log(error);
    }
  };

  return (
    <Container size="xs">
      <h1>User Profile</h1>

      <form onSubmit={handleFormSubmit} className={classes.formCtn}>
        <TextInput
          label="Username:"
          name="username"
          value={formData?.username}
          onChange={handleInputChange}
        />

        <TextInput
          label="User Image:"
          name="picture"
          value={formData?.picture}
          onChange={handleInputChange}
        />
        {formData?.picture && (
          <img
            key={formData.picture}
            className={classes.formImg}
            src={formData?.picture}
          />
        )}
        <Button mt="md" fullWidth type="submit">
          Save Changes
        </Button>
      </form>

      <h5>My trips ({trips.length})</h5>
      {trips.map((trip, index) => (
        <Card
          shadow="sm"
          padding="lg"
          mb="md"
          radius="md"
          withBorder
          key={index}
        >
          <Card.Section>
            <Link key={trip._id} to={`/trips/${trip._id}`}>
              <div className={classes.tripContainer}>
                <Text size="xl" fw={700} c="darkText">
                  {trip.title}
                </Text>
              </div>
            </Link>
          </Card.Section>
        </Card>
      ))}
    </Container>
  );
};

export default UserProfile;
