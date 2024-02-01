import { IconEdit, IconTrash } from "@tabler/icons-react";
import Search from "../components/Search";
import {
  Center,
  Container,
  Image,
  SimpleGrid,
  Space,
  Text,
  Box,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "../styles/GroceryList.module.css";

const GroceryList = ({
  handleDeleteGrocery,
  handleEditGroceryModal,
  handleAddGrocery,
  groceryAdded,
  setGroceryAdded,
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Call the asynchronous function inside useEffect
    fetchGroceries();
  }, [
    tripId,
    handleDeleteGrocery,
    handleEditGroceryModal,
    handleAddGrocery,
    groceryAdded,
  ]); // Make sure to include dependencies

  useEffect(() => {
    clearTimeout(timeoutId);
    if (searchTerm) {
      setTimeoutId(
        setTimeout(() => {
          fetchGroceries(searchTerm);
        }, 300)
      );
    }
    if (groceryAdded) {
      setSearchTerm("");
      fetchGroceries();
      setGroceryAdded(false);
    } else {
      fetchGroceries();
    }
  }, [searchTerm, groceryAdded]);

  return (
    <Container>
      {groceries.length ? (
        <Container>
          <Text className={classes.title}>
            Grocery List
          </Text>

          <Container maw="70vw">
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </Container>

          {groceries.map((grocery, index) => (
            <SimpleGrid key={index} mt="1rem" cols={3} className={classes.lineCtn}>
              <div className={classes.itemCtn}>
                <Image src={grocery?.image} radius="md" mah={50} maw={50} />
                <Space w="xs" />
                <Text size="lg" fw={700} c="darkText">
                  {grocery.name} ({grocery.quantity})
                </Text>
              </div>
              <div className={classes.labelCtn}>
                <Text
                  className={classes.labelText}
                  bg={
                    grocery.label === "Needs to be purchased"
                      ? "labelRed"
                      : "labelGreen"
                  }
                >
                  {grocery.label}
                </Text>
              </div>
              <div className={classes.iconCtn}>
                <Space w="xs" />
                <IconEdit onClick={() => handleEditGroceryModal(grocery)} />
                <IconTrash onClick={() => handleDeleteGrocery(grocery._id)} />
              </div>
            </SimpleGrid>
          ))} 
        </Container>
      ) : (
        <Container>
          <Center>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </Center>
          <Text size="xl" fw={700} c="darkText">
            No groceries available.
          </Text>
        </Container>
      )}
    </Container>
  );
};

export default GroceryList;
