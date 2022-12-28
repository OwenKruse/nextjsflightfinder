import {Box, Container, FormControl, FormLabel, Grid, TextField, Typography} from "@mui/material";
import styles from "../styles/checkout.module.scss";

export default function Checkout() {
    return (
        <>
            <Container maxWidth="sm" className={styles.checkout}>
                <Box my={4} className={styles.checkoutSection}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom>
                                Payment details
                            </Typography>
                            <FormControl className={styles.checkoutForm}>
                                <FormLabel htmlFor="card-name">Name on card</FormLabel>
                                <TextField id="card-name" />
                                <FormLabel htmlFor="card-number">Card number</FormLabel>
                                <TextField type="text" id="card-number" />
                                <FormLabel htmlFor="expiration">Expiration date</FormLabel>
                                <TextField type="text" id="expiration" />
                                <FormLabel htmlFor="cvv">CVV</FormLabel>
                                <TextField type="text" id="cvv" />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}