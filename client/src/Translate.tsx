import React, { useState, useRef } from 'react';
import './Translate.css';
import { RenderTokens } from './util';
import RuneKeyboard from './RuneKeyboard';


interface EnglishToTunicProps {
    endpoint: string
}

const EnglishToTunic = (props: EnglishToTunicProps) => {
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

    return (<div className='grid-container left-align'>
        <div className='grid-item english'>
            <textarea
                className="text-area"
                name="input"
                placeholder="Enter Text"
                spellCheck="true"
                onChange={handleDebounceSearch} />
        </div>
        <div className='grid-item tunic'>
            <div className="text-area">
                {
                    tokens.length === 0
                        ? <span className="placeholder">Translation</span>
                        : RenderTokens(tokens)
                }
            </div>
        </div>
    </div>);
}

const TunicToEnglish = () => {
    const [tokens, setTokens] = useState<([number[], string[]][])[]>([]);

    const handleSpace = (rune: Set<number>) => {
        if (tokens.length === 0) {
            setTokens([[[Array.from(rune), Array(rune.size).fill("")]]]);
            return;
        }

        const finishedTokens: ([number[], string[]][])[] = [
            ...tokens.slice(0, -1), 
            [
                ...Array.from(tokens[tokens.length-1]), 
                [Array.from(rune), Array(rune.size).fill("")]
            ]
        ]
        setTokens([...finishedTokens, []]);
    }

    const handleEnter = (rune: Set<number>) => {
        if (tokens.length === 0) {
            setTokens([[[Array.from(rune), Array(rune.size).fill("")]]]);
            return;
        }

        setTokens([
            ...tokens.slice(0, -1), 
            [
                ...Array.from(tokens[tokens.length-1]), 
                [Array.from(rune), Array(rune.size).fill("")]
            ]
        ]);
    }

    const handleBackspace = () => {
        if (tokens.length === 0) {
            return;
        }

        if (tokens[tokens.length-1].length === 0) {
            setTokens(tokens.slice(0, -1));
        } else {
            setTokens([
                ...tokens.slice(0, -1), 
                Array.from(tokens[tokens.length-1]).slice(0, -1)
            ]);
        }
    }

    return (
    <div><div className='grid-container left-align'>
        <div className='grid-item tunic'>
            <div className="text-area">
                {
                    tokens.length === 0
                        ? <span className="placeholder">Enter Text</span>
                        : RenderTokens(tokens)
                }
            </div>
        </div>
        <div className='grid-item english'>
            <textarea
                className="text-area"
                placeholder="Translation"
                disabled
            />
        </div>
    </div>
    <RuneKeyboard 
        handleSpace={handleSpace}
        handleBackspace={handleBackspace}
        handleEnter={handleEnter} />
    </div>);
}

interface TranslateProps {
    endpoint: string
}

export default function Tranalate(props: TranslateProps): JSX.Element {
    const [englishToTunic, toggleEnglishToTunic] = useState(true);

    return (
        <>
            <div style={{ display: "flex" }}>
                <div className="language-title">{englishToTunic ? "English": "Tunic"}</div>
                <button id="swap-languages-button" onClick={() => toggleEnglishToTunic((value) => !value)}>↹</button>
                <div className="language-title">{englishToTunic ? "Tunic": "English"}</div>
            </div>
            {englishToTunic ? 
                <EnglishToTunic endpoint={props.endpoint} /> :
                <TunicToEnglish />
            }
            <hr />
        </>
    );
}