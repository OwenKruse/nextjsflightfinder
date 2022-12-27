import React from 'react';
import { Container, Box } from '@mui/material';
import SeatMap from '../../componenets/seatMap';
import PaymentForm from '../../componenets/checkout';
import {Duffel} from "@duffel/api";
import Head from "next/head";
import Navbar from "../navbar";
import {headers} from "next/headers";

const Index = ({data}) => {

    return (
        <div>
            <Head>
                <title>Flight Booking</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Container maxWidth="lg">
                <div>
                    <Navbar></Navbar>
                </div>
                <Box my={4}>
                    <PaymentForm></PaymentForm>
                </Box>
            </Container>
        </div>
    );
};

export default Index;

// export const getServerSideProps = async ({ query }) => {
//     const { id } = query;
//     const duffel = new Duffel({
//         token: "duffel_test_ThLUYHmU6F3MbIzMNFc8-ahZA-w_Nn5T5sSkPJ0-SLY"
//     })
//     const {data} = await duffel.seatMaps.get({
//
//         "offer_id": id
//
//     }).then((response) => {
//         return response;
//
//     });
//     // read the JSON from the file
//     return {
//         props: {
//             data: data,
//         },
//     };
// }

