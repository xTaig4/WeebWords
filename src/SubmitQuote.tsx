import React from 'react';

const Submit: React.FC = () => {
    return (
        <div>
            <h1>Submit quote</h1>
            {/* <SectionPostQuote/> */}
        </div>
    )
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

export default Submit;