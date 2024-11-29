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

export default function UserSidebar() {
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
                        onClick={() => handleNavigation("/user-dashboard")}
                       
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
                        <ListItemText primary="Jobs" />
                        {open.job ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={open.job} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => handleNavigation("/user-dashboard/jobs/openToApply")}
                                sx={{ ...listItemButtonStyles, pl: 4 }}
                            >
                                <ListItemText primary="Open To Apply" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => handleNavigation("/user-dashboard/jobs/applied")}
                                sx={{ ...listItemButtonStyles, pl: 4 }}
                            >
                                <ListItemText primary="Applied" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => handleNavigation("/user-dashboard/jobs/notApplied")}
                                sx={{ ...listItemButtonStyles, pl: 4 }}
                            >
                                <ListItemText primary="Not Applied" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => handleNavigation("/user-dashboard/jobs/shortlisted")}
                                sx={{ ...listItemButtonStyles, pl: 4 }}
                            >
                                <ListItemText primary="Shortlisted" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => handleNavigation("/user-dashboard/jobs/not-shortlisted")}
                                sx={{ ...listItemButtonStyles, pl: 4 }}
                            >
                                <ListItemText primary="Rejected" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Collapse>

                
            </List>
        </Box>
    );
}
