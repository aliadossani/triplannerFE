import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Button, TextInput, Container } from "@mantine/core";
import classes from "../styles/UpdateTrip.module.css";

const UpdateTripPage = () => {
  const { tripId } = useParams();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [participants, setParticipants] = useState([]); // state to store list of participants from the DB

  const [createdBy, setCreatedBy] = useState([]);
  const { fetchWithToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { userId } = useContext(AuthContext);
  const [selectedParticipants, setSelectedParticipants] = useState([userId]); // state to store list of selected participants from the form

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
  }, [tripId]);

  const fetchOneTrip = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/trips/${tripId}`
      );
      if (response.status == 200) {
        const tripData = await response.json();
        setTitle(tripData.title);
        setImage(tripData.image);
        setDescription(tripData.description);
        setDestination(tripData.destination);
        setSelectedParticipants(tripData.participants);
        setCreatedBy(tripData.createdBy);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOneTrip();
    setLoading(false);
  }, [tripId]);

  // Handle participants checkbox
  const handleCheckboxChange = (participantId) => {
    setSelectedParticipants((prevSelectedParticipants) => {
      const isSelected = prevSelectedParticipants.some(
        (selected) => selected._id === participantId
      );

      if (isSelected) {
        return prevSelectedParticipants.filter(
          (selected) => selected._id !== participantId
        );
      } else {
        return [
          ...prevSelectedParticipants,
          participants.find((participant) => participant._id === participantId),
        ];
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tripToUpdate = {
      title,
      image,
      description,
      destination,
      participants: selectedParticipants,
    };
    try {
      const response = await fetchWithToken(
        `/trips/${tripId}`,
        "PUT",
        tripToUpdate
      );
      if (response.status === 200) {
        navigate(`/trips/${tripId}`);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.pageCtn}>
      <h1>Update this Trip</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Container size="xs">
            <form
              onSubmit={handleSubmit}
              className={classes.formCtn}
              action="submit"
            >
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
                label="Description:"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
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
                      disabled={participant._id === userId}
                      checked={
                        participant._id === createdBy ||
                        selectedParticipants.some(
                          (selected) => selected._id === participant._id
                        )
                      }
                      onChange={() => handleCheckboxChange(participant._id)}
                    />
                    <label htmlFor={participant._id}>
                      {participant.username}
                    </label>
                  </div>
                ))}
              </>
              <Button mt="md" fullWidth type="submit">
                Update
              </Button>
            </form>
          </Container>
        </>
      )}
    </div>
  );
};
export default UpdateTripPage;
