import Image from 'next/image'
import logo from '../public/Layer 1.png'
import styles from '../styles/navbar.module.scss'
import Link from 'next/link';
import {Typography} from "@mui/material";
export default function Navbar() {

    return (
        <div className={styles.navbar} style={{
        }}>
            <div className={styles.logo}>
                <Image src={logo} alt="logo" width={100} height={100} />
                <Typography className={styles.title}>  MileWise </Typography>

            </div>

            <div className={styles.navbarLinks} style={
                {

                }
            }>
                <Link legacyBehavior href={"/"} >
                    <a style={
                                {
                                }
                            }>Home</a>
                </Link>
                <Link href="/search" legacyBehavior>
                    <a style={
                        {
                        }
                    }
                        >Search</a>
                </Link>
                <Link href="/about" legacyBehavior>
                    <a style={
                    {
                    }
                    }
                        >About</a>
                </Link>
            </div>
        </div>
    )
}