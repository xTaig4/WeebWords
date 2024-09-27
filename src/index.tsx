import { wrap } from 'module';
import React from 'react';
import ReactDom from 'react-dom/client';

let IsAwake = false;

const root = ReactDom.createRoot(document.getElementById("root")!);

root.render(
    <body style={{
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
        background: '#222',
        transform: 'translate(-15px, -10px)',
        width: '1900px',
        height: '930px'
    }}>
    <div>
        <title>The Honered One</title>
            <h2 id="myHeader" style={{ color: 'white' }}>Welcome to my quote collection page</h2>,
        <RandomQuoteSection />
        <PostQuoteSection />
        </div>
    </body>
);

function RandomQuoteSection() {
    return <section
        style={{
            display: 'block',  // Ensures the image takes up the full width of its parent
            margin: 'auto',    // Centers the image horizontally
            width: '400px',     // Optional: set a specific width if needed
            transform: 'translate(-60px, 15px)',
            position: 'fixed'            
        }}>
        <div>
            <div className='container' style={{
                width: '450px',
                height: 'auto',
                background: 'rgba(90,90,90,1)',
                transform: 'translate(25px, -25px)',
                borderRadius: '25px'
            }}>
            <img id="myImg"
                width={'400px'}
                src="https://i.pinimg.com/736x/6c/f6/62/6cf662ab5632f2df41e84e5d5144d2d9.jpg"
                alt="alt text"
                style={{
                    transform: 'translate(25px, 2px)'
                }}
            ></img>,
        </div>

        <pre id="quoteDisplay"
            style={{
                width: '500px', height: 'auto',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                textAlign: 'center',
                color: 'white',
                transform: 'translateY(-25px)'
            }}>
            Quote text for display <br></br>
            I just have to win. . . right, Izuku?
        </pre>
        </div>
        <button
            style={{ width: '444px', height: '44px', transform: 'translate(30px, -20px)' }}
            onClick={GetRandomQuote}>
            Random quote!
        </button>
    </section>
}

function PostQuoteSection() {
    return <section
        style={{
            display: 'grid',  // Ensures the image takes up the full width of its parent
            transform: 'translateX(550px)',
            position: 'fixed'
        }}>
        <h2 id="quoteHeader" style={{ color: 'white' }}>Quote</h2>
        <textarea id="quoteTextare" style={{ height: "100px" }} placeholder="Enter quote. . ."></textarea>
        <button style={{ width: "auto", height: "25px" }}>
            Submit
        </button>
        <iframe
            width="300"
            height="auto"
            src="https://www.youtube.com/embed/b7DqwytIjB4"
        ></iframe>
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
            document.getElementById("quoteDisplay")!.innerText = data._Quote;
        })
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



async function GetQuoteId() {
    if (IsAwake === false) {
        await fetch('https://localhost:7028/api/Quotes/1')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return response.json(); // Parse the JSON from the response
            })
            .then(data => {
                const imgElement = document.getElementById("myImg")! as HTMLImageElement;
                imgElement.src = data.image;
                document.getElementById("quoteDisplay")!.innerText = data._Quote;
            })
        IsAwake = true;
    }
    else {
        document.getElementById("myHeader")!.innerText = 'Wake up. . .';
        const imgElement = document.getElementById("myImg") as HTMLImageElement;
        imgElement!.src = "https://i.pinimg.com/564x/84/dd/07/84dd070d4d13eda6523a2731bacfa9fd.jpg";
        document.getElementById("quoteDisplay")!.innerText = 'Wake up to reality, nothing ever goes as planned'
        IsAwake = false;
    }

}

// async function PostQuote() {
//     //Get the textarea element and its value to qText
//     var quoteText = document.getElementById("quoteTextare");
//     var qText = quoteText.value;
//     document.getElementById("quoteDisplay").innerText = qText;

//     const reponse = await fetch('', {
//         method: 'POST',
//         body: myBody, //string or object
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// }
