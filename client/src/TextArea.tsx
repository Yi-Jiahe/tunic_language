import React, { useState } from 'react';
import Rune from './Rune';

export default function TextArea() {
    const [inputText, setInputText] = useState("");

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        fetch("https://tunic-language-zic4jhgpva-as.a.run.app/to-runes", {
            method: 'POST',
            body: JSON.stringify({
                'input': inputText
            })
        }).then((response) => {
            console.log(response);
        });

        console.log("Submitted", inputText);
    }

    return (
        <>
            <div>
                <Rune segments={new Set([1, 2, 3, 4])} />
                <Rune segments={new Set([3, 8, 11])} />
                <Rune segments={new Set([1, 3, 5, 7, 9, 11])} />
                <Rune segments={new Set([2, 4, 6, 8, 10, 12])} />
            </div>
            <form onSubmit={onSubmit}>
                <input name="input" value={inputText} onChange={(event) => { setInputText(event.target.value) }} />
                <input type="submit" value="Submit" />
            </form>
        </>

    )
}