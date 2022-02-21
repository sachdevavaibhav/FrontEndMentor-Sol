const apiURL = 'https://api.adviceslip.com/advice';
const diceButton = document.querySelector('#btn');

async function getAdvice(url) {
    let res = await axios.get(apiURL);
    let newQuote = `"${res.data.slip.advice}"`;
    let quoteId = res.data.slip.id;
    updateAdvice(newQuote, quoteId);
    return res;
}

function updateAdvice(newQuote, newQuoteId) {
    let quote = document.querySelector('#advice-content');
    let quoteId = document.querySelector('#id');
    quoteId.innerText = newQuoteId;
    quote.innerText = newQuote;
}

getAdvice(apiURL);

diceButton.addEventListener('click', () => {
    getAdvice();
})