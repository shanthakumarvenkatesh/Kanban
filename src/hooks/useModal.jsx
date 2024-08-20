import React, { createContext, ReactNode, useContext, useState } from 'react';

// Create a context for modal management
const ModalContext = createContext({
  visible: false,
  toggleVisibility: () => {},
  selectedCard: undefined,
});

// Define the provider component
const ModalProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(undefined);

  const toggleVisibility = (card) => {
    if (card) {
      setSelectedCard(card);
    } else {
      setSelectedCard(undefined);
    }
    setVisible((prevVisible) => !prevVisible);
  };

  return (
    <ModalContext.Provider value={{ visible, toggleVisibility, selectedCard }}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use modal context
const useModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};

export { ModalProvider, useModal };
