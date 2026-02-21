import {createPortal} from 'react-dom';
import {useImperativeHandle, useRef} from "react";

export default function ResultModal({ref, targetTime, remainingTime, onReset}) {
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedTimeLeft = (remainingTime/1000).toFixed(2);
    const score =Math.round((1- formattedTimeLeft/targetTime) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    return createPortal(
        <dialog ref={dialog} className="result-modal">
            {userLost && <h2>You lost</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>The target time was <strong>{targetTime} second{targetTime>1? "s":""}.</strong></p>
            <p>You stopped the timer with <strong>{formattedTimeLeft} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button >Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
}