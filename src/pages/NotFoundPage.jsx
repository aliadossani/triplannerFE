import { NavLink } from "react-router-dom";
import appLogo from "../assets/applogo_color.png";
import "../styles/NotFound.css";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Button, Container } from "@mantine/core";

const NotFoundPage = () => {
  return (
    <Container size="sm">
      <NavLink className="NotFound" to="/trips">
        <img src="https://img.freepik.com/free-vector/error-404-concept-landing-page_52683-19704.jpg?w=900&t=st=1706725413~exp=1706726013~hmac=dcc12fa798565fd7be30c19656ab3d648bf612262e17c44d1e7f6adbbfe45660" />
        <Button>Back to Home Page</Button>
      </NavLink>
    </Container>
  );
};

export default NotFoundPage;
