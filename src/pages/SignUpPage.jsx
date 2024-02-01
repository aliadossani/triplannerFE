import AuthForm from "../components/AuthForm";
import appLogo from "../assets/applogo_color.png";
import styles from "../styles/SignUpPage.module.css";

const SignUpPage = () => {
  return ( 
  <div className={styles.pageCtn}>
  <img src={appLogo} />
  <h1>Create your account</h1>
  <p className={styles.text}> Sign up for free to start using WanderBasket. 
    We value your privacy, and will not share your data with any outside organization.</p>
  <AuthForm />
  </div>
  )};

export default SignUpPage;
