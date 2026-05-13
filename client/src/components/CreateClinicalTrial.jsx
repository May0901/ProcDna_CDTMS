import { DialogTitle, DialogActions, Dialog, Button, DialogContent } from "@mui/material"
import Add from "@mui/icons-material/Add";
import { useState } from "react";
import NewClinicalTrial from "./NewClinicalTrial";
import { createNewClinicalTrial } from "../services/api";
import CreateNewResourceDialog from "./CreateNewResourceDialog";

const CreateClinicalTrial = ({ refreshData }) => {
    const [clinicalTrialData, setClinicalTrialData] = useState({
        title: "",
        location: "",
        objective: "",
        start_date: "",
        phase: "",
        therapeutic_area: "",
    });

    const [dialogState, setDialogState] = useState(false);

    const closeDialog = () => {
        setDialogState(false)
    }

    const openDialog = () => {
        setDialogState(true)
    }

    const createClinicalTrial = async () => {
        const result = await createNewClinicalTrial(clinicalTrialData)
        if (!result.success) {
            // Inform user via dialog/Alerts
            return;
        }
        refreshData({
            id: result.trialId,
            status: "Active",
            ...clinicalTrialData
        });
        closeDialog();
    }

    const updateDataField = (field, value) => {
        setClinicalTrialData(
            (prev) => ({ ...prev, [field]: value })
        )
    }

    return <>
        <Button sx={{ color: "#fff", backgroundColor: '#212121' }} onClick={openDialog} endIcon={<Add />}>
            Create New Trial
        </Button>
        <CreateNewResourceDialog
            title="New Clinical Trial"
            closeDialog={closeDialog}
            submit={createClinicalTrial}
            dialogState={dialogState}
        >
            <NewClinicalTrial updateDataField={updateDataField} />
        </CreateNewResourceDialog>
    </>
}

export default CreateClinicalTrial;