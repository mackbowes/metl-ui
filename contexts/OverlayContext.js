import React, { createContext, useState, useContext } from "react";
import { useToast } from "@chakra-ui/react";

export const OverlayContext = createContext();

export const OverlayProvider = ({ children }) => {
  const toast = useToast();
  const [modal, setModal] = useState(false);

  const errorToast = (content) => {
    console.log(content);
    toast({
      title: content?.title,
      description: content?.description,
      position: "top-right",
      status: "error",
      duration: 7000,
      isClosable: true,
    });
  };
  const successToast = (content) => {
    toast({
      title: content?.title,
      description: content?.description,
      position: "top-right",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const warningToast = (content) => {
    toast({
      title: content.title,
      description: content.description,
      position: "top-right",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  };
  const closeModal = () => setModal(false);
  return (
    <OverlayContext.Provider
      value={{
        modal,
        setModal,
        errorToast,
        successToast,
        warningToast,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};
