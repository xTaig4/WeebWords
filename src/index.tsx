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
        boxSizing: 'border-box'
    }}>
        <div>
            <title>The Honered One</title>
            <QuoteComponent/>
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



function QuoteComponent() {
    return <section>
        <div className='column-container'>
            <div className='left-column' >
                <pre id="quote">
                            Quote text for display  <br></br>
                            I just have to win. . . right, Izuku?
                </pre>
                <button className='random-button' onClick={GetRandomQuote}> Random quote! </button>
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


async function GetRandomQuote() {
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
            document.getElementById("quote")!.innerText = data._Quote + ` -${data.firstName}` + " " + data.lastName;
        })

    //     try {
           
    //     } catch (error) {
    //         const imgElement = document.getElementById("myImg")! as HTMLImageElement;
    //         if (imgElement.src = "https://i.pinimg.com/564x/81/5b/55/815b55146b9ff6555986bad7b9bc00d6.jpg") {
    //             imgElement.src = "https://i.pinimg.com/736x/6c/f6/62/6cf662ab5632f2df41e84e5d5144d2d9.jpg"
    //             document.getElementById("quoteDisplay")!.innerText = "I just have to win. . . right, Izuku?"
    //         }
    //         else {
    //             imgElement.src = "https://i.pinimg.com/564x/81/5b/55/815b55146b9ff6555986bad7b9bc00d6.jpg"
    //             document.getElementById("quoteDisplay")!.innerText = "I'll never go back on my Word. That's my Nindo: my ninja way!!";
    //         }
    //     }
    // }

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
}
