import { Dialog, DialogTitle, DialogActions, DialogContent, Button } from "@mui/material";

const CreateNewResourceDialog = ({ title, children, submit, dialogState, closeDialog }) => {
    return <Dialog fullWidth open={dialogState} onClose={closeDialog}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
        <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button onClick={submit}>Create</Button>
        </DialogActions>
    </Dialog>
}

export default CreateNewResourceDialog;