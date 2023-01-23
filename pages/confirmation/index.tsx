
import { Duffel } from '@duffel/api'




export default function Confirmation({ payment, query, order }) {
console.log(payment);
console.log(query);
console.log(order);
return (
        <div>
        <h1>Confirmation</h1>
        </div>
        )

}

export const getServerSideProps = async ({ query }) => {
    const { payment } = query;
    //        await router.push(`/confirmation?payment=${checkout.id}&order_id=${id}&passenger_ids=${passenger_ids}&passenger_names=${passengerNames}&passenger_last_names=${passengerLastNames}&passenger_emails=${passengerEmails}&passenger_phones=${passengerPhones}&passenger_dobs=${passengerDobs}&passenger_genders=${passengerGenders}`)
    const { order_id, passenger_ids, passenger_names, passenger_last_names, passenger_emails, passenger_phones, passenger_dobs, passenger_genders } = query;
    const duffel = new Duffel({
        token: "duffel_test_ThLUYHmU6F3MbIzMNFc8-ahZA-w_Nn5T5sSkPJ0-SLY"
    })

    const offer = await duffel.offers.get(order_id, {
        return_available_services: true,
    })
    console.log(offer);
    // Get the passenger types from the offer
    const passengerTypes = offer.data.passengers.map((passenger) => passenger.type)
    //import { Duffel } from '@duffel/api'
    //
    // const duffel = new Duffel({
    //   token: YOUR_ACCESS_TOKEN
    // })
    //
    // duffel.orders.create({
    //   "type": "instant",
    //   "services": [
    //     {
    //       "quantity": 1,
    //       "id": "ase_00009hj8USM7Ncg31cB123"
    //     }
    //   ],
    //   "selected_offers": [
    //     "off_00009htyDGjIfajdNBZRlw"
    //   ],
    //   "payments": [
    //     {
    //       "type": "balance",
    //       "currency": "GBP",
    //       "amount": "30.20"
    //     }
    //   ],
    //   "passengers": [
    //     {
    //       "type": "adult",
    //       "title": "mrs",
    //       "phone_number": "+442080160509",
    //       "infant_passenger_id": "pas_00009hj8USM8Ncg32aTGHL",
    //       "identity_documents": [
    //         {
    //           "unique_identifier": "19KL56147",
    //           "type": "passport",
    //           "issuing_country_code": "GB",
    //           "expires_on": "2025-04-25"
    //         }
    //       ],
    //       "id": "pas_00009hj8USM7Ncg31cBCLL",
    //       "given_name": "Amelia",
    //       "gender": "f",
    //       "family_name": "Earhart",
    //       "email": "amelia@duffel.com",
    //       "born_on": "1987-07-24"
    //     }
    //   ],
    //   "metadata": {
    //     "payment_intent_id": "pit_00009htYpSCXrwaB9DnUm2"
    //   }
    // })


    const passengers =
        passenger_ids.split(",").map((passenger_id, index) => {


            return {
                "id": passenger_id,
                "type": passengerTypes[index],
                "title": passenger_genders.split(",")[index] === "m" ? "mr" : "mrs",
                "given_name": passenger_names.split(",")[index],
                "family_name": passenger_last_names.split(",")[index],
                "email": passenger_emails.split(",")[index],
                // Convert to E.164 format
                "phone_number": passenger_phones.split(",")[index].replace(/[^0-9]/g, '').replace(/(\d{2})(\d{4})(\d{4})/, '+$1$2$3'),
                // Convert to ISO 8601 Wed Jan 07 2004 16:16:58 GMT-0800
                "born_on": new Date(passenger_dobs.split(",")[index]).toISOString().split("T")[0],
                // Get the first letter of the gender
                "gender" : passenger_genders.split(",")[index].charAt(0)

            }
        }
        )
    console.log(order_id)
    const order = await duffel.orders.create({
            "type": "instant",
            "payments": [
                {
                    "type": "balance",
                    // Get the currency from the offer
                    "currency": offer.data.total_currency,
                    // Get the total from the offer
                    "amount": offer.data.total_amount
                }
            ],

            "selected_offers": [
                order_id
            ],
            "passengers": passengers,
        }
    )
    console.log(order.data.id);

    const response = await duffel.paymentIntents.confirm(payment).then((response) => {
        return response;
    })

    return {
        props: {
            payment: response.data,
            order: order.data
        }
    }
}