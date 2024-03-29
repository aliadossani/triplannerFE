import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/GenerateShoppingListPage.module.css";
import { Button } from "@mantine/core";

const GenerateShoppingListPage = () => {
  const [filteredGroceries, setFilteredGroceries] = useState([]);
  const { tripId } = useParams();

  const handlePrint = () => {
    window.print();
  };
  
  const fetchGroceries = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/trips/${tripId}/groceryitems`
      );
      if (response.ok) {
        const groceryData = await response.json();
        setFilteredGroceries(
          groceryData.filter(
            (grocery) => grocery.label === "Needs to be purchased"
          )
        );
      } else {
        alert("Couldn't fetch groceries");
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGroceries();
  }, [tripId]);

  return (
    <div className={styles.shoppingListContainer}>
      <h1>Your Shopping List</h1>
      {filteredGroceries.length > 0 ? (
        <>
          <ul className={styles.shoppingList}>
            {filteredGroceries.map((grocery) => (
              <li key={grocery._id} className={styles.shoppingListItem}>
                <span>{grocery.name}</span>
                <span>({grocery.quantity})</span>
              </li>
            ))}
          </ul>
          <Button className={styles.button} onClick={handlePrint}>
            Print
          </Button>
        </>
      ) : (
        <p>You have no items in your shopping list. Go back to add some.</p>
      )}
    </div>
  );
};

export default GenerateShoppingListPage;
