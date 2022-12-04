import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import logo from '../asset/logo.png'


export default function Navbar() {
    return (
        <div>
            <div className={styles.navbar}>
                <h1 >
                    <id className={styles.navbar__logo}>
                        <Image src={logo} alt="logo" width={75} height={75} />
                    </id>
                </h1>
                <h1>
                    <id className={styles.navbar__about}>
                        <a href={"flightfinder"}> Flight Finder </a></id>
                </h1>
                <hr className={styles.navbar__separator}/>
                <h1>
                    <id className={styles.navbar__contact}>
                        <a href={"contact"}> Contact </a></id>

                </h1>
            </div>
        </div>
    )
}