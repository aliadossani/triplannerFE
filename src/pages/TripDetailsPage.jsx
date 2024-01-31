import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AuthContext } from "../contexts/AuthContext";
import classes from "../styles/TripDetailsPage.module.css";
import GroceryList from "../components/GroceryList";
import ChangeGrocery from "../components/ChangeGrocery";
import ParticipantList from "../components/ParticipantList";

const TripDetailsPage = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState();
  const [grocery, setGrocery] = useState({});
  const [opened, { open, close }] = useDisclosure(false);
  const { fetchWithToken, userId } = useContext(AuthContext);
  const [groceryAdded, setGroceryAdded] = useState(false);
  const navigate = useNavigate();

  const fetchTrip = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/trips/${tripId}`
      );
      if (response.ok) {
        const tripData = await response.json();
        setTrip(tripData);
      } else {
        alert("Couldn't fetch Trips");
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, [tripId]);

  const handleAddGrocery = async (event, newGrocery) => {
    event.preventDefault();

    try {
      const payload = {
        ...newGrocery,
        trip: trip._id,
      };
      const response = await fetchWithToken(`/groceryitems`, "POST", payload);
      if (response.ok) {
        await fetchTrip();
        close();
      } else {
        const errorData = await response.json();
        alert("Couldn't add grocery item. Reason: " + errorData.message);
        console.log("Failed to add grocery item:", errorData);
      }
    } catch (error) {
      alert("Couldn't add grocery item. Reason: " + error.message);
      console.log("Error adding grocery item:", error);
    }
  };

  const handleDeleteGrocery = async (groceryId) => {
    try {
      const response = await fetchWithToken(
        `/groceryitems/${groceryId}`,
        "DELETE"
      );
      if (response.ok) {
        await fetchTrip();
      } else {
        const errorData = await response.json();
        alert("Couldn't delete grocery item. Reason: " + errorData.message);
        console.log("Failed to delete grocery item:", errorData);
      }
    } catch (error) {
      alert("Couldn't delete grocery item" + error.message);
      console.log("Error delete grocery item. Reason: ", error);
    }
  };

  const handleEditGroceryModal = async (grocery) => {
    setGrocery(grocery);
    open();
  };

  const handleEditGrocery = async (event, currentGrocery) => {
    event.preventDefault();
    try {
      const payload = {
        ...currentGrocery,
      };
      const response = await fetchWithToken(
        `/groceryitems/${grocery._id}`,
        "PUT",
        payload
      );
      if (response.ok) {
        await fetchTrip();
        close();
      } else {
        const errorData = await response.json();
        alert("Couldn't add grocery item. Reason: " + errorData.message);
        console.log("Failed to add grocery item:", errorData);
      }
    } catch (error) {
      alert("Couldn't add grocery item. Reason: " + error.message);
      console.log("Error adding grocery item:", error);
    }
  };

  const handleDeleteTrip = async (event) => {
    event.preventDefault();
    try {
      const response = await fetchWithToken(`/trips/${tripId}`, "DELETE");
      if (response.ok) {
        navigate("/trips");
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

  return trip ? (
    <>
      <div className={classes.headerContainer}>
        <div className={classes.tripImageContainer}>
          <img src={trip.image} className={classes.tripImage} />
        </div>
        <div className={classes.headerContent}>
          <h3>{trip.title}</h3>
          <h4>{trip.description}</h4>
          <h4>{trip.destination}</h4>
        </div>
        <div>
          <IconEdit
            className={classes.ctaBtn}
            onClick={() => navigate(`/trips/${tripId}/update`)}
          />
          <IconTrash className={classes.ctaBtn} onClick={handleDeleteTrip} />
        </div>
      </div>
      <ParticipantList trip={trip} />
      <GroceryList
        handleDeleteGrocery={handleDeleteGrocery}
        handleEditGroceryModal={handleEditGroceryModal}
        handleAddGrocery={handleAddGrocery}
        groceryAdded={groceryAdded}
        setGroceryAdded={setGroceryAdded}
      />

      <Modal
        opened={opened}
        title="Grocery Item"
        centered
        onClose={() => {
          close();
          setGrocery({});
        }}
      >
        <ChangeGrocery
          trip={trip}
          handleAddGrocery={handleAddGrocery}
          handleEditGrocery={handleEditGrocery}
          userId={userId}
          grocery={grocery}
          setGroceryAdded={setGroceryAdded}
        />
      </Modal>
      <Button mr="sm" onClick={open}>
        Add grocery
      </Button>
      <Button onClick={() => navigate(`/trips/${tripId}/shoppinglist`)}>
        Print the shopping list
      </Button>
    </>
  ) : (
    <h2>Loading...</h2>
  );
};

export default TripDetailsPage;
