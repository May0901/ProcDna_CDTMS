import { Box, Grid, TextareaAutosize, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const NewClinicalTrial = ({ updateDataField }) => {

    return <Box sx={{
        marginTop: "0.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
    }}>
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <TextField
                onChange={(evt) => updateDataField("title", evt.target.value)}
                fullWidth
                label="Title"
                variant="outlined"
            />
            <TextField
                onChange={(evt) => updateDataField("therapeutic_area", evt.target.value)}
                fullWidth
                label="Therapeutic area"
                variant="outlined"
            />
        </Box>
        <TextField
            onChange={(evt) => updateDataField("objective", evt.target.value)}
            multiline rows={3} label="Objective" variant="outlined" />
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <TextField
                onChange={(evt) => updateDataField("location", evt.target.value)}
                variant="outlined"
                label="Location"
            />
            <TextField
                onChange={(evt) => updateDataField("phase", evt.target.value)}
                variant="outlined"
                label="Phase"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker
                    onChange={(evt) => updateDataField("start_date", evt.format("YYYY-MM-DD"))}
                />
            </LocalizationProvider>
        </Box>
    </Box >
}

export default NewClinicalTrial;