// import component
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid, 
    Radio,
    RadioGroup, 
    TextField
} from "@mui/material";
import CardCustomize from "../components/Card/Card";

// import date
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// import model
import { UserFormFieldsType as FormFieldsType, IUser, ResponseStatus } from "../model"

// import state
import { MouseEvent, useEffect, useState } from 'react';

// import axios
import axios from "../plugin/api/axios";
import { LocalizationProvider } from "@mui/x-date-pickers";

// import router
import { useNavigate, useParams } from "react-router-dom";

// import helper
import { birtdayFormat } from "../utils/helper";
import dayjs from "dayjs";
import { Route } from "../routes/path";

const Update = () => {
    const [user, setUser] = useState<IUser>({
        id: '',
        name: '',
        birthday: '',
        gender: '',
        email: ''
    });
    const { userAxios } = axios;
    const { id } = useParams();
    const navigate = useNavigate();

    const getUserByID = async () => {
        try {
            const response = await userAxios.getUserByID(id!);
            if (response.status === ResponseStatus.OK) {
                const data = response.data;
                setUser(data);                
            }
        } catch (e) {
            navigate(-1);
        }
    }

    useEffect(() => {
        getUserByID();
    }, [id])

    const onChangeField = (value: any, type: FormFieldsType) => {
        switch(type) {
            case "name":
                setUser({...user, name: value});
                break;
            case "birthday":
                const birthday = birtdayFormat(new Date(value));
                setUser({...user, birthday: birthday});
                break;
            case "email":
                setUser({...user, email: value});
                break;
            case "gender":
                setUser({...user, gender: value});
                break;
            default:
                break;
        }
    }

    const onSubmit = async (e: MouseEvent) => {
        e.preventDefault();
        const response = await userAxios.updateUserByID(user);
        if (response.status === ResponseStatus.OK) {
            navigate(Route.root);
        }
    }

    const goBack = () => {
        navigate(-1);
    }
    
    return(
        <CardCustomize title="Update Employee">
            <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                    <TextField
                        value={user.name}
                        id="name"
                        label="Full Name"
                        variant="standard"
                        fullWidth
                        onChange={(e) => onChangeField(e.target.value, 'name')}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        value={user.email}
                        id="email"
                        label="Email"
                        variant="standard"
                        fullWidth
                        onChange={(e) => onChangeField(e.target.value, 'email')}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            disableFuture
                            sx={{ width: "100%" }}
                            label="Birthday"
                            value={dayjs(user.birthday)}
                            onChange={(e) => onChangeField(e!, 'birthday')}
                            views={['year', 'month', 'day']}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={12}>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={(e) => onChangeField(e.target.value, 'gender')}
                            value={user.gender}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} justifyContent="flex-end" display="flex">
                    <Button variant="contained" color="info" onClick={goBack} sx={{ mr: 2 }}>Back</Button>
                    <Button variant="contained" onClick={onSubmit} color="success">Submit</Button>
                </Grid>
            </Grid>
        </CardCustomize>
    );
}

export default Update;