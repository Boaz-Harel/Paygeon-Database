// JavaScript Functions
let currentQuestion = 1;
const totalQuestions = 13;

// Generate a unique ID for each user
function generateUniqueId() {
    return 'user-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

const userId = generateUniqueId();

function beginApplication() {
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('form-container').classList.remove('hidden');
    showQuestion(1);
}

function showQuestion(questionNumber) {
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    document.getElementById('question-' + questionNumber).classList.add('active');
}

function nextQuestion(questionNumber) {
    if (validateQuestion(questionNumber)) {
        showQuestion(questionNumber + 1);
        currentQuestion++;
    }
}

function previousQuestion(questionNumber) {
    showQuestion(questionNumber - 1);
    currentQuestion--;
}

function validateQuestion(questionNumber) {
    const input = document.querySelector(`#question-${questionNumber} input, #question-${questionNumber} textarea`);
    if (input && input.value.trim() === '') {
        document.getElementById(`warning-${questionNumber}`).style.display = 'block';
        return false;
    } else {
        document.getElementById(`warning-${questionNumber}`).style.display = 'none';
        return true;
    }
}

function submitForm() {
    if (validateQuestion(currentQuestion)) {
        const lenderData = {
            name: document.getElementById('lender-name').value,
            logo: document.getElementById('lender-logo').files[0],
            email: document.getElementById('lender-email').value,
            borrowerIndustry: document.getElementById('borrower-industry').value,
            restrictedIndustries: document.getElementById('restricted-industries').value,
            loanTypes: document.getElementById('loan-types').value,
            minCreditScore: document.getElementById('min-credit-score').value,
            minBankBalance: document.getElementById('min-bank-balance').value,
            negativeDays: document.getElementById('negative-days').value,
            mrr: document.getElementById('mrr').value,
            timeInBusiness: document.getElementById('time-in-business').value,
            loanCriteria: document.getElementById('loan-criteria').value,
            additionalComments: document.getElementById('additional-comments').value
        };

        // Retrieve existing data from localStorage
        let allData = JSON.parse(localStorage.getItem('allLenderData')) || [];

        // Add new data
        allData.push({ userId, ...lenderData });

        // Save updated data to localStorage
        localStorage.setItem('allLenderData', JSON.stringify(allData));

        // Print out the data to the console for verification
        console.log('Lender Data Submitted:', lenderData);

        alert('Form Submitted Successfully!');

        // Reset form for new entries
        document.getElementById('form-container').reset();
        document.getElementById('form-container').classList.add('hidden');
        document.getElementById('intro').classList.remove('hidden');
        currentQuestion = 1;
    }
}
