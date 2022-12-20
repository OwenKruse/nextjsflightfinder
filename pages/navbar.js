import Image from 'next/image'
import logo from '../asset/logo.png'
import styles from '../styles/navbar.module.scss'
// Navbar.js
import Link from 'next/link';
import {useTheme} from "@mui/material";
import { alpha } from '@mui/material/styles';
export default function Navbar() {
    return (
        <div className={styles.navbar} style={
            {
                backgroundColor: useTheme().palette.background.paper,
            }
        }>
            <div className={styles.logo}>
                <Image src={logo} alt="logo" width={100} height={100} />
            </div>
            <div className={styles.navbarLinks} style={
                {

                    color: useTheme().palette.text.primary,
                }
            }>
                <Link legacyBehavior href={"/home"} >
                    <a style={
                                {
                                    backgroundColor: alpha(useTheme().palette.text.primary, 0.25),
                                }
                            }>Home</a>
                </Link>
                <Link href="/search" legacyBehavior>
                    <a style={
                        {
                            backgroundColor: alpha(useTheme().palette.text.primary, 0.25),
                        }
                    }
                        >Search</a>
                </Link>
                <Link href="/about" legacyBehavior>
                    <a style={
                    {
                        backgroundColor: alpha(useTheme().palette.text.primary, 0.25),
                    }
                    }
                        >About</a>
                </Link>
            </div>
        </div>
    )
}