const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new quote
function newQuote(){
    showLoadingSpinner();
    // pick a random quote from apiQuotes
    let index = Math.floor(Math.random() * apiQuotes.length);
    const quote = apiQuotes[index]; 
    
    // check if author is blank and replace it 'Unknown

    if(!quote.author){
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }

    // check quote length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    
    // Set Quote Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get quotes from API
async function getQuotes(){
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
        apiQuotes = localQuotes;
        newQuote();
        console.log(error);
    }

}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank'); // open in new tab
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
