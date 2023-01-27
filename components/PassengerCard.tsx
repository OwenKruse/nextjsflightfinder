import { Card } from '@mui/material'


export const PassengerCard = (passenger) =>  {
    // "passengers": [
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

    // Capitilze the first letter of the passenger type
    passenger.passenger.type = passenger.passenger.type.charAt(0).toUpperCase() + passenger.passenger.type.slice(1)
    // Capitalize the first letter of the passenger title
    passenger.passenger.title = passenger.passenger.title.charAt(0).toUpperCase() + passenger.passenger.title.slice(1)
    passenger = passenger.passenger
    return (
        <Card style={
            {
                padding: "1rem",
                margin: "1rem",

            }
        }>
            <h1>{passenger.title} {passenger.given_name} {passenger.family_name}</h1>
            <p>{'Ticket Type: '} {passenger.type}</p>
            <p> {passenger.email} </p>
            <p> {passenger.phone_number} </p>
            <p> {passenger.born_on} </p>
        </Card>
    )
}