// import { Box } from "@mui/material";
// import React, { useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import AdminFooter from "./AdminFooter";
// import AdminHeader from "./AdminHeader";
// import AdminSidebar from "./AdminSidebar";

// const AdminDashboard = () => {
//     const [sidebarOpen, setSidebarOpen] = useState(true);

//     const handleSidebarToggle = () => {
//         if (window.innerWidth <= 768) {
//             if (window.innerWidth <= 768 && window.scrollY !== 0) {
//                 window.scrollTo({ top: 0, behavior: "smooth" });
//                 setSidebarOpen(true);
//             }
//             if (window.innerWidth <= 768 && window.scrollY === 0) {
//                 window.scrollTo({ top: 0, behavior: "smooth" });
//                 setSidebarOpen(!sidebarOpen);
//             }
//         } else setSidebarOpen(!sidebarOpen);
//     };

//     const navigate = useNavigate();
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/");
//     };

//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 minHeight: "100vh",
//             }}
//         >
//             <Box>
//                 <AdminHeader
//                     handleSidebarToggle={handleSidebarToggle}
//                     handleLogout={handleLogout}
//                 />
//             </Box>

//             <Grid2 container sx={{ flex: { xs: "none", md: 1 } }}>
                
//                 <Grid2
//                     item
//                     xs={12}
//                     md={2}
//                     sx={{
//                         display: sidebarOpen ? "flex" : "none",
//                         flexDirection: "column",
//                         transition: "all 0.3s ease",
//                         opacity: sidebarOpen ? 1 : 0,
//                         width: sidebarOpen ? "auto" : 0,         
//                         backgroundColor: "rgba(224, 224, 224, 0.7)",    
//                         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                       
//                     }}
//                 >
//                     <AdminSidebar />
//                 </Grid2>
//                 <Grid2
//                     item
//                     xs={12}
//                     md={sidebarOpen ? 10 : 12}
//                     sx={{
//                         display: "flex",
//                         flexDirection: "column",
//                         flex: 1,
//                         backgroundColor: "#F9F8F6",
//                         transition: "width 0.3s ease",
//                         padding: 2,
//                     }}
//                 >
//                     <Outlet /> {/* This will render the matched child route */}
//                 </Grid2>
//             </Grid2>
//             <Box sx={{ mt: "auto" }}>
//                 <AdminFooter />
//             </Box>
           
//         </Box>
//     );
// };

// export default AdminDashboard;

import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleSidebarToggle = () => {
        if (window.innerWidth <= 768) {
            if (window.scrollY !== 0) {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setSidebarOpen(true);
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setSidebarOpen(!sidebarOpen);
            }
        } else setSidebarOpen(!sidebarOpen);
    };

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        navigate("/admin/login");
    };

    return (

        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Box>
                <AdminHeader
                    handleSidebarToggle={handleSidebarToggle}
                    handleLogout={handleLogout}
                />
            </Box>

            <Grid container sx={{ flex: { xs: "none", md: 1 } }}>
                <Grid
                    item
                    xs={12}
                    md={2}
                    sx={{
                        display: sidebarOpen ? "flex" : "none",
                        flexDirection: "column",
                        transition: "all 0.3s ease",
                        opacity: sidebarOpen ? 1 : 0,
                        width: sidebarOpen ? "auto" : 0,         
                        backgroundColor: "rgba(224, 224, 224, 0.7)",    
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                       
                    }}
                >
                    <AdminSidebar />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={sidebarOpen ? 10 : 12}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        backgroundColor: "#F9F8F6",
                        transition: "width 0.3s ease",
                        padding: 2,
                    }}
                >
                    <Outlet /> {/* This will render the matched child route */}
                </Grid>
            </Grid>
            <Box sx={{ mt: "auto" }}>
                <AdminFooter />
            </Box>
           
        </Box>
    );
};

export default AdminDashboard;

