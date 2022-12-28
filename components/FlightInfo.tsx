import {Button, Card, CardContent, Collapse, Divider, Grid, Typography} from "@mui/material";
import React, {useState} from "react";
import classes from "../styles/flightInfo.module.scss";
import SeatMap from "./SeatMap";
import geolib from "geolib";
export default function FlightInfo( {slice, data} ) {


    const [isCollapsed, setIsCollapsed] = useState(false);

    const displayFlightInfo = (slice) => {
        const flightInfo = {
            origin: slice.origin.name,
            destination: slice.destination.name,
            departure: slice.segments[0].departing_at,
            arrival: slice.segments[0].arriving_at,
            airline: slice.segments[0].marketing_carrier.name,
            duration: slice.duration,
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


        // Create a responsive MUI grid to display the ticket info add class names to be styled later.
        return (

            <Card className={classes.ticket}>
                <CardContent>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item >
                            <Typography variant="h6">{flightInfo.airline}</Typography>
                            <Divider/>
                            <Typography variant="subtitle1">
                                {flightInfo.origin} → {flightInfo.destination}
                            </Typography>
                            <Typography variant="subtitle1">
                                {flightInfo.departure} → {flightInfo.arrival}
                            </Typography>
                            <Typography variant="subtitle1">{flightInfo.duration}</Typography>
                        </Grid>
                    </Grid>
                    <Button onClick={() => setIsCollapsed(!isCollapsed)}>Show Seat Map</Button>
                    <Collapse in={isCollapsed} timeout="auto" unmountOnExit>
                        <div>
                            <SeatMap data={data} offer={slice}/>
                        </div>
                    </Collapse>

                </CardContent>
            </Card>
        )
    }
    // For each slice in the data, display the flight info.

    return (
        <div>
            {slice.slices.map((slice) => displayFlightInfo(slice))}
        </div>
    )
}