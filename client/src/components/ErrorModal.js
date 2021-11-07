import { Modal } from "@mui/material";
import { useContext } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AuthContext from '../auth'

function ErrorModal() {
  const { auth } = useContext(AuthContext);
    const [open, setOpen] = React.useState(true);
    // const open = true;
    // const handleClose = () => open=false;
    // const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      auth.changeError();
    }
    console.log("in class")
    console.log(auth.errorMessage)
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
                {auth.errorMessage}
                <Button onClick={handleClose}>OK</Button>
            </Alert>
          </Box>
        </Modal>
    );
  }
export default ErrorModal;