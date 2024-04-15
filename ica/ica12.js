const btn = document.querySelector('#js-new-quote');
btn.addEventListener('click', getQuote);

const answerBtn = document.querySelector('#js-tweet');
answerBtn.addEventListener('click', getAnswer);

const wordCountBtn = document.querySelector('#js-word-count');
wordCountBtn.addEventListener('click', showWordCount);

const authorText = document.querySelector('#js-author-text');
const quoteText = document.querySelector("#js-quote-text");
const wordCountDisplay = document.querySelector("#js-word-count-display");
const endpoint = "https://api.quotable.io/random";

let quote = '';
let author = '';

async function getQuote() {
    try {
        authorText.textContent = '';
        authorText.classList.add('hidden');

        wordCountDisplay.textContent = ''; // Clear word count display

        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        quote = json.content;
        author = json.author;
        displayQuote();
    } catch (err) {
        console.log(err);
        alert('Failed to fetch new quote');
    }
}

function getAnswer() {
    authorText.textContent = `- ${author}`;
    authorText.classList.remove('hidden');
}

function displayQuote() {
    quoteText.textContent = `"${quote}"`;
}

function showWordCount() {
    const words = quote.split(/\s+/).length;
    wordCountDisplay.textContent = `Word Count: ${words}`;
}

getQuote();
