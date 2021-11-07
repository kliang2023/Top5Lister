import { Modal } from "@mui/material";
import { useContext } from 'react';
import { GlobalStoreContext } from '../store'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AuthContext from '../auth'

function DeleteModal() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  let name = store.listMarkedForDeletion.name;
function handleDeleteList(event) {
    store.deleteMarkedList();
}
// function handleCloseModal(event) {
//     store.hideDeleteListModal();
// }
    const [open, setOpen] = React.useState(true);
    // const open = true;
    // const handleClose = () => open=false;
    // const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      store.unmarkListForDeletion();
    }
   
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
          id="delete-modal"
          aria-labelledby="delete-modal-modal-title"
          aria-describedby="delete-modal-description"
        >
          <Box sx={style}>
            Delete the {name} Top 5 List?
            <Button onClick={handleDeleteList}>Confirm</Button>
                <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Modal>
    );
  }
export default DeleteModal;