import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Text, Title, useMantineTheme } from '@mantine/core';
import { Button } from '@mui/material'
import styles from '../styles/deals.module.scss'

const useStyles = createStyles((theme) => ({
    card: {
        height: 700,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        color: theme.white,
        lineHeight: 1.2,
        fontSize: 32,
        marginTop: theme.spacing.xs,
    },

    price: {
        color: theme.white,
        opacity: .7,
        fontWeight: 700,
        textTransform: 'uppercase',
        fontSize: 18,
    },
}));

interface CardProps {
    image: string;
    title: string;
    price: string;
    mobilePrice: string;
}

function Card({ image, title, price, mobilePrice }: CardProps) {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
    return (
        <Paper
            shadow="md"
            radius="md"
            sx={{ backgroundImage: `url(${image})` }}
            className={classes.card}
        >
            <div style={
                { padding: '0 20px 20px' }

            }>
                <Title order={3} className={classes.title}>
                    {title}
                </Title>

            </div>
            <div style={
                {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    padding: '20px 0',
                    borderRadius: '0 0 10px 10px',


                }
            }>
                <Text className={classes.price}>{!mobile ? price : mobilePrice }</Text>
                <Button variant="contained" color="success" className={styles.button} sx={
                    {
                        background: 'linear-gradient(90deg, #FFB800 0%, #FFB800 100%)',
                    }
                }>
                    View deal
                </Button>
            </div>

        </Paper>
    );
}

const data = [
    {
        image:
            'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'Best forests to visit in North America',
        price: 'Round trip for 120$',
        mobilePrice: '120$',
    },
    {
        image:
            'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'Escape to paradise with a trip to Hawaii',
        price: 'Round trip for 320$',
        mobilePrice: '320$',
    },
    {
        image:
            'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'Mountains at night: 12 best locations to enjoy the view',
        price: 'Round trip for 220$',
        mobilePrice: '220$',
    },
    {
        image:
            'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'Experience the beauty and adventure of Norway\'s breathtaking landscapes and culture',
        price: 'Round trip for 420$',
        mobilePrice: '420$',
    },
    {
        image:
            'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'Best places to visit this winter',
        price: 'Round trip for 120$',
        mobilePrice: '120$',
    },
    {
        image:
            'https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'Active volcanos reviews: travel at your own risk',
        price: 'Round trip for 320$',
        mobilePrice: '320$',
    },
];

export function CardsCarousel() {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
    const slides = data.map((item) => (
        <Carousel.Slide key={item.title}>
            <Card {...item} />
        </Carousel.Slide>
    ));

    return (
        <Carousel
            slideSize={mobile ? "100%" : "33.33%"}
            breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
            slideGap="md"
            align="start"
            loop
            slidesToScroll={1}
            height="100%"
            styles={
                {
                    control : {
                        background: 'rgba(255,255,255,0.5)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                    }
                }
            }
        >
            {slides}
        </Carousel>
    );
}

export default CardsCarousel;