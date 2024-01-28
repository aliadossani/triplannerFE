import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "../styles/TripsPage.module.css"

function TripsPage() {
  const [trips, setTrips] = useState([]);

  const fetchTrips = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trips`);
      if (response.ok) {
        const tripData = await response.json();
        setTrips(tripData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div>
        {trips.map((trip) => (
          <Link key={trip._id} to={`/trips/${trip._id}`}>
            <div className={classes.tripCtn}>
              <img src={trip.image}/>
              <p>{trip.title}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default TripsPage;

