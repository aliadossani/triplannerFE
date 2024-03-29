import { IconEdit, IconTrash, IconX } from "@tabler/icons-react";
import Search from "../components/Search";
import { Container, Image, SimpleGrid, Space, Text } from "@mantine/core";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Text className={classes.title}>Grocery List</Text>
      <Container maw="70vw" className={classes.searchContainer}>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {searchTerm && (
          <IconX
            className={classes.cancelSearch}
            onClick={() => {
              setSearchTerm("");
            }}
          />
        )}
      </Container>
      {groceries.length ? (
        <Container>
          {groceries.map((grocery, index) => (
            <SimpleGrid
              key={index}
              mt="1rem"
              cols={3}
              className={classes.lineCtn}
            >
              <div className={classes.itemCtn}>
                <Image
                  src={
                    grocery?.image ||
                    "https://img.freepik.com/free-photo/top-view-fresh-vegetables-arrangement_23-2149271094.jpg?w=900&t=st=1706691719~exp=1706692319~hmac=aa12dce3ae0d9b6cf827cc6c9540cc1d90211bd91bd0d201f4f1770b1f3fdf5f"
                  }
                  radius="md"
                  mah={50}
                  maw={50}
                />
                <Space w="xs" />
                <Text className={classes.itemText}>
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
          <Text size="xl" fw={700} c="darkText">
            No groceries available.
          </Text>
        </Container>
      )}
    </Container>
  );
};

export default GroceryList;
