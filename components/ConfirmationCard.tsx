import React from 'react';
import {Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,} from '@mui/material';
import { Paper,  } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import classes from '../styles/ConfirmationCard.module.scss';
import {PassengerCard} from "./PassengerCard";
import {FlightCard} from "./FlightCard";



const ConfirmationCard = ({order}) => {

    // Create a modern itinerary page from the order
    //{
    //   "total_currency": "USD",
    //   "total_amount": "230.63",
    //   "tax_currency": "USD",
    //   "tax_amount": "35.18",
    //   "synced_at": "2023-01-23T23:55:54Z",
    //   "slices": [
    //     {
    //       "segments": [
    //         {
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
    //       ],
    //       "origin_type": "airport",
    //       "origin": {
    //         "type": "airport",
    //         "time_zone": "America/Los_Angeles",
    //         "name": "Seattle-Tacoma International Airport",
    //         "longitude": -122.308907,
    //         "latitude": 47.449625,
    //         "id": "arp_sea_us",
    //         "icao_code": "KSEA",
    //         "iata_country_code": "US",
    //         "iata_code": "SEA",
    //         "iata_city_code": "SEA",
    //         "city_name": "Seattle",
    //         "city": {
    //           "type": "city",
    //           "time_zone": null,
    //           "name": "Seattle",
    //           "longitude": null,
    //           "latitude": null,
    //           "id": "cit_sea_us",
    //           "icao_code": null,
    //           "iata_country_code": "US",
    //           "iata_code": "SEA",
    //           "iata_city_code": "SEA",
    //           "city_name": null
    //         }
    //       },
    //       "id": "sli_0000ARwzrHq12coEV8AACX",
    //       "fare_brand_name": "Basic",
    //       "duration": "PT6H27M",
    //       "destination_type": "airport",
    //       "destination": {
    //         "type": "airport",
    //         "time_zone": "Pacific/Honolulu",
    //         "name": "Daniel K. Inouye International Airport",
    //         "longitude": -157.92465,
    //         "latitude": 21.322566,
    //         "id": "arp_hnl_us",
    //         "icao_code": "PHNL",
    //         "iata_country_code": "US",
    //         "iata_code": "HNL",
    //         "iata_city_code": "HNL",
    //         "city_name": "Honolulu",
    //         "city": null
    //       },
    //       "conditions": {
    //         "change_before_departure": {
    //           "penalty_currency": "GBP",
    //           "penalty_amount": "30.00",
    //           "allowed": true
    //         }
    //       },
    //       "changeable": null
    //     }
    //   ],
    //   "services": [],
    //   "payment_status": {
    //     "price_guarantee_expires_at": null,
    //     "payment_required_by": null,
    //     "paid_at": "2023-01-23T23:55:54Z",
    //     "awaiting_payment": false
    //   },
    //   "passengers": [
    //     {
    //       "type": "adult",
    //       "title": "mrs",
    //       "phone_number": "+12062591254",
    //       "loyalty_programme_accounts": [],
    //       "infant_passenger_id": null,
    //       "id": "pas_0000ARwzmtme1ailfEWLwY",
    //       "given_name": "Owen",
    //       "gender": "m",
    //       "family_name": "Kruse",
    //       "email": "owenoakenheels@gmail.com",
    //       "born_on": "2004-05-28"
    //     }
    //   ],
    //   "owner": {
    //     "name": "Duffel Airways",
    //     "logo_symbol_url": "https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/ZZ.svg",
    //     "logo_lockup_url": null,
    //     "id": "arl_00009VME7D6ivUu8dn35WK",
    //     "iata_code": "ZZ",
    //     "conditions_of_carriage_url": null
    //   },
    //   "metadata": null,
    //   "live_mode": false,
    //   "id": "ord_0000ARwzrHq12coEV8AACW",
    //   "documents": [
    //     {
    //       "unique_identifier": "1",
    //       "type": "electronic_ticket",
    //       "passenger_ids": [
    //         "pas_0000ARwzmtme1ailfEWLwY"
    //       ]
    //     }
    //   ],
    //   "created_at": "2023-01-23T23:55:54.034186Z",
    //   "content": "managed",
    //   "conditions": {
    //     "refund_before_departure": {
    //       "penalty_currency": "GBP",
    //       "penalty_amount": "30.00",
    //       "allowed": true
    //     },
    //     "change_before_departure": {
    //       "penalty_currency": "GBP",
    //       "penalty_amount": "30.00",
    //       "allowed": true
    //     }
    //   },
    //   "cancelled_at": null,
    //   "booking_reference": "UNRN6L",
    //   "base_currency": "USD",
    //   "base_amount": "195.45",
    //   "available_actions": [
    //     "cancel",
    //     "change",
    //     "update"
    //   ]
    // }

    const booking_reference = order.booking_reference;
    const order_id = order.id;
    const base_amount = order.base_amount;
    const base_currency = order.base_currency;
    const created_at = order.created_at;
    const cancelled_at = order.cancelled_at;
    const passengers = order.passengers;
    const slices = order.slices;

    // Create a card for each passenger
    const passengerCards = passengers.map((passenger, index) => {
        return (
            <PassengerCard
                key={index}
                passenger={passenger}
            />
        )
    })

    const flightCards = slices.map((slice, index) => {
        const slices = slice.segments.map((segment, index) => {
            console.log(segment)
            return (
                <FlightCard
                    key={index}
                    segment={segment}
                />
            )
        })
        return (
            <div key={index}>
                {slices}
            </div>
        )
    })


    return (
        // Use Mui Paper component to create a card
        <div className={classes.container}>
                    <Typography variant="h5" component="h3">
                        Confirmation
                    </Typography>
                    <Paper className={classes.paper}>
                        <Grid container className={classes.gridItem} >
                            <Typography component="p">
                                Booking Reference:
                                {booking_reference}
                            </Typography>
                            <Typography component="p">
                                Order ID: {order_id}
                            </Typography>
                        </Grid>
                        <Grid container className={classes.gridItem} >
                            <Typography className={classes.title}>
                                Flight Details
                            </Typography>
                            <Grid container className={classes.airline} >
                                <Avatar alt="Remy Sharp" src={order.owner.logo_symbol_url} className={classes.avatar} />
                                <Typography className={classes.airlineTitle}>
                                    {order.owner.name}
                                </Typography>
                            </Grid>
                            {flightCards}

                        </Grid>

                    </Paper>
        </div>
    )
}

export default ConfirmationCard;