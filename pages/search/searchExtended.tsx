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
export default function MyForm(props) {
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
    const { onSubmit } = props;
    let from = ""
    let to = ""
    let date = ""
    let returnDate = ""

    useEffect(() => {
        from = props.from
        to = props.to
        date = props.date
        returnDate = props.returnDate
}, [props.from, props.to, props.date, props.returnDate])
    async function handleSubmit(event) {
        await onSubmit();

            console.log("The props are:" + props);
            let combinedData = {
                from: from,
                to: to,
                date: date,
                returnDate: returnDate,
                stops: selectedStops,
                times: selectedTimes,
                airlines: selectedAirlines,
                priceRange: selectedPriceRange,
                childrenCount: childrenCount,
                adultsCount: adultsCount,
            }
            console.log(combinedData);
            router.push({
                pathname: '/search',
                query: combinedData,
            });
        }
    return (
        <div className={styles.buttonContainer} >
            <Button endIcon={<ArrowDropDownIcon />} className={styles.button} variant={"outlined"} onClick={() => setIsOpen(!isOpen)}>More Options</Button>
            <Collapse in={isOpen}>
        <form
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
            <div className={styles.quicksearch__button__box}>
                <button className={styles.quicksearch__button} type="submit" onClick={handleSubmit}>
                    Search
                </button>
            </div>
        </div>


    );
}
