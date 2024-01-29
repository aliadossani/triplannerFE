import { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Fetch user data when the component mounts
    console.log('userId:', userId);
    axios.get(`/api/user/${userId}`)
      .then(response => {
        setUserData(response.data)
      console.log('response.data:', response.data);
      })
      .catch(error => console.error(error));
  }, [userId]);  // The effect will re-run whenever userId changes

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form with formData:', formData);
    // Send updated user data to the backend
    axios.put(`/api/user/${userId}`, formData)
      .then(response => {
        console.log('Updated user data:', response.data);
        setUserData(response.data)
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username || userData.username}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email || userData.email}
          onChange={handleInputChange}
        />

        {/* Add more fields as needed */}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UserProfile;