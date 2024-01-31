import { Container, Image, Space, Text } from "@mantine/core";
import classes from "../styles/ParticipantList.module.css";

const ParticipantList = ({ trip }) => {
  if (!trip?.participants?.length) return <p>No participants available.</p>;
  return (
    <Container>
      <Text size="xl" fw={700} c="darkText">
        Participant List
      </Text>

      {trip.participants.map((participant, index) => (
        <div className={classes.participantCard} key={index}>
          <Container display="flex">
            <Image
              src={
                participant.picture ||
                "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
              }
              radius="md"
              mah={50}
              maw={50}
            />
            <Space w="md" />
            <Text size="lg" fw={600} c="darkText">
              {participant.username}
            </Text>
          </Container>
        </div>
      ))}
    </Container>
  );
};

export default ParticipantList;
