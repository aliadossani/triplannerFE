import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { TextInput, Button, Container} from '@mantine/core';
import classes from "../styles/AuthForm.module.css"

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
      } else if (response.status === 200) {
        // The user was logged in successully
        const parsed = await response.json();
        console.log(parsed);
        saveToken(parsed.token);
        navigate("/trips");
      } else {
        alert("Please enter correct username and password")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} className={classes.formCtn}>
        {!isLogin ? (
          <>
          <TextInput label="Your Photo:" name="photo" value={picture} onChange={(event) => setPicture(event.target.value)} />
          <TextInput label="Email:" name="email" value={email} required onChange={(event) => setEmail(event.target.value)} />
          <TextInput label="Password:" name="password" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
          <TextInput label="Username:" name="username" required  value={username} onChange={(event) => setUsername(event.target.value)} />
          </>
        ) : (
          <>
          <TextInput label="Email:" name="email" value={email} required onChange={(event) => setEmail(event.target.value)} />

          <TextInput label="Password:" name="password" type="password" required  value={password} onChange={(event) => setPassword(event.target.value)} />
          </>
        )}
        <Button mt="md" fullWidth type="submit">
          {isLogin ? "Login" : "Signup"}
      </Button>
      </form>
    </Container>
  );
};

export default AuthForm;
