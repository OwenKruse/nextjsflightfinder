import { Autocomplete, TextField } from "@mui/material";
import * as React from "react";
import styles from "../styles/Home.module.css";
import background from "../asset/BackGround.png";
import { useRouter } from "next/router";
// import ref from "react";
import { useState } from "react";
import { useRef } from "react";
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

export default function quickSearch() {
    function todayDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();

        return mm + "/" + dd + "/" + yyyy;
    }

    const router = useRouter();
    const oneWay = useRef(null);
    const date = useRef(null);
    function isChecked() {
        console.log("checked");
        let checked = oneWay.current.checked;
        if (checked) {
            console.log("checked");
            date.current.disabled = true;
            // add a style to the date input
            date.current.style.backgroundColor = "grey";

        }
        else {
            console.log("not checked");
            date.current.disabled = false;
            // remove the style from the date input
            date.current.style.backgroundColor = "white";
        }
    }

    const form2 = useRef(null);
    const handleSubmit = event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        //get by ref
        const formData2 = new FormData(form2.current);
        const from = formData.get('from');
        const to = formData.get('to');
        const departure = formData2.get('trip-start');
        let returnDate = formData2.get('trip-end');
        const checkbox = formData2.get('trip-one-way');
        let oneWay = false;
        if (checkbox) {
            oneWay = true;
            returnDate = null;
        }

        console.log(oneWay);




        // Pass the `from` and `to` variables to the MyPage component as props
        router.push({
            pathname: '/search',
            query: {
                from,
                to,
                departure,
                returnDate,
                oneWay
            }
        });
    };


    return (
        <div className={styles.quicksearchwrapper}>
            <div className={styles.quicksearch} style={{
                backgroundImage: `url(${background.src})`,
                width: '100%',
                height: '100%',
            }}>
                <div className={styles.quicksearch__title}>
                    <h1 className={styles.quicksearch__title}>
                        Find your next adventure
                    </h1>
                    <form
                        autoComplete="off"
                        className={styles.quicksearch__form}
                        onSubmit={handleSubmit}
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
                                        label="Departing from..."
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
                                        label="Going to..."
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
                        <div className={styles.quicksearch__button__box}>
                            <button className={styles.quicksearch__button} type="submit">
                                Search
                            </button>

                        </div>

                    </form>
            <form ref={form2}>
                    <div className={styles.quicksearch__date__dropdown__show} id={"banner"}>
                        <div className={styles.quicksearch__date__box}>
                            <div className={styles.quicksearch__date__title}>
                            </div>
                            <div className={styles.quicksearch__date__input}>
                                <input className={styles.date__select} type="date" name="trip-start"
                                       placeholder="2021-08-01"
                                       min={todayDate()} max="2025-12-31"></input>

                                <input className={styles.date__select} ref={date} type="date" name="trip-end"
                                       placeholder="2021-08-01"
                                       min={todayDate()} max="2025-12-31"
                                       disabled={false}



                                ></input>
                            </div>
                            <div className={styles.is__one__way} id={"banner"}>
                                <div className={styles.is__one__way__box}>
                                    <div className={styles.is__one__way__title}>
                                        One way
                                    </div>
                                    <div className={styles.is__one__way__input}>
                                        <input className={styles.is__one__way__input__select} ref={oneWay} type="checkbox" name="trip-one-way" onClick={isChecked}></input>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>


    );
}