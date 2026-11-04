import { useState } from "react";

export default function Counter() {
    const [number, setNumber] = useState(0);

    return (
        <>
            <h1>Count: {number}</h1>
            <button 
                onClick={(e) => {
                    setNumber(n => n + 1); // currentState + 1
                    setNumber(n => n + 1); 
                    setNumber(n => n + 1); 
                    setNumber(number + 1);
                }}
            >+3</button>
        </>
    );
}