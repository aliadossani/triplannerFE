import { IconEdit, IconTrash } from "@tabler/icons-react";
import Search from "../components/Search";
import classes from "../styles/GroceryList.module.css";
import { Center } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GroceryList = ({
  handleDeleteGrocery,
  handleEditGroceryModal,
  handleAddGrocery,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeoutId, setTimeoutId] = useState();
  const { tripId } = useParams();
  const [groceries, setGroceries] = useState([]); // to store groceries fetched from db

  // Fetch groceries for a specific trip
  const fetchGroceries = async (query) => {
    let queryURL = `${
      import.meta.env.VITE_API_URL
    }/api/trips/${tripId}/groceryitems`;

    if (query) {
      queryURL += `?q=${query}`;
    }
    try {
      const response = await fetch(`${queryURL}`);
      if (response.ok) {
        const groceryData = await response.json();
        setGroceries(groceryData);
      } else {
        alert("Couldn't fetch groceries");
        console.log("Something went wrong");
        setSearchTerm("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Call the asynchronous function inside useEffect
    fetchGroceries();
  }, [tripId, handleDeleteGrocery, handleEditGroceryModal, handleAddGrocery]); // Make sure to include dependencies

  useEffect(() => {
    clearTimeout(timeoutId);
    if (searchTerm) {
      setTimeoutId(
        setTimeout(() => {
          fetchGroceries(searchTerm);
        }, 300)
      );
    } else {
      fetchGroceries();
    }
  }, [searchTerm]);

  if (!groceries) return;
  <p>No groceries available.</p>;
  return (
    <>
      <h3>Grocery List</h3>
      <Center>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Center>
      {groceries.map((grocery, index) => (
        <div className={classes.groceryCard} key={index}>
          <div className={classes.cardContent}>
            <div className={classes.groceryHeaderCtn}>
              <p className={classes.groceryName}>
                {grocery.name} ({grocery.quantity})
              </p>
            </div>
            <div className={classes.groceryLabelCtn}>
              <p
                className={
                  grocery.label === "Needs to be purchased"
                    ? classes.groceryRedLabel
                    : classes.groceryGreenLabel
                }
              >
                {grocery.label}
              </p>
            </div>
          </div>
          <div>
            <IconEdit
              className={classes.ctaBtn}
              onClick={() => handleEditGroceryModal(grocery)}
            />
            <IconTrash
              className={classes.ctaBtn}
              onClick={() => handleDeleteGrocery(grocery._id)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default GroceryList;
