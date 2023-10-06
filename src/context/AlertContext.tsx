import { Alert, AlertColor, Snackbar } from "@mui/material";
import { createContext, useState } from "react";

interface IAlertContext {
    setOpen: (val: boolean) => void;
    setMessage: (val: string) => void;
    setSeverity: (val: AlertColor) => void;
}

const AlertContext = createContext<IAlertContext>({
    setOpen: (val: boolean) => { },
    setMessage: (val: string) => { },
    setSeverity: (val: AlertColor) => { }
});

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("info" as AlertColor);
    const [message, setMessage] = useState("");
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <AlertContext.Provider
            value={{ 
                setOpen,
                setMessage,
                setSeverity
            }}
        >
            {children}
            {open &&
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            }
        </AlertContext.Provider>
    );
}

export default AlertContext;