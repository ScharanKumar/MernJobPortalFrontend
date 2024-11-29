import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState({
        job: false,
    });

    const handleClick = (item) => {
        setOpen((prevState) => ({
            ...prevState,
            [item]: !prevState[item],
        }));
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const listItemButtonStyles = {
        "&:hover": {
            backgroundColor: "#d4edda", // Light green color for hover
            color: "black",
        },
    };

    return (
        <Box>
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => handleNavigation("/admin-dashboard")}
                       
                        sx={listItemButtonStyles}
                    >
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => handleClick("job")}
                        sx={listItemButtonStyles}
                    >
                        <ListItemText primary="Manage Job" />
                        {open.job ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={open.job} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => handleNavigation("/admin-dashboard/create-job")}
                                sx={{ ...listItemButtonStyles, pl: 4 }}
                            >
                                <ListItemText primary="Create Job" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => handleNavigation("/admin-dashboard/view-jobs")}
                                sx={{ ...listItemButtonStyles, pl: 4 }}
                            >
                                <ListItemText primary="View Jobs" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => handleNavigation("/admin-dashboard/job-applications")}
                                sx={{ ...listItemButtonStyles, pl: 4 }}
                            >
                                <ListItemText primary="Job applications" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </Box>
    );
}
