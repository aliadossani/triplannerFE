import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const AuthForm = ({ isLogin = false }) => {
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const { saveToken } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reqBody = { picture, email, password, username };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/${isLogin ? "login" : "signup"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reqBody),
        }
      );
      if (response.status === 201) {
        // The user was created successully
        navigate("/login");
      }
      if (response.status === 200) {
        // The user was logged in successully
        const parsed = await response.json();
        console.log(parsed);
        saveToken(parsed.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isLogin ? (
        <>
          <label>
            Your Photo
            <input
              type="url"
              value={picture}
              onChange={(event) => setPicture(event.target.value)}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <label>
            Username
            <input
              type="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </>
      ) : (
        <>
          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <label>
            Username
            <input
              type="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </>
      )}
      <button type="submit">{isLogin ? "Login" : "Signup"}</button>
    </form>
  );
};

export default AuthForm;
