import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormReservar({ open, setOpen, callback, setFullname,  setPlaces }) {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className='text-center'>Completar reservacion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, complete los datos necesarios para finalizar su reserva. Nos contactaremos pronto para confirmar su viaje. ¡Gracias!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Tu nombre"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setFullname(e.target.value)}
                        autoComplete='off'
                    />
                    <TextField
                        margin="dense"
                        id="places"
                        label="Canitdad de lugares"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setPlaces(e.target.value)}
                        autoComplete='off'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error" variant="outlined">Cancelar</Button>
                    <Button onClick={callback} color="success" variant="outlined">Confirmar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
