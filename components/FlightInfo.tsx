import {
    Avatar,
    Button,
    Card,
    CardContent,
    Collapse,
    Divider,
    Grid, styled,
    TableContainer,
    TableHead,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import classes from "../styles/flightInfo.module.scss";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import {useRouter} from "next/router";


import Time from "../backend/time";
import {inspect} from "util";
import {Duffel} from "@duffel/api";
export default function FlightInfo( {slice, data, order_id} ) {



    const [isCollapsed, setIsCollapsed] = useState(false);
    // Map the collapsed state to the index of the slice
    const [isCollapsed1, setIsCollapsed1] = useState(false);
    const handleCollapse = (index) => {
        if (index === 0) {
            setIsCollapsed(!isCollapsed);
        }
        if (index === 1) {
            setIsCollapsed1(!isCollapsed1);
        }
    };

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
        let duration = time[0][0].tripTime.timeZoneDuration;
        // Convert the duration to hours and minutes check if the duration is less than 1 hour
        if (duration < 60) {
            duration = duration + "m";
        }
        else {
            duration = Math.floor(duration / 60) + "h " + (duration % 60) + "m";
        }
        let departure = time[0][0].origin.departing_at
        let arrival = time[0][0].destination.arriving_at
        let arrivalDate =  new Date(arrival);
        let departureDate = new Date(departure);
        let layoverTime = null;
        if (layover) {
            layoverTime = time[0][0].tripTime.totalLayoverTime;
            if (layoverTime < 60) {
                layoverTime = layoverTime + "m";
            }
            else {
                layoverTime = Math.floor(layoverTime / 60) + "h " + (layoverTime % 60) + "m";
            }

        }
        // If the flight lands the next day, add "+1" to the arrival time
        if (arrivalDate.getDate() > departureDate.getDate()) {
            arrival = `+1 ${arrival}`;
        }
        const convertDuration = (time) => {
            let duration = time;
            if (duration < 60) {
                duration = duration + "m";
            }
            else {
                duration = Math.floor(duration / 60) + "h " + (duration % 60) + "m";
            }
            return duration;
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
                                <Typography className={classes.duration} variant="subtitle1">{duration}</Typography>


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

                                </Divider>
                                <Typography> {arrival} </Typography>
                                <FlightLandIcon sx={
                                    {color: "primary.main",
                                        margin: "0 10px",
                                        fontSize: "2rem"
                                    }                                }/>
                                <Typography className={classes.fullName}>{flightInfo.destination} </Typography> <Typography>({flightInfo.destinationCode})</Typography>
                            </Grid>

                        </Grid>

                    </Grid>
                    {layover && <Grid container alignItems="center" spacing={2} className={classes.gridContainerFlightInfo}>
                    <Button onClick={() => handleCollapse(index)}>Connection Information</Button>
                    <Collapse in={index === 0  ? isCollapsed : isCollapsed1} timeout="auto" unmountOnExit>
                        <Card sx={
                            {width: "100%",
                                margin: "10px 0",
                        }}>
                            <CardContent>
                                <Grid container spacing={2} >
                                    <Grid item className={classes.gridContainerRow}>
                                        <Typography sx={
                                            {
                                                marginRight: "10px"
                                            }
                                        } variant="h6">{slice.segments[0].origin.city_name} to {slice.segments[0].destination.city_name}</Typography>
                                        <Typography variant="h6">{convertDuration(time[0][0].duration.duration)}</Typography>
                                </Grid>
                                </Grid>


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



                            </CardContent>
                        </Card>
                        <Card sx={
                            {width: "100%",
                                margin: "10px 0",
                            }}>
                            <CardContent className={classes.layoverTime}>
                                <Typography variant="h6">On the ground in {slice.segments[0].destination.city_name} for {layoverTime}</Typography>
                            </CardContent>
                        </Card>

                        <Card sx={
                            {width: "100%",
                                margin: "10px 0",
                            }}>
                            <CardContent>
                                <Grid container spacing={2} >
                                    <Grid item className={classes.gridContainerRow}>
                                        <Typography sx={
                                            {
                                                marginRight: "10px"
                                            }
                                        } variant="h6">{slice.segments[1].origin.city_name} to {slice.segments[1].destination.city_name}</Typography>
                                        <Typography variant="h6">{convertDuration(time[0][1].duration.duration)}</Typography>
                                    </Grid>
                                </Grid>                                <Divider/>
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
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h6">Baggage included with your flight</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography>
                                            {baggageInfo.baggageQuantity} {baggageInfo.baggageType}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        )
    }

    const passenger_ids = [];
    slice.passengers.forEach((passenger) => {
        passenger_ids.push(passenger.id);
      }
    )

    const router = useRouter();


    function handleCheckout() {
        const duffel = new Duffel({

            token: "duffel_test_ThLUYHmU6F3MbIzMNFc8-ahZA-w_Nn5T5sSkPJ0-SLY",

        })
        router.push(
            {
                pathname: '/checkout',
                query: { id: order_id,
                    passenger_ids: passenger_ids,
                    slice : slice
                },
            }
        ).then(r => console.log(r));
    }

    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        padding: '6px 12px',
        border: '1px solid',
        backgroundColor: '#0063cc',
        borderColor: '#0063cc',
        color: 'black',
        fontSize: 16,
        lineHeight: 1.5,
        fontWeight: 200,
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            color: 'white',

        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    });

    const checkoutButton = () => {
        let totalPrice = slice.total_amount;
        return (
            <BootstrapButton onClick={handleCheckout} variant="contained" color="primary" disableRipple>
                Book for ${totalPrice}
            </BootstrapButton>
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
    return (
        <div style={
            {display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                margin: "0 auto",
                padding: "0 20px",
            }}>
            {slice.slices.map((slice, index) => displayFlightInfo(slice, index))}
            {checkoutButton()}
        </div>
    )
}

