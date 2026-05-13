import { Box, Container, ListItem, ListItemText, IconButton, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import CreateClinicalTrial from "../components/CreateClinicalTrial";
import AddParticipant from "../components/AddParticipant";
import SearchAndFilterList from "../components/SearchAndFilterList";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteParticipantById, updateClinicalTrial } from "../services/api";
import { useAuthStore } from "../store";
import Check from "@mui/icons-material/Check"
import dayjs from "dayjs";

const ParticipantListItem = ({ navigateTo, item, deleteItem }) => {
    return <ListItem
        key={item.id}
        sx={{
            borderRadius: "10px",
            border: "1px solid #bdbdbd",
            marginBottom: "1rem",
            cursor: typeof navigateTo === 'function' ? "cursor" : "default"
        }}
        secondaryAction={
            <IconButton onClick={
                () => deleteItem(item.id)}>
                <DeleteIcon />
            </IconButton>
        }
    >
        <ListItemText
            onClick={() => navigateTo(item.id)}
            primary={`${item.name} (${item.age})`}
            secondary={`${item.gender}, ${item.enrollment_status}, ${item.location}`}
        />
    </ListItem>
}


const ClinicalTrialDetailPage = () => {
    const { state } = useLocation();
    const [participants, setParticipants] = useState(state.participants || []);
    const { role } = useAuthStore(state => state.user)
    const updateParticipantData = (participantData) => {
        setParticipants(curr => [...curr, participantData])
    }
    const navigate = useNavigate();
    const isEmpty = participants.length === 0;

    const onDeleteParticipant = async (participantId) => {
        const result = await deleteParticipantById(state.id, participantId);
        if (!result.success) {
            // Inform user via dialog/Alerts
            return;
        }
        const filteredClinicalTrial = participants.filter(trial => trial.id !== participantId);
        setParticipants(filteredClinicalTrial)
    }

    const markClinicalTrialComplete = async () => {
        const result = await updateClinicalTrial(state.id, {
            status: "Completed",
            end_date: dayjs().format("YYYY-MM-DD")
        });
        if (!result.success) {
            // Inform user via dialog/Alerts
            return;
        }
        // Cause refetch of data
        navigate("/dashboard", { replace: true });
    }

    return <Container sx={{ height: '100%' }}>
        <Box sx={{ marginBottom: "2rem", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Typography variant="h4">
                    {state?.title}
                </Typography>
                <Typography>
                    {
                        state.status === "Active" ? "Active" : "Completed"
                    }
                </Typography>
            </Box>
            {
                role === "admin" && state.status === "Active" &&
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                    <Button onClick={markClinicalTrialComplete} sx={{ color: "#fff" }} variant="contained" endIcon={<Check />}>Mark Complete</Button>
                    <AddParticipant refreshData={updateParticipantData} trialId={state.id} />
                </Box>
            }
        </Box>
        <Box>
            {
                isEmpty ?
                    <Typography sx={{}} align="center" variant="h5">NO PARTICIPANTS</Typography> :
                    <SearchAndFilterList
                        onDelete={onDeleteParticipant}
                        data={participants}
                        filterKey={["gender", "location"]}
                        listItem={(props) => <ParticipantListItem {...props} />}
                    />
            }
        </Box>
    </Container>
}

export default ClinicalTrialDetailPage;