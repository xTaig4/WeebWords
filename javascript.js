
let IsAwake = false;

function OnButtonClick() {
    if (IsAwake == false){
        document.getElementById("myHeader").innerText = 'Can i. . .';
        document.getElementById("myImg").src = "https://i.pinimg.com/736x/05/0c/95/050c95ee6545449b5ca5712a51f917bb.jpg";
        document.getElementById("quoteDisplay").innerText = 'Hey, Izuku. . . Can i still catch up to you?'
        IsAwake = true;
    }
    else{
        document.getElementById("myHeader").innerText = 'Wake up. . .';
        document.getElementById("myImg").src = "https://i.pinimg.com/564x/84/dd/07/84dd070d4d13eda6523a2731bacfa9fd.jpg";
        document.getElementById("quoteDisplay").innerText = 'Wake up to reality, nothing ever goes as planned'
        IsAwake = false;
    } 
}

async function PostQuote() {
    //Get the textarea element and its value to qText
    var quoteText = document.getElementById("quoteTextare");
    var qText = quoteText.value;
    document.getElementById("quoteDisplay").innerText = qText;

    const reponse = await fetch('', {
        method: 'POST',
        body: myBody, //string or object
        headers: {
            'Content-Type': 'application/json'
        }
    });    
}

async function GetQuoteId() {
    await fetch('http://localhost:7028/api/Quotes/1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            document.getElementById("quoteDisplay").innerText = response.json();
            return response.json(); // Parse the JSON from the response
        })
}
