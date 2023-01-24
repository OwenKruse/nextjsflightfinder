import React, {useEffect, useRef, useState} from 'react';
import styles from "../../styles/Home.module.css";
import Navbar from "../../pages/search/resultNavbar";
import MainNavBar from "../../components/Navbar"
import Head from "next/head";
import {Duffel} from '@duffel/api'
import * as fs from "fs";
import Ticket from "../../components/airlineTicket";
import {Box, Pagination, Typography, useTheme} from "@mui/material";
import {alpha} from '@mui/material/styles';
import moment from "moment/moment";
import { formatInTimeZone } from 'date-fns-tz'
import { getTimezoneOffset } from 'date-fns-tz'
import geolib from "geolib";
import momenttz from "moment-timezone";
import Time from "../../backend/time";


export default function List({ query, data}) {
    let to = null;
    let from = null;
    let date = null;
    let returnDate = null;
    if (query !== undefined ){
         to = query.to;
         from = query.from;
         date = query.date;
         returnDate = query.returnDate;
    }


    useRef(null);
    const theme = useTheme();
    return (
        <main style={
            {
                background: alpha(theme.palette.background.paper, 1),
            }
        } className={styles.main}>
                <Head className={
                    styles.head
                }>
                    <title>MileWise</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className={styles.parallax}>
                    {/* The Parallax component takes a prop called "className" that you can use to specify the class of the element to apply the parallax effect to */}
                            <MainNavBar/>
                            <Navbar from={from} to={to} departure={date} returnDate={returnDate} />
                            <Search data={data} query={query} />
                </div>
            </main>
        );
}
export function Show(jsonData, query, index) {
    function flightInfo(flight) {
        let info = [];
        let departure_at = flight.departing_at
        let arrival_at = flight.arriving_at
        let duration = flight.duration
        let departureTime = new Date(departure_at)
        let distance = flight.distance
        let arrivalTime = new Date(arrival_at)
        let origin = flight.origin.city_name
        let destination = flight.destination.city_name
        let originAirport = flight.origin.name
        let destinationAirport = flight.destination.name
        let price = jsonData.jsonData.total_amount
        let originLongitude = flight.origin.longitude
        let originLatitude = flight.origin.latitude
        let destinationLongitude = flight.destination.longitude
        let destinationLatitude = flight.destination.latitude
        let originCode = flight.origin.iata_code
        let destinationCode = flight.destination.iata_code
        let originTimeZone = flight.origin.time_zone
        let destinationTimeZone = flight.destination.time_zone
        info.push({"price": price, "departureTime": departure_at, "arrivalTime": arrival_at, "origin": origin, "destination": destination, "originAirport": originAirport, "destinationAirport": destinationAirport, "duration": duration, "distance": distance, "originLongitude": originLongitude, "originLatitude": originLatitude, "destinationLongitude": destinationLongitude, "destinationLatitude": destinationLatitude, "originCode": originCode, "destinationCode": destinationCode, "destinationTimeZone": destinationTimeZone, "originTimeZone": originTimeZone})
        return (
            info[0]
        )
    }

   function getSlices() {
        let slices = [];
        for (let i = 0; i < jsonData.jsonData.slices.length; i++) {
            let flights = [];
            for (let j = 0; j < jsonData.jsonData.slices[i].segments.length; j++) {
                const flight = flightInfo(jsonData.jsonData.slices[i].segments[j])
                flights.push(flight)
        }
            slices.push(flights)
   }
        return (
            slices
        )
}
    const geolib = require('geolib');
    moment().format();
    const getDistance = (slice) => {
        return slice.segments.reduce((distance, segment) => {
            const origin = segment.origin;
            const destination = segment.destination;
            //Convert to miles
            const meters = geolib.getDistance(
                {latitude: origin.latitude, longitude: origin.longitude},
                {latitude: destination.latitude, longitude: destination.longitude}
            );
            return meters * 0.000621371;
        }, 0);
    }

    const getTotalDistance = (slices) => {
        return slices.reduce((distance, slice) => {
            return distance + getDistance(slice);
        }, 0);
    }

    let distance = getTotalDistance(jsonData.jsonData.slices)

    let milesValue = distance * 0.01
        milesValue = Math.round(milesValue * 100) / 100
        milesValue = milesValue / 2
    // Subtract the miles value from the price
    let price = jsonData.jsonData.total_amount

    const time = Time(jsonData.jsonData.slices)




    function buildTicket() {
        let price = jsonData.jsonData.total_amount
        let departurePlace = query.from
        let arrivalPlace = query.to
        let departureDate = query.date
        let returnDate = query.returnDate
        let slices = getSlices()
        let airline = jsonData.jsonData.owner.name
        let airlineLogo = jsonData.jsonData.owner.logo_symbol_url
        let id = jsonData.jsonData.id
        let priceValue = parseFloat(price) - milesValue



        let specialList = []

        if (index === 0) {
            specialList.push("cheapest")
        }




        return (
            Ticket({
                "price": price,
                "departurePlace": departurePlace,
                "arrivalPlace": arrivalPlace,
                "departureDate": departureDate,
                "returnDate": returnDate,
                "slices": slices,
                "airline": airline,
                "airlineLogo": airlineLogo,
                "specialList": specialList,
                "id": id,
                "priceValue": priceValue,
                "time": time,

            })
        )
    }
    return (
        buildTicket()
    )
}

function Search(data, query) {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const theme = useTheme();
    let listItems = [];
    let totalPages = 0;
    let array = [];
    const resultsPerPage = 10;
    // Check if jsonData is undefined or null

    useEffect(() => {
        if (data.data !== null) {
        array = data.data.offers
            // Sort through the array for the airlines selected if query.airlines is not undefined and not equal to "All Airlines"
            //      let airlines = "All Airlines";
                if(query.airlines !== undefined && query.airlines !== "All Airlines") {
                    array = array.filter(function (item) {
                        return query.airlines.includes(item.owner.name);
                    });
                }
                // Sort through the array for the selectedPriceRange if query.selectedPriceRange is not undefined and not equal to "All Tickets"
                if(query.priceRange !== undefined && query.priceRange !== "All Tickets") {
                    array = array.filter(function (item) {
                        return item.total_amount <= query.priceRange;
                    });
                }


        listItems = array.map((d, index) =>
            <Show key={d} jsonData={d} query={query} index={index}/>
        );
        totalPages = Math.ceil(listItems.length / resultsPerPage);
        const listItemsPerPage = listItems.slice((page - 1) * resultsPerPage, page * resultsPerPage);
        setList(listItemsPerPage);
        }


    }, [data, query, page]);

    if (data.data === undefined || data.data === null) {
        return <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'start', height: '100vh'}}>
            <Typography className={styles.tagline}>Your dream vacation is just a few clicks away.</Typography>
        </Box>
    }





    const handlePageChange = (event, page) => {
        // extract new page number from event object
        setPage(page);  // correct
        scroll(0, 0);
    }

    return (
        <div className={styles.containerSearch}>
            {list.length > 0 ? list : <p>Loading...</p>}
            {totalPages > 1 && (
                <Pagination sx={
                    {display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem', background: alpha(theme.palette.background.default, 0.75), borderRadius: '0.5rem', padding: '0.5rem'}
                }
                    page={page}
                    count={totalPages}
                    onChange={handlePageChange}
                />
            )}
        </div>
    );
}
export async function getServerSideProps({query}) {
    // Send a POST request to the API endpoint

    await query
    if (query === undefined || query === null || query.from === undefined || query.to === undefined || query.date === undefined || query === {}) {
        return {
            props: {
                data: null,
            },
        };
    }
    let from = query.from;
    let to = query.to;
    let departure = query.date;
    let returnDate = query.returnDate;
    let oneWay = query.oneWay;
    let stops = 1;
    let times = "Anytime";
    let price = "All Tickets";
    let children = 0;
    let adults = 1;
    let airlines = "All Airlines";

    if(query.stops !== undefined) {
         from = query.from;
         to = query.to;
         departure = query.date;
         returnDate = query.returnDate;
         oneWay = query.oneWay;
         stops = query.stops;
         times = query.times;
         airlines = query.airlines;
         price = query.priceRange;
         children = query.childrenCount;
         adults = query.adultsCount;



    }
    if(departure === undefined || departure === null || departure === "") {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        departure = today
    }
    from = from.split("(")[1];
    let fromFormatted = from.split(")")[0];
    to = to.split("(")[1];
    let toFormatted = to.split(")")[0];


    function getPassengers(children, adults) {
        const passengers = [];
        for (let i = 0; i < adults; i++) {
            passengers.push({ type: 'adult' });
        }
        for (let i = 0; i < children; i++) {
            passengers.push({ type: 'child' });
        }
        return passengers;
    }

    const passengers = getPassengers(children, adults);

    if (passengers.length === 0) {
        passengers.push({type: 'adult'});
    }

    const duffel = new Duffel({

        token: "duffel_test_ThLUYHmU6F3MbIzMNFc8-ahZA-w_Nn5T5sSkPJ0-SLY"

    })

    let slices = [
        {
            origin: fromFormatted,
            destination: toFormatted,
            departure_time: {

                to: "23:59:59",

                from: "00:00:00"

            },
            departure_date: departure,


        },
    ];
    if (oneWay === "True" || returnDate !== "") {
        slices.push({
            origin: toFormatted,
            destination: fromFormatted,
            departure_time: {

                to: "23:59:59",

                from: "00:00:00"

            },
            departure_date: returnDate,
        });
    }

    const response = await duffel.offerRequests.create({
        passengers,
        slices: slices,
        currency: 'USD',
        max_connections: stops.toString(),
    }).then((response) => {
        // Write the response data to the file named `response.json`
        fs.writeFileSync('response.json', JSON.stringify(response));
        return response;

    }
    ).catch((error) => {
        console.log(error);
    }
    );





// Split the images in half diagonally














// Return the response data
    return {
        props: {
            data: response.data,
            query: query,

        }
    }

}