
// import function QuoteText(quote: string) {
//     <section>
//         <pre id="quoteDisplay"
//             style={{
//                 width: '400px', height: 'auto',
//                 whiteSpace: 'pre-wrap',
//                 wordWrap: 'break-word',
//                 textAlign: 'center',
//                 color: 'white',
//             }}>
//             Quote<br></br>
//             {quote}
//         </pre>
        
        
//         <button
//             style={{width: '400px', height: '44px'}}
//             onClick={GetRandomQuote}>
//             Random quote!
//         </button>
//     </section>
// }

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
                document.getElementById("quoteDisplay")!.innerText = data._Quote;
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