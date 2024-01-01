import MainContext from '@/context/MainContext'
import { Button } from '@mui/material'
import React, { useContext } from 'react'

const HeaderButtons = ({ pathname }) => {

    const {
        setOpenSchedulesModal,
        setOpenTravelsModal,
        setOpenDriversModal,
        setOpenUnitsModal,
        setOpenUsersModal,
    } = useContext(MainContext);




    const ButtonsComponents = {
        'schedules': <Button variant="outlined" onClick={() => setOpenSchedulesModal(true)}>Agregar nuevo horario</Button>,
        'travels': <Button variant="outlined" onClick={() => setOpenTravelsModal(true)}>Agendar nuevo viaje</Button>,
        'drivers': <Button variant="outlined" onClick={() => setOpenDriversModal(true)}>Agregar nuevo chofer</Button>,
        'units': <Button variant="outlined" onClick={() => setOpenUnitsModal(true)}>Agregar nueva unidad</Button>,
        'users': <Button variant="outlined" onClick={() => setOpenUsersModal(true)}>Agregar nuevo usuario</Button>,
    }
    return (
        <>
            {ButtonsComponents[pathname]}
        </>
    )
}

export default HeaderButtons