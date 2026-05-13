import { Box, Card, List, ListItem, ListItemText, Typography } from "@mui/material";
import FeaturedPlayListOutlined from "@mui/icons-material/FeaturedPlayListOutlined"
import DeleteIcon from "@mui/icons-material/Delete"
const ClinicalTrials = (props) => {

    const clinicalTrials = props.clinicalTrials;

    if (clinicalTrials.length === 0) {
        return <Box>
            <FeaturedPlayListOutlined
                sx={{
                    height: "250px",
                    width: "250px",
                    color: '#bdbdbd'
                }}
            />
            <Typography variant="h5" align="center">
                No Clinical Trial
            </Typography>
        </Box>
    }

    return <List sx={{
        maxWidth: '80%',
        margin: 'auto'
    }}>
        {
            clinicalTrials.map((trial) => {
                return <ListItem
                    sx={{
                        borderRadius: '10px',
                        border: '1px solid #bdbdbd',
                        marginBottom: "1rem",
                    }}
                    secondaryAction={
                        <DeleteIcon />
                    }
                >
                    <ListItemText
                        primary={trial}
                        secondary={trial}
                    />
                </ListItem>
            })
        }
    </List >
}

export default ClinicalTrials;