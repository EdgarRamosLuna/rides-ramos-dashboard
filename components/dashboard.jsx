'use client'
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MapIcon from '@mui/icons-material/Map';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import GroupIcon from '@mui/icons-material/Group';
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
export function Dashboard({ children }) {
  let pathname = usePathname();
  pathname = pathname.replaceAll('/', "");
  return (
    (<div className="flex flex-col h-screen w-full">
      {/* <header
        className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <div className="w-full flex-1">
          <form>
            <div className="relative">
              <SearchIcon
                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="w-full bg-white shadow-none appearance-none pl-8 dark:bg-gray-950"
                placeholder="Search information..."
                type="search" />
            </div>
          </form>
        </div>
      </header> */}
      <div className="flex flex-grow">
        <aside className="w-64 border-r bg-gray-100/40 dark:bg-gray-800/40">
          <nav className="flex flex-col p-6">
            <Link
              className={`mb-4 flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathname === '' ? 'text-gray-900' : 'text-gray-500'}`}
              href="/">
              <DashboardIcon className="h-4 w-4" />
              Dashboard
            </Link>
            {/* <Link
              className={`mb-4 flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathname === 'travels' ? 'text-gray-900':'text-gray-500'}`}
              href="/reports">
              <FileIcon className="h-4 w-4" />
              Reportes
            </Link> */}
            <Link
              className={`mb-4 flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathname === 'travels' ? 'text-gray-900' : 'text-gray-500'}`}
              href="/travels">
              <MapIcon className="h-4 w-4" />
              Viajes
            </Link>
            <Link
              className={`mb-4 flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathname === 'schedules' ? 'text-gray-900' : 'text-gray-500'}`}
              href="/schedules">
              <CalendarMonthIcon className="h-4 w-4" />
              Horarios
            </Link>
            <Link
              className={`mb-4 flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathname === 'drivers' ? 'text-gray-900' : 'text-gray-500'}`}
              href="/drivers">
              <DriversIcon className="h-4 w-4" />
              Choferes
            </Link>
            <Link
              className={`mb-4 flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathname === 'units' ? 'text-gray-900' : 'text-gray-500'}`}
              href="/units">
              <AirportShuttleIcon className="h-4 w-4" />
              Unidades
            </Link>
            <Link
              className={`mb-4 flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathname === 'users' ? 'text-gray-900' : 'text-gray-500'}`}
              href="/users">
              <GroupIcon className="h-4 w-4" />
              Usuarios
            </Link>

            <Link
              className={`mb-4 flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-gray-500`}
              href="#">
              <LogoutIcon className="h-4 w-4" />
              Logout
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <>
          
            {children}
            {/* <CardHeader className="pb-4">
              <CardTitle>Information Card</CardTitle>
              <CardDescription>A brief description of the information being displayed</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Here is where the main content will be.</p>
            </CardContent> */}
          </>
        </main>
      </div>
    </div>)
  );
}


function DriversIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2">
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2" />
      <line x1="12" y1="5" x2="12" y2="9" />
      <line x1="12" y1="15" x2="12" y2="19" />
      <line x1="5" y1="12" x2="9" y2="12" />
      <line x1="15" y1="12" x2="19" y2="12" />
    </svg>
  );
}


function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>)
  );
}

function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>)
  );
}


function FileIcon(props) {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>)
  );
}


function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>)
  );
}


function SettingsIcon(props) {
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
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>)
  );
}
