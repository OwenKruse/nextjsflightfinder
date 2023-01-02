import {Button, Card, CardContent, Collapse, Divider, Grid, Typography} from "@mui/material";
import React, {useState} from "react";
import classes from "../styles/flightInfo.module.scss";
import SeatMap from "./SeatMap";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import LuggageIcon from '@mui/icons-material/Luggage';
import CarryOnIcon from '@mui/icons-material/BusinessCenter';
import geolib from "geolib";
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
        // Convert duration to hours and minutes
        let duration = slice.duration.split("T")[1].split(":");
        //Check if segments is greater than 1 (i.e. if there is a layover) if there is, add the duration of the layover to the total duration
        // Also get the layover information
        let layover = null;
        if (slice.segments.length > 1) {
            const layoverDuration = slice.segments[1].duration.split("T")[1].split(":");
            duration[0] = parseInt(duration[0]) + parseInt(layoverDuration[0]);
            duration[1] = parseInt(duration[1]) + parseInt(layoverDuration[1]);
            layover = {
                airport: slice.segments[1].origin.name,
                duration: slice.segments[1].duration,
                originCity: slice.segments[1].origin.city_name,
                destinationCity : slice.segments[1].destination.city_name,
                destinationCode : slice.segments[1].destination.iata_code,
                originCode: slice.segments[1].origin.iata_code,
                // Get the time on the ground by finding the difference between the arrival time of the first segment and the departure time of the second segment
                timeOnGround: slice.segments[1].departing_at.split("T")[1].split(":").reduce((time, timeComponent, index) => {
                    const firstTimeComponent = slice.segments[0].arriving_at.split("T")[1].split(":")[index];
                    if (index === 0) {
                        time += (parseInt(timeComponent) - parseInt(firstTimeComponent)) * 60;
                    } else {
                        time += parseInt(timeComponent) - parseInt(firstTimeComponent);
                    }
                    return time;
                }, 0)
            }
        }

        const departureTime = new Date(flightInfo.departure);
        const arrivalTime = new Date(flightInfo.arrival);
        const departureHours = departureTime.getHours() % 12;
        const departureMinutes = departureTime.getMinutes();
        const arrivalHours = arrivalTime.getHours() % 12;
        const arrivalMinutes = arrivalTime.getMinutes();
        const departure = `${departureHours}:${departureMinutes} ${departureTime.getHours() > 12 ? "PM" : "AM"}`;
        let arrival = `${arrivalHours}:${arrivalMinutes} ${arrivalTime.getHours() > 12 ? "PM" : "AM"}`;
        // If the flight lands the next day, add "+1" to the arrival time
        if (arrivalTime.getDate() > departureTime.getDate()) {
            arrival = `+1 ${arrival}`;
        }




        return (

            <Card className={classes.ticket}>
                <CardContent className={classes.card}>
                    <Grid container alignItems="center" spacing={2} className={classes.gridContainer}>
                        <Grid item className={classes.gridItem}>
                            <Typography variant="h6">{flightInfo.airline}</Typography>
                            <Divider/>
                            <Grid item className={classes.text}>
                                <Typography>{departure}</Typography>
                                <FlightTakeoffIcon/>
                                <Typography className={classes.fullName}>{flightInfo.origin} </Typography>({flightInfo.originCode})
                                <Divider className={classes.divider}>
                                    {layover && <Typography variant="subtitle1">
                                    {layover.timeOnGround} min
                                </Typography>}
                                </Divider>
                                <Typography> {arrival} </Typography>
                                <FlightLandIcon/>
                                <Typography className={classes.fullName}>{flightInfo.destination} </Typography> ({flightInfo.destinationCode})
                            </Grid>
                            <Typography variant="subtitle1">{duration}</Typography>
                            <Typography variant="subtitle1">
                                {layover ? `1 Stop` : "Nonstop"}
                            </Typography>
                        </Grid>

                    </Grid>
                    <Button onClick={() => handleCollapse(index)}>Flight Info</Button>
                    <Collapse in={index === 0  ? isCollapsed : isCollapsed1} timeout="auto" unmountOnExit>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{flightInfo.originCity} to {flightInfo.destinationCity}</Typography>
                                <Divider/>
                                <Typography variant="subtitle1" className={classes.text}>
                                    {departure}
                                    <FlightTakeoffIcon/>
                                    {flightInfo.origin} - ({flightInfo.originCode})
                                    <Divider className={classes.divider}>

                                    </Divider>
                                    {arrival}
                                    <FlightLandIcon/>
                                    {flightInfo.destination} - ({flightInfo.destinationCode})
                                </Typography>



                                <Typography variant="subtitle1">{duration}</Typography>
                            </CardContent>
                        </Card>
                        {layover && <Card>
                            <CardContent>
                                <Typography variant="h6">{layover.originCity} to {layover.destinationCity}</Typography>
                                <Divider/>
                                <Typography variant="subtitle1" className={classes.text}>
                                    {departure}
                                    <FlightTakeoffIcon/>
                                    {layover.origin} - {layover.originCity} - {layover.originIata}
                                    <Divider className={classes.divider}>
                                    </Divider>
                                    {arrival}
                                    <FlightLandIcon/>
                                    {layover.destination} - {layover.destinationCity} - {layover.destinationIata}
                                </Typography>
                                <Typography variant="subtitle1">
                                    {layover ? `1 Stop` : "Nonstop"}
                                </Typography>

                                <Typography variant="subtitle1">{duration}</Typography>
                            </CardContent>
                        </Card>}
                    </Collapse>
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
                            <Typography variant="subtitle1" className={classes.text}>
                                {baggageInfo.baggageQuantity} {baggageInfo.baggageType.charAt(0).toUpperCase() + baggageInfo.baggageType.slice(1)} Bag
                                    {baggageInfo.baggageType === "carry_on" ?
                                        <CarryOnIcon/> :
                                        <LuggageIcon/>
                                    }
                            </Typography>
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
            {slice.slices[0].segments[0].passengers.map((passenger, index) => displayBaggageInfo(passenger))}
        </div>
    )
}