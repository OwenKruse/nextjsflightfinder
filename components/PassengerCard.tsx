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

    passenger = passenger.passenger
    return (
        <Card>
            <h1>{passenger.given_name} {passenger.family_name}</h1>
            <h2>{passenger.type}</h2>
        </Card>
    )
}