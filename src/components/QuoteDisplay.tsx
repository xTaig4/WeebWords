import React from "react";
import "./QuoteDisplay.css";

const QuoteDisplay: React.FC = () => {
    return (
        <section>
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
    );
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
}
export default QuoteDisplay;