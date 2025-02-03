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
                        <div>Preview resume</div>
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
                    
                    <div style={{display:'flex', flexDirection:"row"}}><Button variant="contained" sx={{marginRight:'10px'}} onClick={shortlist}>Shortlist</Button>
                    <Button variant="contained" onClick={reject}>Reject</Button></div> :
                    <div style={{display:'flex', flexDirection:"row"}}><Button variant="contained" disabled sx={{marginRight:'10px'}} >Shortlist</Button>
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
