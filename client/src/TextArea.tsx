import React, { useState, useRef } from 'react';
import Rune from './Rune';
import './TextArea.css';

interface TextAreaProps {
    endpoint: string
}

export default function TextArea(props: TextAreaProps): JSX.Element {
    const [tokens, setTokens] = useState([]);
    const timeout = useRef<NodeJS.Timeout>();

    const handleDebounceSearch = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        clearTimeout(timeout.current as NodeJS.Timeout);

        timeout.current = setTimeout(() => {
            fetch(`${props.endpoint}/to-runes`, {
                method: 'POST',
                body: JSON.stringify({
                    'input': event.target.value
                })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log("Response body", data)
                const parsedBody = JSON.parse(data["body"]["runes"]);
                console.log("Parsed body", parsedBody);

                setTokens(parsedBody);
            });
        }, 600)
    }

    return (
        <>
            <div className='grid-container left-align'>
                <div className='grid-item english'>
                    <div className="language-title">English</div>
                    <textarea
                        className="text-area"
                        name="input"
                        placeholder="Enter Text"
                        spellCheck="true"
                        onChange={handleDebounceSearch} />
                </div>
                <div className='grid-item tunic'>
                    <div className="language-title">Tunic</div>
                    <div className="text-area">
                        {
                            tokens.length === 0
                                ? <span className="placeholder">Translation</span>
                                : tokens.map((token: Array<[Array<number>, Array<string>]> | string, i) => {
                                    if (Array.isArray(token)) {
                                        return (
                                            <span key={i} className="word">
                                                {
                                                    token.map((rune: [Array<number>, Array<string>], j) => {
                                                        return (
                                                            <Rune key={`${i}, ${j}`}
                                                                title={rune[1].join("")}
                                                                segments={new Set(rune[0])} />);
                                                    })
                                                }
                                            </span>
                                        );
                                    } else {
                                        return <span key={i} className="puncuation">{token}</span>
                                    }
                                })
                        }
                    </div>
                </div>
            </div>
            <hr />
        </>

    )
}