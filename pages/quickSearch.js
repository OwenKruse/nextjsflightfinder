import { Autocomplete, TextField } from "@mui/material";
import * as React from "react";
import styles from "../styles/Home.module.css";
import background from "../asset/BackGround.png";
import { useRouter } from "next/router";
// import ref from "react";
import { useRef } from "react";
import {items} from "../public/airports.js";
export default function quickSearch() {
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
        const formData2 = new FormData(form2.current);

        let tripStart = formData2.get("trip-start");
        console.log(tripStart);
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
        }).then(r => console.log(r));
    };


    return (
        <div className={styles.quicksearchwrapper}>
            <div className={styles.quicksearch}>
                <div className={styles.quicksearch__title}>
                    <h1 className={styles.quicksearch__title}>
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
                                        required
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
                                        required
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