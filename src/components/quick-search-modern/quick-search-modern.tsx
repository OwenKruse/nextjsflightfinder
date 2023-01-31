import React from 'react';
import {
    Autocomplete,
    Checkbox,
    createFilterOptions,
    FormControl,
    FormControlLabel, Grid,
    TextField,
    ThemeProvider, Typography,

} from "@mui/material";
import styles from "../../../styles/quickSearch.module.css";
import background from "../asset/BackGround.png";
import { useRouter } from "next/router";
// import ref from "react";
import { useEffect, useRef, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers";
import { alpha, createTheme } from '@mui/material/styles';
import { add, toDate } from "date-fns";
import { items } from "../../../pages/api/airports";
import Classnames from 'classnames';

export interface QuickSearchModernProps {
    className?: string;
}


export const QuickSearchModern = (props: QuickSearchModernProps) => {
    function todayDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();

        return yyyy + "-" + mm + "-" + dd;
    }
    // const router = useRouter();
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




        // Pass the `from` and `to` variables to the MyPage component as props
        // router.push({
        //     pathname: '/search/loading',
        //     query: {
        //         from,
        //         to,
        //         date,
        //         returnDate,
        //         oneWay
        //     }
        // }).then(r => console.log(r));
    };
    const getOptionLabel = (option) => {
        // Return just the name of the option
        return `${option.name}`;
    };

    const filterOptions = createFilterOptions({
        stringify: ({ name, keyword }) => `${name} ${keyword}`
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
    minDate = add(minDate, { days: 1 });
    const darkTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });
    return (
        <Grid container className={styles.container}>
            <Grid item xs={12} sm={10} className={Classnames(styles.titleContainer, styles.title)}>
                <Typography className={styles.title}>Quick Search</Typography>
            </Grid>
            <Grid item xs={12} sm={10} className={Classnames(styles.formContainer, styles.searchContainer)}>
                <FormControl fullWidth className={styles.searchContainer}>
                    <Autocomplete
                        className={styles.quicksearch__input}
                        disablePortal={true}
                        open={open2}
                        onInputChange={handleInputChange2}
                        getOptionLabel={getOptionLabel}
                        filterOptions={filterOptions}
                        options={items}
                        sx={{
                            width: 300,
                            backgroundColor: 'white',
                            color: 'white',
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                required
                                name={"from"}
                                label="Departing from..."
                                className={styles.autocomplete}
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                                sx={
                                    {
                                        color: 'white',
                                        border: '0',

                                    }
                                }
                            />
                        )}
                    />
                    <Autocomplete
                        className={styles.quicksearch__input}
                        disablePortal
                        open={open}
                        getOptionLabel={getOptionLabel}
                        onInputChange={handleInputChange}
                        filterOptions={filterOptions}
                        options={items}
                        sx={{
                            width: 300,
                            backgroundColor: 'white',
                            color: 'white',
                        }}
                        renderInput={(params) => (
                            <TextField
                                required
                                {...params}
                                name={"to"}
                                label="Going to..."
                                sx={
                                    {
                                        color: 'white',
                                        border: '0',

                                    }
                                }
                            />
                        )}
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default QuickSearchModern;
