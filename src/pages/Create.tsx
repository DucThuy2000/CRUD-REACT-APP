// import component
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import CardCustomize from "../components/Card/Card";

// import date
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { format } from "date-fns";

// import model
import { UserFormFieldsType as FormFieldsType, IUser } from "../model"

// import helper
import { validation } from '../utils/helper';

// import state
import { MouseEvent, useState } from 'react';

// import axios
import axios from "../plugin/api/axios";
import { LocalizationProvider } from "@mui/x-date-pickers";


const Create = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const { user } = axios;

    const onChangeField = (value: string, type: FormFieldsType) => {
        switch(type) {
            case "name":
                setName(value);
                break;
            case "birthday":
                const date = new Date(value);
                const dateFormated = format(date, 'MM/dd/yyyy');
                setBirthday(dateFormated);
                break;
            case "email":
                validation();
                setEmail(value);
                break;
            case "gender":
                setGender(value);
                break;
            default:
                break;
        }
    }

    const onSubmit = (e: MouseEvent) => {
        e.preventDefault();
        const data: IUser = {name, birthday, email, gender};
        user.createUser(data);
        console.log(user.createUser(data));
    }

    return (
        <CardCustomize title="Create Employee">
            <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                    <TextField
                        id="name"
                        label="Full Name"
                        variant="standard"
                        fullWidth
                        onChange={(e) => onChangeField(e.target.value, 'name')}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
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
                            value={birthday}
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
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} justifyContent="flex-end" display="flex">
                    <Button variant="contained" onClick={(e) => onSubmit(e)}>Submit</Button>
                </Grid>
            </Grid>
        </CardCustomize>
    );
}

export default Create;
