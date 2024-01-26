import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const TripDetailsPage = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState();
  const { fetchWithToken, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchTrip();
  }, [tripId]);

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

      {trip?.groceries?.length &&
        trip.groceries.map((grocery, index) => {
          return (
            <div key={index}>
              <p>{grocery.name}</p>
              <p>{grocery.quantity}</p>
              <p>{grocery.label}</p>
            </div>
          );
        })}

      {userId === trip.createdBy && (
        <>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
          <Link to={`/trips/${trip._id}/update`}>Update</Link>
        </>
      )}
    </>
  ) : (
    <h2>Loading...</h2>
  );
};

export default TripDetailsPage;
