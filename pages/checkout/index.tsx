import checkout from '../../components/checkout';
import { GetServerSideProps } from 'next';
import {Duffel} from "@duffel/api";
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
import {useRouter} from "next/router";
export default function Checkout({id, passenger_ids, checkout, slice, offer}) {
    const [passengerNames, setPassengerNames] = useState([]);
    const [passengerEmails, setPassengerEmails] = useState([]);
    const [passengerPhones, setPassengerPhones] = useState([]);
    const [passengerDobs, setPassengerDobs] = useState([]);
    const [passengerGenders, setPassengerGenders] = useState([]);
    const [passengerLastNames, setPassengerLastNames] = useState([]);

    // Check if the passenger_ids is a string or an array
    // If it's a string, convert it to an array
    if (typeof passenger_ids === 'string') {
        passenger_ids = [passenger_ids]
    }
    // Get the ticket type from the offer

    const infoForms = passenger_ids.map((passenger_id, index) => {
        console.log(index)
       const ticket_type = (offer.passengers[index].type)
        return (
            <InfoForm key={passenger_id} ticket_type={ticket_type} index={index} passenger_ids={passenger_ids} passengerNames={passengerNames} setPassengerNames={setPassengerNames} passengerLastNames={passengerLastNames} setPassengerLastNames={setPassengerLastNames} passengerEmails={passengerEmails} setPassengerEmails={setPassengerEmails} passengerPhones={passengerPhones} setPassengerPhones={setPassengerPhones} passengerDobs={passengerDobs} setPassengerDobs={setPassengerDobs} passengerGenders={passengerGenders} setPassengerGenders={setPassengerGenders} />        )
    })

    const router = useRouter();
    const successfulPaymentHandler = async () => {
        const duffel = new Duffel({
            token: "duffel_test_ThLUYHmU6F3MbIzMNFc8-ahZA-w_Nn5T5sSkPJ0-SLY"
        })



        await router.push(`/confirmation?payment=${checkout.id}&order_id=${id}&passenger_ids=${passenger_ids}&passenger_names=${passengerNames}&passenger_last_names=${passengerLastNames}&passenger_emails=${passengerEmails}&passenger_phones=${passengerPhones}&passenger_dobs=${passengerDobs}&passenger_genders=${passengerGenders}`)
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
                        <Typography variant="h4" component="h1" gutterBottom>
                        {infoForms}
                        </Typography>


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
    // Map the passengers to an array





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

