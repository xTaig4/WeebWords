import React from 'react';
import ReactDom from 'react-dom/client';

let IsAwake = false;

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
    <h2 id="myHeader">Welcome to my quote collection page</h2>,
    <img id="myImg" width="450" src="https://i.pinimg.com/736x/6c/f6/62/6cf662ab5632f2df41e84e5d5144d2d9.jpg" alt=''></img>,
    document.getElementById("root")
);

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
                document.getElementById("myImg").src = data.image;
                document.getElementById("quoteDisplay").innerText = data._Quote;
            })
        IsAwake = true;
    }
    else {
        document.getElementById("myHeader").innerText = 'Wake up. . .';
        document.getElementById("myImg").src = "https://i.pinimg.com/564x/84/dd/07/84dd070d4d13eda6523a2731bacfa9fd.jpg";
        document.getElementById("quoteDisplay").innerText = 'Wake up to reality, nothing ever goes as planned'
        IsAwake = false;
    }

}
