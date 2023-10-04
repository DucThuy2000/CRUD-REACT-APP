import { Alert, AlertColor, Snackbar } from "@mui/material";

interface IProps {
    open: boolean;
    severity: AlertColor;
    message: string;
    onClose?: any;
}

const AlertCustom = ({open, severity, message, onClose}: IProps) => {

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose();
    };


    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default AlertCustom;