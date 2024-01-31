import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { AuthContext } from "../contexts/AuthContext";
import classes from "../styles/TripsPage.module.css";
import { Card, Image, Text, Input, Button, Container } from "@mantine/core";

function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [tripsFetched, setTripFetched] = useState(false);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultsText, setSearchResultsText] = useState("");

  const navigate = useNavigate();
  const { fetchWithToken } = useContext(AuthContext);

  const fetchTrips = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trips`);
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

  if (tripsFetched && !trips?.length) return <>No Trips found</>;

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
              <Text size="sm" c="dimmed">
                <h3>{trip.title}</h3>
                <h4>{trip.description}</h4>
                <h4>{trip.destination}</h4>
              </Text>
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
