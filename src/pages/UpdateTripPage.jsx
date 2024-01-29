import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";


const UpdateTripPage = () => {
  const { tripId } = useParams();
  
  
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [destination, setDestination] = useState("");
  const [participants, setParticipants] = useState([]); // state to store list of participants from the DB
  
  const [createdBy, setCreatedBy] = useState([]);
  const { fetchWithToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const {userId} = useContext(AuthContext);
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
        setDestination(tripData.destination);
        setSelectedParticipants(tripData.participants);
        setCreatedBy(tripData.createdBy)
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
      const isSelected = prevSelectedParticipants.some((selected) => selected._id === participantId);
  
      if (isSelected) {
        return prevSelectedParticipants.filter((selected) => selected._id !== participantId);
      } else {
        return [...prevSelectedParticipants, participants.find((participant) => participant._id === participantId)];
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tripToUpdate = {
      title,
      image,
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

  console.log(selectedParticipants)

  return (
    <>
      <h1>Update this Trip</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            action="submit"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>
              Title:
              <input
                type="text"
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>

            <label>
              Image:
              <input
                type="text"
                id="image"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              />
            </label>

            <label>
              Destination:
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              />
            </label>

            <div>
              <p>Select Participants:</p>
              {participants.map((participant) => (
                <div key={participant._id}>
                  <input
                    type="checkbox"
                    disabled={participant._id === userId}
                    checked= { participant._id === createdBy  || selectedParticipants.some((selected) => selected._id === participant._id)}
                    onChange={() => handleCheckboxChange(participant._id)}
                  />
                  <label htmlFor={participant._id}>
                    {participant.username}
                  </label>
                </div>
              ))}
            </div>
            <button type="submit">Update</button>
          </form>
        </>
      )}
    </>
  );
};
export default UpdateTripPage;
