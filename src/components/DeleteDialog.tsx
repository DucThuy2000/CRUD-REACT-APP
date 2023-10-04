import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Button } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import React from "react";

interface IDialog {
    open: boolean;
    onclose: any;
    onDeleteUser: any;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});


const DeleteDialog = ({ open, onclose, onDeleteUser }: IDialog) => {
    const handleClose = () => {
        onclose(false);
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle textAlign="center" textTransform="uppercase">{"Confirm delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" align="center">
            <ErrorOutlineIcon sx={{ fontSize: '100px' }} color="error" />
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center', padding: '20px 50px' }}>
          <Button variant="contained"
            onClick={handleClose}
            sx={{ mr: 2 }}
        >Cancle</Button>
          <Button variant="contained" color="error" onClick={onDeleteUser}>Delete</Button>
        </DialogActions>
      </Dialog>
    )
}
export default DeleteDialog;