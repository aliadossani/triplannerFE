import { Container, Image, Space, Text } from "@mantine/core";
import classes from "../styles/ParticipantList.module.css";

const ParticipantList = ({ trip }) => {
  if (!trip?.participants?.length) return <p>No participants available.</p>;
  return (
    <Container>
      <Text className={classes.title}>Participant List</Text>

      {trip.participants.map((participant, index) => (
        <div className={classes.participantCard} key={index}>
          <Container display="flex" className={classes.participantContainer}>
            <Image
              src={
                participant.picture ||
                "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
              }
              radius="md"
              w={50}
              h={50}
            />
            <Space w="md" />
            <Text className={classes.text}>{participant.username}</Text>
          </Container>
        </div>
      ))}
    </Container>
  );
};

export default ParticipantList;
