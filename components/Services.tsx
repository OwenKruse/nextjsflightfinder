import {Duffel} from "@duffel/api";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Checkbox} from "@mui/material";
import Typography from "@mui/material/Typography";


export default function Services({ available_services }) {
    console.log(available_services);
    const [services, setServices] = useState([]);
    const [checked, setChecked] = useState([]);
    const router = useRouter();
    const { id } = router.query;

    function handleToggle(service) {
    return () => {
        const currentIndex = checked.indexOf(service.id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(service.id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        console.log(newChecked);
    }
}


    return (
        <div>
            <h1>Available Services</h1>
            <List>
                {available_services.map((service) => (
                    <ListItem key={service.id} role={undefined} dense onClick={handleToggle(service)}>
                        <Typography variant="body2" id={service.id} gutterBottom>
                            {service.metadata.type === "meal" && ` - ${service.metadata.meal_type}`
                            }
                            {service.metadata.type === "seat" && ` - ${service.metadata.seat_type}`
                            }
                            {service.metadata.type === "baggage" && ` - ${service.metadata.baggage_type}`
                            }
                            {service.metadata.type === "priority" && ` - ${service.metadata.priority_type}`
                            }
                            {service.metadata.type === "lounge" && ` - ${service.metadata.lounge_type}`
                            }
                            {service.metadata.type === "other" && ` - ${service.metadata.other_type}`
                            }
                            {service.total_amount && ` - ${service.total_amount} ${service.total_currency}`}
                        </Typography>
                        <Checkbox
                            edge="start"
                            checked={checked.indexOf(service.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': service.type }}
                        />
                        <ListItemText id={service.id} primary={service.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}
