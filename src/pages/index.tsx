import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";

function Index() {
    const [date, setDate] = useState(null);
    const [date1, setDate1] = useState(null);
    const [date2, setDate2] = useState(null);

    useEffect(() => {
        const interval = setInterval(async () => {
            let response: { date: string } = await fetch(
                `//${window.location.host}/api/clock`
            ).then((res) => res.json());
            setDate(response.date);

            response = await fetch(
                `//${window.location.host}/api/clock1`
            ).then((res) => res.json());
            setDate1(response.date);

            response = await fetch(
                `//${window.location.host}/api/clock2`
            ).then((res) => res.json());
            setDate2(response.date);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <h1>Now Smart CDN test</h1>
            <p>Three endpoints are called every 1 second.</p>
            <p>Following headers are set for the Smart CDN:</p>
            <ul>
                <li>/api/clock: {date}</li>
                <li>Always return fresh data from backend.</li>
                <li>Cache-Control:</li>
            </ul>
            <ul>
                <li>/api/clock1: {date1}</li>
                <li>
                    Updates every 5 seconds. Hits cache until after 5 seconds.
                    Cache is then still being served until the backend resolves
                    and cache is replaced.
                </li>
                <li>
                    Cache-Control: max-age=0, s-maxage=5, stale-while-revalidate
                </li>
            </ul>
            <ul>
                <li>/api/clock2: {date2}</li>
                <li>
                    Updates every 10 seconds. Hits cache until after 10 seconds.
                    Cache is then still being served until the backend resolves
                    and cache is replaced.
                </li>
                <li>
                    Cache-Control: max-age=0, s-maxage=10,
                    stale-while-revalidate
                </li>
            </ul>
            <Footer />
        </>
    );
}

export default Index;
