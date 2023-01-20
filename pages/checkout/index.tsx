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
import InfoForm from "../../components/InfoForm";
import '@duffel/components/dist/CardPayment.min.css'
import {CardPayment} from "@duffel/components";
import Price from '../../components/Price';
export default function Checkout({id, passenger_ids, checkout, slice, offer}) {



    // Check if passenger_ids is a string or an array
    let PassengerInfo = null;
    if (typeof passenger_ids != 'string') {
        PassengerInfo = passenger_ids.map((passenger) => {

        return (
                <InfoForm />
        )
    })
    } else {
         PassengerInfo = (
                <InfoForm />

        )
    }
    const successfulPaymentHandler = () => {

    }

    const errorPaymentHandler = () => {
        console.log('Payment failed')
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
                <Box my={4} className={styles.Box}>
                    <Grid container spacing={3} className={styles.passengerContainer}>
                        <div>
                        {PassengerInfo}
                        </div>
                    </Grid>
                    <Price slice={offer} />
                    <Grid container spacing={3} className={styles.creditContainer}>
                        <CardPayment duffelPaymentIntentClientToken={checkout.client_token} successfulPaymentHandler={successfulPaymentHandler} errorPaymentHandler={errorPaymentHandler} />
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
    const checkout = await duffel.paymentIntents.create({

        "currency": "USD",

        "amount": offer.data.total_amount,

    })

    return {
        props: {
            data: data,
            offer: offer.data,
            id: id,
            passenger_ids: passenger_ids,
            checkout: checkout.data
        },
    };
};

