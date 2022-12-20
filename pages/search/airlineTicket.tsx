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
    Divider, SvgIcon, Tooltip, Badge, styled, BadgeProps, Stack, Chip, Collapse, useMediaQuery
} from "@mui/material";
import classes from "../../styles/airlineTicket.module.scss";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PaidIcon from '@mui/icons-material/Paid';
import BoltIcon from '@mui/icons-material/Bolt';
import {useState} from "react";
import {useTheme} from "@mui/material";
import { alpha } from '@mui/material/styles';

interface Props {
    price: number;
    arrival: Date;
    departure: Date;
    airline: string;
    flightNumber: string;
    origin: string;
    destination: string;
    cabinClass: string;
    logoUrl: string;
    connection: Connection[];
    totalDistance: number;
    fullOrigin: string;
    fullDestination: string;
    fullConnection: string;
    layoverDuration: string;
    specialList: string[];
    fullTime: string;
}
interface Connection {
    origin: string;
    destination: string;
    departureTime: Date;
    arrivalTime: Date;

}
const Ticket: React.FC<Props> = ({
                                     price,
                                     arrival,
                                     departure,
                                     airline,
                                     origin,
                                     destination,
                                     cabinClass,
                                     logoUrl,
                                     connection,
                                     totalDistance,
                                     fullOrigin,
                                     fullDestination,
                                     fullConnection,
                                     layoverDuration,
                                     specialList,
                                     fullTime,
                                 }) => {
    const [showConnections, setShowConnections] = useState(false);
    const departureDate = departure.getDate();
    const departureMonth = departure.getMonth();
    const arrivalDate = arrival.getDate();
    const arrivalMonth = arrival.getMonth();

    let departureDateString = "";
    console.log(layoverDuration);


    let arrivalDateString = "";

    departureDateString = departureDateString + " " + departure.toLocaleTimeString();
    arrivalDateString = arrivalDateString + " " + arrival.toLocaleTimeString();

    departureDateString = departureDateString.replace(/:\d\d /, " ");
    arrivalDateString = arrivalDateString.replace(/:\d\d /, " ");
    // Do the same for the connection times

    if (arrivalDate !== departureDate || arrivalMonth !== departureMonth) {
        arrivalDateString = arrivalDateString + " +1"
    }

    let totalDuration = arrival.getTime() - departure.getTime();
    // Convert to hours and minutes
    // Only show minutes if there are any
    let hours = Math.floor(totalDuration / 3600000);
    let minutes = Math.floor((totalDuration % 3600000) / 60000);
    let durationString = "";
    if (hours > 0) {
        durationString = hours + "h";
    }
    if (minutes > 0) {
        durationString = durationString + " " + minutes + "m";
    }
    const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: 0,
            top: -5,

        },
    }));

    function convertPeriodOfTimeToHoursAndMinutes(periodOfTime) {
        let hoursAndMinutesRegex = /(\d+)H(\d+)M/;
        let match = hoursAndMinutesRegex.exec(periodOfTime);

        if (!match) {

             hoursAndMinutesRegex = /(\d+)H/;
                match = hoursAndMinutesRegex.exec(periodOfTime);
                if (match) {
                    match = hoursAndMinutesRegex.exec(periodOfTime);
                    let hours = match
                    let minutes = "0";
                    return hours + "h " + minutes + "m";
                }
            if (!match) {
                hoursAndMinutesRegex = /(\d+)M/;
                match = hoursAndMinutesRegex.exec(periodOfTime);
                if (match) {
                    let minutes = match
                    let hours = "0";
                    return hours + "h " + minutes + "m";
                }
            }
        }
        let hours = parseInt(match[1], 10);
        let minutes = parseInt(match[2], 10);
        return hours + "h " + minutes + "m";
    }

    let fullTimeString1 = convertPeriodOfTimeToHoursAndMinutes(fullTime);




    const BuildStack = () => {
        let stack = [];
        console.log(specialList);
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
        console.log(stack);
        return(
            <Stack direction="column" spacing={1}>
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



                }}
                />
            ))}
            </Stack>
        )
    }

    const BuildStackMobile = () => {
        let stack = [];
        console.log(specialList);
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
        console.log(stack);
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


    return(

        <Grid container spacing={2} sx={
            {
                color: alpha(theme.palette.text.primary, 1),
                height: "100%",
                width: "90%",
                alignItems: "stretch",
                justifyContent: "space-between",
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                marginBottom: "2rem",
                padding: "1rem",
                background: alpha(theme.palette.action.selected, 0.04),
            }
        } wrap={"wrap"}>
            <Grid container spacing={2} alignItems="center" className={styles.heading}>
                <Grid item className={styles.titleLogoContainer}>
                        <Grid item>
                            <Avatar src={logoUrl} className={classes.avatar} sx={
                                {
                                    borderColor: alpha(theme.palette.text.primary, 1),
                                }
                            }/>
                        </Grid>
                        <Grid item  >
                            <Typography variant="h6">{airline}</Typography>
                        </Grid>
                </Grid>
                <Grid item>
                    <Chip label={price +"$"} variant="filled" color={"success"} style={
                        {
                            color: alpha(theme.palette.text.primary, 1),
                            backgroundColor: alpha(theme.palette.success.main, .75),
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
                <Tooltip title={fullOrigin} placement="top" enterTouchDelay={0}>
                    <Typography style={{ fontWeight: 'bold' }}>{origin}</Typography>
                </Tooltip>
                <Grid item >
                    <Typography style={{ opacity: 0.5 }}>{departureDateString}</Typography>
                </Grid>
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
                    <ArrowForwardIcon />
                </SvgIcon>
                {connection === undefined && (
                        <Typography sx={
                                {
                                    fontWeight: 'bold',
                                    noWrap: true,
                                }
                        }>{fullTimeString1}</Typography>
                )}

                {connection != null && (
                    <Tooltip enterTouchDelay={0} title={"This flight has 1 connecting flight at the " +  fullConnection + " for " + layoverDuration} placement="top" arrow sx={
                        {
                            fontWeight: "600"

                        }
                    }>
                    <StyledBadge variant={"dot"} color="primary">
                        <Typography className={styles.duration}>{fullTimeString1}</Typography>
                    </StyledBadge>
                    </Tooltip>

                )}

                    <SvgIcon >
                    <ArrowForwardIcon />
                </SvgIcon>
            </Grid>



                <Grid item xs={2} sx={
                {
                    display: "flex",
                    position: "relative",
                    flexDirection: "column",
                }
            }>
                <Tooltip enterTouchDelay={0} title={fullDestination} placement={"top"}>
                    <Typography style={{ fontWeight: 'bold' }}>{destination}</Typography>
                </Tooltip>
                <Grid item sx={
                    {
                        display: "flex",
                    }
                }>
                    <Typography style={{ opacity: 0.5 }}>{arrivalDateString}</Typography>
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
                    <Grid item>
                        <BuildStack />

                </Grid>
                )}
                </Grid>
            </Grid>




            {connection != null && (
                <Grid className={classes.connectionContainer} item xs={12}>
                    <Button onClick={() => setShowConnections(!showConnections)}>
                        {showConnections ? "Hide Connections" : "Show Connections"}

                    </Button>
                    <Collapse in={showConnections}>
                    {showConnections && (
                        <Table className={styles.connections}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Origin</TableCell>
                                    <TableCell>Destination</TableCell>
                                    <TableCell>Arrival Time</TableCell>
                                    <TableCell>Departure Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {connection.map((conn) => (
                                    <TableRow key={conn.origin + conn.destination}>
                                        <TableCell>
                                            <Tooltip enterTouchDelay={0} title={fullOrigin} placement={"top"}>
                                                <Typography style={{ fontWeight: 'bold' }}>{conn.origin}</Typography>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip enterTouchDelay={0} title={fullDestination} placement={"top"}>
                                                <Typography style={{ fontWeight: 'bold' }}>{conn.destination}</Typography>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>{conn.departureTime.toLocaleString()}</TableCell>
                                        <TableCell>{conn.arrivalTime.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                    </Collapse>
                </Grid>
            )}

        </Grid>

            );
};

export default Ticket;
