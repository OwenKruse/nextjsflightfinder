import React, {useEffect, useRef, useState} from 'react';
import styles from "../../styles/Home.module.css";
import Navbar from "./resultNavbar";
import Head from "next/head";
import {Duffel} from '@duffel/api'
import * as fs from "fs";
import Ticket from "./airlineTicket";
import {Pagination, useTheme} from "@mui/material";
import {alpha} from '@mui/material/styles';
import moment from "moment/moment";


export default function List({ query, data}) {
    let to = query.to;
    let from = query.from;
    let departure = query.departure;
    let returnDate = query.returnDate;

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
                    <title>Flight Finder</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className={styles.parallax}>
                    {/* The Parallax component takes a prop called "className" that you can use to specify the class of the element to apply the parallax effect to */}
                            <Navbar from={from} to={to} departure={departure} returnDate={returnDate} />
                            <Search data={data} query={query} />
                </div>
            </main>
        );
}
export function Show(jsonData, query, index) {
    function flightInfo(flight) {
        let info = [];
        let departure = flight.departing_at
        let arrival = flight.arriving_at
        let duration = flight.duration
        let departureTime = new Date(departure)
        let distance = flight.distance
        let arrivalTime = new Date(arrival)
        let origin = flight.origin.city_name
        let destination = flight.destination.city_name
        let originAirport = flight.origin.name
        let destinationAirport = flight.destination.name
        let airline = flight.operating_carrier.name
        let airlineCode = flight.operating_carrier.iata_code
        let airlineLogo = flight.operating_carrier.logo_symbol_url
        let flightNumber = flight.operating_carrier_flight_number
        let price = jsonData.jsonData.total_amount
        let originLongitude = flight.origin.longitude
        let originLatitude = flight.origin.latitude
        let destinationLongitude = flight.destination.longitude
        let destinationLatitude = flight.destination.latitude
        let originCode = flight.origin.iata_code
        let destinationCode = flight.destination.iata_code
        info.push({"price": price, "departureTime": departureTime, "arrivalTime": arrivalTime, "origin": origin, "destination": destination, "originAirport": originAirport, "destinationAirport": destinationAirport, "airline": airline, "airlineCode": airlineCode, "airlineLogo": airlineLogo, "flightNumber": flightNumber, "duration": duration, "distance": distance, "originLongitude": originLongitude, "originLatitude": originLatitude, "destinationLongitude": destinationLongitude, "destinationLatitude": destinationLatitude, "originCode": originCode, "destinationCode": destinationCode})
        return (
            info[0]
        )
    }
    function flightList(flights) {
        let list = [];
        for (let i = 0; i < flights.length; i++) {
            list.push(flightInfo(flights[i]))
        }
        return list
    }
    const moment = require('moment'); // require
    let specialList = [];
    const geolib = require('geolib');
    let distance = 0;
    let connectionList = [];
    let flights = flightList(jsonData.jsonData.slices[0].segments)
    let firstFlight = flights[0]
    let fullDuration = 0;
    let connectionDuration = 0;
    let destination = firstFlight.destination
    let arrivalTime = firstFlight.arrivalTime
    let departureTime = firstFlight.departureTime
    let secondDuration = 0;


    moment().format();
    function buildTicket() {
        for (let i = 0; i < flights.length; i++) {


            // Calculate the distance between the two points
            distance += geolib.getDistance(
                {latitude: parseFloat(flights[i].originLatitude), longitude: parseFloat(flights[i].originLongitude)},
                {latitude: parseFloat(flights[i].destinationLatitude), longitude: parseFloat(flights[i].destinationLongitude)}
            );



        }
        firstFlight = flights[0]

        origin = firstFlight.origin
        destination = flights[flights.length - 1].destination
        // Find the difference between the first flight arrival and the next flight departure
        let fullDuration = moment.duration(moment(flights[flights.length -1 ].arrivalTime).diff(moment(firstFlight.departureTime))).asMinutes()

        let departure = firstFlight.arrivalTime
        let arrival = flights[flights.length - 1].departureTime
        let duration = moment.duration(moment(arrival).diff(moment(departure))).asMinutes()
        connectionDuration += duration

        secondDuration = moment.duration(flights[flights.length - 1].duration).asMinutes()



        arrivalTime = moment(flights[flights.length - 1].arrivalTime).format('LT')
        departureTime = moment(firstFlight.departureTime).format('LT')
        if (flights.length > 1) {
            connectionList.push(flights[flights.length - 1])
        }
        // Convert fullDuration to hours and minutes
        if (fullDuration > 360) {
            specialList.push("longFlight")
        }
        let hours = Math.floor(fullDuration / 60);
        let minutes = fullDuration % 60;
        fullDuration = hours + "h " + minutes + "m"

        // Convert connectionDuration to hours and minutes
        let connectionHours = Math.floor(connectionDuration / 60);
        let connectionMinutes = connectionDuration % 60;
        connectionDuration = connectionHours + "h " + connectionMinutes + "m"

        if (flights.length > 1) {
            specialList.push("indirect")
        }
        else {
            specialList.push("direct")
        }
        // Convert the arrival time to a readable format


        // Convert secondDuration to hours and minutes
        let secondHours = Math.floor(secondDuration / 60);
        let secondMinutes = secondDuration % 60;
        secondDuration = secondHours + "h " + secondMinutes + "m"


        return (
            Ticket({
                price : jsonData.jsonData.total_amount,
                arrival : arrivalTime,
                departure : departureTime,
                departureDate : firstFlight.departureTime,
                arrivalDate : firstFlight.arrivalTime,
                airline : firstFlight.airline,
                flightNumber : firstFlight.flightNumber,
                origin : firstFlight.origin,
                destination : destination,
                airlineLogo : firstFlight.airlineLogo,
                connectionList : connectionList,
                totalDistance : distance,
                originAirport : firstFlight.originAirport,
                destinationAirport : firstFlight.destinationAirport,
                airlineCode : firstFlight.airlineCode,
                fullDuration : fullDuration,
                duration : firstFlight.duration,
                secondDuration : secondDuration,
                specialList : specialList,
                connectionDuration : connectionDuration,
                originCode : firstFlight.originCode,
                destinationCode : firstFlight.destinationCode
                })

        )
    }
    return (
        buildTicket()
    )
}

function Search(data, query) {
    // Check if jsonData is undefined or null
    if (data === undefined || data === null) {
        return <p>Its time for your adventure!</p>;
    }
    //parse the data
    const jsonData = JSON.parse(data.data);
    let toConvert;
    toConvert = jsonData.data.offers;
    // Convert toConvert to an array
    const array = Object.keys(toConvert).map((key) => toConvert[key]);
    // Check if the airline is one of the airlines we want
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
    if (query === undefined) {
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
    const response = await duffel.partialOfferRequests.create({

            passengers,
            slices: [
                {
                    origin: fromFormatted,
                    destination: toFormatted,
                    departure_time: {

                        to: "23:59:59",

                        from: "00:00:00"

                    },
                    departure_date: departure,


                }
            ],
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