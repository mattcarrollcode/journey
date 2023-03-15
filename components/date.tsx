'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation';


export function Start() {
    const router = useRouter();
    const { today, nextWeek } = getInitDates()
    const [start, setStart] = useState(today);
    const [end, sendEnd] = useState(nextWeek);
    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();
    const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStart(e.target.value);
    }
    const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnd(e.target.value);
    }
    const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrigin(e.target.value);
    }
    const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDestination(e.target.value);
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('hi')
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        console.log({ method: form.method, body: formData })
        try {
            const response = await fetch('/api/create', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    start: start,
                    end: end,
                    origin: origin,
                    destination: destination,
                })
            });
            const row = await response.json();
            console.log(row.id);
            router.push(`/trips/${row.id}`)
        } catch (error) {
            console.error(error);
        }

    }

    return <>
        <h1>Journey</h1>
        <form method="POST" onSubmit={handleSubmit}>
            <label >Start date: </label>
            <input type="date" name="start" onChange={handleStartChange}
                defaultValue={start}
                min={today}
                max={end}
            />
            <br />
            <label >End date: </label>
            <input type="date" name="end" onChange={handleEndChange}
                defaultValue={end}
                min={start} />
            <br />
            <label >Origin: </label>
            <input name="origin" placeholder="Where are you coming from?" onChange={handleOriginChange} />
            <br />
            <label >Destination: </label>
            <input name="destination" placeholder="Where are you going?" onChange={handleDestinationChange} />
            <br />
            <input type="submit" value="Submit" />
        </form>
        <br />
        <br />
        <p><a href="/trips">Current trips</a></p>
    </>;
}

function getInitDates() {
    const now = new Date()
    const today = now.toISOString().split('T')[0]
    const inOneWeek = new Date()
    inOneWeek.setDate(inOneWeek.getDate() + 7);
    const nextWeek = inOneWeek.toISOString().split('T')[0]
    return { today, nextWeek }
}
