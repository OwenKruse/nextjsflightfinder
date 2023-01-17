import checkout from '../../components/checkout';
import { GetServerSideProps } from 'next';
import {Duffel} from "@duffel/api";
import FlightInfo from "../../components/FlightInfo";
import {
    Box,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid, List,
    Radio, RadioGroup,
    TextField,
    Typography
} from '@mui/material';
import Navbar from "../../components/Navbar";
import Head from "next/head";
import styles from '../../styles/checkout.module.scss';
import {DatePicker} from "@mui/x-date-pickers";
import {useState} from "react";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import * as React from "react";

// Create a function that dsiplays a payment screen for the user to pay for their flight booking using Duffel's API

export default function Checkout({id, passenger_ids}) {
    const [dateDepart, setDateDepart] = React.useState<Date | null>(null);


    const [value, setValue] = useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const InfoForm = () => {
        return (
            <Grid container className={styles.infoForm}>
                <Grid item xs={9} className={styles.container}>
                    <TextField className={styles.textBox} label="First Name" variant="outlined" />
                    <TextField label="Last Name" variant="outlined" />
                    <Grid item className={styles.textBox}>
                    <TextField label="Email" variant="outlined" />
                    </Grid>
                    <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                    shrink: true,
                }}
                    />

                </Grid>
                <Grid item xs={3}>

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

    // Check if passenger_ids is a string or an array
    let PassengerInfo = null;
    if (typeof passenger_ids != 'string') {
        PassengerInfo = passenger_ids.map((passenger) => {

        return (
        //  born_on
        // email
        // family_name
        // gender
        // given_name
        // id
            <div>
                <InfoForm />
            </div>
        )
    })
    } else {
         PassengerInfo = (
            <div>
                <InfoForm />
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Flight Booking</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Container maxWidth="lg" sx={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }
            }>
                <div>
                    <Navbar></Navbar>
                </div>
                <Box my={4}>
                    <Grid container spacing={3}>

            {PassengerInfo}

                    </Grid>
                </Box>
            </Container>
        </>
    )
}

// Create a function that gets the offer id from the query string and returns the offer id

export const getServerSideProps = async ({ query }) => {
    const { id } = query;
    const { passenger_ids } = query;
    const duffel = new Duffel({
        token: "duffel_test_ThLUYHmU6F3MbIzMNFc8-ahZA-w_Nn5T5sSkPJ0-SLY"
    })
    const {data} = await duffel.seatMaps.get({

        "offer_id": id

    }).then((response) => {
        return response;

    });

    // Add an error catch
    const offer = await duffel.offers.get(id, {

        "return_available_services": true

    }).then((response) => {
        return response;

    });

    return {
        props: {
            data: data,
            offer: offer.data,
            id: id,
            passenger_ids: passenger_ids
        },
    };
};

