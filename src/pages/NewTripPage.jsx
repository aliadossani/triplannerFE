import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const NewTripPage = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [destination, setDestination] = useState('')
  const { fetchWithToken } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    const tripToCreate = { title, image, destination }
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

{/*         <label>
        Participants:
        <select value={participants} onChange={(event) => handleDishTypeChange(e)}>
                  <option value="">All</option>
                  <option value="starter">Starter</option>
                  <option value="soup">Soup</option>
                  <option value="main">Main Course</option>
                  <option value="dessert">Dessert</option>
                </select>
        </label> */}

        <button type='submit'>SUBMIT</button>
      </form>
    </>
  )
}

export default NewTripPage