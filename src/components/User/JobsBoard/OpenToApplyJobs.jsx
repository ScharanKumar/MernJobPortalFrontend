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
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/user/fetch/openToApply/jobs`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("OPEN", response)
            setJobs(response.data.jobs);
            
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
      finally {
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
    <>
    {jobs.length===0 &&
    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', minHeight:'80%'}}>
      <img style={{width:'40%', backgroundSize:'cover'}} src="https://res.cloudinary.com/saikrishnaboga-ccbp-tech/image/upload/v1643992995/Book-Hub%20/Group_7522failureView_xgsn7l.png" alt="errorIMG"/>
      <p style={{marginTop:'10px', fontSize:'20px'}}>Nothing is avaliable here.</p>
      </Box>
    }
    {jobs.length !==0 && 
    <Box p={2}>
      <Grid container sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}}>
        {jobs.map((job) => (
          <Grid item xs={12} xl={5} key={job._id} sx={{margin:{
            xs:'15px',
            xl:'30px'
          }
          
          }}>
            <Card sx={{borderColor:'#d0d0d0', borderStyle:'solid', borderWidth:'1px', borderRadius:'15px'}} >
              <Link to={`/user-dashboard/job-details/apply/${job._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <CardContent>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                  <Box>
                <Typography sx={{fontSize:'16px', color:"#3b3939"}} >
                  {job.companyName}
                </Typography>
                <Typography sx={{fontSize:'20px', color:'black'}} >
                  {job.jobRole}
                </Typography>
                </Box>
                <img style={{height:'50px', backgroundSize:'cover'}} src={getImageOfCompany(job.companyImage)} alt={job.companyName}/>
                </Box>
                <Box sx={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
                    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start',alignItems:'flex-start',margin:'15px' }}>
                    <Typography sx={{fontSize:'14px', color:"#6e6a6a"}}>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <div>
                        <LocationOnIcon sx={{color:"#1223ed"}}/>
                        </div>
                        <span style={{marginLeft:'5px'}}>Location</span>
                        </div>
                    
                </Typography>
                
                <Typography sx={{fontSize:'16px', color:"#3b3939"}} >
                  {job.location.join(", ")}
                </Typography>
                    </Box>

                    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start',alignItems:'flex-start',margin:'15px' }}>
                    <Typography sx={{fontSize:'14px', color:"#6e6a6a"}}>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <div>
                        <AttachMoneyIcon sx={{color:"#1223ed"}} />
                        </div>
                        <span style={{marginLeft:'5px'}}>Salary</span>
                        </div>
                    
                </Typography>
                
                <Typography sx={{fontSize:'16px', color:"#3b3939"}} >
                {job.salary ? `₹${job.salary}` : "Not Disclosed"}
                </Typography>
                    </Box>
                
                    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start',alignItems:'flex-start',margin:'15px' }}>
                    <Typography sx={{fontSize:'14px', color:"#6e6a6a"}}>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <div>
                        <WorkIcon sx={{color:"#1223ed"}} />
                        </div>
                        <span style={{marginLeft:'5px'}}>No of openings</span>
                        </div>
                    
                </Typography>
                
                <Typography sx={{fontSize:'16px', color:"#3b3939"}} >
                {job.noOfOpenings}
                </Typography>
                    </Box>

                    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start',margin:'15px' }}>
                    <Typography sx={{fontSize:'14px', color:"#6e6a6a"}}>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <div>
                        <EventIcon sx={{color:"#1223ed"}} />
                        </div>
                        <span style={{marginLeft:'5px'}}>Apply by:</span>
                        </div>
                    
                </Typography>
                
                <Typography sx={{fontSize:'16px', color:"#3b3939"}}>
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
                
                </Box>
              </CardContent>
              <Box sx={{textAlign:'right'}}>
              <Button  sx={{color:"#b01ad3"}} >View Details <ArrowForwardIcon sx={{color:"#b01ad3"}} /></Button>
              </Box>
              </Link>
            </Card>
            
          </Grid>
        ))}
      </Grid>
    </Box>
}
    </>
  );
};

export default JobsList;

