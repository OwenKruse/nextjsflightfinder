import * as React from "react";
import styles from "../../styles/airlineTicket.module.scss";
import {
    Grid,
    Typography,
    Avatar,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Button,
    Divider, SvgIcon, Tooltip, Badge, styled, BadgeProps, Stack, Chip, Collapse, useMediaQuery, Box
} from "@mui/material";
import classes from "../../styles/airlineTicket.module.scss";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PaidIcon from '@mui/icons-material/Paid';
import BoltIcon from '@mui/icons-material/Bolt';
import {useState} from "react";
import {useTheme} from "@mui/material";
import { alpha } from '@mui/material/styles';
import moment from "moment/moment";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import {useRouter} from "next/router";
import {fi} from "date-fns/locale";
import parser from "postcss-selector-parser";
import { Modal } from '@mantine/core';
import geolib from "geolib";
interface Props {
    price: number;
    departureDate: string;
    departurePlace: string;
    arrivalDate: string;
    arrivalPlace: string;
    slices: any;
    airline: string;
    airlineLogo: string;
    specialList: any;
    id: string;

}

const Ticket: React.FC<Props> = ({
    price,
    departureDate,
    arrivalDate,
    departurePlace,
    arrivalPlace,
    slices,
    airline,
    airlineLogo,
    specialList,
    id
                                 }) => {
    const [showConnections, setShowConnections] = useState(false);

    // Convert the date to a readable format
    const departureDateFormatted = moment(departureDate).format("DD MMM YYYY");
    const arrivalDateFormatted = moment(arrivalDate).format("DD MMM YYYY");

    // Do the same for the connection times


    let lastSlice = slices[slices.length - 1];
    let isOneWay = true;
    const firstSlice = slices[0];
    if (slices.length > 1 ) {
        isOneWay = false;
    }
    console.log(firstSlice[0]);
    let stops = slices[0].length - 1;
    let stops2 = slices[slices.length - 1].length - 1;
    let duration = moment.duration(firstSlice[0].duration).asMinutes() + moment.duration(firstSlice[firstSlice.length - 1].duration).asMinutes()
    let duration2 = moment.duration(lastSlice[0].duration).asMinutes() + moment.duration(lastSlice[lastSlice.length - 1].duration).asMinutes()
    // convert to hours and minutes
    let hours = Math.floor(duration / 60);
    let minutes = duration % 60;
    let hours2 = Math.floor(duration2 / 60);
    let minutes2 = duration2 % 60;


// Get the difference of the arrival and departure times
    function getTotalMinutes(datePairs) {
        let totalMinutes = 0;

        datePairs.forEach(([date1, date2]) => {
            const time1 = date1.getTime();
            const time2 = date2.getTime();
            const timeDifference = Math.abs(time1 - time2);
            totalMinutes += timeDifference / (1000 * 60);
        });

        return totalMinutes;
    }

    const deviceType = useMediaQuery('(max-width:600px)');

    
    const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: 0,
            top: -5,

        },
    }));

    const BuildStack = () => {
        let stack = [];
        if (specialList.includes("cheapest")) {
            //Green
           stack.push({ key: 0, label: 'Cheapest', color: 'rgba(76,175,80,0.5)', icon: <PaidIcon /> });
        }
        if (specialList.includes("direct")) {
            //Blue
            stack.push({ key: 1, label: 'Direct', color: 'rgb(90,178,246, 0.5)', icon: <BoltIcon /> });
        }
        if (specialList.includes("indirect")) {
//Yellow
            stack.push({ key: 2, label: 'Indirect', color: 'rgba(246,227,55,0.5)', icon: <WarningAmberIcon /> });
        }
        if (specialList.includes("longFlight")) {
            //Red
            stack.push({ key: 3, label: 'Prolonged', color: 'rgba(244,67,54,0.5)', icon: <AccessTimeIcon /> });

        }
        return(
            <Stack direction="column" spacing={1} sx={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',

                }
            }>
            {stack.map((item) => (
                <Chip
                    key={item.key}
                    icon={item.icon}
                    label={item.label}
                    sx={{ borderColor: item.color,
                        color: alpha(theme.palette.text.primary, 1),
                        backgroundColor: item.color,
                        padding: '5px',
                        fontWeight: 'bold',
                        width: '8rem',


                }}
                />
            ))}
            </Stack>
        )
    }
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
    const getDuration = (slice) => {
        const timezone1 = moment.tz(slice.segments[0].origin.time_zone)
        const timezone2 = moment.tz(slice.segments[0].destination.time_zone)
        const difference = timezone1.diff(timezone2, 'hours');

        return slice.segments.reduce((duration, segment) => {
                const departure = moment(segment.departure_time);
                const arrival = moment(segment.arrival_time);
                return duration + arrival.diff(departure, 'hours') + difference;
            }
            , 0);
    }
    const BuildStackMobile = () => {
        let stack = [];
        if (specialList.includes("cheapest")) {
            //Green
            stack.push({ key: 0, label: 'Cheapest', color: 'rgba(76,175,80,0.5)', icon: <PaidIcon /> });
        }
        if (specialList.includes("direct")) {
            //Blue
            stack.push({ key: 1, label: 'Direct', color: 'rgb(90,178,246, 0.5)', icon: <BoltIcon /> });
        }
        if (specialList.includes("indirect")) {
//Yellow
            stack.push({ key: 2, label: 'Indirect', color: 'rgba(246,227,55,0.5)', icon: <WarningAmberIcon /> });
        }
        if (specialList.includes("longFlight")) {
            //Red
            stack.push({ key: 3, label: 'Prolonged', color: 'rgba(244,67,54,0.5)', icon: <AccessTimeIcon /> });

        }
        return(
            <Stack direction="column" spacing={1}>
                {stack.map((item) => (
                    <Tooltip title={item.label} enterTouchDelay={0} placement="top">
                    <Chip
                        key={item.key}
                        icon={item.icon}
                        sx={{ borderColor: item.color,
                            color: alpha(theme.palette.text.primary, 1),
                            backgroundColor: item.color,
                            fontWeight: 'bold',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            padding: '5px',
                            '& .MuiChip-label': {padding: 0},
                            '& .MuiChip-icon': {margin: 0},


                        }}
                    />
                    </Tooltip>
                ))}
            </Stack>
        )
    }

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const router = useRouter();
    const combined = {
        id: id
    }
    function ticketClick() {
        console.log("Ticket Clicked");
        router.push({
            pathname: './order',
            query: combined
        }).then(r => console.log(r));

    }

    return(

        <Grid container onClick={ticketClick} className={styles.mainContainer} spacing={2} sx={
            {
                color: alpha(theme.palette.text.primary, 1),
                height: "100%",
                width: "90%",
                alignItems: "stretch",
                justifyContent: "space-between",
                justifySelf: "center",
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                marginBottom: "2rem",
                padding: "1rem",
                background: alpha(theme.palette.action.selected, 0.04),
            }
        } wrap={"wrap"}>
            <Grid container spacing={2} alignItems="center" className={styles.priceContainer}>
                <Grid item className={styles.titleLogoContainer}>
                        <Grid item>
                            <Avatar src={airlineLogo} className={classes.avatar} sx={
                                {
                                    borderColor: alpha(theme.palette.text.primary, 1),
                                }
                            }/>
                        </Grid>
                        <Grid item  >
                            <Typography variant="h6">{airline}</Typography>
                        </Grid>
                </Grid>
                <Grid item className={styles.price}>
                    <Chip label={price +"$"} variant="outlined" color={"success"} style={
                        {
                            color: alpha(theme.palette.text.primary, 1),
                            fontSize: "1rem",
                        }
                    }/>
                </Grid>

            </Grid>
            <Divider sx={
                {
                    width: "100%",
                }
            } />
            <Grid container spacing={2} alignItems="center" sx={
                {
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem",
                    // render full text
                    '& .MuiTypography-root': {
                        whiteSpace: 'nowrap',

                    }
                }
            }>
            <Grid item xs={2} sx={
                {
                    display: "flex",
                    flexDirection: "column",
                }
            }>

                <Tooltip title={firstSlice[0].originAirport + " (" + firstSlice[0].originCode + ")"} placement="top" enterTouchDelay={0}>
                    <Typography  style={{ fontWeight: 'bold' }}>{firstSlice[0].origin}</Typography>
                </Tooltip>
                    <Tooltip  enterTouchDelay={0} title={moment(firstSlice[0].departureTime).format('MM/DD/YYYY')} placement={"bottom"}>
                        <Typography style={{ opacity: 0.5 }}> {moment(firstSlice[0].departureTime).format('hh:mm A')}</Typography>
                    </Tooltip>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>{firstSlice[0].length}</Typography>
                </Box>
            </Grid>

            <Grid item xs={4} sx={
                {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }
            }>
                <SvgIcon >
                    <ArrowForwardIcon />
                </SvgIcon>

                <Divider sx={
                    {
                        width: deviceType ? '30%' : '100%',
                        height: "1px",
                        color: alpha(theme.palette.text.primary, 1),
                        display: "flex",
                        alignItems: "center",


                    }
                }>



                    {firstSlice.length > 1 && (
                        <Tooltip enterTouchDelay={0} title={"This flight has a layover at the " + firstSlice[firstSlice.length -1].originAirport + "(" + firstSlice[firstSlice.length -1].originCode + ")"} placement="top" arrow sx={
                            {
                                fontWeight: "600"

                            }
                        }>
                            <StyledBadge sx={
                                {
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                }
                            } variant={"dot"} color="primary">
                                <Typography sx={
                                    {
                                        fontWeight: "600",
                                        fontSize: ".75rem",
                                    }
                                } className={styles.duration}>{firstSlice[firstSlice.length -1].origin}</Typography>
                                <Typography sx={
                                    {
                                        fontWeight: "600",
                                        fontSize: ".75rem",
                                        color: alpha(theme.palette.text.primary, .75),
                                    }
                                } className={styles.duration}>{moment.duration(firstSlice[firstSlice.length -1].duration).hours() + "h" + moment.duration(firstSlice[firstSlice.length - 1].duration).minutes() + "m"}</Typography>
                            </StyledBadge>
                        </Tooltip>
                    )}

                </Divider>

                <SvgIcon >
                    <ArrowForwardIcon />
                </SvgIcon>
            </Grid>





                <Grid item xs={3} sx={
                {
                    display: "flex",
                    position: "relative",
                    flexDirection: "column",
                }
            }>
                    {firstSlice.length === 1 && (
                <Tooltip title={firstSlice[firstSlice.length - 1].destinationAirport + " (" + firstSlice[firstSlice.length - 1 ].destinationCode + ")"} enterTouchDelay={0} placement={"top"}>
                    <Typography style={{ fontWeight: 'bold' }}>{firstSlice[firstSlice.length - 1].destination}</Typography>
                </Tooltip>
                    )}
                    {firstSlice.length > 1 && (
                        <Tooltip enterTouchDelay={0} title={firstSlice[firstSlice.length - 1].destinationAirport + " (" + firstSlice[firstSlice.length - 1].destinationAirport + ")"} placement={"top"}>
                            <Typography style={{ fontWeight: 'bold' }}>{firstSlice[firstSlice.length - 1].destination}</Typography>
                        </Tooltip>
                    )}
                <Grid item sx={
                    {
                        display: "flex",
                    }
                }>
                    <Tooltip enterTouchDelay={0} title={moment(firstSlice[firstSlice.length - 1].arrivalTime).format('MM/DD/YYYY')} placement={"bottom"}>
                        <Typography style={{ opacity: 0.5 }}> {moment(firstSlice[firstSlice.length - 1].arrivalTime).format('hh:mm A')}</Typography>
                    </Tooltip>
                </Grid>

            </Grid>
            <Grid item sx={
                {
                    display: "flex",
                    position: "relative",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    justifySelf: "flex-end",
                }
            }>
                <Divider orientation={"vertical"} sx={
                    {
                        height: "80%",
                    }
                } />
                {isMobile === true && (
                    <Grid item sx={
                        {
                            display: "flex",
                            justifyContent: "flex-end",
                        }
                    }>
                        <BuildStackMobile />

                    </Grid>
                )}
                {isMobile === false && (
                    <Grid item xs={12}>
                        <BuildStack />

                </Grid>
                )}
                </Grid>
            </Grid>
            {isOneWay === false && ( <Grid container spacing={2} alignItems="center" sx={
                {
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "nowrap",
                    padding: "1rem",
                    flexDirection: "row",

                }
            }>
                <Grid item xs={2} sx={
                    {
                        display: "flex",
                        position: "relative",
                        flexDirection: "column",
                    }
                }>

                    <Tooltip title={lastSlice[0].originAirport + " (" + lastSlice[0].originCode + ")"} placement="top" enterTouchDelay={0}>
                        <Typography  style={{ fontWeight: 'bold' }}>{lastSlice[0].origin}</Typography>
                    </Tooltip>
                    <Tooltip  enterTouchDelay={0} title={moment(lastSlice[0].arrivalTime).format('MM/DD/YYYY')} placement={"bottom"}>
                        <Typography style={{ opacity: 0.5 }}> {moment(lastSlice[0].arrivalTime).format('hh:mm A')}</Typography>
                    </Tooltip>
                </Grid>
                <Grid item xs={4} sx={
                    {
                        display: "flex",
                        position: "relative",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }
                }>
                    <SvgIcon >
                        <ArrowBackIcon />
                    </SvgIcon>
                    <Divider sx={
                        {
                            width: deviceType ? '30%' : '100%',
                            height: "1px",
                            color: alpha(theme.palette.text.primary, 1),
                            display: "flex",
                            alignItems: "center",
                        }
                    }>



                        {lastSlice.length > 1 && (
                            <Tooltip enterTouchDelay={0} title={"This flight has a layover at the " + lastSlice[lastSlice.length -1].originAirport + "(" + lastSlice[lastSlice.length -1].originCode + ")"} placement="top" arrow sx={
                                {
                                    fontWeight: "600"

                                }
                            }>
                                <StyledBadge sx={
                                    {
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column",
                                    }
                                } variant={"dot"} color="primary">
                                    <Typography sx={
                                        {
                                            fontWeight: "600",
                                            fontSize: ".75rem",
                                        }
                                    } className={styles.duration}>{lastSlice[lastSlice.length -1].origin}</Typography>
                                    <Typography sx={
                                        {
                                            fontWeight: "600",
                                            fontSize: ".75rem",
                                            color: alpha(theme.palette.text.primary, .75),
                                        }
                                    } className={styles.duration}>{lastSlice[0].length}</Typography>
                                </StyledBadge>
                            </Tooltip>
                        )}

                    </Divider>

                    <SvgIcon >
                        <ArrowBackIcon />
                    </SvgIcon>
                </Grid>





                <Grid item xs={3} sx={
                    {
                        display: "flex",
                        position: "relative",
                        flexDirection: "column",
                    }
                }>
                    {lastSlice.length === 1 && (
                        <Tooltip title={lastSlice[lastSlice.length - 1].destinationAirport + " (" + lastSlice[lastSlice.length -1 ].destinationCode + ")"} enterTouchDelay={0} placement={"top"}>
                            <Typography style={{ fontWeight: 'bold' }}>{lastSlice[lastSlice.length -1 ].destination}</Typography>
                        </Tooltip>
                    )}
                    {lastSlice.length > 1 && (
                        <Tooltip enterTouchDelay={0} title={lastSlice[lastSlice.length -1 ].destinationAirport + " (" + lastSlice[lastSlice.length -1 ].destinationCode + ")"} placement={"top"}>
                            <Typography style={{ fontWeight: 'bold' }}>{lastSlice[lastSlice.length -1 ].destination}</Typography>
                        </Tooltip>
                    )}
                    <Grid item sx={
                        {
                            display: "flex",
                        }
                    }>
                        <Tooltip enterTouchDelay={0} title={moment(lastSlice[lastSlice.length - 1 ].departureTime).format('MM/DD/YYYY')} placement={"bottom"}>
                            <Typography style={{ opacity: 0.5 }}> {moment(lastSlice[lastSlice.length - 1].departureTime).format('hh:mm A')}</Typography>
                        </Tooltip>
                    </Grid>

                </Grid>
                <Grid item sx={
                    {
                        display: "flex",
                        position: "relative",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        justifySelf: "flex-end",
                    }
                }>
                    <Divider orientation={"vertical"} sx={
                        {
                            height: "80%",
                        }
                    } />
                    {isMobile === true && (
                        <Grid item sx={
                            {
                                display: "flex",
                                justifyContent: "flex-end",
                            }
                        }>
                            <BuildStackMobile />

                        </Grid>
                    )}
                    {isMobile === false && (
                        <Grid item xs={12}>
                            <BuildStack />

                        </Grid>
                    )}
                </Grid>
            </Grid>)}
        </Grid>
            );
};

export default Ticket;
