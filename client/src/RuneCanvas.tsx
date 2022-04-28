import React, { useRef } from 'react';
import { renderToString } from 'react-dom/server'

interface RuneCanvasProps {
    width: number,
    height: number,
    words: Array<JSX.Element>
}

export default function RuneCanvas(props: RuneCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const ret = (
        <>
            <canvas
                ref={canvasRef}
                width={props.width}
                height={props.height}>
            </canvas>
        </>
    );

    if (!canvasRef.current) {
        return ret;
    }

    const canvas = canvasRef.current;

    const context = canvas.getContext('2d');
    if (!context) {
        return ret;
    }
    const URL = window.URL || window.webkitURL || window;

    const drawImage = () => {
        const image = new Image();

        // const blob = new Blob([renderToString(rune)] ,{type:'image/svg+xml;charset=utf-8'});
        // const blobURL = URL.createObjectURL(blob);
        // image.src = blobURL;

        context.drawImage(image, x, y, props.width, props.height );
        x += 100;
        y += 100;
    }


    let [x, y] = [0, 0];

    props.words.forEach((word) => {
        const parent = document.createElement("div");
        parent.innerHTML = renderToString(word);
        const child = parent.firstChild as Element;
        
        if (child.className === "word") {
            const runes = Array.from(child.children);
            for (let rune of runes) {
                console.log("rune", rune);
            }

        } else if (child.className === "punctuation"){
            console.log("punctuation", child.innerHTML);
        }
    })

    const png = canvas.toDataURL(); // default png
    const jpeg = canvas.toDataURL('image/jpg');
    const webp = canvas.toDataURL('image/webp');

    return ret;
}