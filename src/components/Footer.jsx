import { Link } from "react-router-dom";
import classes from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footerCtn}>
      <Link to="/about"> About Us</Link>
    </footer>
  );
};

export default Footer;
