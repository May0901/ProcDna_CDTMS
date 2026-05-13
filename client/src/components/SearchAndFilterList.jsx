import {
    Box,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    IconButton
} from "@mui/material";
import { capitalize } from "@mui/material/utils"
import {
    useMemo,
    useState
} from "react";
import useDebounce from "../hooks/useDebounce";

const formatLabel = (label = "") => {
    return label.split("_")
        .map(s => capitalize(s))
        .join(" ")
}

const SearchAndFilterList = ({ listItem, navigateTo, onDelete, data = [], filterKey = [] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 400);
    const [filtersApplied, setFiltersApplied] = useState({});

    const filters = useMemo(() => {
        return filterKey
            .map((key) => {
                const uniqueValues = [
                    ...new Set(
                        data
                            .map((item) => item[key])
                            .filter(Boolean)
                    )
                ];
                if (uniqueValues.length === 0) {
                    return null;
                }
                return {
                    key,
                    label: formatLabel(key),
                    menuItems: ["All", ...uniqueValues]
                };
            })
            .filter(Boolean);

    }, [data, filterKey]);

    const filteredItems = useMemo(() => {
        let result = [...data];
        Object.entries(filtersApplied).forEach(([key, value]) => {
            if (value === "All") return;
            result = result.filter((item) => {
                return item[key] === value;
            });

        });

        if (debouncedSearchTerm.trim().length >= 3) {
            const lowerSearch = debouncedSearchTerm.toLowerCase();
            result = result.filter((item) => {
                return Object.values(item).some((value) => {
                    if (!value) {
                        return false;
                    }
                    return value
                        .toString()
                        .toLowerCase()
                        .includes(lowerSearch);

                });
            });
        }
        return result;

    }, [data, filtersApplied, debouncedSearchTerm]);

    const onSearchTermChange = (value) => {
        setSearchTerm(value);
    }

    const onSelectChange = (value, key) => {
        setFiltersApplied((prev) => ({
            ...prev,
            [key]: value
        }));

    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "3rem"
            }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem"
                }}>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "2rem"
                    }}
                >
                    <TextField
                        value={searchTerm}
                        onChange={(evt) =>
                            onSearchTermChange(evt.target.value)
                        }
                        sx={{ flex: 1, minWidth: "300px" }}
                        label="Search"
                    />
                    <Box
                        sx={{
                            flex: 2,
                            display: "flex",
                            gap: "1rem",
                            flexWrap: "wrap"
                        }}
                    >
                        {
                            filters.map((filter) => {
                                const { label, menuItems, key } = filter;
                                return (
                                    <FormControl
                                        key={key}
                                        sx={{ minWidth: "180px" }}
                                    >
                                        <InputLabel id={`${key}-label`}>
                                            {label}
                                        </InputLabel>
                                        <Select
                                            labelId={`${key}-label`}
                                            label={label}
                                            value={
                                                filtersApplied[key] || "All"
                                            }
                                            onChange={(evt) =>
                                                onSelectChange(
                                                    evt.target.value,
                                                    key
                                                )
                                            }
                                        >
                                            {
                                                menuItems.map((item) => (
                                                    <MenuItem
                                                        key={item}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                );

                            })
                        }

                    </Box>
                </Box>
            </Box>
            <List>
                {
                    filteredItems.map((item) => {
                        return listItem({ item, navigateTo, deleteItem: onDelete })
                    })
                }
            </List>
        </Box>
    );
};

export default SearchAndFilterList;