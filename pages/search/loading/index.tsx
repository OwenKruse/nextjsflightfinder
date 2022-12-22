import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../../styles/Home.module.css";

import Navbar from "../resultNavbar";
import {useEffect} from "react";

export default function index({query}) {
    console.log(query);
    let to = query.to;
    let from = query.from;
    let departure = query.departure;
    let returnDate = query.returnDate;
    let passengers = query.passengers;
    let oneWay = query.oneWay;


    const router = useRouter();
    useEffect(() => {
        router.push({
            pathname: "/search",
            query: query

        });
    }
    , [to, from, departure, returnDate, passengers, oneWay]);



    return (
        <main className={styles.main} style={
            {
                backgroundColor: "rgb(0,0,0)",
            }
        }>
            <Head>
                <title>Flight Finder</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.parallax}>
                {/* The Parallax component takes a prop called "className" that you can use to specify the class of the element to apply the parallax effect to */}
                <div className={styles.containerSearch} >
                    <Navbar from={from} to={to} departure={departure} returnDate={returnDate} passengers={passengers} oneWay={oneWay}></Navbar>
                    <div className={styles.searchBox}>
                        <div className={styles.ldsEllipsis}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}

export async function getServerSideProps({query})
{
    return {
        props: {
            query
        }
    }

}