import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

import Navbar from "./resultNavbar";

export default function loading(query) {
    const router = useRouter();
    const { q } = router.query;
    let to = query.to;
    let from = query.from;
    let departure = query.departure;
    let returnDate = query.returnDate;
    let passengers = query.passengers;
    let oneWay = query.oneWay;
    let stops = query.stops;
    let airlines = query.airlines;
    let sort = query.sort;
    let times = query.times;
    let duration = query.duration;
    let price = query.price;


    return (
        <main className={styles.main}>
            <Head>
                <title>Flight Finder</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.parallax}>
                {/* The Parallax component takes a prop called "className" that you can use to specify the class of the element to apply the parallax effect to */}
                <div className={styles.containerSearch}>
                    <Navbar from={from} to={to} departure={departure} returnDate={returnDate} passengers={passengers} oneWay={oneWay}></Navbar>
                    <div className={styles.containerSearch}>
                    </div>
                </div>
            </div>
        </main>
    )
}