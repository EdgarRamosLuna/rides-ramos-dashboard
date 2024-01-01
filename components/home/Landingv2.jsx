'use client'
import * as React from 'react';
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import { useState } from "react";
import FormReservar from "./FormReservar";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AutoComplete from '../ui/AutoComplete';
export function LandingV2() {
  const [open, setOpen] = useState(false);
  // Definición de las variables de estado
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [salida, setSalida] = useState('');
  const [precio, setPrecio] = useState('');
  const [fullname, setFullname] = useState('');
  const [places, setPlaces] = useState(0);

  // Funciones para manejar los cambios
  const handleOrigenChange = (e) => setOrigen(e.target.value);
  const handleDestinoChange = (e) => setDestino(e.target.value);
  const handleSalidaChange = (e) => setSalida(e.target.value);
  const handlePrecioChange = (e) => setPrecio(e.target.value);

  function enviarReservaWhatsApp() {
    // Define el número de teléfono de la persona encargada de las reservas
    let numeroEncargado = '5218421161604'; // Asegúrate de usar el número correcto aquí

    // Datos del usuario y detalles del viaje (estos deberían recopilarse a través de un formulario)
    var nombreUsuario = 'Nombre del Usuario';
    var numeroPasajeros = 'Número de Pasajeros';

    // Construye el mensaje
    let mensaje = `Hola, quisiera hacer una reserva para el viaje de ${origen} a ${destino}. Aquí están los detalles: 
    - Nombre: ${nombreUsuario}
    - Número de pasajeros: ${numeroPasajeros}
    - Fecha: ${fechaViaje}
    - Hora: ${salida}`;

    // Codifica el mensaje para uso en URL
    let mensajeCodificado = encodeURIComponent(mensaje);

    // Crea la URL de WhatsApp con el mensaje codificado
    let enlaceWhatsApp = `https://wa.me/${numeroEncargado}?text=${mensajeCodificado}`;

    // Abre WhatsApp en una nueva ventana/tab del navegador
    window.open(enlaceWhatsApp, '_blank');
  }

  // Podrías llamar a esta función cuando el usuario hace clic en un botón
  // <button onclick="enviarReservaWhatsApp()">Reservar via WhatsApp</button>
  const optionsFromTo = ['Saltillo - Parras', 'Parras - Saltillo', 'Torreon - Parras', 'Parras - Torreon']; // Tus opciones aquí  
  const optionsTime = ['10:00 AM', '11:00 AM', '12:00 PM']; // Tus opciones aquí
  return (
    (
      <div className="bg-cover bg-center bg-no-repeat bg-fixed bg-[url('/assets/img/bg2.png')]">
        <FormReservar
          open={open}
          setOpen={setOpen}
          setFullname={setFullname}
          setPlaces={setPlaces}
          callback={enviarReservaWhatsApp}
        />
        <div
          // className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-white">
          className="bg-[#000000ab] min-h-screen flex flex-col items-center justify-evenly text-white">
          <header className="flex items-center flex-col space-x-4 mb-12">
            <Image
              src="/logo3.png"
              width={130}
              height={130}
              alt="Rides Ramos"
            />
            <br />
            {/* <BusIcon className="text-green-500 w-8 h-8" /> */}
            {/* <h1 className="text-3xl font-bold">Rides Ramos</h1> */}
          </header>
          <section className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4 text-center">Comprometidos con tu comodidad</h2>
            <p className="mb-8">
              Ofrecemos servicios de transporte a otras ciudades, destacando por nuestra fiabilidad y atención al cliente.
              Viaja con nosotros y experimenta la diferencia.
            </p>
            <div className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4">Horarios & Destinos</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="origin">
                      Origen - Destino
                    </label>
                    <AutoComplete options={optionsFromTo} />
                    {/* <Select onChange={handleOrigenChange} value={origen}>
                      <SelectTrigger id="origin">
                        <SelectValue placeholder="Saltillo" />
                      </SelectTrigger>
                      <SelectContent className="bg-white" position="popper">
                        <SelectItem value="saltillo">Saltillo</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select> */}
                  </div>                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="departure">
                      Fecha
                    </label>
                    <CalendarComponent />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="departure">
                      Horario
                    </label>
                    <AutoComplete options={optionsTime} />
                    {/* <Select onChange={handleSalidaChange} value={salida}>
                      <SelectTrigger id="departure">
                        <SelectValue placeholder="10:00 AM" />
                      </SelectTrigger>
                      <SelectContent className="bg-white" position="popper">
                        <SelectItem value="10am">10:00 AM</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select> */}
                  </div>
                  
                  {/* <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="price">
                      Precio
                    </label>
                    <Select onChange={handlePrecioChange} value={precio}>
                      <SelectTrigger id="price">
                        <SelectValue placeholder="$50" />
                      </SelectTrigger>

                    </Select>
                  </div> */}
                </div>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white flex justify-center items-center py-2 px-4"
                  variant="secondary"
                  onClick={() => setOpen(true)}
                >
                  Reserva ahora
                  <SmartphoneIcon className="ml-2 w-5 h-5" />
                </Button>

              </div>
            </div>
          </section>
        </div>
      </div>
    )
  );
}


function BusIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M8 6v6" />
      <path d="M15 6v6" />
      <path d="M2 12h19.6" />
      <path
        d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
      <circle cx="7" cy="18" r="2" />
      <path d="M9 18h5" />
      <circle cx="16" cy="18" r="2" />
    </svg>)
  );
}


function SmartphoneIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>)
  );
}


function CalendarComponent() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker />
    </LocalizationProvider>
  );
}