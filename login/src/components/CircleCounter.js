import React, { useState, useEffect } from 'react';
import './Styles/CircleCounter.css';
import Cookies from "js-cookie";

const CircleCounter = () => {
    const [counter, setCounter] = useState([0, 0]);
    const [circleStrokes, setCircleStrokes] = useState(['0 283', '0 283', '0 283']);
    const [counts, setCounts] = useState();
    const [maxCounts, setMaxCounts] = useState();
    const warningThreshold = (maxCounts * 0.2); // 80% do valor máximo

    useEffect(() => {
        counter.forEach((counter, i) => {
            const percent = (counter / maxCounts) * 100;
            const strokeLength = (percent * 283) / 100;
            setCircleStrokes(prevStrokes => {
                let newStrokes = [...prevStrokes];
                newStrokes[i] = `${strokeLength} 283`;
                return newStrokes;
            });
        });
    }, [counter]);

    const incrementCounter = (i) => {
        setCounter(prevCounter => {
            let newCounter = [...prevCounter];
            if (newCounter[i] < maxCounts) {
                newCounter[i]++;
            }
            return newCounter;
        });
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
                setCounter(prevCounter => {
                    let newCounter = [...prevCounter];
                    newCounter[0] = res.data.maxInteractions
                    newCounter[1] = res.data.maxInteractions - res.data.interactions
                    return newCounter;
                });
                setMaxCounts(res.data.maxInteractions);
                setCounts(res.data.interactions);

            }
        ).catch((err) => {
            console.log(err);
        })
    }, []);

    const circleColors = counter.map((counter, i) => {
        if (i === 0) {
            return '#251a8f';
        } else {
            return counts <= warningThreshold ? '#bf291f' : '#251a8f';
        }
    });

    return (
        <section className="container">
            {counter.map((counter, i) => (
                <div key={i} className="circle-counter">
                    <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" className="circle-bg" />
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            className="circle-fg"
                            style={{ strokeDasharray: circleStrokes[i], stroke: circleColors[i] }}
                        />
                    </svg>
                    <div className="counter-value">
                        {counter}
                    </div>
                    <h4>
                        {i === 0 ? 'Número máximo de interações: ' : 'Interações restantes: '}
                        <span>{i === 0 ? maxCounts : counts}</span>
                    </h4>
                </div>
            ))}
        </section>

    );
};

export default CircleCounter;
