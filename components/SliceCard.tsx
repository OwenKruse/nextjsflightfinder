import styles from '../styles/ConfirmationCard.module.scss'
import moment from "moment";
import {Card, Grid, Typography} from '@mui/material'
import {FlightCard} from "./FlightCard";
import LayoverCard from "./LayoverCard";
import time from '../backend/time'

const SliceCard = (slice) => {
    slice = slice.slice
    return (
        <Card style={
            {
                padding: "1rem",
                margin: "1rem",
                width: "100%"
            }
        }>
            <h1>{slice.origin.iata_code} to {slice.destination.iata_code}</h1>
            <p>{moment.duration(slice.duration).hours()} hours {moment.duration(slice.duration).minutes()} minutes</p>
            <div className={styles.flightCard}>
                {slice.segments.map((segment, index) => (
                    <>
                        <Grid container>
                            <FlightCard segment={segment}/>
                        </Grid>
                        {index !== slice.segments.length - 1 && (
                            <Grid container>
                                <LayoverCard location={slice.segments[index + 1].origin.name} slice={slice}/>
                            </Grid>
                        )}
                    </>
                ))}
            </div>
        </Card>
    )
}

export default SliceCard