import * as React from "react";
import styles from "../styles/airlineTicket.module.scss";
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
import classes from "../styles/airlineTicket.module.scss";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PaidIcon from '@mui/icons-material/Paid';
import BoltIcon from '@mui/icons-material/Bolt';
import {Fragment, useState} from "react";
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
import momenttz from "moment-timezone";
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
    priceValue: number,
    duration: number,
    returnDuration: number,
    time: any,

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
    id,
    priceValue,
    time,
                                 }) => {

    let totalDuration1 = 0;
    totalDuration1 = time[0][0].tripTime.timeZoneDuration

    console.log(totalDuration1);
    let totalDuration2 = 0;

    // Do the same for the connection times


    let lastSlice = slices[slices.length - 1];
    let isOneWay = true;
    if (slices.length > 1) {
        isOneWay = false;
    }
    const firstSlice = slices[0];
    let duration1 = 0;
    let duration2 = 0;


    let layoverTimeString2 = "";
    let layoverTime = time[0][0].tripTime.totalLayoverTime;
    if (!isOneWay) {
        let layoverTime2 = time[2][0].tripTime.totalLayoverTime;
        if (layoverTime2 < 60) {
            layoverTimeString2 = layoverTime2 + " minutes";
        }
        else {
            layoverTimeString2 = Math.floor(layoverTime2 / 60) + "h " + layoverTime2 % 60 + "m";
        }
    }



    let layoverTimeString = "";
    if (layoverTime < 60) {
        layoverTimeString = layoverTime + " minutes";
    }
    else {
        layoverTimeString = Math.floor(layoverTime / 60) + "h " + layoverTime % 60 + "m";
    }
    // Convert total duration to hours and minutes
    let totalDuration1String = "";
    let totalDuration2String = "";
    if (totalDuration1 < 60) {
        totalDuration1String = totalDuration1 + " minutes";

    }
    else {
        totalDuration1String = Math.floor(totalDuration1 / 60) + "h " + totalDuration1 % 60 + "m";
    }
    if (totalDuration2 < 60) {
        totalDuration2String = totalDuration2 + " minutes";
    }
    else {
        totalDuration2String = Math.floor(totalDuration2 / 60) + "h " + totalDuration2 % 60 + "m";
    }


    const times = () => {
        let timeList = [];
        const timeObject = (time) => {
            let duration = time.tripTime.timeZoneDuration;
            let durationString = "";
            if (duration < 60) {
                durationString = duration + " minutes";
            }
            else {
                durationString = Math.floor(duration / 60) + "h " + duration % 60 + "m";
            }
            let layover = 0;
            let flightTime = 0;
            if (layoverTime > 0) {
                layover = time.tripTime.totalLayoverTime;
                flightTime = time.totalFlightTime;
            }
            return (
                <Fragment>
                    {layover > 0 ? (
                        <Badge color={"warning"} variant={"dot"} anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}>
                        <Tooltip title={"This flight has a layover."} placement="top">
                            <Typography >{durationString} </Typography>
                        </Tooltip>
                        </Badge>
                    ) : (
                        <Typography >{durationString} </Typography>
                    )}
                </Fragment>
            );

        };
        if (isOneWay) {
            timeList.push(timeObject(time[0][0]));
        }
        else {
            timeList.push(timeObject(time[0][0]));
            timeList.push(timeObject(time[2][0]));
        }
        return (
            timeList
        );
    };


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
    let specialList2 = [];

    if (duration1 > 360) {
        specialList.push("LongFlight");
    }
    if (duration2 > 360) {
        specialList2.push("LongFlight");
    }

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
    const BuildStack2 = () => {
        let stack = [];
        if (specialList2.includes("cheapest")) {
            //Green
            stack.push({ key: 0, label: 'Cheapest', color: 'rgba(76,175,80,0.5)', icon: <PaidIcon /> });
        }
        if (specialList2.includes("direct")) {
            //Blue
            stack.push({ key: 1, label: 'Direct', color: 'rgb(90,178,246, 0.5)', icon: <BoltIcon /> });
        }
        if (specialList2.includes("indirect")) {
            //Yellow
            stack.push({ key: 2, label: 'Indirect', color: 'rgba(246,227,55,0.5)', icon: <WarningAmberIcon /> });
        }
        if (specialList2.includes("longFlight")) {
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
                    <div key={item.key}>
                        <Tooltip  title={item.label} enterTouchDelay={0} placement="top">
                        <Chip
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
                    </div>
                ))}
            </Stack>
        )
    }

    const BuildStackMobile2 = () => {
        let stack = [];
        if (specialList2.includes("cheapest")) {
            //Green
            stack.push({ key: 0, label: 'Cheapest', color: 'rgba(76,175,80,0.5)', icon: <PaidIcon /> });
        }
        if (specialList2.includes("direct")) {
            //Blue
            stack.push({ key: 1, label: 'Direct', color: 'rgb(90,178,246, 0.5)', icon: <BoltIcon /> });
        }
        if (specialList2.includes("indirect")) {
//Yellow
            stack.push({ key: 2, label: 'Indirect', color: 'rgba(246,227,55,0.5)', icon: <WarningAmberIcon /> });
        }
        if (specialList2.includes("longFlight")) {
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
                    <Tooltip key={item.key} title={item.label} enterTouchDelay={0} placement="top">
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
            <Grid item xs={1.5} sx={
                {
                    display: "flex",
                    flexDirection: "column",
                }
            }>

                <Tooltip title={firstSlice[0].originAirport + " (" + firstSlice[0].originCode + ")"} placement="top" enterTouchDelay={0}>
                    <Typography  style={{ fontWeight: 'bold' }}>{firstSlice[0].origin}</Typography>
                </Tooltip>
                    <Tooltip  enterTouchDelay={0} title={moment(firstSlice[0].departureTime).format('MM/DD/YYYY')} placement={"bottom"}>
                        <Typography style={{ opacity: 0.5 }}> {moment(firstSlice[0].departureTime).format('h:mm A')}</Typography>
                    </Tooltip>
                <Typography style={{ opacity: 0.5 }}>{times()[0]}</Typography>
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
                        width: deviceType ? '50%' : '100%',
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
                                } className={styles.duration}>{layoverTimeString}</Typography>
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
                        <Tooltip enterTouchDelay={0} title={firstSlice[firstSlice.length - 1].destinationAirport + " (" + firstSlice[firstSlice.length - 1].destinationCode + ")"} placement={"top"}>
                            <Typography style={{ fontWeight: 'bold' }}>{firstSlice[firstSlice.length - 1].destination}</Typography>
                        </Tooltip>
                    )}
                <Grid item sx={
                    {
                        display: "flex",
                    }
                }>
                    <Tooltip enterTouchDelay={0} title={moment(firstSlice[firstSlice.length - 1].arrivalTime).format('MM/DD/YYYY')} placement={"bottom"}>
                        <Typography style={{ opacity: 0.5 }}> {moment(firstSlice[firstSlice.length - 1].arrivalTime).format('h:mm A')}</Typography>
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
                <Grid item xs={1.5} sx={
                    {
                        display: "flex",
                        position: "relative",
                        flexDirection: "column",
                    }
                }>

                    <Tooltip title={lastSlice[lastSlice.length - 1].destinationAirport + " (" + lastSlice[lastSlice.length - 1].destinationCode + ")"} placement="top" enterTouchDelay={0}>
                        <Typography  style={{ fontWeight: 'bold' }}>{lastSlice[lastSlice.length - 1].destination}</Typography>
                    </Tooltip>
                    <Tooltip  enterTouchDelay={0} title={moment(lastSlice[lastSlice.length - 1].arrivalTime).format('MM/DD/YYYY')} placement={"bottom"}>
                        <Typography style={{ opacity: 0.5 }}> {moment(lastSlice[lastSlice.length - 1].arrivalTime).format('h:mm A')}</Typography>
                    </Tooltip>
                    <Typography style={{ opacity: 0.5 }}>{times()[1]}</Typography>
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
                                    } className={styles.duration}>{layoverTimeString2}</Typography>
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
                        <Tooltip title={lastSlice[0].originAirport + " (" + lastSlice[0].originCode + ")"} enterTouchDelay={0} placement={"top"}>
                            <Typography style={{ fontWeight: 'bold' }}>{lastSlice[0].origin}</Typography>
                        </Tooltip>
                    )}
                    {lastSlice.length > 1 && (
                        <Tooltip enterTouchDelay={0} title={lastSlice[0].originAirport + " (" + lastSlice[0 ].originCode + ")"} placement={"top"}>
                            <Typography style={{ fontWeight: 'bold' }}>{lastSlice[0].origin}</Typography>
                        </Tooltip>
                    )}
                    <Grid item sx={
                        {
                            display: "flex",
                        }
                    }>
                        <Tooltip enterTouchDelay={0} title={moment(lastSlice[0].departureTime).format('MM/DD/YYYY')} placement={"bottom"}>
                            <Typography style={{ opacity: 0.5 }}> {moment(lastSlice[0].departureTime).format('h:mm A')}</Typography>
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
                            <BuildStackMobile2 />

                        </Grid>
                    )}
                    {isMobile === false && (
                        <Grid item xs={12}>
                            <BuildStack2 />

                        </Grid>
                    )}
                </Grid>
            </Grid>)}
        </Grid>
            );
};

export default Ticket;
