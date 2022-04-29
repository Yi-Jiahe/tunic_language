import React, { useState, useRef } from 'react';
import Rune from './Rune';
import RuneCanvas from './RuneCanvas';
import './TextArea.css';

export default function TextArea(): JSX.Element {
    const [tokens, setTokens] = useState([]);
    const timeout = useRef<NodeJS.Timeout>();
    const [modalHidden, setModalHidden] = useState(true);

    const handleDebounceSearch = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        clearTimeout(timeout.current as NodeJS.Timeout);

        timeout.current = setTimeout(() => {
            fetch("https://tunic-language-zic4jhgpva-as.a.run.app/to-runes", {
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

    const words = tokens.map((token: Array<[Array<number>, Array<string>]> | string, i) => {
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
            return <span key={i} className="punctuation">{token}</span>
        }
    });

    return (
        <>
            <div className='grid-container left-align'>
                <div className='grid-item english'>
                    <div className='language-header'>
                        <div className="language-title">English</div>
                    </div>
                    <textarea
                        className="text-area"
                        name="input"
                        placeholder="Enter Text"
                        spellCheck="true"
                        onChange={handleDebounceSearch} />
                </div>
                <div className='grid-item tunic'>
                    <div className='language-header'>
                        <div className="language-title">Tunic</div>
                        <button onClick={() => { setModalHidden(false); }}>Edit</button>
                    </div>
                    <div className="text-area">
                        {
                            tokens.length === 0
                                ? <span className="placeholder">Translation</span>
                                : words
                        }
                    </div>
                </div>
            </div>
            <hr />

            {
                modalHidden === false && <div className="modal">
                    <div className="modal-content">
                        <RuneCanvas
                            width={600}
                            height={400}
                            words={words} />
                        <button
                            onClick={() => { setModalHidden(true); }}>
                            Close
                        </button>
                    </div>
                </div>
            }
        </>

    )
}