import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import appLogo from "../assets/applogo_color.png";

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/trips");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {isAuthenticated ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Welcome to WanderBasket !</h1>
          <img src={appLogo} />
          <p>
            Say goodbye to the hassle of planning holidays with friends! Are you
            tired of spending too much time organizing every detail? Let us
            handle the boring part, so you can sit back, relax, and enjoy your
            vacation !
          </p>
        </>
      )}
    </>
  );
};

export default HomePage;
