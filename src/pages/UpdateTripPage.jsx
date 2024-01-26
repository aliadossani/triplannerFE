import { useEffect, useContext, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from "../contexts/AuthContext";

const UpdateTripPage = () => {
    const [trip, setTrip] = useState();
    const { tripId } = useParams() ;

    const fetchOneTrip = async () => {
        try {
            const response = await fetch (`${import.meta.env.VITE_BASE_API_URL}/trips/${tripId}`)
            if (response.status == 200 ) {
                const tripData = await response.json()
                setTrip(tripData)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { fetchOneTrip ()
      }, [])
    
      const [title, setTitle] = useState(trip.title);
      const [image, setImage] = useState(trip.image);
      const [destination, setDestination] = useState(trip.destination)
      const [participants, setParticipants] = useState(trip.participants) // state to store list of participants from the DB  
      const [selectedParticipants, setSelectedParticipants] = useState([]) // state to store list of selected participants from the for
    
      const navigate = useNavigate() ;

      const handleSubmit = async event => {
        event.preventDefault()
        const payload = { title, image, destination, participants }
    
        try {
          const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/trips/${tripId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          })
          if (response.ok) {
            navigate(`/trips/${tripId}`)
          }
        } catch (error) {
          console.error(error)
        }
      } 

      return (
        <>
        <h1>Update this trip</h1>
        <form
        onSubmit={handleSubmit}
        action='submit'
        style={{ display: 'flex', flexDirection: 'column' }}
        >
        <label>Title:
        <input
          type='text'
          id='title'
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        </label>

        <label>Image:
        <input
          type='text'
          id='image'
          value={image}
          onChange={event => setImage(event.target.value)}
        />
        </label>

        <label> Destination:
        <input
          type='text'
          id='destination'
          value={destination}
          onChange={event => setDestination(event.target.value)}
        />
        </label>

        <div>
            <p>Select Participants:</p>
            {participants.map(participant => (
                <div key={participant._id}>
                    <input
                    type="checkbox"
                    id={participant._id}
                    checked={selectedParticipants.includes(participant._id)}
                    onChange={() => handleCheckboxChange(participant._id)}
                    />
                    <label htmlFor={participant._id}>{participant.username}</label>
                </div>
            ))} 
        </div>
        <button type='submit'>SUBMIT</button>
      </form>
        </>
    )}

export default UpdateTripPage