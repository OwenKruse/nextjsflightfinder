import {Card, Grid, Typography} from '@mui/material'
import moment from "moment";
import styles from '../styles/ConfirmationCard.module.scss'
export const FlightCard = (segment) =>  {
    console.log(segment)
        //           "passengers": [
        //             {
        //               "passenger_id": "pas_0000ARwzmtme1ailfEWLwY",
        //               "cabin_class_marketing_name": "Economy",
        //               "cabin_class": "economy",
        //               "baggages": [
        //                 {
        //                   "type": "checked",
        //                   "quantity": 1
        //                 }
        //               ]
        //             }
        //           ],
        //           "origin_terminal": "2",
        //           "origin": {
        //             "type": "airport",
        //             "time_zone": "America/Los_Angeles",
        //             "name": "Seattle-Tacoma International Airport",
        //             "longitude": -122.308907,
        //             "latitude": 47.449625,
        //             "id": "arp_sea_us",
        //             "icao_code": "KSEA",
        //             "iata_country_code": "US",
        //             "iata_code": "SEA",
        //             "iata_city_code": "SEA",
        //             "city_name": "Seattle",
        //             "city": {
        //               "type": "city",
        //               "time_zone": null,
        //               "name": "Seattle",
        //               "longitude": null,
        //               "latitude": null,
        //               "id": "cit_sea_us",
        //               "icao_code": null,
        //               "iata_country_code": "US",
        //               "iata_code": "SEA",
        //               "iata_city_code": "SEA",
        //               "city_name": null
        //             }
        //           },
        //           "operating_carrier_flight_number": "1785",
        //           "operating_carrier": {
        //             "name": "Duffel Airways",
        //             "logo_symbol_url": "https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/ZZ.svg",
        //             "logo_lockup_url": null,
        //             "id": "arl_00009VME7D6ivUu8dn35WK",
        //             "iata_code": "ZZ",
        //             "conditions_of_carriage_url": null
        //           },
        //           "marketing_carrier_flight_number": "1785",
        //           "marketing_carrier": {
        //             "name": "Duffel Airways",
        //             "logo_symbol_url": "https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/ZZ.svg",
        //             "logo_lockup_url": null,
        //             "id": "arl_00009VME7D6ivUu8dn35WK",
        //             "iata_code": "ZZ",
        //             "conditions_of_carriage_url": null
        //           },
        //           "id": "seg_0000ARwzmuODlsmLXm6MVw",
        //           "duration": "PT6H27M",
        //           "distance": "4409.0272432571255",
        //           "destination_terminal": "1",
        //           "destination": {
        //             "type": "airport",
        //             "time_zone": "Pacific/Honolulu",
        //             "name": "Daniel K. Inouye International Airport",
        //             "longitude": -157.92465,
        //             "latitude": 21.322566,
        //             "id": "arp_hnl_us",
        //             "icao_code": "PHNL",
        //             "iata_country_code": "US",
        //             "iata_code": "HNL",
        //             "iata_city_code": "HNL",
        //             "city_name": "Honolulu",
        //             "city": null
        //           },
        //           "departure_terminal": "2",
        //           "departure_datetime": "2023-01-26T19:21:00",
        //           "departing_at": "2023-01-26T19:21:00",
        //           "arriving_at": "2023-01-26T23:48:00",
        //           "arrival_terminal": "1",
        //           "arrival_datetime": "2023-01-26T23:48:00",
        //           "aircraft": {
        //             "name": "Boeing 777-300",
        //             "id": "arc_00009VMF8AhXSSRnQDI6HE",
        //             "iata_code": "773"
        //           }
        //         }

    segment = segment.segment
    return (
        <div style={
            {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '10px',
                width: '100%',

            }
        }>
            <Card sx={{ width: '100%', height: '100%', padding: '10px' }}>
                <Grid container>
                    <Grid item xs={16} className={styles.airlineContainer}>
                        <Typography variant="h6">{segment.marketing_carrier.name} {segment.marketing_carrier_flight_number} {segment.origin.city_name} {'>'} {segment.destination.city_name}</Typography>
                        <Grid container className={styles.dateContainer}>
                        <Typography variant="subtitle2" style={
                            {
                                whiteSpace: 'nowrap',
                                fontWeight: 'bold',
                            }
                        }>
                            {moment(segment.departing_at).format('MMMM Do YYYY, h:mm:ss a')}
                        </Typography>
                        <Typography variant="subtitle2" style={
                            {
                                whiteSpace: 'nowrap',
                            }
                        }>
                            {segment.origin.name}
                        </Typography>
                        </Grid>
                        <Grid container className={styles.dateContainer}>
                            <Typography variant="subtitle2" style={
                                {
                                    whiteSpace: 'nowrap',
                                    fontWeight: 'bold',

                                }
                            }>
                                {moment(segment.arriving_at).format('MMMM Do YYYY, h:mm:ss a')}
                            </Typography>
                            <Typography variant="subtitle2" style={
                                {
                                    whiteSpace: 'nowrap',
                                }
                            }>
                                {segment.destination.name}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} className={styles.durationContainer}>
                        <Typography variant="h6">{moment.utc(moment(segment.arriving_at).diff(moment(segment.departing_at))).format('HH:mm')}</Typography>

                    </Grid>
                </Grid>
            </Card>
        </div>
    );
}