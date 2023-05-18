import React, { useState, useEffect } from 'react';
import './Styles/CircleCounter.css';
import Cookies from "js-cookie";

const CircleCounter = () => {
    const [counter, setCounter] = useState(0);
    const [circleStroke, setCircleStroke] = useState('0 283');
    const [count, setCount] = useState();
    const [maxCount, setMaxCount] = useState();
    const warningThreshold = (maxCount%80); // Ajuste esse valor conforme necessário

    useEffect(() => {
        const percent = (counter / maxCount) * 100;
        const strokeLength = (percent * 283) / 100;
        setCircleStroke(`${strokeLength} 283`);
    }, [counter]);

    const incrementCounter = () => {
        if (counter < maxCount) {
            setCounter(counter + 1);
        }
    };

    useEffect(() => {
        fetch(`https://gateway-d6c99606-f18c-11ed-a05b-0242ac120003.up.railway.app/api/pay/find`,
            {
                method: 'GET',
                headers: {
                    "Authorization": Cookies.get("Authorization"),
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
            return res.json();
        }).then((res) => {
                console.log(res);
                setCounter(res.data.maxInteractions - res.data.interactions)
                setMaxCount(res.data.maxInteractions);
                setCount(res.data.interactions);

            }
        ).catch((err) => {
            console.log(err);
        })
    }, []);

    const circleColor = counter >= warningThreshold ? 'red' : '#077ddd';

    return (
        <div className="circle-counter">
            <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="circle-bg" />
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className="circle-fg"
                    style={{ strokeDasharray: circleStroke, stroke: circleColor }}
                />
            </svg>
            <div className="counter-value" onClick={incrementCounter}>
                {counter}
            </div>
            <h4>
                Interações restantes: <span>{count}</span>
            </h4>

        </div>
    );
};

export default CircleCounter;