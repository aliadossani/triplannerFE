import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const NewTripPage = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [destination, setDestination] = useState('')
  const [participants, setParticipants] = useState([]) // state to store list of participants from the DB
  const [selectedParticipants, setSelectedParticipants] = useState([]) // state to store list of selected participants from the form
  const { fetchWithToken } = useContext(AuthContext)
  const navigate = useNavigate()

  // Fetch users from DB
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`)
      if (response.ok) {
        const usersData = await response.json()
        setParticipants(usersData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(fetchUsers(), [])


  // Handle participants checkbox
  const handleCheckboxChange = (participantId) => {
    const isSelected = selectedParticipants.includes(participantId);
    if (isSelected) {
      setSelectedParticipants(selectedParticipants.filter(id => id !== participantId));
    } else {
      setSelectedParticipants([...selectedParticipants, participantId]);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault()
    const tripToCreate = { title, image, destination, participants}
    console.log(tripToCreate)

    try {
      const response = await fetchWithToken('/trips', 'POST', tripToCreate)
      if (response.status === 201) {
        const newTrip = await response.json()
        console.log(newTrip)
        navigate(`/trips/${newTrip._id}`)
      } else {
        console.log('Something went wrong')
      }
    } catch (error) {
      console.error(error)
    }
  } 

  return (
    <>
      <h1>New Trip</h1>

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
                <div key={participant.id}>
                    <input
                    type="checkbox"
                    id={participant.id}
                    checked={selectedParticipants.includes(participant.id)}
                    onChange={() => handleCheckboxChange(participant.id)}
                    />
                    <label htmlFor={participant.id}>{participant.name}</label>
                </div>
            ))} 
        </div>
        <button type='submit'>SUBMIT</button>
      </form>
    </>
  )
}

export default NewTripPage