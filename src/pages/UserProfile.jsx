import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const UserProfile = () => {
  const {userId} = useParams();
  const [formData, setFormData] = useState({});
  const { fetchWithToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const response = await fetchWithToken(
        `/users/${userId}`
      );
      if (response.ok) {
        const userData = await response.json();
        setFormData(userData);
      } else {
        alert("Couldn't fetch user");
        console.log('Something went wrong')
      }
    } catch (error) {
      alert("Couldn't fetch user: " + error);
      console.log(error);
    }
  }


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with formData:', formData);
    try {
      const response = await fetchWithToken(
        `/users/${userId}`,
        "PUT",
        formData,
      );
      if (response.ok) {
        // Navigate to Trips
        navigate("/trips");
      } else {
        alert("Couldn't update user");
        console.log('Something went wrong')
      }
    } catch (error) {
      alert("Couldn't update user: " + error);
      console.log(error);
    }
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
          value={formData?.username}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
        />

        {/* Add more fields as needed */}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UserProfile;