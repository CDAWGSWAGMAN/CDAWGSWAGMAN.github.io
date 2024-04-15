const btn = document.querySelector('#js-new-quote');
btn.addEventListener('click', getQuote);

const answerBtn = document.querySelector('#js-tweet');
answerBtn.addEventListener('click', getAnswer);

const answerText = document.querySelector('#js-answer-text');
const endpoint = "https://api.openbrewerydb.org/v1/breweries/random"

let brewerydata = null;

async function getQuote() {
    try {
        
        const response = await fetch("https://api.openbrewerydb.org/v1/breweries/random");
        
        const jsonData = await response.json();
        console.log(jsonData);
        brewerydata = 
        {
            name: json.name,
            city: json.city,
            state: json.state
        };

    displayQuote('${brewerydata.name} - ${brewerydata.city} - ${brewerydata.state}');
    answerText.textContent = '';

    } catch (err) {
        console.log(err);
        alert('Failed to fetch new quote')
    }

}

function getAnswer() {
    if (breweryData) {
        answerText.textContent = `Name: ${brewerydata.name}, Location: ${brewerydata.city}, ${brewerydata.state}`;
    } else {
        answerText.textContent = 'No brewery data available';
    }
}


function displayQuote(quote) {
    const quoteText = document.querySelector("#js-quote-text");
    quoteText.textContent = quote;
}

getQuote()

