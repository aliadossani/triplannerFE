import ChatBot from "react-simple-chatbot";
import appLogo from "../assets/applogo_color.png";

const ChatbotContainer = () => {
  return (
    <ChatBot
      botAvatar={appLogo}
      floatingIcon={appLogo}
      floating={true}
      floatingStyle={{
        background: " var(--primaryBlue)",
      }}
      bubbleStyle={{
        background: " var(--primaryBlue)",
        color: "white",
      }}
      bubbleOptionStyle={{
        background: " var(--primaryBlue)",
        color: "white",
      }}
      headerTitle={"Plan your trip with us!"}
      steps={[
        {
          id: "0",
          message: "Are you planning a trip?",
          trigger: "1",
        },
        {
          id: "1",
          options: [
            { value: "yes", label: "Yes", trigger: "end-message-accept" },
            { value: "no", label: "No", trigger: "end-message-reject" },
          ],
        },
        {
          id: "end-message-accept",
          message: "Sure, ",
          trigger: "2",
        },
        {
          id: "end-message-accept",
          message: "How can I assist you?",
          trigger: "2",
        },
        {
          id: "2",
          user: true,
          trigger: "3",
        },
        {
          id: "3",
          message:
            "Certainly! Here is a general list of essential and versatile items that you can consider taking along for a trip: Fruits, Vegetables, Bread, Hard Boiled eggs, Salt, Instant Noodles, Ketchup ",
          trigger: "4",
        },
        {
          id: "4",
          user: true,
          trigger: "5",
        },

        {
          id: "5",
          message:
            "You are welcome! If you have any more questions, feel free to ask. Safe travels and enjoy your trip!",
          trigger: "end-message",
        },
        {
          id: "end-message-reject",
          message: "How can I assist you?",
          trigger: "7",
        },
        {
          id: "7",
          user: true,
          trigger: "8",
        },
        {
          id: "8",
          message: "WanderBasket is your ultimate travel grocery companion",
          trigger: "9",
        },
        {
          id: "9",
          message: "Do you need any more help",
          trigger: "10",
        },
        {
          id: "10",
          user: true,
          trigger: "end-message",
        },
        {
          id: "end-message",
          message: "Thanks for visiting our website!",
          end: true,
        },
      ]}
    />
  );
};

export default ChatbotContainer;
