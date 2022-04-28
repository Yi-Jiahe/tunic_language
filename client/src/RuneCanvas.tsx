import React from 'react';

interface RuneCanvasProps {
    width: number,
    height: number
}

export default function RuneCanvas(props: RuneCanvasProps) {
    return (
        <canvas
            width={props.width}
            height={props.height}>
        </canvas>
    )
}