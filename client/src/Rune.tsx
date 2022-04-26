import React from 'react';
import './Rune.css';

const scale = 1;

const X = scale * 10 * Math.sqrt(2);
const Y = scale * 10 * 1;
const marginTop = 1;
const marginLeft = 1;
const points = [
    // Top Diamond
    [2 * X, 0.5 * Y],
    [X, 0],
    [0, 0.5 * Y],
    [X, Y],
    // Bottom Diamond
    [2 * X, 2.5 * Y],
    [X, 2 * Y],
    [0, 2.5 * Y],
    [X, 3 * Y],
    // Middle Line
    [2 * X, 1.5 * Y],
    [X, 1.5 * Y],
    [0, 1.5 * Y],
    // Points for segment 3
    [marginLeft, 0.5 * Y],
    [marginLeft, 1.5 * Y],
    [marginLeft, 2 * Y],
    [marginLeft, 2.5 * Y],
]

interface LineProps {
    start: number,
    end: number,
};

function Line(props: LineProps) {
    return (
        <line
            x1={points[props.start][0]}
            y1={points[props.start][1] + marginTop}
            x2={points[props.end][0]}
            y2={points[props.end][1] + marginTop} />
    );
}

interface RuneProps {
    segments: Set<number>,
    title?: string
}

export default function Rune(props: RuneProps) {
    return (
        <svg width={2 * X} height={3.5 * Y + 2 * marginTop}>
            {
                props.title && <title>{props.title}</title>
            }
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
                    <g><Line start={11} end={12} /><Line start={13} end={14} /></g>
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
                <circle cx={points[7][0]} cy={points[7][1] + scale * 2.5 + marginTop} r={scale * 2.5} />
            }


        </svg>);
}