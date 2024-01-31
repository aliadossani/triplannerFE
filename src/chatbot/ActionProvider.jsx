import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const handleHello = () => {
        const botMessage = createChatBotMessage('Hello. Nice to meet you.');
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };
    
      const handleList = () => {
        const botMessage = createChatBotMessage('Sure!Here is a general list of groceries that you might consider for a trip: Fruits, Vegetables,Hard Boiled Eggs, Instant Noodles, salt and pepper. I hope this helps you!');
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };

      const handleThanks = () => {
        const botMessage = createChatBotMessage('You are welcome! If you have any more questions or if there is anything else I can help you with, feel free to ask. Safe travels and enjoy your trip!');
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };

      const handleClose = () => {
        const botMessage = createChatBotMessage('Goodbye! If you have more questions later, feel free to ask.');
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
          isOpen: false,  // Close the chatbot by setting isOpen to false
        }));
      };
    
          
    return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleList,
            handleThanks,
            handleClose,

          },
        });
      })}
    </div>
  );
};

export default ActionProvider;