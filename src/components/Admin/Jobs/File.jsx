import React from "react";
import {
    TableCell,
    TableRow,
    IconButton,
    Button,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

function File({ details, openDocumentId, updateJobApplication }) {
    

    const shortlist = ()=>{
        let status=true
        updateJobApplication(details, status)
    }
    const reject = ()=>{
        let status = false
        updateJobApplication(details, status)
    }
   console.log("DET", details)
    const getModifiedUrlOfResume = (job) => {
    
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

    const handleOpenDocumentId = () => {
        // const resumeUrl = getModifiedUrlOfResume(details.resume)
        const resumeUrl = details.resume;
        openDocumentId(resumeUrl);
    };

    return (
        <>
            <TableRow>
                <TableCell>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <IconButton size="small" onClick={handleOpenDocumentId}>
                            <InsertDriveFileIcon sx={{ color: "gray" }} />
                        </IconButton>
                        <div>{getModifiedUrlOfResume(details.resume).slice(22)}</div>
                    </div>
                </TableCell>

                <TableCell>{details.userName}</TableCell>
                <TableCell >
                    {/* <IconButton onClick={() => fileRename()}>
                        <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteIconClick()}>
                        <DeleteIcon color="error" />
                    </IconButton> */}
                    {details.email}
                </TableCell>
                <TableCell>
                    {details.resumeStatus}
                </TableCell>
                <TableCell >
                    {details.resumeShortlisted === undefined ?
                    
                    <div><Button variant="contained" sx={{marginRight:'10px'}} onClick={shortlist}>Shortlist</Button>
                    <Button variant="contained" onClick={reject}>Reject</Button></div> :
                    <div><Button variant="contained" disabled sx={{marginRight:'10px'}} >Shortlist</Button>
                    <Button variant="contained" disabled >Reject</Button></div> 
}
                </TableCell>
            </TableRow>
            {/* <Modal
                open={open === true}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        <Typography variant="h6">Rename</Typography>
                    </DialogTitle>

                    <DialogContent>
                        <TextField
                            label="Enter folder name"
                            variant="outlined"
                            fullWidth
                            value={fileName}
                            onChange={handleChangeFileName}
                            sx={{ marginTop: "15px" }}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button
                            onClick={handleClose}
                            color="primary"
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleFileRename}
                            color="primary"
                            variant="contained"
                        >
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </Modal> */}

            {/* <Dialog
                open={openDialog}
                onClose={handleCloseOpenDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Deletion"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the File "{details.name}
                        ?"
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseOpenDialog}
                        color="primary"
                        startIcon={<CancelIcon />}
                    >
                        No
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        color="error"
                        autoFocus
                        startIcon={<CheckCircleIcon />}
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog> */}

            {/* <Snackbar
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
            </Snackbar> */}
        </>
    );
}

export default File;
