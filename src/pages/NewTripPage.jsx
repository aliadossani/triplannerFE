import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, TextInput } from "@mantine/core";
import classes from "../styles/NewTrip.module.css";

const NewTripPage = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [destination, setDestination] = useState("");
  const [participants, setParticipants] = useState([]); // state to store list of participants from the DB
  const { fetchWithToken } = useContext(AuthContext);
  const navigate = useNavigate();

const {userId} = useContext(AuthContext);
const [selectedParticipants, setSelectedParticipants] = useState([userId]); // state to store list of selected participants from the form

  // Fetch users from DB
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`);
      if (response.ok) {
        const usersData = await response.json();
        setParticipants(usersData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle participants checkbox
  const handleCheckboxChange = (participantId) => {
    const isSelected = selectedParticipants.includes(participantId);
    if (isSelected) {
      setSelectedParticipants(
        selectedParticipants.filter((id) => id !== participantId)
      );
    } else {
      setSelectedParticipants([...selectedParticipants, participantId]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tripToCreate = { title, image, destination, participants: selectedParticipants };
    console.log(tripToCreate);

    try {
      const response = await fetchWithToken("/trips", "POST", tripToCreate);
      if (response.status === 201) {
        const newTrip = await response.json();
        console.log(newTrip);
        navigate("/trips");
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>New Trip</h1>
      <form onSubmit={handleSubmit} className={classes.formCtn} action="submit">
        <TextInput
          label="Title:"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextInput
          label="Image:"
          name="image"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />
        <TextInput
          label="Destination:"
          name="destination"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
        <>
          <p>Select Participants:</p>
          {participants.map((participant) => (
            <div key={participant._id}>
              <input
                type="checkbox"
                id={participant._id}
                disabled={participant._id === userId}
                checked={participant._id === userId || selectedParticipants.includes(participant._id)}
                onChange={() => handleCheckboxChange(participant._id)}
              />
              <label htmlFor={participant._id}>{participant.username}</label>
            </div>
          ))}
        </>
        <Button mt="md" fullWidth type="submit">
          Create New Trip
        </Button>
      </form>
    </>
  );
};

export default NewTripPage;
