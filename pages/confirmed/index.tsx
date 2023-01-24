import ConfirmationCard from '../../components/ConfirmationCard'
import Navbar from "../../components/Navbar";
import { Duffel } from '@duffel/api'



export default function Confirmed({ payment, query, order }) {
    console.log(order);

    return (
        <div>
            <Navbar />
            <ConfirmationCard order={order} />
        </div>
        )
}

export const getServerSideProps = async ({ query }) => {
    const { order_id } = query;

    const duffel = new Duffel({
        token: "duffel_test_ThLUYHmU6F3MbIzMNFc8-ahZA-w_Nn5T5sSkPJ0-SLY"
    })

    const order = await duffel.orders.get(order_id)
        return {
                props: {
                    order: order.data
                }
        }
}