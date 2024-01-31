import { IconEdit, IconTrash } from "@tabler/icons-react";
import Search from "../components/Search";
import classes from "../styles/GroceryList.module.css";
import { Center, Container, Image, Space, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
          <Text size="sm" c="dimmed">
            <h3>Grocery List</h3>
          </Text>

          <Container maw="70vw">
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </Container>
          {groceries.map((grocery, index) => (
            <Container /* display="flex" */ key={index} mt="1rem">
              <Center>
                <Image src={grocery?.image} radius="md" mah={50} maw={50} />
              </Center>
              <Center>
                <Text size="sm" c="dimmed">
                  <h3>
                    {grocery.name} ({grocery.quantity})
                  </h3>
                </Text>
                <Space w="md" />
                <IconEdit onClick={() => handleEditGroceryModal(grocery)} />
                <IconTrash onClick={() => handleDeleteGrocery(grocery._id)} />
              </Center>
              <Center>
                <Text size="sm">
                  <p
                    className={
                      grocery.label === "Needs to be purchased"
                        ? classes.groceryRedLabel
                        : classes.groceryGreenLabel
                    }
                  >
                    {grocery.label}
                  </p>
                </Text>
              </Center>
            </Container>
          ))}
        </Container>
      ) : (
        <Container>
          <Center>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </Center>
          <Text size="sm" c="dimmed">
            <h3>No groceries available.</h3>
          </Text>
        </Container>
      )}
    </Container>
  );
};

export default GroceryList;
