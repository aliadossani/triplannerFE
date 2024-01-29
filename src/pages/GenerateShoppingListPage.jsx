import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/GenerateShoppingListPage.module.css';

const GenerateShoppingListPage = () => {
  const [filteredGroceries, setFilteredGroceries] = useState([]);
  const [groceries, setGroceries] = useState([]); // to store groceries fetched from db

  const { tripId } = useParams();

  // Handle print button
  const handlePrint = () => {
    window.print();
  };

  // Fetch groceries for a specific trip
  const fetchGroceries = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/trips/${tripId}/groceryitems`
      );
      if (response.ok) {
        const groceryData = await response.json();
        setGroceries(groceryData);
      } else {
        alert("Couldn't fetch groceries");
        console.log('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Call the asynchronous function inside useEffect
    fetchGroceries();
  }, [tripId]); // Make sure to include dependencies

  // Filter the groceries when the data is updated
  useEffect(() => {
    setFilteredGroceries(groceries.filter((grocery) => grocery.label === 'Needs to be purchased'));
  }, [groceries]);

  console.log(filteredGroceries);
  console.log(groceries);

  return (
    <div className={styles.shoppingListContainer}>
      <h1>Your Shopping List</h1>
      <ul className={styles.shoppingList}>
        {filteredGroceries.map((grocery) => (
          <li key={grocery._id} className={styles.shoppingListItem}>
            <span>{grocery.name}</span>
            <span>({grocery.quantity})</span>
          </li>
        ))}
      </ul>
      <button className={styles.button} onClick={handlePrint}>Print</button>
    </div>
  );
};

export default GenerateShoppingListPage;