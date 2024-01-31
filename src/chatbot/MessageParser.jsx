import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const lowerCaseMessage = message.toLowerCase()
      if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
        actions.handleHello();
      }

      else if(lowerCaseMessage.includes('could you help me with the mandatory groceries that i can take along for the trip?')){
        actions.handleList();

      } else if (lowerCaseMessage.includes('thanks') || lowerCaseMessage.includes('thank You')) {
        actions.handleThanks();
      }
      
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
