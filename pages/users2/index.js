// pages/schedules.js

import { Dashboard } from "@/components/dashboard";
import Drivers from "@/components/drivers/Drivers";

export async function getServerSideProps(context) {
    // Obtén los datos del servidor.
    const response = await fetch('http://localhost:3000/api/schedules');
    const data = await response.json();  
  
    // Devuelve los datos formateados como props.
    return { props: { schedules: data[0] } };
  }
  
  // Este componente se renderiza en el servidor con los datos ya incluidos.
  export default function SchedulesPage({ schedules }) {
    // Usa los datos propios del servidor para renderizar el componente.
    return (
      <Dashboard>
        <Drivers data={schedules}/>
      </Dashboard>
    );
  }
  