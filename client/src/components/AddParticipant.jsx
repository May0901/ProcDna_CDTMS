import { DialogTitle, DialogActions, Dialog, Button, DialogContent } from "@mui/material"
import Add from "@mui/icons-material/Add";
import { useState } from "react";
import NewClinicalTrial from "./NewClinicalTrial";
import { addNewParticipant } from "../services/api";
import CreateNewResourceDialog from "./CreateNewResourceDialog";
import NewParticipant from "./NewParticipant";

const AddParticipant = ({ refreshData, trialId }) => {
    const [participant, setParticipant] = useState({
        name: "",
        age: "",
        gender: "",
        location: "",
        enrollment_status: ""
    });

    const [dialogState, setDialogState] = useState(false);

    const closeDialog = () => {
        setDialogState(false)
    }

    const openDialog = () => {
        setDialogState(true)
    }

    const addParticipant = async () => {
        const result = await addNewParticipant(trialId, participant)
        if (!result.success) {
            // Inform user via dialog/Alerts
            return;
        }
        refreshData({
            id: result.participantId,
            ...participant
        });
        closeDialog();
    }

    const updateDataField = (field, value) => {
        setParticipant(
            (prev) => ({ ...prev, [field]: value })
        )

    }

    return <>
        <Button sx={{ color: "#fff", backgroundColor: '#212121' }} onClick={openDialog} endIcon={<Add />}>
            Add Participant
        </Button>
        <CreateNewResourceDialog
            title="Add New Participant"
            closeDialog={closeDialog}
            dialogState={dialogState}
            submit={addParticipant}
        >
            <NewParticipant updateDataField={updateDataField} />
        </CreateNewResourceDialog>
    </>

}

export default AddParticipant;