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

interface Props {
    price: number;
    arrival: string;
    departure: string;
    airline: string;
    flightNumber: string;
    origin: string;
    destination: string;
    airlineLogo: string;
    connectionList: Connection[];
    totalDistance: number;
    originAirport: string;
    destinationAirport: string;
    airlineCode: string;
    layoverDuration: string;
    specialList: string[];
    duration: string;
    connectionDuration: string;
    originCode: string;
    destinationCode: string;
    fullDuration: string;
    secondDuration: string;
    departureDate: Date;
    arrivalDate: Date;
}
interface Connection {
    originCode: string;
    destinationCode: string;
    originAirport: React.ReactNode;
    destinationAirport: string;
    duration: any;
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
    flightNumber,
    origin,
    destination,
    airlineLogo,
    connectionList,
    totalDistance,
    originAirport,
    destinationAirport,
    airlineCode,
    layoverDuration,
    specialList,
    duration,
    connectionDuration,
    originCode,
    destinationCode,
    fullDuration,
    secondDuration,
    arrivalDate,
    departureDate,
                                 }) => {
    const [showConnections, setShowConnections] = useState(false);

    // Convert the date to a readable format
    const departureDateFormatted = moment(departureDate).format("DD MMM YYYY");
    const arrivalDateFormatted = moment(arrivalDate).format("DD MMM YYYY");

    const fullOrigin = originAirport + " (" + originCode + ")";
    const fullDestination = destinationAirport + " (" + destinationCode + ")";

    let departureDateString = "";
    let arrivalDateString = "";
    departureDateString = departureDateString.replace(/:\d\d /, " ");
    arrivalDateString = arrivalDateString.replace(/:\d\d /, " ");
    // Do the same for the connection times


    
    const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: 0,
            top: -5,

        },
    }));


    let fullTimeString1 = fullDuration;




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


    return(

        <Grid container spacing={2} sx={
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
            <Grid container spacing={2} alignItems="center" className={styles.heading}>
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
                <Tooltip title={departureDateFormatted} placement="bottom" enterTouchDelay={0}>
                <Grid item >
                    <Typography style={{ opacity: 0.5 }}>{departure}</Typography>
                </Grid>
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
                    <ArrowForwardIcon />
                </SvgIcon>
                {connectionList.length === 0 && (
                        <Typography>{fullTimeString1}</Typography>
                )}

                {connectionList.length > 0 && (
                    <Tooltip enterTouchDelay={0} title={"This flight has a layover at the " + connectionList[0].originAirport + "(" + connectionList[0].originCode + ")"} placement="top" arrow sx={
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
                    {connectionList.length === 0 && (
                <Tooltip enterTouchDelay={0} title={fullDestination} placement={"top"}>
                    <Typography style={{ fontWeight: 'bold' }}>{destination}</Typography>
                </Tooltip>
                    )}
                    {connectionList.length > 0 && (
                        <Tooltip enterTouchDelay={0} title={connectionList[0].destinationAirport + " (" + connectionList[0].destinationCode + ")"} placement={"top"}>
                            <Typography style={{ fontWeight: 'bold' }}>{destination}</Typography>
                        </Tooltip>
                    )}
                <Grid item sx={
                    {
                        display: "flex",
                    }
                }>
                    <Tooltip enterTouchDelay={0} title={arrivalDateFormatted} placement={"bottom"}>
                    <Typography style={{ opacity: 0.5 }}>{arrival}</Typography>
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




            {connectionList.length > 0 && (
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
                                    <TableCell sx={
                                        {
                                            display: "flex",
                                            justifyContent: "center",
                                        }
                                    }>Connection</TableCell>
                                    <TableCell align="right">Destination</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow >
                                    <TableCell className={styles.tableRow} size={"small"}>
                                        <Box className={styles.tableCell}>
                                        <Typography sx={
                                            {
                                                paddingRight: "1rem",
                                            }
                                        }>
                                        {connectionList[0].origin}
                                        </Typography>
                                        <SvgIcon>
                                            <ArrowForwardIcon />
                                        </SvgIcon>
                                        <Typography>
                                            {moment.duration(duration).hours() + "h " + moment.duration(duration).minutes() + "m"}
                                        </Typography>
                                        <SvgIcon >
                                            <ArrowForwardIcon />
                                        </SvgIcon>
                                        </Box>
                                    </TableCell>
                                    <TableCell className={styles.tableRow} size={"medium"}>
                                        <Tooltip title={"On the ground in " + connectionList[0].origin + " for " + connectionDuration} placement="top" arrow sx={
                                            {
                                                fontWeight: "600"
                                            }
                                        }>
                                        <Box className={styles.tableCell}>
                                        <Typography>
                                        {connectionList[0].origin}
                                        </Typography>
                                        <SvgIcon >
                                            <AccessTimeIcon />
                                        </SvgIcon>

                                        </Box>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell className={styles.tableRow} size={"small"}>
                                        <Box className={styles.tableCell}>
                                            <SvgIcon >
                                                <ArrowForwardIcon />
                                            </SvgIcon>

                                            <Typography>
                                                {secondDuration}
                                            </Typography>
                                            <SvgIcon >
                                                <ArrowForwardIcon />
                                            </SvgIcon>
                                        <Typography sx={
                                            {
                                                paddingLeft: "1rem",
                                            }
                                        }>
                                        {destination}
                                        </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>

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
