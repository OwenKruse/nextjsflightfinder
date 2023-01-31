import React from 'react';
import { Container, Box } from '@mui/material';
import {Duffel} from "@duffel/api";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import FlightInfo from "../../components/FlightInfo";
import moment from "moment";



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
        //Write offer to file named offer.json
        let fs = require('fs');
        fs.writeFile('offer.json', JSON.stringify(response.data), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        return response;

    });

    const originCode = offer.data.slices[0].origin.iata_code;
    const destinationCode = offer.data.slices[0].destination.iata_code;
    let departDate = offer.data.slices[0].segments[0].departing_at;
    let returnDate = offer.data.slices[0].segments[offer.data.slices[0].segments.length - 1].arriving_at;
    // Convert to the following format: 2021-01-31 7:00PM using moment.js
    departDate = moment(departDate).format('YYYY-MM-DD h:00A');
    returnDate = moment(returnDate).format('YYYY-MM-DD h:00A');
    const body = `{"SearchTypeSelection":1,"SortType":"bestmatches","SortTypeDescending":false,"Trips":[{"Origin":"${originCode}","Destination":"${destinationCode}","DepartDate":"${departDate}","Index":1,"TripIndex":1,"SearchRadiusMilesOrigin":"-1","SearchRadiusMilesDestination":"-1","DepartTimeApprox":0,"SearchFiltersIn":{"FareFamily":"ECONOMY","AirportsStop":"SFO","AirportsStopToAvoid":null,"StopCountMax":null,"StopCountMin":1},"UseFilters":true,"NonStopMarket":true}],"CabinPreferenceMain":"economy","PaxInfoList":[{"PaxType":1}],"AwardTravel":false,"NGRP":false,"CalendarLengthOfStay":0,"PetCount":0,"RecentSearchKey":"SEALAXInvalid date","CalendarFilters":{"Filters":{"PriceScheduleOptions":{"Stops":1}}},"Characteristics":[{"Code":"SOFT_LOGGED_IN","Value":false},{"Code":"UsePassedCartId","Value":false}],"FareType":"Refundable","CartId":"80815257-7B85-494C-AE3D-7A02B1680FEC"}`
    console.log(body);


    const unitedSearch = await fetch("https://www.united.com/api/flight/FetchFlights", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
            "Accept": "application/json",
            "Accept-Language": "en-US",
            "Content-Type": "application/json",
            "X-Authorization-api": "bearer IHyA6DCfpLhhYio6FlTyHdkSLmZZSPf7ru2nltrulPlHchGH5gbJTnK0P/UXqFo0g+3tSwcgWrRNgYC0Ertc+SiXygNqMlpjmO5iiSW8qKIOZXVwgEB+w4bRER7tInXfD2zDwCX9m1cWAzu8PFP1DK4/kfMD3NxrMWUOIc55+y49JWIC7NOvphx+OkMb6cUi",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        // "body": `{\"SearchTypeSelection\":1,\"SortType\":\"bestmatches\",\"SortTypeDescending\":false,\"Trips\":[{\"Origin\":\"SEA\",\"Destination\":\"LAX\",\"DepartDate\":\"2023-01-31 7:00PM\",\"Index\":1,\"TripIndex\":1,\"SearchRadiusMilesOrigin\":\"-1\",\"SearchRadiusMilesDestination\":\"-1\",\"DepartTimeApprox\":0,\"SearchFiltersIn\":{\"FareFamily\":\"ECONOMY\",\"AirportsStop\":\"SFO\",\"AirportsStopToAvoid\":null,\"StopCountMax\":null,\"StopCountMin\":1},\"UseFilters\":true,\"NonStopMarket\":true}],\"CabinPreferenceMain\":\"economy\",\"PaxInfoList\":[{\"PaxType\":1}],\"AwardTravel\":false,\"NGRP\":false,\"CalendarLengthOfStay\":0,\"PetCount\":0,\"RecentSearchKey\":\"SEALAXInvalid date\",\"CalendarFilters\":{\"Filters\":{\"PriceScheduleOptions\":{\"Stops\":1}}},\"Characteristics\":[{\"Code\":\"SOFT_LOGGED_IN\",\"Value\":false},{\"Code\":\"UsePassedCartId\",\"Value\":false}],\"FareType\":\"Refundable\",\"CartId\":\"80815257-7B85-494C-AE3D-7A02B1680FEC\"}`,
        body: body,
        "method": "POST",
        "mode": "cors"
    });
    const unitedSearchData = await unitedSearch.json();
    console.log(unitedSearchData);
    //Write to file named unitedSearch.json
    let fs = require('fs');
    fs.writeFile('unitedSearch.json', JSON.stringify(unitedSearchData), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    return {
        props: {
            data: data,
            offer: offer.data,
            id: id
        },
    };
}

