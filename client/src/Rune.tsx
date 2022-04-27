import React from 'react';
import './Rune.css';

const X = Math.sqrt(2);
const Y = 1;
const marginTop = 1;
const marginLeft = 1;
const Points = [
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

interface RuneProps {
    segments: Set<number>,
    title?: string,
    fontSize?: number
}

export default function Rune(props: RuneProps) {
    const fontSize = props.fontSize === undefined ? 10 : props.fontSize;

    const points = Points.map((point) => [point[0] * fontSize, point[1] * fontSize])

    const line = (start: number, end: number, rounded?: boolean) => {
        return (
            <line
                x1={points[start][0]}
                y1={points[start][1] + marginTop}
                x2={points[end][0]}
                y2={points[end][1] + marginTop}
                strokeWidth={fontSize * 1/5}
                strokeLinecap={rounded ? 'round' : 'butt'} />
        )
    }

    return (
        <svg width={2 * X} height={3.5 * Y + 2 * marginTop}>
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
                    <g>{line(11, 12)}{line(13,14)}</g>
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
            
            line(8, 10)

            {
                props.segments.has(12) &&
                <circle cx={points[7][0]} cy={points[7][1] + fontSize * 2.5 + marginTop} r={fontSize * 2.5} />
            }
        </svg>);
}