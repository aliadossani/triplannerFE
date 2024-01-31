import BeatLoader from "react-spinners/BeatLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const color = "#27BFD3FF";

const Loader = () => {
  return (
    <BeatLoader
      color={color}
      loading={true}
      cssOverride={override}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
