const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
let apiQuotes = [];

//Show new quote

function newQuote(){

    //Random quote from array
    let quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    let author = quote.author;
    let authorPart = author.split(",");
    if(authorPart[0] === "type.fit"){
        authorPart[0] = "Unknown";
    }
    quoteText.textContent = quote.text;
    authorText.textContent = authorPart[0];
}


//Get quotes From API
//async function
async function getQuotes() {
    const apiUrl = `https://type.fit/api/quotes`;
    try {
        //rsponse will not be populated until data is fetched from api
        //else it becomes undefined
        const response = await fetch(apiUrl);
        //apiQuotes is a global variable
        //gets string from api and makes it a json
        apiQuotes = await response.json();
        newQuote();
        
    } catch (error) {
        //catch error here
    }
}

//Tweet Quote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

//Event Listeners
twitterButton.addEventListener("click",tweetQuote);
newQuoteButton.addEventListener("click",newQuote);
getQuotes();