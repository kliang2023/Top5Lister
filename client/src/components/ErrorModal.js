import { Modal } from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

 function ErrorModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const message = "";
    
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
    return (
        <Modal
          open={open}
          id="error-modal"
          aria-labelledby="error-modal-modal-title"
          aria-describedby="error-modal-description"
        >
          <Box sx={style}>
            <Alert severity="error">
                <AlertTitle>Error!</AlertTitle>
                {message}
                <Button onClick={handleClose}></Button>
            </Alert>
          </Box>
        </Modal>
    );
  }
export default ErrorModal;