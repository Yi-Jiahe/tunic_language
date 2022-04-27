import React from 'react';
import './Rune.css';

const X = Math.sqrt(2);
const Y = 1;
const marginTop = 0.1;
const marginLeft = 0.1;
const Points = [
    // Top Diamond
    [2 * X, marginTop + 0.5 * Y],
    [X, marginTop],
    [0, marginTop + 0.5 * Y],
    [X, marginTop + Y],
    // Bottom Diamond
    [2 * X, marginTop + 2.5 * Y],
    [X, marginTop + 2 * Y],
    [0, marginTop + 2.5 * Y],
    [X, marginTop + 3 * Y],
    // Middle Line
    [2 * X, marginTop + 1.5 * Y],
    [X, marginTop + 1.5 * Y],
    [0, marginTop + 1.5 * Y],
    // Points for segment 3
    [marginLeft, marginTop + 0.5 * Y],
    [marginLeft, marginTop + 1.5 * Y],
    [marginLeft, marginTop + 2 * Y],
    [marginLeft, marginTop + 2.5 * Y],
]

interface RuneProps {
    segments: Set<number>,
    title?: string,
    fontSize?: number
}

export default function Rune(props: RuneProps) {
    const fontSize = props.fontSize === undefined ? 10 : props.fontSize;
    const strokeWidth = fontSize * 1 / 5;
    const points = Points.map((point) => [point[0] * fontSize, point[1] * fontSize]);

    const line = (start: number, end: number, rounded?: boolean) => {
        return (
            <line
                x1={points[start][0]}
                y1={points[start][1] + marginTop}
                x2={points[end][0]}
                y2={points[end][1] + marginTop}
                strokeWidth={strokeWidth}
                strokeLinecap={rounded ? 'round' : 'butt'} />
        )
    }

    return (
        <svg width={2 * X * fontSize} height={4 * Y * fontSize}>
            {
                props.title && <title>{props.title}</title>
            }
            <g className="vowels">
                {
                    props.segments.has(1) &&
                    line(0, 1)
                }
                {
                    props.segments.has(2) &&
                    line(1, 2)
                }
                {
                    props.segments.has(3) &&
                    <g>{line(11, 12)}{line(13, 14)}</g>
                }
                {
                    props.segments.has(4) &&
                    line(6, 7)
                }
                {
                    props.segments.has(5) &&
                    line(7, 4)
                }
            </g>

            <g className="consonants">
                {
                    props.segments.has(6) &&
                    line(0, 3)
                }
                {
                    props.segments.has(7) &&
                    line(1, 9)
                }
                {
                    props.segments.has(8) &&
                    line(2, 3)
                }
                {
                    props.segments.has(9) &&
                    line(6, 5)
                }
                {
                    props.segments.has(10) &&
                    line(7, 5)
                }
                {
                    props.segments.has(11) &&
                    line(4, 5)
                }
            </g>

            {line(8, 10)}

            {
                props.segments.has(12) &&
                <circle
                    cx={points[7][0]}
                    cy={points[7][1] + fontSize * (1/4 + marginTop)}
                    r={fontSize * 1 / 4} 
                    strokeWidth={strokeWidth}
                    />
            }
        </svg>);
}