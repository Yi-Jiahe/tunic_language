import React, { useState } from 'react';
import './RuneKeyboard.css';
import Rune from './Rune';

interface RuneInputProps {
    onSpaceClick: React.MouseEventHandler,
    onBackspaceClick: React.MouseEventHandler,
    onEnterClick: React.MouseEventHandler,
}


export default function RuneKeyboard(props: RuneInputProps) {
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

    const onUndoClick = () => {

    }

    return (
        <div id="rune-keyboard">
            <div>
                <div className="rune-input">
                    <Rune className='visual'
                        fontSize={30}
                        drawPoints />
                    <div className='input-capturer'
                        onPointerEnter={e => console.log('onPointerEnter')}
                        onPointerLeave={e => console.log('onPointerLeave')}

                        onPointerDown={pointerDown}
                        onPointerMove={pointerMove}
                        onPointerUp={pointerUp}

                        onTouchStart={e => console.log('onTouchStart')}
                        onTouchMove={e => console.log('onTouchMove')}
                        onTouchEnd={e => console.log('onTouchEnd')}

                        onTouchCancel={e => console.log('onTouchCancel')}
                    />
                </div>
                <button className='space-bar'
                    onClick={props.onSpaceClick}>⎵</button>
            </div>
            <div className='side-bar'>
                <button className='side-button'
                    onClick={props.onBackspaceClick}>←</button>
                <button className='side-button'
                    onClick={onUndoClick}>↻</button>
                <button className='side-button'
                    onClick={props.onEnterClick}>↩</button>
            </div>

        </div>);
}