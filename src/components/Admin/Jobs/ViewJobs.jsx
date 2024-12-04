import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box,  Button,  CircularProgress, Table, TableCell, TableRow, TableBody,
     TableContainer, Paper, Container, TableHead, TablePagination ,
     Dialog,
     DialogActions,
     DialogContent,
     DialogContentText,
     DialogTitle, Snackbar, Alert} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState("")
  const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleDeleteClick = (id) => {
    setSelectedJob(id);
    setOpenDialog(true); 
};

const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
};

const handleSnackbarClose = () => {
    setOpenSnackbar(false);
};

  const handleConfirmDelete = async () => {
 
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
            `${process.env.REACT_APP_API_URL}/admin/delete/job/${selectedJob}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );
        setJobs(jobs.filter((q) => q._id !== selectedJob));
        setOpenDialog(false); 
        showSnackbar(response.data.message);
    } catch (error) {
        console.error("Error deleting Job:", error);
        showSnackbar("Error occured while deleting Job", "error");
    }
};

const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog without deleting
};
  

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };  

  useEffect(() => {
    // Fetch jobs from the API
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/admin/fetch/allJobs`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setJobs(response.data.jobs);
            console.log("RSS",response.data.jobs)
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

//   const getImageOfCompany = (job) => {
    
//     // Step 1: Replace all backslashes with forward slashes
//     const modifiedString = job.replace(/\\/g, '/');
    

//     // Step 2: Find the index of "/uploads"
//     const uploadsIndex = modifiedString.indexOf("/uploads");

//     // Step 3: If "/uploads" exists, extract the substring starting from "/uploads"
//     if (uploadsIndex !== -1) {
//         const extractedString = modifiedString.substring(uploadsIndex); // Extract from "/uploads" to the end
//         const imageUrl = `http://localhost:4000${extractedString.slice(8)}`; // Concatenate with the base URL

//         return (imageUrl) // Return the image URL
//     } else {
//         console.log("No /uploads found in the string");
//         return null; // Return null or handle as needed
//     }
// }



  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
    <Container>
     <TableContainer
                component={Paper}
                elevation={3}
                sx={{
                    marginTop: "10px",
                    overflowX: "auto",
                    width: "100%",
                }}
            >
                <Table sx={{ width: "100%" }}>
                    <TableHead sx={{ width: "100%" }}>
                        <TableRow>
                            <TableCell
                                sx={{
                                    backgroundColor: "green",
                                    color: "white",
                                    fontWeight: "600",
                                }}
                            >
                                Company name
                            </TableCell>
                            <TableCell
                                sx={{
                                    backgroundColor: "green",
                                    color: "white",
                                    fontWeight: "600",
                                    borderWidth: "0px",
                                }}
                            >
                                Job role
                            </TableCell>
                            <TableCell
                                sx={{
                                    backgroundColor: "green",
                                    color: "white",
                                    fontWeight: "600",
                                }}
                            >
                                Location
                            </TableCell>
                            <TableCell
                                sx={{
                                    backgroundColor: "green",
                                    color: "white",
                                    fontWeight: "600",
                                }}
                            >
                                Salary
                            </TableCell>

                            <TableCell
                                sx={{
                                    backgroundColor: "green",
                                    color: "white",
                                    fontWeight: "600",
                                }}
                            >
                                No of openings
                            </TableCell>
                            <TableCell
                                sx={{
                                    backgroundColor: "green",
                                    color: "white",
                                    fontWeight: "600",
                                }}
                            >
                                Apply by
                            </TableCell>
                            <TableCell
                                sx={{
                                    backgroundColor: "green",
                                    color: "white",
                                    fontWeight: "600",
                                }}
                            >
                                Actions
                            </TableCell>
                            {/* <TableCell
                                sx={{
                                    backgroundColor: "green",
                                    color: "white",
                                    fontWeight: "600",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        sx={{ margin: "0px", padding: "0px" }}
                                    >
                                        Last Activity
                                    </Typography>
                                    <Box>
                                        <IconButton
                                            onClick={() =>
                                                handleSortClick("updatedAt")
                                            }
                                        >
                                            <FilterAltIcon />
                                        </IconButton>
                                        <Typography>
                                            {getOrder("updatedAt")}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    backgroundColor: "green",
                                    color: "white",
                                    fontWeight: "600",
                                }}
                            >
                                Actions
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ width: "100%" }}>
                        {jobs
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((job, index) => (
                                <TableRow key={index} sx={{ width: "100%" }}>
                                    <TableCell>{job.companyName}</TableCell>
                                    <TableCell>{job.jobRole}</TableCell>
                                    <TableCell>{job.location.join(", ")}</TableCell>
                                    <TableCell>{job.salary}</TableCell>

                                    <TableCell>
                                        {job.noOfOpenings}
                                    </TableCell>

                                    <TableCell>
                                    {new Date(job.lastDateToApply).toLocaleString('en-US', {
    // weekday: 'short', // Day of the week (e.g., "Mon")
    year: 'numeric',
    month: 'short', // Month (e.g., "Sep")
    day: 'numeric', // Day of the month (e.g., 21)
    hour: '2-digit', // Hour (e.g., 10)
    minute: '2-digit', // Minute (e.g., 30)
    // second: '2-digit', // Second (e.g., 59)
    hour12: true, // Use AM/PM format
  })}
                                    </TableCell>
                                    
                                    <TableCell align="right">
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                gap: "10px",
                                            }}
                                        >
                                          <Link to={`/admin-dashboard/job-details/${job._id}`} style={{textDecoration:'none'}}>
                                            <Button
                                                // onClick={() =>
                                                //     ViewStudentDetails(
                                                //         student.studentId
                                                //     )
                                                // }
                                                variant="contained"
                                            >
                                                View
                                            </Button>
                                            </Link>
                                            <Link
                                            to={`/admin-dashboard/job-edit/${job._id}`} state={{ jobData: job }}
                                            style={{textDecoration:'none'}}>
                                            <Button
                                                
                                                variant="contained"
                                            >
                                                Edit
                                            </Button>
                                            </Link>
                                            <Button
                                            onClick={() =>
                                                handleDeleteClick(
                                                    job._id
                                                )
                                            }
                                                
                                                variant="contained"
                                            >
                                                Delete
                                            </Button>
                                            <Link to={`/admin-dashboard/job-applications/${job._id}`} style={{textDecoration:'none'}}>
                                            <Button
                                                
                                                variant="contained"
                                            >
                                                Applications
                                            </Button>
                                            </Link>
                                            
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 30, 40]}
                    component="div"
                    count={jobs.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
            </Container>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this Job? This
                        action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                    icon={
                        snackbarSeverity === "success" ? (
                            <CheckCircleOutlineIcon fontSize="inherit" />
                        ) : undefined
                    }
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

    </>
  );
};

export default JobsList;

