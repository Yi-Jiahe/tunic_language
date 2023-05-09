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
    const [tokens, setTokens] = useState([]);

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
        onSpaceClick={e => {}}
        onBackspaceClick={e => {}}
        onEnterClick={e => {}} />
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
                <button onClick={() => toggleEnglishToTunic((value) => !value)}>↹</button>
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