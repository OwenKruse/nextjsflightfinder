import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import styles from "../styles/checkout.module.scss";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers";
import * as React from "react";
import { useState } from "react";
import Classnames from 'classnames';

const InfoForm = () => {
    const [dateDepart, setDateDepart] = React.useState<Date | null>(null);

    const todayDate = new Date();

    const [value, setValue] = useState('female');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <Grid container className={Classnames(styles.infoForm, styles.infoGrid)}>
            <Grid item xs={9} className={styles.container}>
                <TextField required={true} label="First Name"
                            onChange={(e) => setName(e.target.value)}
                           variant="outlined" />
                <TextField required={true} label="Last Name"
                            onChange={(e) => setSurname(e.target.value)}
                           variant="outlined" />
                <TextField required={true} label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                           variant="outlined" />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                        label="Date of Birth"
                        inputFormat="MM-DD-YYYY"

                        maxDate={new Date()}
                        value={dateDepart}
                        onChange={(newValue) => {
                            setDateDepart(newValue);
                        }}
                        renderInput={(params) => <TextField
                            {...params}
                            name={"tripStart"}
                            defaultValue={todayDate}
                            id={"tripStart"}
                            required
                            label={"Date Of Birth"}
                            className={styles.datePicker}
                            InputLabelProps={{
                                style: {
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textAlign: "center",


                                },
                            }}
                        />}
                        className={styles.date__select}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item={true} xs={3} className={styles.genderGrid}>

                <FormControl component="fieldset" sx={
                    {
                        marginLeft: "1rem",


                    }
                }>
                    <RadioGroup aria-label="gender" name="gender" value={value} onChange={handleChange}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>

            </Grid>
        </Grid>
    );
}

export default InfoForm;
