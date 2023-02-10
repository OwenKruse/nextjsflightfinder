import {FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography} from "@mui/material";
import styles from "../styles/checkout.module.scss";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers";
import * as React from "react";
import { useState } from "react";
import Classnames from 'classnames';




const InfoForm = (props) => {
    const {index, passenger_ids, passengerNames, setPassengerNames, passengerLastNames, setPassengerLastNames, passengerEmails, setPassengerEmails, passengerPhones, setPassengerPhones, passengerDobs, setPassengerDobs, passengerGenders, setPassengerGenders} = props;
    const ticket_type = props.ticket_type;

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
    const [error, setError] = React.useState(false);
    const phoneRef = React.useRef(null);
    const phoneRegex = new RegExp(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/);
    const handlePhoneChange = (e) => {

        const value = e.target.value;
        console.log(value);

        if (!phoneRegex.test(value)) {
            // handle invalid phone number
            setError(true);
            return;
        }
        phoneRef.current.style.color = "black";
        const newPassengerPhones = [...passengerPhones];
        newPassengerPhones[index] = e.target.value;
        setPassengerPhones(newPassengerPhones);
        setError(false)
    }
    const handleDobChange = (newValue) => {
        const newPassengerDobs = [...passengerDobs];
        newPassengerDobs[index] = newValue;
        setPassengerDobs(newPassengerDobs);
    }
    const handleGenderChange = (e) => {
        const newPassengerGenders = [...passengerGenders];
        newPassengerGenders[index] = e.target.value;
        setPassengerGenders(newPassengerGenders);
    }

    if (ticket_type == "adult"){
        // @ts-ignore
        return (
            <Grid container className={Classnames(styles.infoForm, styles.infoGrid)}>
            <Typography variant="h6" gutterBottom style={
                {textAlign: "center",
                    color: "rgba(1,1,1)",}
            }>
                Adult Ticket
            </Typography>
            <Grid container className={Classnames( styles.infoGrid)}>

                <Grid item xs={9} className={styles.container}>
                    <TextField required={true} label="First Name"
                               onChange={(e) => handleNameChange(e)}
                               variant="outlined"/>
                    <TextField required={true} label="Last Name"
                               onChange={(e) => handleLastNameChange(e)}
                               variant="outlined"/>
                    <TextField required={true} label="Email"
                               onChange={(e) => handleEmailChange(e)}
                               variant="outlined"/>
                    <TextField required={true} label="Phone Number"
                               placeholder={"+1 123-456-7890"}
                               onChange={(e) => handlePhoneChange(e)}
                               variant="outlined"
                                 error={error}
                               //red
                               ref={phoneRef}
                    />
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            label="Date of Birth"
                            inputFormat="MM-DD-YYYY"
                            // @ts-ignore
                            maxDate={new Date() - 18 * 365 * 24 * 60 * 60 * 1000}
                            views={["year", "month", "day"]}
                            value={passengerDobs[index]}
                            onChange={(newValue) => {
                                handleDobChange(newValue);
                            }}
                            renderInput={(params) => <TextField
                                {...params}
                                name={"tripStart"}
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
                            <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                            <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                            <FormControlLabel value="other" control={<Radio/>} label="Other"/>
                        </RadioGroup>
                    </FormControl>

                </Grid>
            </Grid>
        </Grid>
        );
    }
    else {
        return (
            <Grid container className={Classnames(styles.infoForm, styles.infoGrid)}>
            <Typography variant="h6" gutterBottom>
                Child Ticket
            </Typography>
            <Grid container className={Classnames(styles.infoForm, styles.infoGrid)}>

            <Grid item xs={9} className={styles.container}>
                <TextField required={true} label="First Name"
                           onChange={(e) => handleNameChange(e)}
                           variant="outlined"/>
                <TextField required={true} label="Last Name"
                           onChange={(e) => handleLastNameChange(e)}
                           variant="outlined"/>
                <TextField required={true} label="Email"
                           onChange={(e) => handleEmailChange(e)}
                           variant="outlined"/>
                <TextField required={true} label="Phone Number"
                           onChange={(e) => handlePhoneChange(e)}
                           variant="outlined"/>
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
                        <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                        <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                        <FormControlLabel value="other" control={<Radio/>} label="Other"/>
                    </RadioGroup>
                </FormControl>

            </Grid>
        </Grid>
        </Grid>
        );



    }

}



export default InfoForm;
