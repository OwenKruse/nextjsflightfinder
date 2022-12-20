import React, {useEffect, useRef, useState} from 'react';
import styles from "../../styles/Home.module.css";
import Navbar from "./resultNavbar";
import Head from "next/head";
import {Duffel} from '@duffel/api'
import * as fs from "fs";
import Ticket from "./airlineTicket";
import {Pagination} from "@mui/material";
import {useTheme} from "@mui/material";
import { alpha } from '@mui/material/styles';


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
        let originAirport = origin.iata_code
        let destinationAirport = destination.iata_code
        let airline = flight.operating_carrier.name
        let airlineCode = flight.operating_carrier.iata_code
        let airlineLogo = flight.operating_carrier.logo_symbol_url
        let flightNumber = flight.operating_carrier_flight_number
        let price = jsonData.jsonData.total_amount

        // Order the list to fit the order of the ticket
        // interface Props {
        //     price: number;
        //     arrival: Date;
        //     departure: Date;
        //     airline: string;
        //     flightNumber: string;
        //     origin: string;
        //     destination: string;
        //     cabinClass: string;
        //     logoUrl: string;
        //     connection: Connection[];
        // }
        info.push(price, arrivalTime, departureTime, airline, origin, destination, airlineLogo)

        return (
            info
        )
    }
    let airport = jsonData.jsonData.slices[0].segments[0].origin.iata_code
    let airport2 = jsonData.jsonData.slices[0].segments[0].destination.iata_code


    let specialList = []
    if (index === 0) {
        specialList.push("cheapest")
    }
    if (jsonData.jsonData.slices[0].segments.length > 1) {
        specialList.push("indirect")
        let connection = jsonData.jsonData.slices[0].segments[0]
        connection = flightInfo(connection)
        let flight = jsonData.jsonData.slices[0].segments[1]
        flight = flightInfo(flight)
        connection = {
            origin : connection[4],
            destination : connection[5],
            departureTime : connection[2],
            arrivalTime : connection[1],
        }
        let airport2 = jsonData.jsonData.slices[0].segments[1].destination.iata_code
        let airport3 = jsonData.jsonData.slices[0].segments[0].destination.iata_code
        let fullOrigin = jsonData.jsonData.slices[0].segments[0].origin.name + " (" + airport + ")"
        let fullDestination = jsonData.jsonData.slices[0].segments[1].destination.name + " (" + airport2 + ")"
        let fullConnection =  jsonData.jsonData.slices[0].segments[0].destination.name + " (" + airport3 + ")"
        let totalDistance = parseFloat(jsonData.jsonData.slices[0].segments[0].distance) + parseFloat(jsonData.jsonData.slices[0].segments[1].distance)
        let price = jsonData.jsonData.total_amount
        let milesValue = (totalDistance * 1.3 / 100);
        let truePrice =  (price - (milesValue / 2) / (1- .029))
        let truePriceRounded = Math.round(truePrice * 100) / 100
        // Convert the strings to dates and then subtract them to get the duration
        let departureTime = new Date(jsonData.jsonData.slices[0].segments[0].departing_at)
        let arrivalTime = new Date(jsonData.jsonData.slices[0].segments[1].arriving_at)
        let duration = arrivalTime - departureTime
        let durationHours = Math.floor(duration / 3600000)
        let durationMinutes = Math.floor((duration % 3600000) / 60000)
        let layoverDuration = durationHours + "h " + durationMinutes + "m"
        if (durationHours > 24) {
            specialList.push("long")
        }
        let fullTime = jsonData.jsonData.slices[0].duration



        return (
            Ticket( {
                price: flight[0],
                arrival: flight[1],
                departure: connection.departureTime,
                airline: flight[3],
                origin: connection.origin,
                destination: flight[5],
                cabinClass: jsonData.jsonData.cabin_class,
                logoUrl: flight[6],
                connection: [connection],
                totalDistance: totalDistance,
                fullOrigin : fullOrigin,
                fullDestination : fullDestination,
                fullConnection : fullConnection,
                layoverDuration : layoverDuration,
                specialList : specialList,
                fullTime : fullTime,
            })
        )

    }
    specialList.push("direct")
    let price = jsonData.jsonData.total_amount
    let airline = jsonData.jsonData
    let flight = jsonData.jsonData.slices[0].segments[0]
    let departure = flight.departing_at
    let departureTime = new Date(departure)
    let arrival = flight.arriving_at
    let arrivalTime = new Date(arrival)
    let origin = jsonData.jsonData.slices[0].segments[0].origin.city_name

    let destination = jsonData.jsonData.slices[0].segments[0].destination.city_name
    let airlineName = jsonData.jsonData.slices[0].segments[0].operating_carrier.name
    let airlineLogo = jsonData.jsonData.slices[0].segments[0].operating_carrier.logo_symbol_url
    let flightNumber = jsonData.jsonData.slices[0].segments[0].operating_carrier_flight_number
    let distance = jsonData.jsonData.slices[0].distance
    let duration = jsonData.jsonData.slices[0].duration
    let cabin = jsonData.jsonData.slices[0].segments[0].cabin_class
    let fullOrigin = jsonData.jsonData.slices[0].segments[0].origin.name + " (" + airport + ")"
    let fullDestination = jsonData.jsonData.slices[0].segments[0].destination.name + " (" + airport2 + ")"
    let fullTime = jsonData.jsonData.slices[0].duration



    //Split the string so that it doesn't include the date
    arrival = arrival.split(",")[1];
    let connectionList = []
    return (
        Ticket({price: price, arrival: arrivalTime, departure: departureTime, connections: connectionList,airline: airlineName, flightNumber: flightNumber, origin: origin, destination: destination, cabinClass: cabin, logoUrl: airlineLogo, totalDistance: distance, fullOrigin: fullOrigin, fullDestination: fullDestination, specialList: specialList, fullTime: fullTime})
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
}export async function getServerSideProps({query}) {
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
    console.log(from)
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
        console.log(adults, children)
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