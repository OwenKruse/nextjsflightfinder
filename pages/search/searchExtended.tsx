import {
    Button,
    Checkbox, Collapse,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent, Slider, TextField
} from '@mui/material';
import {ChangeEvent, useEffect, useState} from "react";
import styles from "./searchExtended.module.scss";
import { useRouter } from "next/router";
import * as React from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Autocomplete } from "@mui/material";
import {useRef} from "react";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';import {DatePicker, DesktopDatePicker} from "@mui/x-date-pickers";
import {useTheme} from "@mui/material";
import { alpha } from '@mui/material/styles';

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



export default function MyForm(props) {

    function todayDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();

        return yyyy + "-" + mm + "-" + dd;
    }
    const date = useRef(todayDate());


    function maxDate(){
        const formData = new FormData(formRef.current);

        let tripStart = formData.get("tripStart");
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
    const [formState, setFormState] = useState({});




    const formRef = useRef(null);

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
        console.log(selectedValues);

        // Check all values are selected
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
        let formData1= new FormData(formRef1.current);
        let combinedData = {
            from: formData.get('from'),
            to: formData.get('to'),
            date: formData.get('tripStart'),
            returnDate: formData1.get('tripEnd'),
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
            }
        });
    }
    const theme = useTheme();
    const [dateDepart, setDateDepart] = React.useState<Date | null>(null);
    const [dateReturn, setDateReturn] = React.useState<Date | null>(null);
    return (
        <div className={styles.buttonContainer} >
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
                            background: alpha(theme.palette.background.default, 0.75),
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
                                        name={"tripStart"}
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
                                        sx={{ textAlign: "center", }}
                                        className={styles.date__select}
                                    />

                                    <DatePicker
                                        label="Returning on"
                                        inputFormat="YYYY-MM-DD"
                                        value={dateReturn}
                                        maxDate={maxDate}
                                        minDate={new Date()}
                                        onChange={(newValue) => {
                                            setDateReturn(newValue);
                                        }}
                                        renderInput={(params) => <TextField
                                            {...params}
                                            name={"tripEnd"}
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
                                                },
                                            }}
                                        />}
                                        className={styles.date__select}
                                    />
                                </div>
                                </LocalizationProvider>

                            </div>
                        </div>
                    </form>
                    <div className={styles.quicksearch__button__box}>
                        <button className={styles.quicksearch__button} type="submit" onClick={handleSubmit}>
                            Search
                        </button>
                    </div>


            <Button endIcon={<ArrowDropDownIcon />}
                    className={styles.button}
                    variant={"outlined"}
                    onClick={() =>
                    setIsOpen(!isOpen)}>More Options</Button>
            <Collapse in={isOpen} sx={
                {
                    mt: 2,
                    background: alpha(theme.palette.background.default, 0.75),
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
    );
}


