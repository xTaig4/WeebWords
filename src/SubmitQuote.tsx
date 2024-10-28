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

export default Submit;