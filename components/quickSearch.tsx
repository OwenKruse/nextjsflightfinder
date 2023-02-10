import {
    Autocomplete,
    Checkbox,
    createFilterOptions,
    FormControl,
    FormControlLabel,
    TextField,
    ThemeProvider
} from "@mui/material";
import * as React from "react";
import styles from "../styles/Home.module.css";
import background from "../asset/BackGround.png";
import { useRouter } from "next/router";
// import ref from "react";
import {useEffect, useRef, useState} from "react";
import {items} from "../pages/api/airports.js";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DatePicker} from "@mui/x-date-pickers";
import {alpha, createTheme} from '@mui/material/styles';
import {add, toDate} from "date-fns";

export default function QuickSearch() {
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


    const form2 = useRef(null);
    const handleSubmit = event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        //get by ref
        const formData2 = new FormData(form2.current);
        const from = formData.get('from');
        const to = formData.get('to');
        const date = formData2.get('tripStart');
        let returnDate = formData2.get('tripEnd');
        const checkbox = formData2.get('trip-one-way');




        // @ts-ignore
        router.push({
            pathname: '/search/loading',
            // @ts-ignore
            query: {
                from,
                to,
                date,
                returnDate,
                oneWay
            }
        }).then(r => console.log(r));
    };
    let height = 0;
    const element2Ref = useRef(null);
    const element1Ref = useRef(null);

    const getOptionLabel = (option) => {
        // Return just the name of the option
        return `${option.name}`;
    };

    const filterOptions = createFilterOptions({
        stringify: ({ name, keyword}) => `${name} ${keyword}`
    });



    const [isOneWay, setIsOneWay] = useState(false);
    const [dateDepart, setDateDepart] = useState(null);
    const [dateReturn, setDateReturn] = useState(null);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);


    const handleInputChange = (event) => {
        // Make sure the value is not undefined
        if (event !== null) {
            if (event.target.value !== undefined) {
                if (event.target.value.length > 2) {
                    setOpen(true);
                } else {
                    setOpen(false);
                }
            }
        }
        if (event.type !== null) {
            if (event.type === "blur") {
                setOpen(false);
            }
        }

    };
    const handleInputChange2 = (event) => {
        if (event !== null) {
            if (event.target.value !== undefined) {
                if (event.target.value.length > 2) {
                    setOpen2(true);
                } else {
                    setOpen2(false);
                }
            }
        }
        if (event.type !== null) {
            if (event.type === "blur") {
                setOpen2(false);
            }
        }
    }
    let minDate = new Date(dateDepart);
    //Convert to date-fns
    minDate = toDate(minDate);
    minDate = add(minDate, {days: 1});
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
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
                        <div className={styles.quicksearch__aiport_box}>

                        <div className={styles.quicksearch__box}>
                            <Autocomplete
                                className={styles.quicksearch__input}
                                disablePortal
                                open={open2}
                                onInputChange={handleInputChange2}
                                getOptionLabel={getOptionLabel}
                                filterOptions={filterOptions}
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
                                open={open}
                                getOptionLabel={getOptionLabel}
                                onInputChange={handleInputChange}
                                filterOptions={filterOptions}
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
                        </div>

                    </form>
            <form ref={form2}>
                <div className={styles.quicksearch__date__dropdown__show} id={"banner"}>
                    <div >

                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <div className={styles.quicksearch__date__box}>
                                <DatePicker
                                    label="Departing on"
                                    inputFormat="YYYY-MM-DD"
                                    minDate={new Date()}
                                    value={dateDepart}

                                    onChange={(newValue) => {
                                        setDateDepart(newValue);
                                    }}
                                    renderInput={(params) => <TextField
                                        {...params}
                                        name={"tripStart"}
                                        id={"tripStart"}
                                        label={"Leaving"}
                                        required
                                        className={styles.datePicker}
                                        sx={{ input: { color: "white" },
                                            whiteSpace: "nowrap",
                                            borderRadius: "5px",
                                            textAlign: "center",


                                            "& .MuiInputBase-root": {
                                                '& fieldset': {

                                                }

                                            },
                                            "& .MuiInputBase-root:hover": {
                                                '& fieldset': {
                                                }
                                            },
                                            "& .MuiInputBase-root.Mui-focused": {
                                                '& fieldset': {
                                                    borderWidth: 1,
                                                }
                                            }




                                        }}
                                        InputLabelProps={{
                                            style: {
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textAlign: "center",


                                            },
                                        }}
                                    />}
                                    className={styles.date__select}
                                />

                                <DatePicker
                                    label="Returning on"
                                    inputFormat="YYYY-MM-DD"
                                    value={dateReturn}
                                    disabled={isOneWay}
                                    minDate={minDate}

                                    onChange={(newValue) => {
                                        setDateReturn(newValue);
                                    }}
                                    renderInput={(params) => <TextField
                                        {...params}
                                        name={"tripEnd"}
                                        id={"tripEnd"}
                                        label={"Returning"}



                                        sx={{ input: { color: "white" },
                                            whiteSpace: "nowrap",
                                            borderRadius: "5px",

                                            "& .MuiInputBase-root": {
                                                '& fieldset': {
                                                }

                                            },
                                            "& .MuiInputBase-root:hover": {
                                                '& fieldset': {
                                                }
                                            },
                                            "& .MuiInputBase-root.Mui-focused": {
                                                '& fieldset': {
                                                    borderWidth: 1,
                                                }
                                            }




                                        }}
                                        InputLabelProps={{
                                            style: {
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                            },
                                        }}
                                    />}
                                    className={styles.date__select}
                                />
                                <FormControlLabel
                                    className={styles.quicksearch__checkbox}

                                    control={
                                        <Checkbox
                                            value={isOneWay}
                                            onChange={(event) => { setIsOneWay(event.target.checked) }}
                                            style={{ color: 'white', fontSize: '14px' }}
                                        />
                                    }
                                    label="One way"
                                    labelPlacement="start"
                                    style={{     color: "rgba(255, 255, 255, 0.75)"
                                        , fontSize: '14px' }}
                                />



                            </div>
                        </LocalizationProvider>

                    </div>
                </div>
                </form>
                </div>
            </div>
        </div>
            </ThemeProvider>


    );
}