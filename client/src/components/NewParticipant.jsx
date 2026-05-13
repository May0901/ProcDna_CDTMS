import { Box, FormControl, Select, Grid, InputLabel, MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const NewParticipant = ({ updateDataField }) => {

    return <Box sx={{
        marginTop: "0.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
    }}>
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <TextField
                onChange={(evt) => updateDataField("name", evt.target.value)}
                fullWidth
                label="Name"
                variant="outlined"
            />
            <FormControl sx={{ minWidth: '200px' }}>
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                    label="Gender"
                    id="gender"
                    onChange={(evt) => updateDataField("gender", evt.target.value)}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </Select>
            </FormControl>

        </Box>
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <TextField
                fullWidth
                onChange={(evt) => updateDataField("age", evt.target.value)}
                label="age"
                variant="outlined"
            />
            <TextField
                fullWidth
                onChange={(evt) => updateDataField("location", evt.target.value)}
                variant="outlined"
                label="Location"
            />
        </Box>
    </Box >
}

export default NewParticipant;