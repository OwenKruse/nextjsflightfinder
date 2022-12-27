import { NextPage } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '../../styles/about.module.scss';
import {AppBar, Typography} from "@mui/material";
import {Button} from "@mui/material/";
import Navbar from "../navbar";


import { useRouter } from 'next/router';
import {Container} from "@mui/system";

function AboutPage() {
    const router = useRouter();
    return (
        <div>
            <Navbar/>
            <Typography variant="h3" gutterBottom>About My Flight Finder</Typography>
            <Typography paragraph>
                MileWise is a website that helps you find the best flights for your next trip.
                We offer a wide range of options from different airlines, so you can choose the flight that best fits your needs and budget.
                Our easy-to-use interface and fast search engine make it simple to find the perfect flight for your next adventure.
            </Typography>
            <Typography paragraph>
                We are constantly updating our database with the latest flight information and prices, so you can always find the most current and accurate information on our site.
                Our team is dedicated to providing the best possible experience for our users, and we are always working to improve our services and offerings.
            </Typography>
            <Typography paragraph>
                Thank you for choosing My Flight Finder for your travel needs. We hope you have a great trip!
            </Typography>
        </div>
    );
}

export default AboutPage;