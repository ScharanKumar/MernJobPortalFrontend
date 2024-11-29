import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function AdminHeader({ handleSidebarToggle, handleLogout }) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const name = localStorage.getItem('name')

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleProfile = () => {
        console.log("profile clicked");
    };

    const handleMenuItemClick = (setting) => {
        if (setting === "Logout") {
            handleLogout();
        } else if (setting === "Profile") {
            handleProfile();
        }
        handleCloseUserMenu();
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: "rgba(224, 224, 224, 0.7)",
                    backdropFilter: "blur(5px)",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    transition: "top 0.3s ease",
                    width: "100%",
                    zIndex: 1100,
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ minHeight: "64px" }}>
                        <IconButton
                            onClick={handleSidebarToggle}
                            sx={{ mr: 2 }}
                            color="info"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexGrow: 1,
                            }}
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/6214/6214076.png"
                                alt="Logo"
                                style={{
                                    height: "40px",
                                    width: "auto",
                                    marginRight: "16px",
                                }}
                            />

                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{
                                    color: "#07752A",
                                    flexGrow: 1,
                                    textAlign: "center",
                                    display: { xs: "none", sm: "block" },
                                }}
                            >
                                <b>{name}</b>
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/6214/6214076.png"
                                alt="School Logo"
                                style={{
                                    height: "40px",
                                    width: "auto",
                                    marginRight: "16px",
                                }}
                            />
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        alt="User Avatar"
                                        src="/static/images/avatar/2.jpg"
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={() =>
                                            handleMenuItemClick(setting)
                                        }
                                    >
                                        <Typography textAlign="center">
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {/* Page content goes here */}
            <Box sx={{ marginTop: "65px" }}></Box>
        </>
    );
}

export default AdminHeader;
