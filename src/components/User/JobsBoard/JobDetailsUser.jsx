import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react'
import axios from "axios";
import { Box, CardMedia, List, ListItem, ListItemText, Typography, Grid, CircularProgress } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';

const JobDetails = ()=>{
    const { id } = useParams();
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        // Fetch jobs from the API
        const fetchJobDetails = async () => {
          try {
            const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/user/fetch/jobDetails/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                // setJobs(response.data.jobs);
                console.log("RSS",response)
                setJob(response.data)
                setLoading(false)
          } catch (error) {
            console.error("Error fetching jobs:", error);
          } 
        };
    
        fetchJobDetails();
      }, [id]);

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
        <Grid container sx={{ flex: { xs: "none", md: 1 }, boxSizing:'border-box', backgroundColor:'white', borderRadius:'20px', borderColor:'#e3e0e0', borderStyle:'solid', borderWidth:'1px' }}>
          <Grid item
                    xs={12}
                    md={8}
                    sx={{padding:'25px'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* Company Image */}
            
    
            <Box>
              {/* Company Name */}
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              
            <Box>
              <Typography variant="h6" color="textSecondary">
                {job.companyName}
              </Typography>
    
              {/* Job Role */}
              <Typography variant="h5" sx={{ marginBottom: 2, fontWeight:'600', color:'#434242'}}>
                {job.jobRole}
              </Typography>
              </Box>
              
              </Box>

              <Box sx={{borderWidth:'1px', borderStyle:'solid', borderColor:'#c2bfbf', padding:'25px', borderRadius:'10px',
                display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap'
              }}>
    
              {/* Salary */}
              <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <AttachMoneyIcon sx={{color:"#1223ed", marginRight:'10px'}} />
              <Box sx={{display:'flex', flexDirection:'column'}}>
                   <Typography variant="body1" sx={{ marginBottom: 0 }}>
                Salary
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1, fontWeight:'600', color:'#2c2c2c' }}>
              {job.salary}
              </Typography>
              </Box>
              </Box>

              <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <WorkIcon sx={{color:"#1223ed", marginRight:'10px'}} />
              <Box sx={{display:'flex', flexDirection:'column'}}>
                   <Typography variant="body1" sx={{ marginBottom: 0 }}>
                   No of Openings
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1, fontWeight:'600', color:'#2c2c2c' }}>
              {job.noOfOpenings}
              </Typography>
              </Box>
              </Box>
    

              <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <LocationOnIcon sx={{color:"#1223ed", marginRight:'10px'}} />
              <Box sx={{display:'flex', flexDirection:'column'}}>
                   <Typography variant="body1" sx={{ marginBottom: 0 }}>
                   Location
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1, fontWeight:'600', color:'#2c2c2c' }}>
              {job.location.join(', ')}
              </Typography>
              </Box>
              </Box>

              <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <EventIcon sx={{color:"#1223ed", marginRight:'10px'}} />
              <Box sx={{display:'flex', flexDirection:'column'}}>
                   <Typography variant="body1" sx={{ marginBottom: 0 }}>
                   Apply By
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1, fontWeight:'600', color:'#2c2c2c' }}>
              {new Date(job.lastDateToApply).toLocaleString('en-US', {
   
    year: 'numeric',
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit',
    minute: '2-digit', 
    hour12: true, 
  })}
              </Typography>
              </Box>
              </Box>
    
              </Box>
            </Box>
          </Box>
    
          {/* Eligibility Criteria */}
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6" sx={{ fontWeight:'600', color:'#434242'}}>
              Eligibility Criteria:
            </Typography>
            <List sx={{ padding: 0 }}>
              <ListItem sx={{ padding: 0 }}>
                <ListItemText primary={<div dangerouslySetInnerHTML={{ __html: job.eligibilityCriteria }} />} sx={{ margin: 0, paddingLeft:'20px' }}/>
              </ListItem>
            </List>
          </Box>
    
          {/* About the Company */}
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6" sx={{ fontWeight:'600', color:'#434242'}}>
              About the Company:
            </Typography>
            <List sx={{ padding: 0 }}>
              <ListItem sx={{ padding: 0 }}>
                <ListItemText primary={<div dangerouslySetInnerHTML={{ __html: job.aboutCompany }} />} sx={{ margin: 0, paddingLeft:'20px' }}/>
              </ListItem>
            </List>
          </Box>
    
          {/* Important Notes */}
          <Box sx={{ marginTop: 1 }}>
            <Typography variant="h6" sx={{ fontWeight:'600', color:'#434242'}}>
              Important Notes:
            </Typography>
            <List sx={{ padding: 0 }}>
              <ListItem sx={{ padding: 0 }}>
                <ListItemText primary={<div dangerouslySetInnerHTML={{ __html: job.importantNotes }} />} sx={{ margin: 0, paddingLeft:'20px'}}/>
              </ListItem>
            </List>
          </Box>
          </Grid>
    
          
    <Grid  item
                    xs={12}
                    md={4}>
          {/* Skills */}
          <Box sx={{display:'flex', flexDirection:'column', marginLeft:'75px'}}>
          <CardMedia
              component="img"
              image={job.companyImage} // Assuming you have a correct path to the image
              alt={job.companyName}
              sx={{ width: 100, backgroundSize:'cover', objectFit: 'cover', marginTop: 2 }}
            />
            {/* <Grid item xs={12} sm={6}> */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight:'600', color:'#434242', marginTop:'20px'}}>Required Skills:</Typography>
              <List sx={{
    listStyleType: "disc", // Use 'disc' for bullet points
    pl: 2, // Add padding-left for the bullets to appear correctly
  }}>
                {job.skill.map((skill, index) => (
                  <ListItem sx={{
                    display: "list-item", // Make ListItem behave like a list item
                    listStyleType: "inherit",
                    padding:'0px' // Ensure it uses the parent list style
                  }} key={index}>
                    <ListItemText primary={skill} />
                  </ListItem>
                ))}
              </List>
              </Box>
            {/* </Grid> */}
          </Box>
          </Grid>
        </Grid>
      );
    }


export default JobDetails