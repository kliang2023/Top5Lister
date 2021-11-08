import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    // const [disabled, setDisabled] = React.useState(true);
    let enabledButtonClass = "top5-button";
    function handleUndo() {
        store.undo();
        if (!store.canUndo())
        {
            document.getElementById('undo-button').classList.add('top5-button-disabled');
        }
    }
    function handleRedo() {
        store.redo();
        if (!store.canRedo())
        {
            document.getElementById('redo-button').classList.add('top5-button-disabled');
        }
    }
    function handleClose() {
        // history.push("/");
        store.closeCurrentList();
    }
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }  
    let status1 = true;
    if (store.canUndo()){
        status1 = false;
        document.getElementById('undo-button').classList.remove('top5-button-disabled');
    }
    let status2 = true;
    if (store.canRedo()){
        status2 = false;
        document.getElementById('redo-button').classList.remove('top5-button-disabled');
    }
    return (
        <div id="edit-toolbar">
            <Button 
            disabled={status1}
            className={enabledButtonClass}
                id='undo-button'
                onClick={handleUndo}
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button 
            disabled={status2}
            className={enabledButtonClass}
            // class='top5-button-disabled'
                id='redo-button'
                onClick={handleRedo}
                variant="contained">
                    <RedoIcon />
            </Button>
            <Button 
            className={enabledButtonClass}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                    <CloseIcon />
            </Button>
        </div>
    )
}

export default EditToolbar;