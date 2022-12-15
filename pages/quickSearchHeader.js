import { Autocomplete, TextField } from "@mui/material";
import * as React from "react";
import styles from "../styles/resultNavBar.module.css";
import background from "../asset/BackGround.png";
import {useRouter} from "next/router";
import {useRef} from "react";

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
    function todayDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();

        return yyyy + "-" + mm + "-" + dd;
    }
    const router = useRouter();
    const oneWay = useRef(null);
    const date = useRef(null);

    function maxDate(){
        const formData = new FormData(form2.current);

        let tripStart = formData.get("trip-start");
        if (tripStart !== ""){
            let date1 = new Date(tripStart);
            date1.setDate(date1.getDate() + 1);
            console.log(date);
            date1 = date1.toISOString()
            date1 = date1.split("T")[0];
            console.log(date1);
            date.current.style.backgroundColor = "white";
            date.current.min = date1;
        }

    }
    function isChecked() {
        let checked = oneWay.current.checked;
        if (checked) {
            date.current.disabled = true;
            // add a style to the date input
            date.current.style.backgroundColor = "grey";

        }
        else {
            date.current.disabled = false;
            date.current.style.backgroundColor = "white";
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        //get by ref
        const from = formData.get('from');
        const to = formData.get('to');
        const departure = formData.get('trip-start');
        let returnDate = FormData.get('trip-end');
        const checkbox = FormData.get('trip-one-way');
        let oneWay = false;
        if (checkbox) {
            oneWay = true;
            returnDate = null;
        }
    }


        const form2 = useRef(null);
    // get the props from the parent component
    return (
        <div className={styles.quicksearchwrapper}>
            <div className={styles.quicksearch} style={{
                backgroundImage: `url(${background.src})`,
                // Make the image more transparent
                backgroundBlendMode: 'multiply',
                width: '100%',
                height: '100%',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'

            }}>
                    <form
                        ref={form2}
                        autoComplete="off"
                        onSubmit={handleSubmit}
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
                                        sx={{ input: { color: "white" }, whiteSpace: "nowrap", border : "1px solid",borderColor: "rgba(255,255,255,0.57)", borderRadius: "5px", backgroundColor: "rgba(0,0,0,)" }}
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
                                        sx={{ input: { color: "white" }, whiteSpace: "nowrap", border : "1px solid",borderColor: "rgba(255,255,255,0.57)", borderRadius: "5px", backgroundColor: "rgba(0,0,0,)" }}
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
                                           required
                                           min={todayDate()} max="2025-12-31"></input>

                                    <input className={styles.date__select} ref={date} type="date" name="trip-end"
                                           placeholder="2021-08-01"
                                           min={todayDate()} max="2025-12-31"
                                           disabled={false}
                                           onClick={maxDate}
                                           required



                                    ></input>
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