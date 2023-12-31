"use client";
import { ConfirmProvider, useConfirm } from "material-ui-confirm";
import { createContext, useState } from "react";
import { Toaster } from "react-hot-toast";

const MainContext = createContext();

// Crear el proveedor del contexto
export const MainContextProvider = ({ children }) => {
  const [openSchedulesModal, setOpenSchedulesModal] = useState(false);
  const [scheduleToEdit, setScheduleToEdit] = useState(false);  
  const config = {
    openSchedulesModal,
    setOpenSchedulesModal,
    scheduleToEdit,
    setScheduleToEdit,    
  };
  return (
    <MainContext.Provider value={config}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // // Default options for specific types
          // success: {
          //   duration: 3000,
          //   theme: {
          //     primary: 'green',
          //     secondary: 'black',
          //   },
          // },
        }}
      />
      <ConfirmProvider>{children}</ConfirmProvider>
    </MainContext.Provider>
  );
};

export default MainContext;
