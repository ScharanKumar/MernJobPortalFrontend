import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box,  Button,  CircularProgress, Table, TableCell, TableRow, TableBody, TableContainer, Paper, Container, TableHead, TablePagination } from "@mui/material";
import axios from "axios";
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import WorkIcon from '@mui/icons-material/Work';
// import EventIcon from '@mui/icons-material/Event';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
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
                                                // onClick={() =>
                                                //     handleOpen(
                                                //         student.studentId
                                                //     )
                                                // }
                                                variant="contained"
                                            >
                                                Edit
                                            </Button>
                                            </Link>
                                            <Button
                                                // onClick={() =>
                                                //     handleOpen(
                                                //         student.studentId
                                                //     )
                                                // }
                                                variant="contained"
                                            >
                                                Delete
                                            </Button>
                                            <Link to={`/admin-dashboard/job-applications/${job._id}`} style={{textDecoration:'none'}}>
                                            <Button
                                                // onClick={() =>
                                                //     handleOpen(
                                                //         student.studentId
                                                //     )
                                                // }
                                                variant="contained"
                                            >
                                                Applications
                                            </Button>
                                            </Link>
                                            {/* <Modal
                                                open={
                                                    open === student.studentId
                                                }
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <TextField
                                                        disabled
                                                        id="outlined-disabled"
                                                        label="studentId"
                                                        defaultValue={
                                                            student.studentId
                                                        }
                                                        sx={{
                                                            margin: "10px",
                                                            width: "350px",
                                                        }}
                                                    />
                                                    <TextField
                                                        disabled
                                                        id="outlined-disabled"
                                                        label="Student Name"
                                                        defaultValue={
                                                            student.name
                                                        }
                                                        sx={{
                                                            margin: "10px",
                                                            width: "350px",
                                                        }}
                                                    />
                                                    <TextField
                                                        disabled
                                                        id="outlined-disabled"
                                                        label="class"
                                                        defaultValue={
                                                            student.class
                                                        }
                                                        sx={{
                                                            margin: "10px",
                                                            width: "350px",
                                                        }}
                                                    />
                                                    <TextField
                                                        disabled
                                                        id="outlined-disabled"
                                                        label="schoolId"
                                                        defaultValue={
                                                            student.school[0]
                                                                .schoolId
                                                        }
                                                        sx={{
                                                            margin: "10px",
                                                            width: "350px",
                                                        }}
                                                    />
                                                    {student.batches.map(
                                                        (every) => (
                                                            <TextField
                                                                disabled
                                                                id="outlined-disabled"
                                                                label="Batch Id"
                                                                defaultValue={
                                                                    every.batchId
                                                                }
                                                                sx={{
                                                                    margin: "10px",
                                                                    width: "350px",
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                    {student.courses.map(
                                                        (every) => (
                                                            <TextField
                                                                disabled
                                                                id="outlined-disabled"
                                                                label="Course Id"
                                                                defaultValue={
                                                                    every.courseId
                                                                }
                                                                sx={{
                                                                    margin: "10px",
                                                                    width: "350px",
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Father Name"
                                                        variant="outlined"
                                                        onChange={(e) =>
                                                            setFathername(
                                                                e.target.value
                                                            )
                                                        }
                                                        defaultValue={
                                                            student.fatherName
                                                        }
                                                        sx={{
                                                            margin: "10px",
                                                            width: "350px",
                                                        }}
                                                    />
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Password"
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        variant="outlined"
                                                        onChange={(e) =>
                                                            setPassWord(
                                                                e.target.value
                                                            )
                                                        }
                                                        defaultValue={
                                                            student.password
                                                        }
                                                        sx={{
                                                            margin: "10px",
                                                            width: "350px",
                                                        }}
                                                    />
                                                    <Button
                                                        variant="text"
                                                        color="secondary"
                                                        sx={{
                                                            color: "black",
                                                            marginRight: "10px",
                                                        }}
                                                        onClick={
                                                            toggleShowPassword
                                                        }
                                                    >
                                                        {showPassword
                                                            ? "Hide Password"
                                                            : "Show Password"}
                                                    </Button>

                                                    <Button
                                                        sx={{ color: "black" }}
                                                        onClick={() =>
                                                            updateStudentDetails(
                                                                student.studentId,
                                                                student.password,
                                                                student.fatherName
                                                            )
                                                        }
                                                    >
                                                        Update
                                                    </Button>
                                                </Box>
                                            </Modal> */}
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
    {/* <Box p={2}>
      <Grid container sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}}>
        {jobs.map((job) => (
          <Grid item xs={12} xl={5} key={job._id} sx={{margin:{
            xs:'15px',
            xl:'30px'
          }
          
          }}>
            <Card >
              <Link to={`/admin-dashboard/job-details/${job._id}`} style={{textDecoration:'none'}}>
              
              <CardContent >
                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                  <Box>
                <Typography variant="subtitle1" color="textSecondary" >
                  {job.companyName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {job.jobRole}
                </Typography>
                </Box>
                <img style={{height:'50px', backgroundSize:'cover'}} src={getImageOfCompany(job.companyImage)} alt={job.companyName}/>
                </Box>
                <Box sx={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
                    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start',alignItems:'flex-start',margin:'15px' }}>
                    <Typography variant="body2" color="textSecondary">
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <div>
                        <LocationOnIcon color="primary" />
                        </div>
                        <span style={{marginLeft:'5px'}}>Location</span>
                        </div>
                    
                </Typography>
                
                <Typography variant="body2" >
                  {job.location.join(", ")}
                </Typography>
                    </Box>

                    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start',alignItems:'flex-start',margin:'15px' }}>
                    <Typography variant="body2" color="textSecondary">
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <div>
                        <AttachMoneyIcon color="primary" />
                        </div>
                        <span style={{marginLeft:'5px'}}>Salary</span>
                        </div>
                    
                </Typography>
                
                <Typography variant="body2" >
                {job.salary ? `₹${job.salary}` : "Not Disclosed"}
                </Typography>
                    </Box>
                
                    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start',alignItems:'flex-start',margin:'15px' }}>
                    <Typography variant="body2" color="textSecondary">
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <div>
                        <WorkIcon color="primary" />
                        </div>
                        <span style={{marginLeft:'5px'}}>No of Openings</span>
                        </div>
                    
                </Typography>
                
                <Typography variant="body2" >
                {job.noOfOpenings}
                </Typography>
                    </Box>

                    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start',margin:'15px' }}>
                    <Typography variant="body2" color="textSecondary">
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <div>
                        <EventIcon color="primary" />
                        </div>
                        <span style={{marginLeft:'5px'}}>Apply By:</span>
                        </div>
                    
                </Typography>
                
                <Typography variant="body2" >
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
                </Typography>
                    </Box>
                
                
                 <Typography variant="body2" color="textSecondary">
                  Apply By: {new Date(job.lastDateToApply).toLocaleString('en-US', {
    weekday: 'short', // Day of the week (e.g., "Mon")
    year: 'numeric',
    month: 'short', // Month (e.g., "Sep")
    day: 'numeric', // Day of the month (e.g., 21)
    hour: '2-digit', // Hour (e.g., 10)
    minute: '2-digit', // Minute (e.g., 30)
    second: '2-digit', // Second (e.g., 59)
    hour12: true, // Use AM/PM format
  })}
                </Typography> 
                </Box>
              </CardContent>
              <Box sx={{textAlign:'right'}}>
              <Button >View Details <ArrowForwardIcon color="primary" /></Button>
              </Box>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box> */}
    </>
  );
};

export default JobsList;

