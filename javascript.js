
let IsAwake = false;

function OnButtonClick() {
    if (IsAwake == false){
        document.getElementById("myHeader").innerText = 'Wake up to reality, nothing ever goes as planned';
        document.getElementById("myImg").src = "https://i.pinimg.com/564x/84/dd/07/84dd070d4d13eda6523a2731bacfa9fd.jpg";
        IsAwake = true;
    }
    else{
        document.getElementById("myHeader").innerText = 'Welcome to my profile page';
        document.getElementById("myImg").src = "https://pbs.twimg.com/media/F4Tgj9KbcAA4bSP?format=jpg&name=small";
        IsAwake = false;
    } 
}

async function PostQuote() {
    //Get the textarea element and its value to qText
    var quoteText = document.getElementById("quoteText");
    var qText = quoteText.value;

    const reponse = await fetch('', {
        method: 'POST',
        body: myBody, //string or object
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
}
