import { NavLink } from "react-router-dom";
import appLogo from "../assets/applogo_color.png";
import "../styles/NotFound.css";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Button, Container } from "@mantine/core";
import errorImage from "../assets/404Page.jpg";

const NotFoundPage = () => {
  return (
    <Container size="sm">
      <NavLink className="NotFound" to="/trips">
        <img src={errorImage} />
        <Button>Back to Home Page</Button>
      </NavLink>
    </Container>
  );
};

export default NotFoundPage;
