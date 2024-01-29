import { Link } from "react-router-dom";
import classes from "../styles/Footer.module.css";

const Footer = () => {
    return (
        <footer className={classes.footerCtn}>
            <div className={classes.footerElements}>
                <div className={classes.aboutUsLink}>
                    <Link to="/about"> About Us</Link>
                </div>
            </div>

        </footer>
    );
}

export default Footer;