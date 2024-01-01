'use client'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
export default function LandingPage() {
  const [open, setOpen] = useState(false);
  useEffect(() => {

    if (open) {
      alert('hey')
    }

    return () => {

    }
  }, [open])

  return (
    // <main className="w-full h-[100vh] bg-gradient-to-r from-blue-500 to-green-500 text-white">
    <main className="w-full h-[100vh] bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <header className="flex justify-between items-center p-8">
        <div className="w-[150px] text-center">
          <Link className="mr-6" href="#">
            <span className="flex gap-[10px]"><BusIcon className="h-6 w-6" /> Rides Ramos</span>
          </Link>
        </div>
        {/* <Grid className="flex gap-4">
          <>
            <>
              <Link className="text-lg font-semibold" href="#">
                Home
              </Link>
            </>
            <>
              <Link className="text-lg font-semibold" href="#">
                Schedules
              </Link>
            </>
            <>
              <Link className="text-lg font-semibold" href="#">
                Contact
              </Link>
            </>
          </>
        </Grid> */}
      </header>
      <section className="container mx-auto flex flex-col items-center justify-center gap-6 px-6 py-12 text-center">
        <h1 className="text-4xl font-bold">Comprometidos con tu comodidad</h1>
        <p className="max-w-[700px] text-lg font-light">
          Ofrecemos servicios de transporte a otras ciudades, destacando por nuestra fiabilidad y atención al cliente. Viaja con nosotros y experimenta la diferencia.
        </p>

        {/* <Button className="bg-white text-black py-3 px-6 text-lg font-bold rounded-md" variant="link">
          Learn More
        </Button> */}
      </section>
      {/* <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-12">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Our Services</h2>
          </CardHeader>
          <CardContent className="text-lg font-light">
            {`We provide top-notch transportation services that prioritize safety, comfort, and punctuality. We're
            committed to making your journey memorable.`}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Book a Ride</h2>
          </CardHeader>
          <CardContent className="text-lg font-light">
            Ready to take a journey with us? Click the button below to book a ride to your preferred city.
          </CardContent>
          <Button className="bg-white text-black py-3 px-6 text-lg font-bold rounded-md mt-4" variant="link">
            Book Now
          </Button>
        </Card>
      </section> */}
      <section className="container mx-auto px-6 py-12">
        <Card>
          <CardHeader className="text-center">
            <h2 className="text-2xl font-bold">Horarios & Destinos</h2>
          </CardHeader>
          <CardContent>
            <table className="w-full text-black">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 text-center">Origen</th>
                  <th className="p-2 text-center">Destino</th>
                  <th className="p-2 text-center">Salida</th>
                  {/* <th className="p-2 text-center">Llegada</th> */}
                  <th className="p-2 text-center">Precio</th>
                  <th className="p-2 text-center"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-y border-gray-300">
                  <td className="p-2 text-center">Saltillo</td>
                  <td className="p-2 text-center">Parras</td>
                  <td className="p-2 text-center">10:00 AM</td>
                  {/* <td className="p-2 text-center">02:00 PM</td> */}
                  <td className="p-2 text-center">$50</td>
                  <td className="p-2 text-center flex gap-2 justify-center">
                    <Button className="bg-green-500 text-white py-2 px-4 text-lg font-bold rounded-md flex gap-2" variant="link">
                      Reserva ahora <WhatsAppIcon />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

function BusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="50"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 6v6" />
      <path d="M15 6v6" />
      <path d="M2 12h19.6" />
      <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
      <circle cx="7" cy="18" r="2" />
      <path d="M9 18h5" />
      <circle cx="16" cy="18" r="2" />
    </svg>
  )
}