import { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { AuthContext } from "../contexts/AuthContext";
import classes from "../styles/TripsPage.module.css";
import {
  Card,
  Image,
  Text,
  Input,
  Button,
  Container,
  Space,
} from "@mantine/core";

function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [tripsFetched, setTripFetched] = useState(false);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultsText, setSearchResultsText] = useState("");

  const navigate = useNavigate();
  const { fetchWithToken, userId } = useContext(AuthContext);

  const fetchTrips = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/trips/user/${userId}`
      );
      if (response.ok) {
        const tripData = await response.json();
        setTrips(tripData);
        setFilteredTrips(tripData);
        setTripFetched(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDeleteTrip = async (event, tripId) => {
    event.preventDefault();
    try {
      const response = await fetchWithToken(`/trips/${tripId}`, "DELETE");
      if (response.ok) {
        fetchTrips();
      } else {
        const errorData = await response.json();
        alert("Couldn't delete trips. Reason: " + errorData.message);
        console.log("Failed to delete trips:", errorData);
      }
    } catch (error) {
      alert("Couldn't delete trips" + error.message);
      console.log("Error delete trips. Reason: ", error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = trips.filter(
      (trip) =>
        trip.title.toLowerCase().includes(lowerCaseQuery) ||
        trip.destination.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredTrips(filtered);
    setSearchResultsText(`Results for "${searchQuery}"`);
    setSearchQuery("");
  };

  const handleReloadPage = () => {
    fetchTrips();
    setSearchResultsText("");
    navigate("/trips");
  };

  if ((tripsFetched && !trips?.length) || !filteredTrips?.length)
    return (
      <Container size="sm">
        <img
          className={classes.notFoundImg}
          src="https://img.freepik.com/free-vector/error-404-concept-landing-page_52683-19704.jpg?w=900&t=st=1706725413~exp=1706726013~hmac=dcc12fa798565fd7be30c19656ab3d648bf612262e17c44d1e7f6adbbfe45660"
        />
        <NavLink className={classes.notFound} to="/trips/new">
          <Button>Create Trip</Button>
        </NavLink>
      </Container>
    );

  return (
    <Container size="md">
      <Link to="/trips" className={classes.reloadLink}>
        <h1 onClick={handleReloadPage}>Your trips</h1>
      </Link>
      <form onSubmit={handleSearch} className={classes.searchContainer}>
        <Input
          placeholder="Search trips..."
          value={searchQuery}
          className={classes.searchInput}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
      {searchResultsText && <h2>{searchResultsText}</h2>}
      {filteredTrips.map((trip) => (
        <Link key={trip._id} to={`/trips/${trip._id}`}>
          <Card shadow="sm" padding="lg" mb="sm" mt="sm" radius="md" withBorder>
            <Card.Section>
              <Image src={trip.image} height={300} />
              <Text size="xl" fw={700} c="darkText">
                {trip.title}
              </Text>
              <Text mt="1rem" size="lg" fw={600} c="darkText">
                {trip.description}
              </Text>
              <Text mt="1rem" size="lg" fw={600} c="darkText">
                {trip.destination}
              </Text>
              <Space h="md" />
              <IconEdit
                onClick={(event) => {
                  event.preventDefault();
                  navigate(`/trips/${trip._id}/update`);
                }}
              />
              <IconTrash
                onClick={(event) => handleDeleteTrip(event, trip._id)}
              />
            </Card.Section>
          </Card>
        </Link>
      ))}
    </Container>
  );
}
export default TripsPage;
