import React, { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export const useMessages = () => {
  return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem('customerMessages');
    return stored ? JSON.parse(stored) : [];
  });

  const addMessage = (messageData) => {
    const newMessage = {
      id: Date.now(),
      ...messageData,
      date: new Date().toLocaleString(),
      status: "pending",
      reply: null
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem('customerMessages', JSON.stringify(updatedMessages));
  };

  const replyToMessage = (id, replyText) => {
    const updatedMessages = messages.map(msg => 
      msg.id === id ? { ...msg, reply: replyText, status: "replied" } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('customerMessages', JSON.stringify(updatedMessages));
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage, replyToMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
