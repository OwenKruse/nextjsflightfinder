import React, {useState} from 'react';
import {Grid} from '@mui/material';
import styles from '../styles/seatMap.module.scss';
import FlightClassIcon from '@mui/icons-material/FlightClass';
import LavatoryIcon from '@mui/icons-material/Wc';
import ExitIcon from '@mui/icons-material/ExitToApp';
function SeatMap({ data, offer, index }) {
    const handleSeatSelection = (seat) => {
            if (selectedSeats.includes(seat)) {

                setSelectedSeats(selectedSeats.filter((s) => s !== seat));
            } else {
                    setSelectedSeats([...selectedSeats, seat]);
            }
        };





    const [selectedSeats, setSelectedSeats] = useState([]);
    console.log(data)
    console.log(index)
    const cabin = data[index].cabins[0];
    const rows = cabin.rows;

    return (
        <div className={styles.seatMap}>
            <div className={styles.seatMapHeader}>
                <div className={styles.seatMapHeaderLeft}>
                    <FlightClassIcon className={styles.seatMapHeaderIcon} />
                    <span className={styles.seatMapHeaderTitle}>
                        Economy Class
                    </span>
                </div>
                <div className={styles.seatMapHeaderRight}>
                    <LavatoryIcon className={styles.seatMapHeaderIcon} />
                    <ExitIcon className={styles.seatMapHeaderIcon} />
                </div>
            </div>
            <Grid container spacing={1}>
                {rows.map((row) => {
                    return (
                        <Grid item xs={12} key={row.id}>
                            <div className={styles.seatMapRow}>
                                {row.sections.map((section) => {
                                    return (
                                        <div
                                            className={styles.seatMapSection}
                                            key={section.id}
                                        >
                                            {section.elements.map(
                                                (element) => {
                                                    return (
                                                        <div
                                                            className={
                                                                styles.seatMapElement
                                                            }
                                                            key={
                                                                element.id
                                                            }
                                                        >
                                                            {element.type ===
                                                            'seat' && element.available_services.length > 0 && !selectedSeats.includes(
                                                                element
                                                            ) ? (
                                                                <div
                                                                    className={
                                                                        styles.available
                                                                    }


                                                                    onClick={() =>
                                                                        handleSeatSelection(
                                                                            element
                                                                        )
                                                                    }
                                                                >
                                                                    <div
                                                                        className={
                                                                            styles.seatMapSeatDesignator
                                                                        }
                                                                    >
                                                                        {
                                                                            element.designator
                                                                        }
                                                                    </div>
                                                                </div>
                                                            ) : element.type ===
                                                              'seat' &&
                                                              selectedSeats.includes(
                                                                  element
                                                              ) ? (
                                                                <div
                                                                    className={
                                                                        styles.selected
                                                                    }
                                                                    onClick={() =>
                                                                        handleSeatSelection(
                                                                            element
                                                                        )
                                                                    }
                                                                >
                                                                    <div
                                                                        className={
                                                                            styles.seatMapSeatDesignator
                                                                        }
                                                                    >
                                                                        {
                                                                            element.designator
                                                                        }
                                                                    </div>
                                                                </div>
                                                            ) : element.type === 'seat' && element.available_services.length === 0 ? (
                                                                <div
                                                                    className={
                                                                        styles.seatMapSeat
                                                                    }
                                                                >
                                                                    <div
                                                                        className={
                                                                            styles.seatMapSeatDesignator
                                                                        }
                                                                    >
                                                                        {
                                                                            element.designator
                                                                        }
                                                                    </div>
                                                                </div>
                                                            ) : element.type ===
                                                                'lavatory' ? (
                                                                                                                                    <LavatoryIcon />
                                                            ) : element.type ===
                                                                'exit_row' ? (
                                                                <ExitIcon />
                                                            ) : element.type ===
                                                              'empty' ? (
                                                                <div
                                                                    className={
                                                                        styles.seatMapEmpty
                                                                    }
                                                                ></div>
                                                            ) : element.type ===
                                                              'bassinet' ? (
                                                                <div
                                                                    className={
                                                                        styles.seatMapBassinet
                                                                    }
                                                                ></div>
                                                            ) : (
                                                                <div
                                                                    className={
                                                                        styles.seatMapEmpty
                                                                    }
                                                                ></div>
                                                            )}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}


export default SeatMap;

