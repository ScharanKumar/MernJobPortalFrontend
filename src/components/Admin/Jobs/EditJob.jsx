import React, { useState, useMemo, useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Box, TextField, Button, Chip, Typography, Grid, Alert, Snackbar } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import JoditEditor from "jodit-react";
import axios from "axios";

const EditJob = () => {
  const location = useLocation();
  const jobId = location.state?.jobData?._id
  
  const [formData, setFormData] = useState({
    companyName: "",
    jobRole: "",
    location: [],
    skill: [],
    salary: "",
    lastDateToApply: null,
    noOfOpenings: 0,
  });
  const [jobData, setJobData] = useState(null)
  const [newLocation, setNewLocation] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const editor1 = useRef(null);
  const [eligibilityCriteria, setEligibilityCriteria] = useState('')
  const editor2 = useRef(null);
  const [aboutCompany, setAboutCompany] = useState('')
  const editor3 = useRef(null);
  const [importantNotes, setImportantNotes] = useState('')
  const [message, setMessage] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertType, setAlertType] = useState("success");

    useEffect(() => {
      // Fetch jobs from the API
      const fetchJobDetails = async () => {
        try {
          const token = localStorage.getItem("token");
              const response = await axios.get(
                  `${process.env.REACT_APP_API_URL}/admin/fetch/jobDetails/${jobId}`,
                  {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  }
              );
              // setJobs(response.data.jobs);
              console.log("RSS",response)
              setJobData(response.data)
        } catch (error) {
          console.error("Error fetching jobs:", error);
        } 
      };
  
      fetchJobDetails();
    }, [jobId]);

    useEffect(() => {
      if (jobData){
        setFormData({companyName:jobData.companyName, jobRole:jobData.jobRole, location:jobData.location || [],
          skill:jobData.skill || [], noOfOpenings:jobData.noOfOpenings, lastDateToApply:jobData.lastDateToApply, 
          salary:jobData.salary
        })
        setEligibilityCriteria(jobData.eligibilityCriteria)
        setAboutCompany(jobData.aboutCompany)
        setImportantNotes(jobData.importantNotes)
      }


  }, [jobData]);

  const config = useMemo(
    () => ({
        theme: "light",
        height: "350px",
        width: "100%",
        uploader: {
            insertImageAsBase64URI: false,
            url: `${process.env.REACT_APP_API_URL}/lessons/upload-image`,
            format: "json",
            headers: {},
            prepareData: function (formData) {
                console.log("Preparing data for upload");
                return formData;
            },
            process: function (response) {
                console.log("Processing upload response:", response);
                if (!response.success || !response.data) {
                    return {
                        error: response.messages
                            ? response.messages[0]
                            : "Upload failed",
                    };
                }
                return {
                    files: response.data.files,
                    path: "",
                    isImages: response.data.isImages,
                    error: null,
                };
            },
            defaultHandlerSuccess: function (data) {
                const imageUrl = data.files[0];
                this.selection.insertImage(imageUrl);
            },
        },
        extraButtons: [
            {
                name: "video",
                icon: "video",
                exec: (editor) => {
                    const url = prompt("Enter video URL:");
                    if (url) {
                        editor.selection.insertHTML(`
                            <video controls src="${url}" style="max-width: 100%; height: auto;"></video>
                        `);
                    }
                },
            },
        ],
    }),
    []
);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, lastDateToApply: date }));
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    const requiredFields = ['companyName', 'jobRole', 'location', 'skill', 'lastDateToApply', 'noOfOpenings'];
    const emptyFields = requiredFields.filter(field => {
      const value = formData[field];
      return value === "" || value === null ||
             (Array.isArray(value) && value.length === 0);
  });

    if (emptyFields.length > 0 ) {
      setMessage("Enter the required fields.");
      setAlertType("error");
      setOpenSnackbar(true);
      return;
    }
    

    let formDataToBackend = {}
    formDataToBackend["companyName"]=formData.companyName
    formDataToBackend["jobRole"]=formData.jobRole
    formDataToBackend["salary"]=formData.salary
    const locationValue = Array.isArray(formData.location) 
    ? JSON.stringify(formData.location) 
    : formData.location;
    formDataToBackend["location"]=locationValue
    const skillValue = Array.isArray(formData.skill) 
    ? JSON.stringify(formData.skill) 
    : formData.skill;
    formDataToBackend["skill"]=skillValue

    formDataToBackend["lastDateToApply"]=dayjs(formData.lastDateToApply).toISOString()
    formDataToBackend["noOfOpenings"]=formData.noOfOpenings
    formDataToBackend["eligibilityCriteria"]=eligibilityCriteria
    formDataToBackend["aboutCompany"]=aboutCompany
    formDataToBackend["importantNotes"]=importantNotes



        

    const apiEndpoint = `${process.env.REACT_APP_API_URL}/admin/update/job/${jobId}`;
    const token = localStorage.getItem("token");

        try {
            const response = await axios.put(apiEndpoint, 
              formDataToBackend,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  // "Content-Type": "multipart/form-data",
                },
              }
            );
            
            console.log("RES",response)
           
            setMessage("Job updated successfully");
      setAlertType("success");
      setOpenSnackbar(true);

      setTimeout(() => {
        window.location.reload();
    }, 500);


        } catch (error) {
            console.error("Job updation error : ", error);
            setMessage("Job updation failed");
      setAlertType("error");
      setOpenSnackbar(true);
            
        } 

    
  };

  

  return (
    <Box
      component="form"
      onSubmit={handleUpdateJob}
      sx={{
        maxWidth: "80%",
        margin: "auto",
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#fff",
      }}
    >
      <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert
                        onClose={() => setOpenSnackbar(false)}
                        severity={alertType}
                        sx={{ width: "100%" }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
      <Typography variant="h5" gutterBottom>
        Create a Job Posting
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            // required
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Job Role"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="No of Openings"
            name="noOfOpenings"
            type="number"
            value={formData.noOfOpenings}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Add Location"
            name="location"
            value={newLocation} // Temporary value for adding a new location
            onChange={(e) => setNewLocation(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newLocation.trim()) {
                // Add the location to the array on Enter key
                setFormData((prev) => ({
                  ...prev,
                  location: [...prev.location, newLocation.trim()],
                }));
                setNewLocation(""); // Clear input field
                e.preventDefault(); // Prevent form submission
              }
            }}
            placeholder="Press Enter to add"
          />
        </Grid>
        <Grid item xs={12}>
          {formData.location.map((loc, index) => (
            <Chip
            sx={{margin:"3px"}}
              key={index}
              label={loc}
              onDelete={() => {
                // Remove the location
                setFormData((prev) => ({
                  ...prev,
                  location: prev.location.filter((_, i) => i !== index),
                }));
              }}
            />
          ))}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Add Skill"
            name="skill"
            value={newSkill} // Temporary value for adding a new location
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newSkill.trim()) {
                // Add the location to the array on Enter key
                setFormData((prev) => ({
                  ...prev,
                  skill: [...prev.skill, newSkill.trim()],
                }));
                setNewSkill(""); // Clear input field
                e.preventDefault(); // Prevent form submission
              }
            }}
            placeholder="Press Enter to add"
          />
        </Grid>
        <Grid item xs={12}>
          {formData.skill.map((oneOfTheSkill, index) => (
            <Chip
            sx={{margin:"3px"}}
              key={index}
              label={oneOfTheSkill}
              onDelete={() => {
                // Remove the location
                setFormData((prev) => ({
                  ...prev,
                  skill: prev.skill.filter((_, i) => i !== index),
                }));
              }}
            />
          ))}
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Last Date to Apply"
              value={formData.lastDateToApply}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField fullWidth {...params} required
                sx={{
                  width: "90%",
                  "& .MuiInputBase-root": {
                      color: "black", // Text color
                  },
                  "& .MuiInputLabel-root": {
                      color: "black", // Label color
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black", // Border color
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline":
                      {
                          borderColor: "black", // Border color on hover
                      },
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                          borderColor: "black", // Border color when focused
                      },
                  "& .MuiFormHelperText-root": {
                      color: "black", // Helper text color
                  },
              }}
               />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} >
        <Typography variant="h6" gutterBottom>
        Eligibility Criteria
      </Typography>

        <JoditEditor
                                    ref={editor1}
                                    value={eligibilityCriteria}
                                    config={config}
                                    onBlur={(newContent) =>
                                        setEligibilityCriteria(newContent)
                                    }
                                />
          
        </Grid>
        <Grid item xs={12} >
        <Typography variant="h6" gutterBottom>
        About Company
      </Typography>
        <JoditEditor
                                    ref={editor2}
                                    value={aboutCompany}
                                    config={config}
                                    onBlur={(newContent) =>
                                        setAboutCompany(newContent)
                                    }
                                />
          
        </Grid>
        <Grid item xs={12} >
        <Typography variant="h6" gutterBottom>
        Important Notes
      </Typography>
        <JoditEditor
                                    ref={editor3}
                                    value={importantNotes}
                                    config={config}
                                    onBlur={(newContent) =>
                                        setImportantNotes(newContent)
                                    }
                                />
          
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ padding: "10px" }}
        >
          Update Job
        </Button>
      </Box>
    </Box>
  );
};

export default EditJob;
