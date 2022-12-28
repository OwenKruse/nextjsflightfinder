import {
    Box,
    Button,
    Checkbox, Collapse, Container,
    FormControl, FormControlLabel, Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent, Slider, TextField, ThemeProvider, Toolbar, Tooltip, useMediaQuery
} from '@mui/material';
import {ChangeEvent, useEffect, useState} from "react";
import styles from "./searchExtended.module.scss";
import { useRouter } from "next/router";
import * as React from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Autocomplete } from "@mui/material";
import {useRef} from "react";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker, DesktopDatePicker} from "@mui/x-date-pickers";
import {useTheme} from "@mui/material";
import {alpha, createTheme} from '@mui/material/styles';
import {add, toDate} from "date-fns";
import {items} from "./airports";



export default function MyForm(props) {

    function todayDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();

        return yyyy + "-" + mm + "-" + dd;
    }
    const date = useRef(todayDate());



    const [formState, setFormState] = useState({});



    const filters = {
        stops: [
            { value: 0, label: 'Non-stop' },
            { value: 1, label: '1 stop' },
            { value: 2, label: '2+ stops' },
        ],
        airlines: [
            { value: 'All Airlines', label: 'All airlines' },
            { value: 'American', label: 'American Airlines' },
            { value: 'Delta', label: 'Delta' },
            { value: 'United', label: 'United' },
        ],
        sort: [
            { value: 'price', label: 'Price' },
            { value: 'duration', label: 'Duration' },
        ],
        times: [
            { value: 'anytime', label: 'Anytime' },
            { value: 'morning', label: 'Morning' },
            { value: 'afternoon', label: 'Afternoon' },
            { value: 'evening', label: 'Evening' },
        ],
        duration: [
            { value: 'any', label: 'Any duration' },
            { value: 'short', label: 'Short flights' },
            { value: 'long', label: 'Long flights' },
        ],
    };
    const [selectedStops, setSelectedStops] = useState(filters.stops[0].value);
    const [selectedSort, setSelectedSort] = useState(filters.sort[0].value);
    const [selectedTimes, setSelectedTimes] = useState(filters.times[0].value);
    const [selectedDuration, setSelectedDuration] = useState(filters.duration[0].value);
    const [selectedAirlines, setSelectedAirlines] = useState<string[]>([ 'All Airlines' ]);
    const [selectedPriceRange, setSelectedPriceRange] = useState(1500);
    const [displayPriceRange, setDisplayPriceRange] = useState('>1500');

    const handleChangeAirlines = (event: ChangeEvent<{ value: unknown }>) => {
        // Get the selected values from the event
        const selectedValues = event.target.value as string[];
        // If the user selected "All airlines", then we want to clear all other selections

 1       // Check all values are selected
        if (selectedValues.length >= 3) {
            // If all values are selected, then clear the array
            setSelectedAirlines(["All Airlines"]);
        }
        else if (selectedValues.includes("All Airlines") && selectedValues[0] !== "All Airlines") {
            // If the user selected "All airlines" and other values, then clear the array
            setSelectedAirlines(["All Airlines"]);
        }

        else if (selectedValues.includes("All Airlines") && selectedValues.length > 1) {
            // If "All airlines" is selected, but there are other values, then select the value and deselect "All airlines"
            setSelectedAirlines(selectedValues.filter((value) => value !== "All Airlines"));

        }
        else if (selectedValues.includes("All Airlines")) {
            // If "All airlines" is selected, then clear the array
            setSelectedAirlines(['All Airlines']);
        }
        else {
            // Otherwise, set the selectedAirlines state to the selected values
            setSelectedAirlines(selectedValues);
        }
    }
    const handleSliderChange = (event: {target : { value: string}}) => {
        let price = parseInt(event.target.value);
        if (price >= 1500) {
            setDisplayPriceRange("All Tickets");
        }
        else if (price === 0) {
            setDisplayPriceRange("All Tickets");
        }
        else {
            setDisplayPriceRange("Up to: " + event.target.value + "$");
        }

        setSelectedPriceRange(parseInt(event.target.value));



    }

    const [childrenCount, setChildrenCount] = React.useState(0);
    const [adultsCount, setAdultsCount] = React.useState(0);
    const [selectedValue, setSelectedValue] = React.useState('Children: 0, Adults: 0');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const incrementChildrenCount = () => {
        setChildrenCount(childrenCount + 1);
    };

    const decrementChildrenCount = () => {
        if (childrenCount > 0) {
            setChildrenCount(childrenCount - 1);
        }
    };

    const incrementAdultsCount = () => {
        setAdultsCount(adultsCount + 1);
    };

    const decrementAdultsCount = () => {
        if (adultsCount > 0) {
            setAdultsCount(adultsCount - 1);
        }
    };
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const [prevProps, setPrevProps] = useState(props);
    useEffect(() => {
        if (prevProps.value !== props.value) {
            setPrevProps(props);
            let combinedData = {
                stops: selectedStops,
                times: selectedTimes,
                airlines: selectedAirlines,
                priceRange: selectedPriceRange,
                childrenCount: childrenCount,
                adultsCount: adultsCount,
            }
            router.push({
                pathname: '/search',
                query: {
                    ...combinedData,
                    ...props.value,
                },
            });
        }
        setPrevProps(props);
    }, [props]);

    const formRef1 = useRef(null);
    let handleSubmit = () => {

        let formData= new FormData(formRef.current);
        let combinedData = {
            from: formData.get('from'),
            to: formData.get('to'),
            date: formData.get('tripStart'),
            returnDate: formData.get('tripEnd'),
            stops: selectedStops,
            times: selectedTimes,
            airlines: selectedAirlines,
            priceRange: selectedPriceRange,
            childrenCount: childrenCount,
            adultsCount: adultsCount,


        }
        router.push({
            pathname: '/search/loading',
            query: {
                ...combinedData,
            }
        });
    }

    const theme = useTheme();
    const formRef = useRef(null);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [dateDepart, setDateDepart] = React.useState<Date | null>(null);
    const [dateReturn, setDateReturn] = React.useState<Date | null>(null);
    const dateSelectRef = useRef(null);

    let minDate = new Date(dateDepart);
    const [isOneWay, setIsOneWay] = useState(true);
    //Convert to date-fns
    minDate = toDate(minDate);
    minDate = add(minDate, {days: 1});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setIsOpen((isOpen) => !isOpen);
        setAnchorEl(event.currentTarget);
    };
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    return (

        <ThemeProvider theme={darkTheme}>
        <div className={styles.buttonContainer} style={
            {

                paddingBottom: '1%',
            }
        }>

            <div className={styles.quicksearchwrapper}>
                <div className={styles.quicksearch} style={{
                    // Make the image more transparent
                    backgroundBlendMode: 'multiply',
                    width: '100%',
                    height: '100%',
                    backgroundPosition: 'bottom',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'

                }}>
                    <form
                        ref={formRef}
                        autoComplete="off"
                        className={styles.quicksearch__form}
                        style={{
                            background: 'rgba(0, 0, 0, 0.75)',
                    }
                        }
                    >
                        <div className={styles.quicksearch__aiport_box}>
                            <div className={styles.quicksearch__box}>
                                <Autocomplete
                                    className={styles.quicksearch__input}
                                    disablePortal
                                    options={items}
                                    defaultValue={props.from}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            name={"from"}
                                            defaultValue={props.from}
                                            label="Departing from..."
                                            id={"from"}
                                            sx={{
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




                                            }}                                            InputLabelProps={{
                                                style: {
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",

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
                                    defaultValue={props.to}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField
                                        {...params}
                                        name={"to"}
                                        defaultValue={props.to}
                                        id={"to"}
                                        label={"Arriving at..."}



                                        sx={{
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




                                        }}                                        InputLabelProps={{
                                            style: {
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                            },
                                        }}
                                    />}

                                />

                            </div>
                        </div>

                        <div className={styles.quicksearch__aiport_box} id={"banner"}>

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
                                            defaultValue={props.departure}
                                            id={"tripStart"}
                                            label={"Leaving"}
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
                                </div>
                                <div className={styles.quicksearch__date__box}>
                                    <DatePicker
                                        label="Returning on"
                                        inputFormat="YYYY-MM-DD"
                                        value={dateReturn}
                                        minDate={minDate}

                                        onChange={(newValue) => {
                                            setDateReturn(newValue);
                                        }}
                                        renderInput={(params) => <TextField
                                            {...params}
                                            name={"tripEnd"}
                                            className={styles.datePicker}
                                            defaultValue={props.returnDate}
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
                                                    textAlign: "center",
                                                },
                                            }}
                                        />}
                                        className={styles.date__select}
                                    />


                                </div>
                                </LocalizationProvider>

                            <Grid sx={
                                        {
                                            display: "flex",
                                            height: "3.5rem",
                                            marginRight: "1rem",
                                        }
                                    }>


                                        <FormControlLabel
                                            className={styles.quicksearch__checkbox}
                                            control={
                                                <Checkbox
                                                    value={isOneWay}
                                                    onChange={(event) => { setIsOneWay(event.target.checked) }}
                                                    style={{ color: 'white', fontSize: '14px',  height: "100%"}}
                                                />
                                            }
                                            label="One way"
                                            labelPlacement="start"
                                            style={{     color: "rgba(255, 255, 255, 0.75)"
                                                , fontSize: '14px',
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                whiteSpace: "nowrap",
                                                borderRadius: "5px",
                                                textAlign: "center",
                                                padding: "0 0.5rem",

                                            }}

                                        />
                                    </Grid>


                        </div >
                    </form>
                    <div className={styles.quicksearch__button__box}>
                        <Button className={styles.quicksearch__button}  onClick={handleSubmit}>
                            Search
                        </Button>
                        <Button endIcon={<ArrowDropDownIcon />}
                                className={styles.button}
                                variant={"outlined"}
                                style={
                                    {
                                        background: "rgba(0, 0, 0, 0.5)",
                                        color : "white",
                                    }
                                }
                                onClick={() =>
                                    setIsOpen(!isOpen)}>More</Button>
                    </div>



            <Collapse in={isOpen} sx={
                {
                    mt: 2,
                    backgroundColor: "rgba(0,0,0,0.75)",
                    borderRadius: "10px",
                }
            }>
        <form
            ref={formRef1}
        className={styles.filters}
        >
            <FormControl sx={
                {
                    ml: 2,
                }
            }>
                <InputLabel id="stops-label">Stops</InputLabel>
                <Select
                    labelId="stops-label"
                    id="stops-select"
                    value={selectedStops}
                    label="Stops"
                    onChange={(event: SelectChangeEvent) => {
                        setSelectedStops(event.target.value as unknown as number);
                    }
                    }
                >
                    {filters.stops.map((stop) => (
                        <MenuItem key={stop.value} value={stop.value}>
                            {stop.label}
                        </MenuItem>
                    ))}
                </Select>

            </FormControl>
            <FormControl sx={
                    {
                    minWidth: 120,
                        ml: 2,
                        mb: 2,
                    }

            }>
                <InputLabel id="sort-label">Airlines</InputLabel>
                <Select

                labelId="airlines-label"
                id="airlines-select"
                multiple={true}
                label={"Airlines"}
                value={selectedAirlines}
                renderValue={(selected) => (selected as string[]).join(', ')}
                onChange={handleChangeAirlines}
            >
{filters.airlines.map((airline) => (
    <MenuItem key={airline.value} value={airline.value}>
        <Checkbox checked={selectedAirlines.includes(airline.value)} />
        <ListItemText primary={airline.label} />
    </MenuItem>
))}
</Select></FormControl>
            <FormControl>

            </FormControl>
            <FormControl sx={
                {
                    minWidth: 120,
                    ml: 2,
                    mb: 2,
                }
            }>
                <TextField
                    variant={"outlined"}
                    id="price-range"
                    value={displayPriceRange}
                    onChange={handleSliderChange}
                    label={"Price"}
                    className={styles.priceInput}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <Slider
                    min={0}
                    defaultValue={1500}
                    max={1500}
                    step={100}
                    value={selectedPriceRange}
                    valueLabelDisplay="auto"
                    onChange={handleSliderChange}

                />

            </FormControl>
            <FormControl sx={
                {ml: 2,
                mb: 2,


                }

            }>
                <InputLabel id="times-label">Times</InputLabel>
                <Select
                    labelId="times-label"
                    id="times-select"
                    label={"Times"}
                    value={selectedTimes}

                    onChange={(event) => setSelectedTimes(event.target.value)}
                >
                    {filters.times.map((time) => (
                        <MenuItem key={time.value} value={time.value}>
                            {time.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={
                {
                ml: 2,
                mb: 2,
                }
            }>
                <InputLabel id="duration-label">Passengers</InputLabel>
                <Select

                    labelId="counter-select-label"
                    label={"Passengers"}
                    id="passengers"
                    value={selectedValue}
                    renderValue={(value) => "Children: " + childrenCount + ", Adults: " + adultsCount}
                    defaultValue={selectedValue}
                    onChange={handleChange}
                >
                    <MenuItem value="children">
                        Children: {childrenCount}
                        <Button onClick={decrementChildrenCount}>-</Button>
                        <Button onClick={incrementChildrenCount}>+</Button>
                    </MenuItem>
                    <MenuItem value="adults">
                        Adults: {adultsCount}
                        <Button onClick={decrementAdultsCount}>-</Button>
                        <Button onClick={incrementAdultsCount}>+</Button>
                    </MenuItem>

                </Select>


            </FormControl>


        </form>
            </Collapse>
        </div>
        </div>
        </div>
        </ThemeProvider>
    );
}


