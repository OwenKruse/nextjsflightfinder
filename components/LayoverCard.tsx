import {Card, Grid, Typography} from '@mui/material'
import styles from '../styles/ConfirmationCard.module.scss'

const LayoverCard = (location, slice) =>  {
    location = location.location



    return (
        <Card style={
            {
                padding: "1rem",
                margin: "1rem",
                width: "100%"
            }
        }>
            <Grid container>
                <Grid item xs={16} className={styles.airlineContainer}>
                    <Grid container style={
                        {
                            whiteSpace: 'nowrap',
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }
                    }>
                        <Typography variant="h6">
                            {location}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

export default LayoverCard
