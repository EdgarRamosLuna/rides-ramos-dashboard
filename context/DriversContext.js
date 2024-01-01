"use client";
import { ConfirmProvider } from "material-ui-confirm";
import { createContext, useState } from "react";
import { Toaster } from "react-hot-toast";

const Drivers = createContext();

// Crear el proveedor del contexto
export const DriversProvider = ({ children }) => {
  const [openSchedulesModal, setOpenSchedulesModal] = useState(false);
  const [scheduleToEdit, setScheduleToEdit] = useState(false);
  const [driverToEdit, setDriverToEdit] = useState(false);
  const [unitToEdit, setUnitToEdit] = useState(false);
  const [openTravelsModal, setOpenTravelsModal] = useState(false);
  const [openDriversModal, setOpenDriversModal] = useState(false);
  const [openUnitsModal, setOpenUnitsModal] = useState(false);
  const [openUsersModal, setOpenUsersModal] = useState(false);
  const statusData = {
    1: {
      status: "Activo",
      color: "success",
    },
    2: {
      status: "Inactivo",
      color: "error",
    },
  };
  const config = {
    openSchedulesModal,
    setOpenSchedulesModal,
    scheduleToEdit,
    setScheduleToEdit,
    driverToEdit,
    setDriverToEdit,
    openTravelsModal,
    setOpenTravelsModal,
    openDriversModal,
    setOpenDriversModal,
    openUnitsModal,
    setOpenUnitsModal,
    openUsersModal,
    setOpenUsersModal,
    statusData,
    unitToEdit, 
    setUnitToEdit
  };
  return (
    <Drivers.Provider value={config}>
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
        }}
      />
      <ConfirmProvider>{children}</ConfirmProvider>
    </Drivers.Provider>
  );
};

export default Drivers;
