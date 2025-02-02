import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react'
import axios from "axios";
import { Box, Dialog, Button, DialogTitle, DialogContent, TablePagination, Table,TableHead,
     TableRow, TableCell, IconButton, Typography, CircularProgress } from "@mui/material";
import File from "./File"
// import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const JobDetails = ()=>{
    const { id } = useParams();
    const [jobApplications, setJobApplications] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isFileModalOpen, setIsFileModalOpen] = useState(false);
    const [documentId, setDocumentId] = useState("");
    const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };  

    const exportToExcel = (data, fileName) => {

        const newData = data.map((every)=>({
            Email: every.email,
            ResumeStatus: every.resumeStatus,
            UserName: every.userName,
          }))
        // Create a worksheet from the datN
        const worksheet = XLSX.utils.json_to_sheet(newData);
      
        // Create a workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      
        // Generate a buffer for the workbook
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
      
        // Create a Blob and save the file
        const file = new Blob([excelBuffer], {
          type: "application/octet-stream",
        });
        saveAs(file, `${fileName}.xlsx`);
      };

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
        console.log("OIII", id);
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
                for (let ele of response.data){
                    if (ele.resumeShortlisted === true || ele.resumeShortlisted === "true"){
                        ele["resumeStatus"]="Shortlisted"
                    }
                    else if (ele.resumeShortlisted === false || ele.resumeShortlisted === "false"){
                        ele["resumeStatus"]="Rejected"
                    }
                    else{
                        ele["resumeStatus"]="Not viewed"
                    }
                }
                console.log("RESDATA", response.data)
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
        {jobApplications.length===0 &&
    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', minHeight:'80%'}}>
      <img style={{width:'40%', backgroundSize:'cover'}} src="https://res.cloudinary.com/saikrishnaboga-ccbp-tech/image/upload/v1643992995/Book-Hub%20/Group_7522failureView_xgsn7l.png" alt="errorIMG"/>
      <p style={{marginTop:'10px', fontSize:'20px'}}>No job applications are avaliable for this job.</p>
      </Box>
    }
    {jobApplications.length !==0 && 
    <>
          <Table >
                        <TableHead>
                            <TableRow>
                            <TableCell
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
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        <Typography sx={{marginRight:'10px'}}>File Name</Typography>
                                    </Box>
                                    <Box>
                                        {/* <IconButton
                                            // onClick={() =>
                                            //     handleSortClick("name")
                                            // }
                                        >
                                            <FilterAltIcon />
                                        </IconButton> */}
                                    </Box>
                                </Box>
                            </TableCell>

                            <TableCell
                                sx={{
                                   
                                        backgroundColor: "green",
                                        color: "white",
                                        fontWeight: "600",
                                    
                                    // color: "black",
                                    // fontWeight: "600",
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
                                <TableCell sx={{backgroundColor: "green",
                                        color: "white",
                                        fontWeight: "600",}}>Email</TableCell>
                                <TableCell sx={{backgroundColor: "green",
                                        color: "white",
                                        fontWeight: "600",}}>Resume status</TableCell>
                                <TableCell sx={{backgroundColor: "green",
                                        color: "white",
                                        fontWeight: "600",}}>Actions</TableCell>
                                
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
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 30, 40]}
                    component="div"
                    count={jobApplications.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
                    <Button
        variant="contained"
        color="primary"
        sx={{width:'200px',margin:'15px'}}
        onClick={() => exportToExcel(jobApplications, "UserData")}
      >
        Export to Excel
      </Button>

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
}
        </>
      );
    }


export default JobDetails