import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import classes from "../styles/TripDetailsPage.module.css"

const TripDetailsPage = () => {
  const { tripId } = useParams()
  const [trip, setTrip] = useState()
  const [newGrocery, setNewGrocery] = useState({ name: '', quantity: '', label: '' });
  const { fetchWithToken, userId } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trips/${tripId}`)
        if (response.ok) {
          const tripData = await response.json()
          setTrip(tripData)
        } else {
          console.log('Something went wrong')
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchTrip()
  }, [tripId])

//   const handleDelete = async () => {
//     try {
//       const response = await fetchWithToken(`/trips/${tripId}`, 'DELETE')
//       if (response.status === 204) {
//         navigate('/')
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

  const handleAddGrocery = async (event) => {
    event.preventDefault();

    try {
      const response = await fetchWithToken(`/groceryitems`, 'POST', newGrocery);

      if (response.status === 201) {
        
        const newGroceryItem = await response.json()
        console.log('Added grocery item:', newGroceryItem);
        navigate(`/trips/${tripId}`)
        setNewGrocery({ name: '', quantity: '', label: '' });
      } else {
        const errorData = await response.json();
      console.log('Failed to add grocery item:', errorData);
      }
    } catch (error) {
        console.log('Error adding grocery item:', error);
    }
  }

  const handleChange = (event) => {
    console.log('Handling change...');
    const { name, value } = event.target;
    console.log('Name:', name);
    console.log('Value:', value);
    setNewGrocery((prevGrocery) => ({ ...prevGrocery, [name]: value }));
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
          <p className={classes.groceryDetails}>Quantity: {grocery.quantity}</p>
          <p className={classes.groceryDetails}>Label: {grocery.label}</p>
        </div>
      ))
    ) : (
      <p>No groceries available.</p>
    )}
      
      {userId === trip.createdBy && (
        <div className={classes.buttonsContainer}>
          <button
          className={classes.deleteButton}
        //   onClick={() => handleDeleteGrocery(grocery._id)}
          >Delete</button>
          
          <Link
                className={classes.updateButton}
                // to={`/trips/${trip.id}/groceries/${grocery.id}/update`}
              > Update </Link>
               
             

          <form onSubmit={handleAddGrocery}>
            <h2>Add Grocery</h2>
            <label>
              Name:
              <input type="text" name="name" value={newGrocery.name} onChange={handleChange} />
            </label>
            <label>
              Quantity:
              <input type="text" name="quantity" value={newGrocery.quantity} onChange={handleChange} />
            </label>
            <label>
              Label:
              <input type="text" name="label" value={newGrocery.label} onChange={handleChange} />
            </label>
            <button type="submit">Add Grocery</button>
          </form>
        </div>
      )}
    </>
  ) : (
    <h2>Loading...</h2>
  );
};

export default TripDetailsPage;