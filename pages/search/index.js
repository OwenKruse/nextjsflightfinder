import React, {useEffect, useRef, useState} from 'react';
import resultStyles from "../../styles/Results.module.scss";
import styles from "../../styles/Home.module.css";
import Navbar from "./resultNavbar";
import Head from "next/head";
import {Duffel} from '@duffel/api'
import * as fs from "fs";
import Image from "next/image";
import plane from "../../asset/Asset 11Line.png";
import {Parallax, ParallaxProvider, useParallax} from "react-scroll-parallax";
import background from "../../public/backgroundMain.png";
import {SearchParamsContext} from "next/dist/shared/lib/hooks-client-context";
import movingBG from "../../public/MovingBG.png";

export default function List({ query, data}) {
    let to = query.to;
    let from = query.from;
    let departure = query.departure;
    let returnDate = query.returnDate;
    const target = useRef(null);





        return (
            <main className={styles.main}>
                <Head>
                    <title>Flight Finder</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className={styles.parallax}>
                    {/* The Parallax component takes a prop called "className" that you can use to specify the class of the element to apply the parallax effect to */}
                        <div className={styles.containerSearch}>
                            <Navbar from={from} to={to} departure={departure} />
                            <Search data={data} query={query} />
                        </div>
                </div>
            </main>
        );
}

export function ImageComponent({src, leftRight}) {
    const right  = {
        width: '100%',
        height: '100%',
        position: "absolute",
        left: 0,
        top: 0,
        clipPath: "polygon(60% 0, 100% 0%, 100% 100%, 40% 100%)",
        objectFit: "cover",
        zIndex: -1,
        // Round the corners
        borderRadius: "10px",
        opacity: 0.5,


    }

    const left  ={
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        clipPath: "polygon(0 0, 60% 0, 40% 100%, 0 100%)",
        objectFit: "cover",
        zIndex: -1,
        borderRadius: "10px",
        opacity: 0.5,


}
    if (leftRight === "left") {
        return(
                <Image alt={"image"} src={imageUrl} style={left} />
        )}
    else {
        return(
                <Image alt={"image"} src={imageUrl} style={right} />

        )}
    }



export function Show(jsonData , query) {
    let price = jsonData.jsonData.total_amount
    let airline = jsonData.jsonData
    let departure = jsonData.jsonData.slices[0].segments[0].departing_at
    let arrival = jsonData.jsonData.slices[0].segments[0].arriving_at
    // Convert the departure and arrival times to a more readable format
    departure = new Date(departure).toLocaleString();
    //Split the string so that it doesn't include the date
    departure = departure.split(",")[1];
    arrival = new Date(arrival).toLocaleString();
    // Remove the seconds from the time but keep the AM/PM
    arrival = arrival.split(":")[0] + ":" + arrival.split(":")[1] + " " + arrival.split(" ")[2];
    departure = departure.split(":")[0] + ":" + departure.split(":")[1] + " " + departure.split(" ")[2];

    let departCity = jsonData.jsonData.slices[0].segments[0].origin.city_name
    let airport = jsonData.jsonData.slices[0].segments[0].origin.iata_code
    let airport2 = jsonData.jsonData.slices[0].segments[0].destination.iata_code
    let arriveCity = jsonData.jsonData.slices[0].segments[0].destination.city_name
    let airlineName = jsonData.jsonData.slices[0].segments[0].operating_carrier.name
    let airlineLogo = jsonData.jsonData.slices[0].segments[0].operating_carrier.logo_symbol_url



    //Split the string so that it doesn't include the date
    arrival = arrival.split(",")[1];
    let duration = jsonData.jsonData.slices[0].duration
    // Format the duration to be more readable it is in PT format
    let hours = duration.split("H")[0].split("T")[1];
    let minutes = duration.split("H")[1].split("M")[0];
    duration = hours + "h " + minutes + "m";

    let departCityCapitalized = departCity.toUpperCase()
    let arriveCityCapitalized = arriveCity.toUpperCase();
    console.log(jsonData.jsonData.slices[0].segments.length)

    if (jsonData.jsonData.slices[0].segments.length === 2) {
        console.log("Has connection")
        let connectionDestination = airport2
        let destinationAirport = jsonData.jsonData.slices[0].segments[1].destination.iata_code
        let connectionArrival = arrival
        let destinationArrival = jsonData.jsonData.slices[0].segments[1].arriving_at
        destinationArrival = new Date(destinationArrival).toLocaleString();
        destinationArrival = destinationArrival.split(":")[0] + ":" + destinationArrival.split(":")[1] + " " + destinationArrival.split(" ")[2];
        destinationArrival = destinationArrival.split(",")[1];
        return ( <div className={resultStyles.roundedRectangle}>

                <div className={resultStyles.times}>

                    <div className={resultStyles.arrivalBoxConnection}>
                        <div className={resultStyles.airlineName}>{airlineName}
                            <Image src={airlineLogo}  alt={"airline"} width={100} height={100} className={resultStyles.airlineLogo}/>
                        </div>

                        <div className={resultStyles.timeLabel}>{departure}
                            <div className={resultStyles.city}>{airport}</div>
                        </div>
                    </div>
                    <div className={resultStyles.imageBox}>
                        <Image className={resultStyles.plane} src={plane} alt={"plane"} width={400} />
                    </div>
                    <div className={resultStyles.arrivalBox}>
                        <div className={resultStyles.airlineName}>{airlineName}
                            <Image src={airlineLogo}  alt={"airline"} width={100} height={100} className={resultStyles.airlineLogo}/>
                        </div>
                        <div className={resultStyles.timeLabel}>{connectionArrival}
                            <div className={resultStyles.city}>{connectionDestination}
                                <span className={resultStyles.fullName}>{arriveCity}</span>
                            </div>

                        </div>
                    </div>


                    <div className={resultStyles.imageBox}>

                        <Image className={resultStyles.plane} src={plane} alt={"plane"} width={400} />
                    </div>
                    <div className={resultStyles.departureBoxConnection}>
                        <div className={resultStyles.timeLabel}>{destinationArrival}
                            <div className={resultStyles.city}>{destinationAirport}</div>
                        </div>
                    </div>
                    <div className={resultStyles.verticalLineConnection}></div>

                </div>

                <div className={resultStyles.priceBox}>

                    <div className={resultStyles.price}>
                        <div className={resultStyles.durationBox}>
                            {duration}
                        </div>
                        {price} $
                    </div>
                </div>
            </div>
        );
    }



    const gradientStyles = {
        background: `linear-gradient(to right, ${departCityCapitalized}, ${arriveCityCapitalized})`,
    }
    console.log(gradientStyles)


    return (
        <div className={resultStyles.roundedRectangle}>

            <div className={resultStyles.times}>

                <div className={resultStyles.arrivalBox}>
                        <div className={resultStyles.airlineName}>{airlineName}
                            <Image src={airlineLogo}  alt={"airline"} width={100} height={100} className={resultStyles.airlineLogo}/>
                        </div>

                    <div className={resultStyles.timeLabel}>{departure}
                        <div className={resultStyles.city}>{airport}</div>
                    </div>
                </div>


                <div className={resultStyles.imageBox}>

                    <Image className={resultStyles.plane} src={plane} alt={"plane"} width={400} />
                </div>
                    <div className={resultStyles.departureBox}>
                        <div className={resultStyles.timeLabel}>{arrival}
                            <div className={resultStyles.city}>{airport2}</div>
                        </div>
                    </div>
                <div className={resultStyles.verticalLine}></div>

            </div>

            <div className={resultStyles.priceBox}>

                <div className={resultStyles.price}>
                <div className={resultStyles.durationBox}>
                    {duration}
                </div>
                {price} $
            </div>
            </div>
        </div>
    );

}

export function Search(data, query) {
    // Check if jsonData is undefined or null
    if (data === undefined || data === null) {
        return <p>jsonData is undefined or null</p>;
    }
    //parse the data
    const jsonData = JSON.parse(data.data);
    let toConvert;
    toConvert = jsonData.data.offers;

    // Convert toConvert to an array
    const array = Object.keys(toConvert).map((key) => toConvert[key]);
    // Map the data to the Show function and print every element
    const listItems = array.map((d) =>
        <Show jsonData={d} query={query}/>
    );
    return (
        <div className={styles.containerSearch}>
                {listItems}
        </div>

    );
}
export async function getServerSideProps({query}) {
    const Blob = require('node-blob');
    // Send a POST request to the API endpoint
    const { from, to, departure, returnDate, oneWay } = query;

    console.log(query)
    // format from and to so that they only include the airport code inside the ()
    const fromFormatted = from.substring(from.indexOf("(") + 1, from.indexOf(")"));
    const toFormatted = to.substring(to.indexOf("(") + 1, to.indexOf(")"));
    // Create a new Duffel object
    const duffel = new Duffel({

        token: "duffel_test_ThLUYHmU6F3MbIzMNFc8-ahZA-w_Nn5T5sSkPJ0-SLY"

    })
    const response = await duffel.offerRequests.create({

            passengers: [

                {
                    "fare_type": "frequent_flyer"
                }

            ],
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
            max_connections: 2,

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