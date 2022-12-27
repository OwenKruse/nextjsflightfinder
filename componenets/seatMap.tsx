import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import styles from '../styles/seatMap.module.scss';
const SeatMap = ({ data }) => {

    const [selectedSeats, setSelectedSeats] = useState([]);
    const handleSeatSelection = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };
    const seatClassName = (seat) => {
        if (seat.available_services.length > 0) {
            return 'styles.available';
        }
        if (selectedSeats.includes(seat)) {
            return 'styles.selected';
        }
        return '';
    }

    return (
        <div className={styles.seatMap}>
            {data.map((cabin) => (
                <div className={styles.cabin} key={cabin.cabin_class}>
                    <div className={styles.cabinClass}>{cabin.cabin_class}</div>
                    {cabin.rows.map((row) => (
                        <div className={styles.row} key={row.sections[0].elements[0].designator}>
                            {row.sections.map((section) => (
                                <div className={styles.section} key={section.elements[0].designator}>
                                    {section.elements.map((seat) => (
                                        <div
                                            className={seatClassName(seat)}
                                            key={seat.designator}
                                            onClick={() => handleSeatSelection(seat)}
                                        >
                                            {seat.designator}
                                            {seat.available_services.length > 0 && (
                                                <div className={styles.seatAvailable}>
                                                    Available ({seat.available_services[0].total_amount} {seat.available_services[0].total_currency})
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
            {selectedSeats.length > 0 && (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h6">Selected seats:</Typography>
                        <ul>
                            {selectedSeats.map((seat) => (
                                <li key={seat.designator}>{seat.designator}</li>
                            ))}
                        </ul>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default SeatMap;
