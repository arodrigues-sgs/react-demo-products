import { useState } from "react";

export default function Counter() {
    const [number, setNumber] = useState(0);

    return (
        <>
            <h3>{number}</h3>
            <button
                onClick={() => {
                    setNumber(n => n + 1);
                    setNumber(n => n + 1);
                    setNumber(n => n + 1);
                    setNumber(number + 1);
                }}
            >+3</button>
        </>
    );
}