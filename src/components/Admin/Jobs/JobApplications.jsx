// import axios from "axios"
// import { useState, useEffect } from "react"
// import CircularProgress from '@mui/material/CircularProgress';
// import {
//     Box,
//     // Button,
//     // Collapse,
//     // Grid,
//     // List,
//     // ListItem,
//     // ListItemButton,
//     // ListItemIcon,
//     // ListItemText,
//     // Tab,
//     // Tabs,
//     // Typography,
//     // Container,
// } from "@mui/material";

// const ViewJobs = ()=>{
//     const [allJobs, setAllJobs] = useState([])
//     const [loading, setLoading]=useState(true)
//     const fetchAllJobs = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await axios.get(
//                 `${process.env.REACT_APP_API_URL}/admin/fetch/allJobs`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             console.log("all jobs : ", response)
//             setAllJobs(response.data.jobs)
//             setLoading(false)

//             // setBatches(response.data);
//         } catch (error) {
//             console.error("Error fetching jobs:", error);
//         }
//     };

//     useEffect(() => {
//         fetchAllJobs();
//     }, []);
//     return (
//         <>
//         {loading && (
//             <Box
//                 sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     minHeight: "100vh",
//                 }}
//             >
//                 <CircularProgress />
//             </Box>
//         )}
//         {!loading &&
//         (
//             <p>View Jobs</p>
//         )}
//         </>
//     )
// }

// export default ViewJobs

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Button, Typography, Grid, CircularProgress } from "@mui/material";
import axios from "axios";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);


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

  const getImageOfCompany = (job) => {
    
    // Step 1: Replace all backslashes with forward slashes
    const modifiedString = job.replace(/\\/g, '/');
    

    // Step 2: Find the index of "/uploads"
    const uploadsIndex = modifiedString.indexOf("/uploads");

    // Step 3: If "/uploads" exists, extract the substring starting from "/uploads"
    if (uploadsIndex !== -1) {
        const extractedString = modifiedString.substring(uploadsIndex); // Extract from "/uploads" to the end
        const imageUrl = `http://localhost:4000${extractedString.slice(8)}`; // Concatenate with the base URL

        return (imageUrl) // Return the image URL
    } else {
        console.log("No /uploads found in the string");
        return null; // Return null or handle as needed
    }
}



  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Grid container sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}}>
        {jobs.map((job) => (
          <Grid item xs={12} xl={5} key={job._id} sx={{margin:{
            xs:'15px',
            xl:'30px'
          }
          
          }}>
            <Card >
              <Link to={`/admin-dashboard/job-applications/${job._id}`} style={{textDecoration:'none'}}>
              
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
                
                
                {/* <Typography variant="body2" color="textSecondary">
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
                </Typography> */}
                </Box>
              </CardContent>
              <Box sx={{textAlign:'right'}}>
              <Button >View Applications <ArrowForwardIcon color="primary" /></Button>
              </Box>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default JobsList;

