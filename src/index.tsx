import { wrap } from 'module';
import React from 'react';
import ReactDom from 'react-dom/client';

let IsAwake = false;

const root = ReactDom.createRoot(document.getElementById("root")!);

root.render(
    <div>
        <title>The Honered One</title>
        <h2 id="myHeader">Welcome to my quote collection page</h2>,

        <section
            style={{
                display: 'block',  // Ensures the image takes up the full width of its parent
                margin: 'auto',    // Centers the image horizontally
                width: '400px',     // Optional: set a specific width if needed
                transform: 'translateX(10px)',
                position: 'fixed'
            }}>
            <div>
              <img id="myImg"
                    width={'400px'}
                    src="https://i.pinimg.com/736x/6c/f6/62/6cf662ab5632f2df41e84e5d5144d2d9.jpg"
                    alt="alt text"
                    style={{
                        transform: 'translateX(50px)'
                    }}
                ></img>,
            </div>
        
               <pre id="quoteDisplay"
               style={{
                    width: '500px', height: 'auto', 
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    textAlign: 'center'
               }}>
                    Quote text for display <br></br>
                    I just have to win. . . right, Izuku?
              </pre>
        
                <button
                    style={{ width: '444px', height: '44px', transform: 'translateX(30px)' }}
                    onClick={GetRandomQuote}>
                        Random quote!
                </button>
        </section>
        <section
            style={{
                display: 'grid',  // Ensures the image takes up the full width of its parent
                // margin: 'auto',    // Centers the image horizontally
                // width: '400px',     // Optional: set a specific width if needed
                transform: 'translateX(550px)',
                position: 'fixed'
            }}>
            <h2 id="quoteHeader">Quote</h2>
            <textarea id="quoteTextare" placeholder="Enter quote. . ."></textarea>
            <button style={{ width: "auto", height: "25px" }}>
                Submit
            </button>
            <iframe 
                width="300" 
                height="auto" 
                src="https://www.youtube.com/embed/b7DqwytIjB4" 
        ></iframe>
        </section>
    </div>
);

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
