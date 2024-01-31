import AuthForm from "../components/AuthForm";
import appLogo from "../assets/applogo_color.png";
import styles from "../styles/LoginPage.module.css";

const LoginPage = () => {
  return(
  <div className={styles.pageCtn}>
  <img src={appLogo} />
  <h1>Log in</h1>
  <AuthForm isLogin />
  </div>
  )};

export default LoginPage;
