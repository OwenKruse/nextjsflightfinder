import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import styles from "../styles/checkout.module.scss";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers";
import * as React from "react";
import { useState } from "react";
import Classnames from 'classnames';




const InfoForm = (props) => {
    const {index, passenger_ids, passengerNames, setPassengerNames, passengerLastNames, setPassengerLastNames, passengerEmails, setPassengerEmails, passengerPhones, setPassengerPhones, passengerDobs, setPassengerDobs, passengerGenders, setPassengerGenders} = props;


    const handleNameChange = (e) => {
        const newPassengerNames = [...passengerNames];
        newPassengerNames[index] = e.target.value;
        setPassengerNames(newPassengerNames);
    }
    const handleLastNameChange = (e) => {
        const newPassengerLastNames = [...passengerLastNames];
        newPassengerLastNames[index] = e.target.value;
        setPassengerLastNames(newPassengerLastNames);
    }
    const handleEmailChange = (e) => {
        const newPassengerEmails = [...passengerEmails];
        newPassengerEmails[index] = e.target.value;
        setPassengerEmails(newPassengerEmails);
    }
    const handlePhoneChange = (e) => {
        const newPassengerPhones = [...passengerPhones];
        newPassengerPhones[index] = e.target.value;
        setPassengerPhones(newPassengerPhones);
    }
    const handleDobChange = (newValue) => {
        const newPassengerDobs = [...passengerDobs];
        newPassengerDobs[index] = newValue;
        setPassengerDobs(newPassengerDobs);
    }
    const handleGenderChange = (e) => {
        console.log(e.target.value)
        const newPassengerGenders = [...passengerGenders];
        newPassengerGenders[index] = e.target.value;
        setPassengerGenders(newPassengerGenders);
    }

    return (
    <Grid container className={Classnames(styles.infoForm, styles.infoGrid)}>
        <Grid item xs={9} className={styles.container}>
            <TextField required={true} label="First Name"
                       onChange={(e) => handleNameChange(e)}
                       variant="outlined" />
            <TextField required={true} label="Last Name"
                       onChange={(e) => handleLastNameChange(e)}
                       variant="outlined" />
            <TextField required={true} label="Email"
                       onChange={(e) => handleEmailChange(e)}
                       variant="outlined" />
            <TextField required={true} label="Phone Number"
                       onChange={(e) => handlePhoneChange(e)}
                       variant="outlined" />
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    label="Date of Birth"
                    inputFormat="MM-DD-YYYY"
                    maxDate={new Date()}
                    value={passengerDobs[index]}
                    onChange={(newValue) => {
                        handleDobChange(newValue);
                    }}
                    renderInput={(params) => <TextField
                        {...params}
                        name={"tripStart"}
                        defaultValue={new Date()}
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
                <RadioGroup aria-label="gender" name="gender" onChange={handleGenderChange}>
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
