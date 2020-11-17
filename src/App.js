import './App.css';
import React, {useEffect, useState} from "react";
import {QUOTE_API_URL} from "./constants";
import {getJson} from "./remote";

function App() {
    const [quote, setQuote] = useState(undefined);
    useEffect(() => {
        async function internal() {
            const json = await getJson(QUOTE_API_URL);
            const {id, author, body} = json?.quote;
            if (id || author || body)
                setQuote({id, author, body});
        }
        internal();
    }, []);
    return (
        <div data-testid="container" className="App">
            {quote &&
            <div>
                <p data-testid="id">{quote.id}</p>
                <p data-testid="author">{quote.author}</p>
                <p data-testid="body">{quote.body}</p>
            </div>
            }
        </div>
    );
}

export default App;
