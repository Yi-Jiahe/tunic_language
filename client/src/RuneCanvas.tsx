import React, { useEffect, useRef, useState } from 'react';
import { renderToString } from 'react-dom/server'
import './RuneCanvas.css';

interface RuneCanvasProps {
    width: number,
    height: number,
    words: Array<JSX.Element>
}

export default function RuneCanvas(props: RuneCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [png, setPng] = useState<string>();
    const [images, setImages] = useState<Array<HTMLImageElement>>([]);
    const [svg, setSvg] = useState<Element>();
    const [imgSrc, setImgSrc] = useState<string>();

    useEffect(() => {
        if (!canvasRef.current) {
            console.log("canvasRef === null");
            return;
        }

        const canvas = canvasRef.current;

        const context = canvas.getContext('2d');
        if (!context) {
            console.log("context === null");
            return;
        }

        let [x, y] = [0, 0];
        const drawImage = (image: CanvasImageSource) => {
            console.log("Drawing", image);

            context.drawImage(image, x, y, props.width, props.height);
            // x += 1;
            // y += 1;
        }

        const URL = window.URL || window.webkitURL || window;

        const images: Array<HTMLImageElement> = [];

        props.words.forEach((word) => {
            const parent = document.createElement("div");
            parent.innerHTML = renderToString(word);
            const child = parent.firstChild as Element;

            if (child.className === "word") {
                const runes = Array.from(child.children);
                for (let rune of runes) {
                    console.log("rune", rune);
                    setSvg(rune);

                    const image = new Image();

                    var xml = new XMLSerializer().serializeToString(rune);
                    var svg64 = btoa(xml);
                    var b64Start = 'data:image/svg+xml;base64,';
                    
                    // prepend a "header"
                    var image64 = b64Start + svg64;
                    image.src = image64;

                    setImgSrc(image64);

                    // const blob = new Blob([rune.innerHTML], { type: 'image/svg+xml;charset=utf-8' });
                    // const blobURL = URL.createObjectURL(blob);
                    // image.src = blobURL;
                    // setImgSrc(blobURL);

                    images.push(image);

                    drawImage(image);
                }

            } else if (child.className === "punctuation") {
                console.log("punctuation", child.innerHTML);
            }
        })

        setPng(canvas.toDataURL()); // default png
        setImages(images);
        const jpeg = canvas.toDataURL('image/jpg');
        const webp = canvas.toDataURL('image/webp');    
    }, [])

    return (
        <div>   
            <canvas
                ref={canvasRef}
                width={props.width}
                height={props.height}>
                    <foreignObject>
                        {props.words}
                    </foreignObject>
            </canvas>     
            {/* {images.map((img) => <div>{img}</div>)}       */}
            <img src={imgSrc} />
            Download as <a href={png}>png</a>
        </div>
    );

}