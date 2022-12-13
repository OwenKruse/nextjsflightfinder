import { Autocomplete, TextField } from "@mui/material";
import * as React from "react";
import styles from "../styles/resultNavBar.module.css";
import background from "../asset/BackGround.png";

const items = [
    "ATLANTA GA, US (ATL) Airport",
    "BEIJING, CN (PEK) Airport",
    "LONDON, GB (LHR) Airport",
    "CHICAGO IL, US (ORD) Airport",
    "TOKYO, JP (HND) Airport",
    "LOS ANGELES CA, US (LAX) Airport",
    "PARIS, FR (CDG) Airport",
    "DALLAS/FORT WORTH TX, US (DFW) Airport",
    "FRANKFURT, DE (FRA) Airport",
    "HONG KONG, HK (HKG) Airport",
    "DENVER CO, US (DEN) Airport",
    "DUBAI, AE (DXB) Airport",
    "JAKARTA, ID (CGK) Airport",
    "AMSTERDAM, NL (AMS) Airport",
    "MADRID, ES (MAD) Airport",
    "BANGKOK, TH (BKK) Airport",
    "NEW YORK NY, US (JFK) Airport",
    "SINGAPORE, SG (SIN) Airport",
    "GUANGZHOU, CN (CAN) Airport",
    "LAS VEGAS NV, US (LAS) Airport",
    "SHANGHAI, CN (PVG) Airport",
    "SAN FRANCISCO CA, US (SFO) Airport",
    "PHOENIX AZ, US (PHX) Airport",
    "HOUSTON TX, US (IAH) Airport",
    "CHARLOTTE NC, US (CLT) Airport",
    "MIAMI FL, US (MIA) Airport",
    "MUNICH, DE (MUC) Airport",
    "KUALA LUMPUR, MY (KUL) Airport",
    "ROME, IT (FCO) Airport",
    "ISTANBUL, TR (IST) Airport",
    "SYDNEY, AU (SYD) Airport",
    "ORLANDO FL, US (MCO) Airport",
    "INCHEON, KR (ICN) Airport",
    "NEW DELHI, IN (DEL) Airport",
    "BARCELONA, ES (BCN) Airport",
    "LONDON, GB (LGW) Airport",
    "NEWARK NJ, US (EWR) Airport",
    "TORONTO ON, CA (YYZ) Airport",
    "SHANGHAI, CN (SHA) Airport",
    "MINNEAPOLIS MN, US (MSP) Airport",
    "SEATTLE WA, US (SEA) Airport",
    "DETROIT MI, US (DTW) Airport",
    "PHILADELPHIA PA, US (PHL) Airport",
    "MUMBAI, IN (BOM) Airport",
    "SÃO PAULO, BR (GRU) Airport",
    "MANILA, PH (MNL) Airport",
    "CHENGDU, CN (CTU) Airport",
    "BOSTON MA, US (BOS) Airport",
    "SHENZHEN, CN (SZX) Airport",
    "MELBOURNE, AU (MEL) Airport",
    "TOKYO, JP (NRT) Airport",
    "PARIS, FR (ORY) Airport",
    "MEXICO CITY, MX (MEX) Airport",
    "MOSCOW, RU (DME) Airport",
    "ANTALYA, TR (AYT) Airport",
    "TAIPEI, TW (TPE) Airport",
    "ZURICH, CH (ZRH) Airport",
    "NEW YORK NY, US (LGA) Airport",
    "FORT LAUDERDALE, FL, US (FLL) Airport",
    "WASHINGTON, DC, US (IAD) Airport",
    "PALMA DE MALLORCA, ES (PMI) Airport",
    "COPENHAGEN, DK (CPH) Airport",
    "MOSCOW, RU (SVO) Airport",
    "BALTIMORE MD, US (BWI) Airport",
    "KUNMING, CN (KMG) Airport",
    "VIENNA, AT (VIE) Airport",
    "OSLO, NO (OSL) Airport",
    "JEDDAH, SA (JED) Airport",
    "BRISBANE, AU (BNE) Airport",
    "SALT LAKE CITY UT, US (SLC) Airport",
    "DÜSSELDORF, DE (DUS) Airport",
    "BOGOTA, CO (BOG) Airport",
    "MILAN, IT (MXP) Airport",
    "JOHANNESBURG, ZA (JNB) Airport",
    "STOCKHOLM, SE (ARN) Airport",
    "MANCHESTER, GB (MAN) Airport",
    "CHICAGO IL, US (MDW) Airport",
    "WASHINGTON DC, US (DCA) Airport",
    "BRUSSELS, BE (BRU) Airport",
    "DUBLIN, IE (DUB) Airport",
    "SEOUL, KR (GMP) Airport",
    "DOHA, QA (DOH) Airport",
    "LONDON, GB (STN) Airport",
    "HANGZHOU, CN (HGH) Airport",
    "JEJU, KR (CJU) Airport",
    "VANCOUVER BC, CA (YVR) Airport",
    "BERLIN, DE (TXL) Airport",
    "SAN DIEGO CA, US (SAN) Airport",
    "TAMPA FL, US (TPA) Airport",
    "SÃO PAULO, BR (CGH) Airport",
    "BRASILIA, BR (BSB) Airport",
    "SAPPORO, JP (CTS) Airport",
    "XIAMEN, CN (XMN) Airport",
    "RIYADH, SA (RUH) Airport",
    "FUKUOKA, JP (FUK) Airport",
    "RIO DE JANEIRO, BR (GIG) Airport",
    "HELSINKI, FI (HEL) Airport",
    "LISBON, PT (LIS) Airport",
    "ATHENS, GR (ATH) Airport",
    "AUCKLAND, NZ (AKL) Airport",
];

export default function quickSearch(props) {
    if (props!=null){
        console.log(props.to);
    }
    // get the props from the parent component
    return (
        <div className={styles.quicksearchwrapper}>
            <div className={styles.quicksearch} style={{
                backgroundImage: `url(${background.src})`,
                width: '100%',
                height: '100%',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                    <form
                        autoComplete="off"
                        action="/nextjsflightfinder/backend/action_page.php"
                        className={styles.quicksearch__form}
                    >
                        <div className={styles.quicksearch__box}>
                            <Autocomplete
                                className={styles.quicksearch__input}
                                disablePortal
                                options={items}
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        name={"from"}
                                        label= {props.from}
                                        id={"from"}
                                        sx={{ input: { color: "white" }, whiteSpace: "nowrap"}}
                                        InputLabelProps={{
                                            style: {
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                color: "white",
                                            },
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className={styles.quicksearch__box}>
                            <Autocomplete
                                className={styles.quicksearch__input}
                                disablePortal
                                options={items}
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        name={"to"}
                                        label={props.to}
                                        sx={{ input: { color: "white" } }}
                                        InputLabelProps={{
                                            style: {
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                color: "white",
                                            },
                                        }}
                                    />
                                )}
                            />

                        </div>
                        <div className={styles.quicksearch__date__dropdown__show} id={"banner"}>
                            <div className={styles.quicksearch__date__box}>
                                <div className={styles.quicksearch__date__title}>
                                </div>
                                <div className={styles.quicksearch__date__input}>
                                    <input className={styles.date__select} type="date" name="trip-start"
                                           placeholder="2021-08-01"
                                           min="2021-08-01" max="2022-12-31"></input>

                                    <input className={styles.date__select} type="date" name="trip-start"
                                           placeholder="2021-08-01"
                                           min="2021-08-01" max="2022-12-31"></input>
                                </div>

                            </div>
                        </div>

                        <div className={styles.quicksearch__button__box}>
                            <button className={styles.quicksearch__button} type="submit">
                                Search
                            </button>

                        </div>

                    </form>

                </div>
        </div>


    );
}