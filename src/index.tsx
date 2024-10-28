import { wrap } from 'module';
import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SubmitQuote from './SubmitQuote'
import './index.css'

let IsAwake = false;

const root = ReactDom.createRoot(document.getElementById("root")!);

root.render(
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box',
        backgroundColor: '#222', height: '100vh', minWidth: '50vh',
    }}>
        <div>
            <title>The Honered One</title>
            <RandomQuoteSection/>
            {/* <SectionPostQuote /> */}
            <Router>
                <div>
                    {/* Navigation Links */}
                    <nav style={{ textAlign: 'center', margin: '20px' }}>
                        <Link to="/about">About</Link>
                    </nav>

                    {/* Define Routes */}
                    <Routes>
                        <Route path="/about" element={<SubmitQuote />} /> {/* About Page */}
                    </Routes>
                </div>
            </Router>
        </div>
    </div>
);


function FunctionComponent(props: string) {
    return (< h1 > hello { props }</h1 >);

}

function RandomQuoteSection() {
    return <section>
        <div className='column-container'>
            <div className='left-column' >
                <pre id="quote"
                    style={{
                        width: '400px', height: 'auto',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                        textAlign: 'center',
                        color: 'white',
                        }}>
                            Quote text for display <br></br>
                            I just have to win. . . right, Izuku?
                </pre>
                <h1> </h1>
                <button className='random-button' style={{ width: '400px', height: '44px' }} onClick={GetRandomQuote}> Random quote! </button>
            </div>

            <div className='right-column'>
                <div className='imgContainer'>
                    <img id='myImg'
                        src='https://i.pinimg.com/736x/6c/f6/62/6cf662ab5632f2df41e84e5d5144d2d9.jpg'
                        alt="alt text"
                    ></img>
                </div>
                
            </div>
        </div>
    </section>
}


function SectionPostQuote() {
    return <section className='column'
        style={{
            // flex: 1,
            minWidth: '150px',
            maxWidth: '1000px',
            // flexWrap: 'wrap',
            display: 'grid',  // Ensures the image takes up the full width of its parent
        }}>
            <h2 id="quoteHeader" style={{ color: 'white' }}>Quote</h2>
            <textarea id="quoteTextare" style={{ height: "500px" }} placeholder="Enter quote. . ."></textarea>
            <button style={{ width: "auto", height: "25px" }}>
                Submit
            </button>
            <iframe
                width="1000"
                height="500"
                src="https://www.youtube.com/embed/b7DqwytIjB4">
            </iframe>
    </section>
}

async function GetRandomQuote() {
    try {
        await fetch('https://localhost:7028/api/Quotes/Random/QuoteDTO')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');  
                }
                return response.json(); // Parse the JSON from the response 
            })
            .then(data => {
                const imgElement = document.getElementById("myImg")! as HTMLImageElement;
                imgElement.src = data.image;
                document.getElementById("quote")!.innerText = data._Quote;
            })    
    } catch (error) {
        const imgElement = document.getElementById("myImg")! as HTMLImageElement;
        if (imgElement.src = "https://i.pinimg.com/564x/81/5b/55/815b55146b9ff6555986bad7b9bc00d6.jpg") {
            imgElement.src = "https://i.pinimg.com/736x/6c/f6/62/6cf662ab5632f2df41e84e5d5144d2d9.jpg"
            document.getElementById("quoteDisplay")!.innerText = "I just have to win. . . right, Izuku?"
        }
        else {
            imgElement.src = "https://i.pinimg.com/564x/81/5b/55/815b55146b9ff6555986bad7b9bc00d6.jpg"
            document.getElementById("quoteDisplay")!.innerText = "I'll never go back on my Word. That's my Nindo: my ninja way!!";
        }
    }
}

async function PostQuote(newQuote: { firstName: string, lastName: string, _Quote: string, image: string }) {
    await fetch('https://localhost:7028/api/Quote', {
        method: 'POST', // Specify the HTTP method as POST
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(newQuote) // Convert the JavaScript object to a JSON string
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
            console.log('Quote successfully posted:', data);
            // You can handle the response data if needed
        })
        .catch(error => {
            console.error('Error while posting the quote:', error);
        });
}
