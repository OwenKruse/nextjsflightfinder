import React from 'react';
import { Container, Box } from '@mui/material';
import SeatMap from '../../components/SeatMap';
import {Duffel} from "@duffel/api";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import FlightInfo from "../../components/FlightInfo";



const Index = ({data, offer, id}) => {

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
                    <FlightInfo slice={offer} data={data} order_id={id}/>

                </Box>
            </Container>
        </div>
    );
};

export default Index;

export const getServerSideProps = async ({ query }) => {
    const { id } = query;
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
            id: id
        },
    };
}

