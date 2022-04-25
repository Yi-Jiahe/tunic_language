import React, { useState } from 'react';
import Rune from './Rune';
import './TextArea.css';

export default function TextArea() {
    const [inputText, setInputText] = useState("");
    const [tokens, setTokens] = useState([]);

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        fetch("https://tunic-language-zic4jhgpva-as.a.run.app/to-runes", {
            method: 'POST',
            body: JSON.stringify({
                'input': inputText
            })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log("Response body", data)
            const parsedBody = JSON.parse(data["body"]);
            console.log("Parsed body", parsedBody);

            setTokens(parsedBody["runes"]);
        });

        console.log("Submitted:", inputText);
    }

    return (
        <>
            <div>
                {
                    tokens.map((token: Array<[Array<number>, Array<string>]> | string, i) => {
                        if (Array.isArray(token)) {
                            return (
                                <span key={i} className="word">
                                    {
                                        token.map((rune: [Array<number>, Array<string>], j) => {
                                            return <Rune key={`${i}, ${j}`} title={rune[1].join("")} segments={new Set(rune[0])}/>
                                        })
                                    }
                                </span>
                            );
                        } else {
                            return <span key={i}>{token}</span>
                        }
                    })
                }
            </div>
            <form onSubmit={onSubmit}>
                <textarea name="input" value={inputText} onChange={(event) => { setInputText(event.target.value) }} />
                <input type="submit" value="Submit" />
            </form>
        </>

    )
}