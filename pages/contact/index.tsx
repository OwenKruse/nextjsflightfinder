import { useSpring, animated } from '@react-spring/web'
import { Paper } from '@mui/material';
import { Container, Grid, Typography, Link } from '@mui/material';
import { Button } from '@mui/material';
import classes from '../../styles/contact.module.scss';

function ContactPage() {
    const { x } = useSpring({
        from: { x: 0 },
        x: 1,
        config: { mass: 10, tension: 550, friction: 140 }
    });

    return (
        <Container className={classes.root}>
            <animated.div
                style={{
                    transform: x.interpolate((x) => `translate3d(0,${x * -20}px,0)`)
                }}
            >
                <Paper className={classes.paper}>
                    <Typography variant="h4" gutterBottom>
                        Contact Us
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        If you have any questions or concerns, please don't hesitate to contact us. You can reach us by phone, email, or through the form below.
                    </Typography>
                </Paper>
            </animated.div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        Phone
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        (123) 456-7890
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        Email
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <Link href="mailto:info@myflightfinder.com">info@myflightfinder.com</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ContactPage;
