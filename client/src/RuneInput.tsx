import  React, { useState }  from 'react';
import './RuneInput.css';
import Rune from './Rune';

export default function RuneInput() {
    const [pointerIsDown, SetPointerIsDown] = useState(false);
    const [lastPoint, setLastPoint] = useState<number>();

    const pointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!e.isPrimary) return;

        console.log('onPointerDown');
        
        SetPointerIsDown(true);
        setLastPoint(undefined);
    };

    const pointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!e.isPrimary) return;
        if (!pointerIsDown) return;
        if (!(e.target instanceof HTMLDivElement)) return;

        const localX = e.clientX - e.target.offsetLeft;
        const localY = e.clientY - e.target.offsetTop;

        console.log('onPointerMove', localX, localY);
    };

    const pointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!e.isPrimary) return;

        console.log('onPointerUp');
        
        SetPointerIsDown(false);
        setLastPoint(undefined);
    }

    return (<div id="rune-input"
        onPointerEnter={e => console.log('onPointerEnter')}
        onPointerLeave={e => console.log('onPointerLeave')}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}

        onTouchStart={e => console.log('onTouchStart')}
        onTouchMove={e => console.log('onTouchMove')}
        onTouchEnd={e => console.log('onTouchEnd')}
        onTouchCancel={e => console.log('onTouchCancel')}
    >
        <Rune />
    </div>);
}