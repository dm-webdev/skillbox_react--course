import React, { useState } from 'react';


export const AppModalContext = React.createContext(
  {
    isModalOpen: false,
    modalProps: {},
    setModalProps: () => {},
    setModalOpen: () => {},
  }
);

export function AppModalProvider({ children }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState({})

  const contextValue = {
    isModalOpen,
    modalProps,
    setModalProps,
    setModalOpen,
  };

  return (
    <AppModalContext.Provider value={contextValue}>
      {children}
    </AppModalContext.Provider>
  );
}
