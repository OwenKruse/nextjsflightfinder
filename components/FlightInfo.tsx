import {Avatar, Button, Card, CardContent, Collapse, Divider, Grid, Typography} from "@mui/material";
import React, {useState} from "react";
import classes from "../styles/flightInfo.module.scss";
import SeatMap from "./SeatMap";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import LuggageIcon from '@mui/icons-material/Luggage';
import CarryOnIcon from '@mui/icons-material/BusinessCenter';
import geolib from "geolib";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Time from "../backend/time";
export default function FlightInfo( {slice, data} ) {



    const [isCollapsed, setIsCollapsed] = useState(false);
    // Map the collapsed state to the index of the slice
    const [isCollapsed1, setIsCollapsed1] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [selectedService, setSelectedService] = useState(null);

    const handleCollapse = (index) => {
        if (index === 0) {
            setIsCollapsed(!isCollapsed);
        }
        if (index === 1) {
            setIsCollapsed1(!isCollapsed1);
        }
    };


    const handleSelectSeat = (seat) => {
        setSelectedSeat(seat);
    }

    const handleSelectService = (service) => {
        setSelectedService(service);
    }

    const handleBook = () => {
        console.log(selectedSeat);
        console.log(selectedService);
    }
    const displayFlightInfo = (slice, index) => {

        const time =Time(slice);
        const flightInfo = {
            origin: slice.origin.name,
            destination: slice.destination.name,
            departure: slice.segments[0].departing_at,
            arrival: slice.segments[0].arriving_at,
            airline: slice.segments[0].marketing_carrier.name,
            duration: slice.duration,
            originCode: slice.origin.iata_code,
            destinationCode: slice.destination.iata_code,
            originCity: slice.segments[0].origin.city_name,
            destinationCity: slice.segments[0].destination.city_name,
            flightLogo: slice.segments[0].marketing_carrier.logo_symbol_url,
        }
        console.log(flightInfo);

        const geolib = require('geolib');
        const getDistance = (slice) => {
            return slice.segments.reduce((distance, segment) => {
                const origin = segment.origin;
                const destination = segment.destination;
                const meters = geolib.getDistance(
                    {latitude: origin.latitude, longitude: origin.longitude},
                    {latitude: destination.latitude, longitude: destination.longitude}
                );
                return meters * 0.000621371;
            }, 0);
        }
        const distance = getDistance(slice);

        let layover = null;
        if (slice.segments.length > 1) {
            layover = true;
        }
        let duration = time[0][0].duration.timeZoneDuration;
        let departure = time[0][0].origin.departing_at
        let arrival = time[0][0].destination.arriving_at
        let arrivalDate =  new Date(arrival);
        let departureDate = new Date(departure);
        // If the flight lands the next day, add "+1" to the arrival time
        if (arrivalDate.getDate() > departureDate.getDate()) {
            arrival = `+1 ${arrival}`;
        }
        //Convert the times to hours and minutes with am/pm format with only one digit for the hour if it's less than 10
        departure = departureDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
        arrival = arrivalDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});



        return (

            <Card className={classes.ticket}>
                <CardContent className={classes.card}>
                    <Grid container alignItems="center" spacing={2} className={classes.gridContainer}>
                        <Grid item className={classes.gridItem}>
                            <Grid container alignItems="center" spacing={2}>
                                <Avatar className={classes.avatar} src={flightInfo.flightLogo}/>
                                <Typography variant="h6" className={classes.airline}>{flightInfo.airline}</Typography>
                                <Typography variant="subtitle1">
                                    {layover ? `1 Stop` : "Nonstop"}
                                </Typography>
                            </Grid>
                            <Divider/>
                            <Grid item className={classes.text}>
                                <Typography>{departure}</Typography>
                                <FlightTakeoffIcon sx={
                                    {color: "primary.main",
                                        margin: "0 10px",
                                        fontSize: "2rem"


                                    }
                                }/>
                                <Typography className={classes.fullName}>{flightInfo.origin} </Typography> <Typography>({flightInfo.originCode})</Typography>
                                <Divider className={classes.divider}>
                                    {layover && <Typography variant="subtitle1">
                                    {time[0][0].tripTime.totalLayoverTime} min
                                </Typography>}
                                </Divider>
                                <Typography> {arrival} </Typography>
                                <FlightLandIcon sx={
                                    {color: "primary.main",
                                        margin: "0 10px",
                                        fontSize: "2rem"
                                    }                                }/>
                                <Typography className={classes.fullName}>{flightInfo.destination} </Typography> <Typography>({flightInfo.destinationCode})</Typography>
                            </Grid>
                            <Typography variant="subtitle1">{duration}</Typography>

                        </Grid>

                    </Grid>
                    {layover && <Grid container alignItems="center" spacing={2} className={classes.gridContainerFlightInfo}>
                    <Button onClick={() => handleCollapse(index)}>Flight Info</Button>
                    <Collapse in={index === 0  ? isCollapsed : isCollapsed1} timeout="auto" unmountOnExit>
                        <Card sx={
                            {width: "100%",
                                margin: "10px 0",
                        }}>
                            <CardContent>
                                <Typography variant="h6">{slice.segments[0].origin.city_name} to {slice.segments[0].destination.city_name}</Typography>
                                <Divider/>
                                <Typography variant="subtitle1" className={classes.text}>
                                        {departure}
                                    <FlightTakeoffIcon sx={
                                        {color: "primary.main",
                                            margin: "0 10px",
                                            fontSize: "2rem"
                                        }
                                    }/>
                                    <Typography className={classes.fullName}>{slice.segments[0].origin.name} </Typography>({slice.segments[0].origin.iata_code})
                                    <Divider className={classes.divider}>
                                    </Divider>
                                    {arrival}
                                    <FlightLandIcon sx={
                                        {color: "primary.main",
                                            margin: "0 10px",
                                            fontSize: "2rem"
                                        }                                    }/>
                                    <Typography className={classes.fullName}>{slice.segments[0].destination.name} </Typography>({slice.segments[0].destination.iata_code})
                                </Typography>



                                <Typography variant="subtitle1">{duration}</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={
                            {width: "100%",
                                margin: "10px 0",
                            }}>
                            <CardContent>
                                <Typography variant="h6">{slice.segments[1].origin.city_name} to {slice.segments[1].destination.city_name}</Typography>
                                <Divider/>
                                <Typography variant="subtitle1" className={classes.text}>
                                    {departure}
                                    <FlightTakeoffIcon sx={
                                        {color: "primary.main",
                                            margin: "0 10px",
                                            fontSize: "2rem"
                                        }
                                    }/>
                                    <Typography className={classes.fullName}>{slice.segments[1].origin.name} </Typography>({slice.segments[1].origin.iata_code})
                                    <Divider className={classes.divider}>
                                    </Divider>
                                    {arrival}
                                    <FlightLandIcon sx={
                                        {color: "primary.main",
                                            margin: "0 10px",
                                            fontSize: "2rem"
                                        }                                    }/>
                                    <Typography className={classes.fullName}>{slice.segments[1].destination.name} </Typography>({slice.segments[1].destination.iata_code})
                                </Typography>



                                <Typography variant="subtitle1">{duration}</Typography>
                            </CardContent>
                        </Card>

                    </Collapse>
                    </Grid>}
                </CardContent>
            </Card>
        );
    }

    const displayBaggageInfo = (passenger) => {
        const baggageInfo = {
            baggageType: passenger.baggages[0].type,
            baggageQuantity: passenger.baggages[0].quantity,
        }
        // Create a Card to display the baggage information. Include the quantity and type of Bag. Capitile the Type of Bag
        // Also use the icons to display the type of bag
        return (
            <Card className={classes.ticket}>
                <CardContent className={classes.card}>
                    <Grid container alignItems="center" spacing={2} className={classes.gridContainer}>
                        <Grid item className={classes.gridItem}>
                            <Typography variant="h6">Baggage Info</Typography>
                            <Divider/>
                            <Grid item className={classes.text}>
                                <Typography>{baggageInfo.baggageQuantity} {baggageInfo.baggageType.charAt(0).toUpperCase() + baggageInfo.baggageType.slice(1)} </Typography>
                                {baggageInfo.baggageType === "carry_on" && <LocalMallIcon sx={
                                    {color: "primary.main",
                                        margin: "0 10px",
                                        fontSize: "2rem"
                                    }
                                }/>}
                                {baggageInfo.baggageType === "checked" && <LuggageIcon sx={
                                    {color: "primary.main",
                                        margin: "0 10px",
                                        fontSize: "2rem"
                                    }
                                }/>}
                                {baggageInfo.baggageType === "unaccompanied" && <CarryOnIcon sx={
                                    {color: "primary.main",
                                        margin: "0 10px",
                                        fontSize: "2rem"
                                    }
                                }/>}
                            </Grid>
                            </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    }

    const displayPriceInfo = (price) => {
        const priceInfo = {
            basePrice: price.base_amount,
            tax: price.tax_amount,
            total: price.total_amount,
        }
        // Create a Card to display the price information. Include the base price, tax and total price

        return (
            <Card className={classes.priceInfo}>
                <CardContent className={classes.card}>
                    <Grid container alignItems="center" spacing={2} className={classes.gridContainer}>
                        <Grid item className={classes.gridItem}>
                            <Typography variant="h6">Price Info</Typography>
                            <Divider/>
                            <Grid item className={classes.text}>
                                <Typography>Base Price: ${priceInfo.basePrice}</Typography>
                                <Typography>Tax: ${priceInfo.tax}</Typography>
                                <Typography>Total Price: ${priceInfo.total}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    }

    // For each slice in the data, display the flight info.
    console.log(slice);
    return (
        <div>
            {slice.slices.map((slice, index) => displayFlightInfo(slice, index))}
            <Grid container alignItems="center" spacing={2} className={classes.gridContainer}>
                <Grid item className={classes.gridItem}>
                    {slice.slices[0].segments[0].passengers.map((passenger, index) => displayBaggageInfo(passenger))}
                </Grid>
                <Grid item >
                    {displayPriceInfo(slice)}
                </Grid>
            </Grid>
        </div>
    )
}