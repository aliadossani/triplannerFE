import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import classes from "../styles/TripDetailsPage.module.css";

const TripDetailsPage = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState();
  const [newGrocery, setNewGrocery] = useState({
    name: "",
    quantity: "",
    label: "",
  });
  const { fetchWithToken, userId } = useContext(AuthContext);
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
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, [tripId]);

  const handleAddGrocery = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        ...newGrocery,
        trip: trip._id,
      };
      const response = await fetchWithToken(`/groceryitems`, "POST", payload);
      if (response.ok) {
        await fetchTrip();
        setNewGrocery({ name: "", quantity: "", label: "" });
      } else {
        const errorData = await response.json();
        console.log("Failed to add grocery item:", errorData);
      }
    } catch (error) {
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
        console.log("Failed to delete grocery item:", errorData);
      }
    } catch (error) {
      console.log("Error delete grocery item:", error);
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setNewGrocery((prevGrocery) => ({ ...prevGrocery, [name]: value }));
  };

  const handleDelete = async () => {
    try {
      const response = await fetchWithToken(`/trips/${tripId}`, "DELETE");
      if (response.status === 204) {
        navigate("/trips");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return trip ? (
    <>
      <h1>Trip Details</h1>
      <p>{trip.title}</p>
      <p>{trip.image}</p>
      <p>{trip.destination}</p>

      {trip?.groceries?.length ? (
        trip.groceries.map((grocery, index) => (
          <div className={classes.groceryCard} key={index}>
            <p className={classes.groceryName}>{grocery.name}</p>
            <p className={classes.groceryDetails}>
              Quantity: {grocery.quantity}
            </p>
            <p className={classes.groceryDetails}>Label: {grocery.label}</p>
            <button onClick={() => handleDeleteGrocery(grocery._id)}>
              delete
            </button>
          </div>
        ))
      ) : (
        <p>No groceries available.</p>
      )}
      <form onSubmit={handleAddGrocery}>
        <h2>Add Grocery</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newGrocery.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Quantity:
          <input
            type="text"
            name="quantity"
            value={newGrocery.quantity}
            onChange={handleChange}
          />
        </label>
        <label>
          Label:
          <input
            type="text"
            name="label"
            value={newGrocery.label}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Grocery</button>
      </form>
      {userId === trip.createdBy && (
        <div className={classes.buttonsContainer}>
          <button
            className={classes.deleteButton}
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
          <Link to={`/trips/${trip._id}/update`}>Update</Link>
        </div>
      )}
    </>
  ) : (
    <h2>Loading...</h2>
  );
};

export default TripDetailsPage;
