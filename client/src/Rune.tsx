import React from 'react';
import './Rune.css';

const scale = 1;

const X = scale * 20 * Math.sqrt(2);
const Y = scale * 20 * 1;
const marginLeft = 0;
const points = [
    // Top Diamond
    [marginLeft + 2 * X, 0.5 * Y],
    [marginLeft + X, 0],
    [marginLeft + 0, 0.5 * Y],
    [marginLeft + X, Y],
    // Bottom Diamond
    [marginLeft + 2 * X, 2.5 * Y],
    [marginLeft + X, 2 * Y],
    [marginLeft + 0, 2.5 * Y],
    [marginLeft + X, 3 * Y],
    // Middle Line
    [marginLeft + 2 * X, 1.5 * Y],
    [marginLeft + X, 1.5 * Y],
    [marginLeft + 0, 1.5 * Y],
    // Start of segment 3 below the midle line
    [marginLeft + 0, 2 * Y],
]

interface LineProps {
    start: number,
    end: number,
};

function Line(props: LineProps) {
    return (
        <line
            x1={points[props.start][0]}
            y1={points[props.start][1]}
            x2={points[props.end][0]}
            y2={points[props.end][1]} />
    );
}

interface RuneProps {
    segments: Set<number>,
}

export default function Rune(props: RuneProps) {
    return (
        <svg width={2 * X} height={3.5 * Y}>
            <g className="vowels">
                {
                    props.segments.has(1) &&
                    <Line start={0} end={1} />
                }
                {
                    props.segments.has(2) &&
                    <Line start={1} end={2} />
                }
                {
                    props.segments.has(3) &&
                    <g><Line start={2} end={10} /><Line start={11} end={6} /></g>
                }
                {
                    props.segments.has(4) &&
                    <Line start={6} end={7} />
                }
                {
                    props.segments.has(5) &&
                    <Line start={7} end={4} />
                }
            </g>

            <g className="consonants">
                {
                    props.segments.has(6) &&
                    <Line start={0} end={3} />
                }
                {
                    props.segments.has(7) &&
                    <Line start={1} end={9} />
                }
                {
                    props.segments.has(8) &&
                    <Line start={2} end={3} />
                }
                {
                    props.segments.has(9) &&
                    <Line start={6} end={5} />
                }
                {
                    props.segments.has(10) &&
                    <Line start={7} end={5} />
                }
                {
                    props.segments.has(11) &&
                    <Line start={4} end={5} />
                }
            </g>

            <Line start={8} end={10} />

            {
                props.segments.has(12) &&
                <circle cx={points[7][0]} cy={points[7][1] + scale * 5} r={scale * 5} />
            }


        </svg>);
}