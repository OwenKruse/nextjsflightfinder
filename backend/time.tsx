import moment from 'moment';
import momenttz from "moment-timezone";
interface TimeObject {
    origin?: {
        originTimeZone: string;
        departing_at: string;
    };
    destination?: {
        destinationTimeZone: string;
        arriving_at: string;
    };
    duration?: {
        duration: number;
        timeZoneDifference: number;
    };
    tripTime?: {
        timeZoneDuration: number;
        totalFlightTime: number;
        totalLayoverTime: number;
    };
}
const Time = (Slices:any) => {
    console.log(Slices);
    let timeSlices = [];
    //Check if slices is an array or an object
    if (Array.isArray(Slices)) {
        for (const slice of Slices) {
            let times = [];
            for (const segment of slice.segments) {
                let time: TimeObject = {};  // Initialize an empty object with the TimeObject type
                time.origin = {  // Add properties to the object
                    "originTimeZone": segment.origin.time_zone,
                    "departing_at": segment.departing_at,
                }
                time.destination = {
                    "destinationTimeZone": segment.destination.time_zone,
                    "arriving_at": segment.arriving_at,
                }
                const tz1 = momenttz.tz(segment.departing_at, segment.origin.time_zone);
                const tz2 = momenttz.tz(segment.arriving_at, segment.destination.time_zone);

                time.duration = {
                    "duration": moment.duration(segment.duration).asMinutes(),
                    "timeZoneDifference" : tz1.utcOffset() - tz2.utcOffset(),
                }
                times.push(time);
            }
            timeSlices.push(times);

            if (slice.segments.length === 1) {
                const tz1 = momenttz.tz(slice.segments[0].departing_at, slice.segments[0].origin.time_zone);
                const tz2 = momenttz.tz(slice.segments[0].arriving_at, slice.segments[0].destination.time_zone);
                let timeZoneDuration = moment(slice.segments[0].arriving_at).diff(moment(slice.segments[0].departing_at), 'minutes');
                times[0].tripTime = {
                    "timeZoneDuration" : timeZoneDuration + (tz1.utcOffset() - tz2.utcOffset()),
                    "totalFlightTime" : moment.duration(slice.segments[0].duration).asMinutes(),
                    "totalLayoverTime" : 0,
                }
            }
            if (slice.segments.length === 2) {
                const tz1 = momenttz.tz(slice.segments[0].departing_at, slice.segments[0].origin.time_zone);
                const tz2 = momenttz.tz(slice.segments[slice.segments.length -1].arriving_at, slice.segments[slice.segments.length -1].destination.time_zone);
                let timeZoneDuration = moment(slice.segments[slice.segments.length -1].arriving_at).diff(moment(slice.segments[0].departing_at), 'minutes');
                times[0].tripTime = {
                    "timeZoneDuration" : timeZoneDuration + (tz1.utcOffset() - tz2.utcOffset()),
                    "totalFlightTime" : moment.duration(slice.segments[0].duration).asMinutes() + moment.duration(slice.segments[1].duration).asMinutes(),
                    "totalLayoverTime" : moment(slice.segments[1].departing_at).diff(moment(slice.segments[0].arriving_at), 'minutes'),
                }
            }
            timeSlices.push(times);
        }
    } else {
        let times = [];
        for (const segment of Slices.segments) {
            let time: TimeObject = {};  // Initialize an empty object with the TimeObject type
            time.origin = {  // Add properties to the object
                "originTimeZone": segment.origin.time_zone,
                "departing_at": segment.departing_at,
            }
            time.destination = {
                "destinationTimeZone": segment.destination.time_zone,
                "arriving_at": segment.arriving_at,
            }
            const tz1 = momenttz.tz(segment.departing_at, segment.origin.time_zone);
            const tz2 = momenttz.tz(segment.arriving_at, segment.destination.time_zone);

            time.duration = {
                "duration": moment.duration(segment.duration).asMinutes(),
                "timeZoneDifference" : tz1.utcOffset() - tz2.utcOffset(),
            }
            times.push(time);
        }
        timeSlices.push(times);

        if (Slices.segments.length === 1) {
            const tz1 = momenttz.tz(Slices.segments[0].departing_at, Slices.segments[0].origin.time_zone);
            const tz2 = momenttz.tz(Slices.segments[0].arriving_at, Slices.segments[0].destination.time_zone);
            let timeZoneDuration = moment(Slices.segments[0].arriving_at).diff(moment(Slices.segments[0].departing_at), 'minutes');
            times[0].tripTime = {
                "timeZoneDuration" : timeZoneDuration + (tz1.utcOffset() - tz2.utcOffset()),
                "totalFlightTime" : moment.duration(Slices.segments[0].duration).asMinutes(),
                "totalLayoverTime" : 0,
            }
        }
        if (Slices.segments.length === 2) {
            const tz1 = momenttz.tz(Slices.segments[0].departing_at, Slices.segments[0].origin.time_zone);
            const tz2 = momenttz.tz(Slices.segments[Slices.segments.length - 1].arriving_at, Slices.segments[Slices.segments.length - 1].destination.time_zone);
            let timeZoneDuration = moment(Slices.segments[Slices.segments.length - 1].arriving_at).diff(moment(Slices.segments[0].departing_at), 'minutes');
            times[0].tripTime = {
                "timeZoneDuration": timeZoneDuration + (tz1.utcOffset() - tz2.utcOffset()),
                "totalFlightTime": moment.duration(Slices.segments[0].duration).asMinutes() + moment.duration(Slices.segments[1].duration).asMinutes(),
                "totalLayoverTime": moment(Slices.segments[1].departing_at).diff(moment(Slices.segments[0].arriving_at), 'minutes'),
            }
        }
        timeSlices.push(times);

    }

    console.log(timeSlices);
    return timeSlices;
}

export default Time;
