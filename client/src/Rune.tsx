import React from 'react';
import './Rune.css';

import { X, Y, Points } from './consts';

interface RuneProps {
    className?: string,
    segments?: Set<number>,
    title?: string,
    fontSize?: number,
    drawPoints?: boolean
}

export default function Rune(props: RuneProps) {
    const fontSize = props.fontSize === undefined ? 10 : props.fontSize;
    const strokeWidth = fontSize * 1 / 5;
    const segment12Radius = fontSize * 1 / 4;
    const pointRadius = fontSize * 1 / 4;
    let points = Points.map((point) => [(point[0] + X) * fontSize + strokeWidth, (point[1] + 1.5 * Y) * fontSize + strokeWidth]);
    let width = 2 * X * fontSize;
    let height = 3.5 * Y * fontSize + 2 * (segment12Radius + strokeWidth);
    if (props.drawPoints) {
        points = points.map(point => [point[0] + strokeWidth, point[1] + pointRadius + strokeWidth]);
        width += 2 * (pointRadius + strokeWidth);
        height += (pointRadius + strokeWidth);
    }

    const line = (start: number, end: number, rounded?: boolean) => {
        return (
            <line
                x1={points[start][0]}
                y1={points[start][1]}
                x2={points[end][0]}
                y2={points[end][1]}
                strokeWidth={strokeWidth}
                strokeLinecap={rounded ? 'round' : 'butt'} />
        )
    }

    return (
        <svg className={props.className}
            width={width} height={height}>
            {props.title && 
                <title>{props.title}</title>
            }

            {
                // Divider line
                line(8, 10)
            }

            {props.drawPoints !== undefined &&
                <g>
                    {
                        (() => {
                            let circles = points.filter((_, i) => (i < 8) || i === 12)
                                .map((point) => {
                                    return (<circle
                                        cx={point[0]} cy={point[1]} r={pointRadius} strokeWidth={strokeWidth} className='point'
                                    />);
                                });
                            return circles;
                        })()
                    }

                </g>
            }

            {props.segments !== undefined &&
                <g className="segments">
                    <g className="vowels">
                        {props.segments.has(1) &&
                            line(0, 1)
                        }
                        {props.segments.has(2) &&
                            line(1, 2)
                        }
                        {props.segments.has(3) &&
                            <g>{line(2, 10)}{line(11, 6)}</g>
                        }
                        {props.segments.has(4) &&
                            line(6, 7)
                        }
                        {props.segments.has(5) &&
                            line(7, 4)
                        }
                    </g>

                    <g className="consonants">
                        {props.segments.has(6) &&
                            line(0, 3)
                        }
                        {props.segments.has(7) &&
                            line(1, 9)
                        }
                        {props.segments.has(8) &&
                            line(2, 3)
                        }
                        {props.segments.has(9) &&
                            line(6, 5)
                        }
                        {props.segments.has(10) &&
                            line(7, 5)
                        }
                        {props.segments.has(11) &&
                            line(4, 5)
                        }
                    </g>


                    {props.segments.has(12) &&
                        <circle
                            cx={points[12][0]}
                            cy={points[12][1]}
                            r={segment12Radius}
                            strokeWidth={strokeWidth}
                            className='segment-12'
                        />
                    }
                </g>
            }
        </svg>);
}

export { Points };