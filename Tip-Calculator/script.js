// elements to be manipulated
const billAmount = document.querySelector('#bill-amount');
const tipPercentDiv = document.querySelectorAll('.tip-input div');
const tipPercentCustom = document.querySelector('#custom-input');
const numberOFPeople = document.querySelector('#people');
const resultAmount = document.querySelectorAll('.amount');
const resetButton = document.querySelector('.reset-btn');

// global variables
let tipPercent = undefined;
let amount = undefined;
let people = undefined;

// tipIndexObject
const tipPercentIndex = {
    5: 0,
    10: 1,
    15: 2,
    25: 3,
    50: 4
};

// Callback Functions
function getTipPercent(event) {
    event.preventDefault();
    if (tipPercent !== undefined) {
        tipPercentDiv[tipPercentIndex[tipPercent]].classList.toggle('tip-input-click');
    }
    this.classList.toggle('tip-input-click');
    tipPercent = parseInt(this.innerText);
    calculateResult();
}

function customInput() {
    if (tipPercentCustom.value !== '') {
        console.log('Custom:', tipPercentCustom.value);
        tipPercent = parseFloat(tipPercentCustom.value);
        console.log(tipPercent);
        calculateResult();
    }
    else {
        tipPercent = undefined;
    }

}

function customInputClick() {
    if (tipPercent !== undefined && tipPercentCustom.value === '' && tipPercent <= 50) {
        tipPercentDiv[tipPercentIndex[tipPercent]].classList.remove('tip-input-click');
        tipPercent = undefined;
    }
    tipPercentCustom.placeholder = '';
    tipPercentCustom.classList.add('custom-input-click');
    console.log(tipPercentCustom);
}

function getBillAmount() {
    if (billAmount.value !== '') {
        amount = parseFloat(billAmount.value);
        console.log(amount);
        calculateResult();
    }
    else {
        amount = undefined;
    }
}

function getPeople() {
    if (people !== '') {
        people = parseInt(numberOFPeople.value);
        console.log(people);
        calculateResult();
    }
    else {
        people = undefined;
    }
}

function showZeroError() {
    const errorMsg = document.createElement('p');
    const peopleLabel = document.querySelector('#people-label');
    if (people === 0) {
        errorMsg.innerText = "Can't be zero";
        errorMsg.classList.add('zero-error');
        errorMsg.classList.add('heading');
        numberOFPeople.classList.add('num-people-input');
        console.dir(peopleLabel);
        peopleLabel.parentNode.insertBefore(errorMsg, peopleLabel);
    }
    else {
        const toBeRemoved = document.querySelector('.zero-error');
        if (toBeRemoved) {
            peopleLabel.parentElement.removeChild(toBeRemoved);
        }
        numberOFPeople.classList.remove('num-people-input');
    }

}

function calculateResult() {
    if (tipPercent !== undefined && amount !== undefined && people) {
        let tipAmount = (tipPercent * amount) / 100
        let totalAmount = amount + tipAmount
        resultAmount[0].innerText = `$${Math.round((tipAmount / people) * 100) / 100}`;
        resultAmount[1].innerText = `$${Math.round((totalAmount / people) * 100) / 100}`;
    }
}

function activateReset() {
    if (tipPercent !== undefined || amount !== undefined || people !== undefined) {
        resetButton.classList.add('reset-btn-active');
        resetButton.disabled = false;
    }

    if (people !== 0) {
        if (!(tipPercent || amount || people)) {
            resetButton.classList.remove('reset-btn-active');
        }
    }
}

function reset() {
    console.log('clicked');
    resetButton.disabled = true;
    resetButton.classList.remove('reset-btn-active')
    billAmount.value = '';
    tipPercentCustom.value = '';
    tipPercentCustom.placeholder = 'Custom';
    tipPercentCustom.classList.remove('custom-input-click');
    numberOFPeople.value = '';
    resultAmount[0].innerText = '$0.00';
    resultAmount[1].innerText = '$0.00';
    if (tipPercent && tipPercent in tipPercentIndex) {
        tipPercentDiv[tipPercentIndex[tipPercent]].classList.remove('tip-input-click');
    }
    tipPercent = undefined;
    amount = undefined;
    people = undefined;
    showZeroError();
}
// Adding events

for (i = 0; i < tipPercentDiv.length; i++) {
    tipPercentDiv[i].addEventListener('click', getTipPercent);
    tipPercentDiv[i].addEventListener('click', activateReset);
}

tipPercentCustom.addEventListener('change', customInput);
tipPercentCustom.addEventListener('change', activateReset);
tipPercentCustom.addEventListener('click', customInputClick);
tipPercentCustom.addEventListener('blur', () => {
    if (tipPercentCustom.value === '') {
        tipPercentCustom.placeholder = 'Custom';
        tipPercentCustom.classList.remove('custom-input-click')
    }
});
billAmount.addEventListener('change', getBillAmount);
billAmount.addEventListener('change', activateReset);
numberOFPeople.addEventListener('change', getPeople);
numberOFPeople.addEventListener('change', showZeroError);
numberOFPeople.addEventListener('change', activateReset);
resetButton.addEventListener('click', reset);







