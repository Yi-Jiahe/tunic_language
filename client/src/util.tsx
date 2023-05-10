import { ReactNode } from 'react';
import Rune from './Rune';

const RenderTokens = (tokens: Array<Array<[Array<number>, Array<string>]> | string>): ReactNode =>  {
    return tokens.map((token: Array<[Array<number>, Array<string>]> | string, i) => {
        if (Array.isArray(token)) {
            return (
                <span key={i} className="word">
                    {
                        token.map((rune: [Array<number>, Array<string>], j) => {
                            return (
                                <Rune key={`${i}, ${j}`}
                                    title={rune[1] === null ?
                                        "-" : 
                                        rune[1].join("")
                                    }
                                    segments={new Set(rune[0])} />);
                        })
                    }
                </span>
            );
        } else {
            return <span key={i} className="puncuation">{token}</span>
        }
    });
}



export { RenderTokens };