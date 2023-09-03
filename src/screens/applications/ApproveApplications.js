
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt';
import { Grid, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { approveApplication } from '../../util/apiCalls';

export default function ApproveApplication({ toggleModal, appId }) {
    const [openSnack, setOpenSnack] = React.useState(false);
    const [snackMessage, setSnackMessage] = React.useState('');
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [fileName, setFileName] = React.useState("");

  const handleDocPathChange = (e) => {
    setFileName(e.target.files[0]);
};

const handleSnackClose = () => {
    setOpenSnack(!openSnack);
};

function approveApplicationSubmit(){
    approveApplication(appId, fileName).then(res => {
        console.log(res)
        if (res.status===200) {
            setFileName("");
            setSnackMessage('Application request approved!!');
            setOpenSnack(true);
            setTimeout(toggleModal, 5000);
        } else {
            res.text().then(text => {
                let err = JSON.parse(text);
                console.log(err);
                setSnackMessage(err.message);
                setOpenSnack(true);
            })
        }

    })
        .catch(error => {
            console.log("Regiter failed" + error);
            setSnackMessage(error);
            setOpenSnack(true);
        })



}

  return (
    <React.Fragment>
      <div>
        <DialogContent>
        <label> Upload approval document(PDF / IMAGE):<br></br>
                                    <input id="file-input" type="file" accept="application/pdfimage/jpeg,image/gif,image/png,application/pdf,image/x-eps" class="hidden" onChange={handleDocPathChange} />
                                </label> 
      <br></br>
        </DialogContent>
        <DialogActions align='center'>
          <Grid container justify="center">
            <Button fullWidth variant="contained" color="primary" onClick={approveApplicationSubmit} ><ThumbUpAlt />&nbsp;APPROVE</Button>
          </Grid>
        </DialogActions>

        <Snackbar
          style={{ whiteSpace: 'pre-wrap', width: '300px', top: '50%', bottom: '50%', left: '40%', right: '50%' }}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center"
          }}
          open={openSnack}
          onClose={handleSnackClose}
          message={snackMessage}
        />



      </div>
    </React.Fragment>
  );
}