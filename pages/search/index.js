import React, {useEffect, useRef, useState} from 'react';
import styles from "../../styles/Home.module.css";
import Navbar from "./resultNavbar";
import MainNavBar from "../navbar"
import Head from "next/head";
import {Duffel} from '@duffel/api'
import * as fs from "fs";
import Ticket from "./airlineTicket";
import {Box, Pagination, Typography, useTheme} from "@mui/material";
import {alpha} from '@mui/material/styles';
import moment from "moment/moment";
import { formatInTimeZone } from 'date-fns-tz'
import { getTimezoneOffset } from 'date-fns-tz'


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

    moment().format();

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
                "id": id

            })
        )
    }
    return (
        buildTicket()
    )
}

function Search(data, query) {
    console.log(data)
    // Check if jsonData is undefined or null
    if (data.data === undefined || data.data === null) {
        return <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
            <Typography className={styles.tagline}>Your dream vacation is just a few clicks away.</Typography>
            </Box>
    }
    //parse the data
    const jsonData = JSON.parse(data.data);
    let toConvert;
    toConvert = jsonData.data.offers;
    // Convert toConvert to an array
    let array = Object.keys(toConvert).map((key) => toConvert[key]);
    array = array.sort((a, b) => a.total_amount - b.total_amount);

    //Check if the array is empty
    if (array.length === 0) {
        return <p>Hmm, we couldn't find any flights matching your search. Try changing your search parameters. If the problem persists please contact our support.</p>;
    }
    // Map the data to the Show function
    const listItems = array.map((d, index) =>
        <Show jsonData={d} query={query} index={index}/>
    );
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const resultsPerPage = 10;
    const totalPages = Math.ceil(listItems.length / resultsPerPage);

    useEffect(() => {
        const startIndex = (page - 1) * resultsPerPage;
        const endIndex = startIndex + resultsPerPage;
        setList(listItems.slice(startIndex, endIndex));
    }, [page]);

    const handlePageChange = (event, page) => {
        // extract new page number from event object
        setPage(page);  // correct
        scroll(0, 0);
    }

    const theme = useTheme();
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
    console.log(query)
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
    if (oneWay === "false" || returnDate === undefined) {
        console.log("return date")
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
    let toReturn;
    toReturn = JSON.stringify(response);





// Split the images in half diagonally














// Return the response data
    return {
        props: {
            data: toReturn,
            query: query,

        }
    }

}