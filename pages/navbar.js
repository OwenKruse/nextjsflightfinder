import Image from 'next/image'
import logo from '../asset/logo.png'
import styles from '../styles/navbar.module.scss'


// Navbar.js
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <Image src={logo} alt="logo" width={100} height={100} />
            </div>
            <div className={styles.navbarLinks}>
                <Link legacyBehavior href={"/home"}>
                    <a>Home</a>
                </Link>
                <Link href="/search" legacyBehavior>
                    <a>Search</a>
                </Link>
                <Link href="/about" legacyBehavior>
                    <a>About</a>
                </Link>
            </div>
        </div>
    )
}