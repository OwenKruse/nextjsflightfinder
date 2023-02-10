import { Duffel } from "@duffel/api";
import Head from "next/head";
import styles from '../styles/Price.module.scss';
import {Container, Divider, Grid, Typography} from "@mui/material";

export default function Price({ slice }) {
    const tax = slice.tax_amount;
    const base = slice.base_amount;
    const total = slice.total_amount;
    const base_per_passenger = Math.round((base / slice.passengers.length) * 100) / 100;
    const passenger_count = slice.passengers.length;




    return (
        <>
            <Head>
                <title>Flight Booking</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
                <Grid container spacing={2} className={styles.container}>
                    <Grid item xs={12} sm={10} className={styles.priceItem}>
                        <Typography  component={'span'} gutterBottom >
                            Ticket Price
                        </Typography>
                        <Typography variant="body1" component={'span'} gutterBottom sx={
                            {
                                display: 'flex',
                                flexDirection: 'row',
                            }
                        }>
                            <Typography variant="body1" component={'span'} gutterBottom className={styles.priceColor} >
                                ${base_per_passenger}
                            </Typography>
                            <Typography variant="body1" component={'span'} gutterBottom sx={
                                {
                                    paddingLeft: '.5rem'
                                }
                            }>
                                x{passenger_count}
                            </Typography>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={10}  className={styles.priceItem} >
                        <Typography component={'span'}  gutterBottom>
                            Tax
                        </Typography>
                        <Typography variant="body1" component={'span'} gutterBottom className={styles.priceColor}>
                            ${tax}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={10}  className={styles.priceItem} >
                        <Typography component={'span'} gutterBottom>
                            Fees
                        </Typography>
                        <Typography variant="body1" component={'span'} gutterBottom className={styles.priceColor}>
                            ${Number((total * .05).toFixed(2))}
                        </Typography>
                    </Grid>
                    <Divider sx={
                        {
                            justifySelf: 'center',
                            width: '100%',
                            color: 'black'

                        }
                    }/>
                    <Grid item xs={12} sm={10} className={styles.priceItem}>
                        <Typography component={'span'} gutterBottom>
                            Total Price
                        </Typography>
                        <Typography variant="body1" component={'span'} gutterBottom className={styles.priceColor}>
                            ${(Number(total) + Number((total * .05).toFixed(2))).toFixed(2)}
                        </Typography>
                    </Grid>
                </Grid>
        </>
    )
}

