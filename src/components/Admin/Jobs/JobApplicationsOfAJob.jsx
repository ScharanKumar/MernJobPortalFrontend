import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react'
import axios from "axios";
import { Box, Dialog, DialogTitle, DialogContent, Table,TableHead, TableRow, TableCell, IconButton, Typography, CircularProgress } from "@mui/material";
import File from "./File"
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

const JobDetails = ()=>{
    const { id } = useParams();
    const [jobApplications, setJobApplications] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isFileModalOpen, setIsFileModalOpen] = useState(false);
    const [documentId, setDocumentId] = useState("");

    const handleCloseModal = () => {
        
        setIsFileModalOpen(false);
        
    };

    const updateJobApplication = async(jobApplication, status)=>{
        try {
            const token = localStorage.getItem("token");
                const response = await axios.put(
                    `${process.env.REACT_APP_API_URL}/admin/update/job/application/${jobApplication.jobId}/${jobApplication.userId}`,
                    {"status":status},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("RESPONSEUPDATE",response)
          } catch (error) {
            console.error("Error updating job application:", error);
          }
    }

    

    const openDocumentId = (id) => {
        setDocumentId(id);
        setIsFileModalOpen(true);
    };

    useEffect(() => {
        // Fetch jobs from the API
        const fetchJobDetails = async () => {
          try {
            const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/admin/job/applications/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setJobApplications(response.data)
                setLoading(false)
          } catch (error) {
            console.error("Error fetching jobs:", error);
          } 
        };
    
        fetchJobDetails();
      }, [id]);

      
   
    if (loading) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        );
      }

      return (
        <>
          <Table >
                        <TableHead>
                            <TableRow>
                            <TableCell
                                sx={{
                                    
                                    color: "black",
                                    fontWeight: "600",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        <Typography sx={{marginRight:'10px'}}>File Name</Typography>
                                    </Box>
                                    <Box>
                                        <IconButton
                                            // onClick={() =>
                                            //     handleSortClick("name")
                                            // }
                                        >
                                            <FilterAltIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </TableCell>

                            <TableCell
                                sx={{
                                    
                                    color: "black",
                                    fontWeight: "600",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        <Typography sx={{marginRight:'10px'}}>Username</Typography>
                                    </Box>
                                   
                                </Box>
                            </TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Actions</TableCell>
                                
                            </TableRow>
                            
                            {/* Render files */}
                            {jobApplications.map((every) => (
                                <File
                                    details={every}
                                    key={every._id}
                                    // chapterId={chapterId}
                                    openDocumentId={openDocumentId}
                                    updateJobApplication={updateJobApplication}
                                />
                            ))}
                        </TableHead>
                    </Table>

                    <Dialog
                    open={isFileModalOpen}
                    onClose={handleCloseModal}
                    maxWidth={false}
                    PaperProps={{
                        sx: {
                            width: "90vw",
                            height: "90vh",
                            maxWidth: "none",
                            maxHeight: "none",
                        },
                    }}
                >
                    <DialogTitle
                        sx={{
                            m: 0,
                            p: 2,
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <IconButton
                            onClick={handleCloseModal}
                            sx={{
                                color: "grey.500",
                                "&:hover": {
                                    color: "grey.800",
                                },
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent
                        sx={{
                            p: 0,
                            height: "100%",
                            overflow: "hidden",
                        }}
                    >

<iframe title="Resume" src={documentId} style={{ width: "100%",
                                height: "100%",
                                minHeight: "500px", // Add minimum height
                                display: "block", // Ensure it's displayed
                                visibility: "visible", // Ensure it's visible
                                "& iframe": {
                                    width: "100%",
                                    height: "100%",
                                    border: "none",
                                },}} frameborder="0"></iframe>
                        {/* <Box
                            ref={viewerRef}
                            sx={{
                                width: "100%",
                                height: "100%",
                                minHeight: "500px", // Add minimum height
                                display: "block", // Ensure it's displayed
                                visibility: "visible", // Ensure it's visible
                                "& iframe": {
                                    width: "100%",
                                    height: "100%",
                                    border: "none",
                                },
                            }}
                        /> */}
                    </DialogContent>
                </Dialog>   
        </>
      );
    }


export default JobDetails