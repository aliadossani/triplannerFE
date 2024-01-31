import { Link } from "react-router-dom";
import classes from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footerCtn}>
      <p>2024 WanderBasket | All rights reserved</p>
      <Link to="/about"> <p>About Us</p></Link>
    </footer>
  );
};

export default Footer;
