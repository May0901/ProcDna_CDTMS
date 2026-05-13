import { Box, Button, ListItem, ListItemText, IconButton, Typography, Container } from "@mui/material";
import ClinicalTrials from "../components/ClinicalTrials";
import NewClinicalTrial from "../components/NewClinicalTrial";
import SearchAndFilterList from "../components/SearchAndFilterList";
import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";
import CreateClinicalTrial from "../components/CreateClinicalTrial";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteClinicalTrialById } from "../services/api";
import { useAuthStore } from "../store";

const ClinicalTrialListItem = ({ navigateTo, item, deleteItem }) => {
    const { role } = useAuthStore(state => state.user)
    return <ListItem
        key={item.id}
        sx={{
            borderRadius: "10px",
            border: "1px solid #bdbdbd",
            marginBottom: "1rem",
            cursor: 'pointer'
        }}
        secondaryAction={
            role === "admin" && <IconButton
                onClick={() => deleteItem(item.id)}
            >
                <DeleteIcon />
            </IconButton>
        }
    >
        <ListItemText
            onClick={() => navigateTo(item.id)}
            primary={`${item.title} (${item.phase}, ${item.status})`}
            secondary={`${item.objective}`}
        />
    </ListItem>
}


const Dashboard = () => {
    const { clinicalTrials: initialClinicalTrials } = useLoaderData();
    const [clinicalTrials, setClinicalTrials] = useState(initialClinicalTrials);
    const navigate = useNavigate();
    const user = useAuthStore(state => state.user);
    const isEmpty = clinicalTrials.length === 0;

    const updateClinicalTrials = (newClinicalTrial) => {
        setClinicalTrials(curr => [...curr, newClinicalTrial])
    }

    const onDeleteClinicalTrial = async (trialId) => {
        const result = await deleteClinicalTrialById(trialId);
        if (!result.success) {
            // Inform user via dialog/Alerts
            return;
        }
        const filteredClinicalTrial = clinicalTrials.filter(trial => trial.id !== trialId);
        setClinicalTrials(filteredClinicalTrial)
    }

    const showDetailedClinicalTrial = (id) => {
        const clinicalTrial = clinicalTrials.find(ct => ct.id === id);
        navigate(`/dashboard/${id}`, {
            state: clinicalTrial
        })
    }

    return <Container sx={{ height: '100%' }}>
        <Box sx={{ marginBottom: "2rem", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h4">Clinical Trials ({clinicalTrials.length})</Typography>
            {
                user.role === "admin" && <CreateClinicalTrial refreshData={updateClinicalTrials} />
            }
        </Box>
        <Box>
            {isEmpty ?
                <Typography sx={{}} align="center" variant="h5">NO CLINICAL TRIALS</Typography>
                : <SearchAndFilterList
                    navigateTo={showDetailedClinicalTrial}
                    onDelete={onDeleteClinicalTrial}
                    data={clinicalTrials}
                    filterKey={["title", "phase", "therapeutic_area", "status"]}
                    listItem={(props) => <ClinicalTrialListItem {...props} />}
                />
            }
        </Box>
    </Container >
}

export default Dashboard;