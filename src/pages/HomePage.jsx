import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

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
        <>
          <h1>Welcome to TripPlanner !</h1>
          <p>
            Say goodbye to the hassle of planning holidays with friends! Are you
            tired of spending too much time organizing every detail? Let us
            handle the boring part, so you can sit back, relax, and enjoy your
            vacation !
          </p>
        </>
      ) : null}
    </>
  );
};

export default HomePage;
