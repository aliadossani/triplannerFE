import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { AuthContext } from '../contexts/AuthContext'
import classes from "../styles/TripsPage.module.css"

function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [tripsFetched, setTripFetched] = useState(false);
  const navigate = useNavigate();
  const { fetchWithToken } = useContext(AuthContext)

  const fetchTrips = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trips`);
      if (response.ok) {
        const tripData = await response.json();
        setTrips(tripData);
        setTripFetched(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);


  const handleDeleteTrip = async(event, tripId) => {
    event.preventDefault();
    try {
        const response = await fetchWithToken(
          `/trips/${tripId}`,
          "DELETE"
        );
        if (response.ok) {
          fetchTrips();
        } else {
          const errorData = await response.json();
          alert("Couldn't delete trips. Reason: " + errorData.message);
          console.log('Failed to delete trips:', errorData);
        }
      } catch (error) {
          alert("Couldn't delete trips" + error.message);
          console.log('Error delete trips. Reason: ', error);
      }
  }

  if(tripsFetched && !trips?.length) return (
    <>
      No Trips found
    </>
  )

  return (
    <div>
        <h1>All your trips</h1>
        {trips.map((trip) => (
          <Link key={trip._id} to={`/trips/${trip._id}`}>
            <div className={classes.headerContainer}>
                <div className={classes.tripImageContainer}>
                    <img src={trip.image} className={classes.tripImage}/>
                </div>
                <div className={classes.headerContent}>
                    <h3>{trip.title}</h3>
                    <h4>{trip.destination}</h4>
                </div>
                <div>
                    <IconEdit className={classes.ctaBtn} onClick={(event) => {
                      event.preventDefault();
                      navigate(`/trips/${trip._id}/update`)
                    }}  />
                    <IconTrash className={classes.ctaBtn} onClick={(event) => handleDeleteTrip(event, trip._id)}  />
                </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default TripsPage;

