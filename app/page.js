import LandingPage from "@/components/home/LandingPage"
import { LandingV2 } from '@/components/home/Landingv2'

async function getData() {
  const res = await fetch('http://localhost:3000/api/schedules')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  const data = await getData()
 
  return <LandingV2/>
}
// import { LandingV2 } from '@/components/home/Landingv2'
// import React from 'react'

// const page = () => {
//   return (

//   )
// }

// export default page