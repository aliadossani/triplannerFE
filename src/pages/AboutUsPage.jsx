import {
  Card,
  Group,
  Image,
  Text,
  NavLink,
  SimpleGrid,
  Container,
} from "@mantine/core";
import classes from "../styles/About.module.css";
import { useViewportSize } from "@mantine/hooks";
import LinkedIn from "../assets/link.png";
import GitHub from "../assets/git.png";

function AboutPage() {
  const { width } = useViewportSize();

  return (
    <div className={classes.about}>
      <h1 className={classes.textabout}>About us</h1>
      <p className={classes.textabout}>
        We are three Ironhackers passionate about Web Development. <br />
        Check our profiles below!
      </p>
      <Container>
        <SimpleGrid
          style={{ marginBottom: "2rem" }}
          cols={width > 1200 ? 3 : width > 800 ? 2 : 1}
        >
          <div>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://lh3.googleusercontent.com/drive-viewer/AEYmBYQoNvU6ssC4nA6WmsG0Tk-oMlNi4WLHohrrhdfGjKR6EfNgHRqIcWOYxnFxrljW_Lax0ddiXJ5znvj0QFtVG6Al1lDz=w1440-h779"
                  height="400vw"
                  width="33vw"
                  alt="Item picture"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Alia Dossani</Text>
              </Group>
              <NavLink
                href="https://github.com/aliadossani"
                label="GitHub"
                leftSection={
                  <Image
                    src={GitHub}
                    height="30vw"
                    width="30vw"
                    alt="GitHubIcon"
                  />
                }
                target="_blank"
              />
              <NavLink
                href="https://www.linkedin.com/in/aliadossani-junior-react-developer/"
                label="LinkedIn"
                leftSection={
                  <Image
                    src={LinkedIn}
                    height="30vw"
                    width="30vw"
                    alt="LinkedInIcon"
                  />
                }
                target="_blank"
              />
            </Card>
          </div>
          <div>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://media.licdn.com/dms/image/C4D03AQFQYYDzyLSZ9Q/profile-displayphoto-shrink_200_200/0/1599212519165?e=1711584000&v=beta&t=e7VFwYpnCIuDMUvz3-7Xzxh4CF5oIue21N0VxH4zUvI"
                  height="400vw"
                  width="33vw"
                  alt="Item picture"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Catherine Fournier</Text>
              </Group>

              <NavLink
                href="https://github.com/castuche"
                label="GitHub"
                leftSection={
                  <Image
                    src={GitHub}
                    height="30vw"
                    width="30vw"
                    alt="GitHubIcon"
                  />
                }
                target="_blank"
              />
              <NavLink
                href="https://www.linkedin.com/in/catherine-fournier-7245b563/"
                label="LinkedIn"
                leftSection={
                  <Image
                    src={LinkedIn}
                    height="30vw"
                    width="30vw"
                    alt="LinkedInIcon"
                  />
                }
                target="_blank"
              />
            </Card>
          </div>
          <div>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://media.licdn.com/dms/image/D4E03AQGgrHELLtfxcQ/profile-displayphoto-shrink_800_800/0/1714379782245?e=1720656000&v=beta&t=qhUR4vXZRjqjWUPW7bGF3ggdDBo5pBSV_sUkNiLLUyU"
                  height="400vw"
                  width="33vw"
                  alt="Item picture"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Emiliano Foti</Text>
              </Group>

              <NavLink
                href="https://github.com/emi-fto"
                label="GitHub"
                leftSection={
                  <Image
                    src={GitHub}
                    height="30vw"
                    width="30vw"
                    alt="GitHubIcon"
                  />
                }
                target="_blank"
              />
              <NavLink
                href="https://www.linkedin.com/in/emiliano-foti-345a11a4/"
                label="LinkedIn"
                leftSection={
                  <Image
                    src={LinkedIn}
                    height="30vw"
                    width="30vw"
                    alt="LinkedInIcon"
                  />
                }
                target="_blank"
              />
            </Card>
          </div>
        </SimpleGrid>
      </Container>
    </div>
  );
}

export default AboutPage;
