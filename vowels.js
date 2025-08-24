const vowels = [
    { symbol: 'َ', name: 'fatḥah', sound: 'a' },
    { symbol: 'ِ', name: 'kasrah', sound: 'i' },
    { symbol: 'ُ', name: 'ḍammah', sound: 'u' },
    { symbol: 'ْ', name: 'sukūn', sound: '' },
    { symbol: 'ً', name: 'tanwin-fatḥah', sound: 'an' },
    { symbol: 'ٍ', name: 'tanwin-kasrah', sound: 'in' },
    { symbol: 'ٌ', name: 'tanwin-ḍammah', sound: 'un' }
];

const consonants = ['ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'];

let correct = '';
let corrnum = 0;
let currentVowels = [];
let isPlaying = false;
let highScore = localStorage.getItem('vowelHighScore') || 0;
let currentVowelType = 'all';

function queueAudio() {
    if (!isPlaying) {
        playAudio();
    }
}

function playAudio() {
    if (isPlaying) return;
    
    isPlaying = true;
    playLetterSound(correct);
}

function playLetterSound(text) {
    let correctElement = document.querySelector('.arabic-vowel.correct');
    if (correctElement) correctElement.classList.add('playing');

    // Assuming you have audio files named like "ب.mp3", "تَ.mp3", etc.
    let audioFileName = encodeURIComponent(text) + '.mp3';
    let audio = new Audio(audioFileName);

    audio.onended = () => {
        if (correctElement) correctElement.classList.remove('playing');
        isPlaying = false;
    };

    audio.onerror = (e) => {
        console.error("Error playing audio:", e);
        if (correctElement) correctElement.classList.remove('playing');
        isPlaying = false;
    };

    audio.play().catch(e => {
        console.error("Audio playback failed:", e);
        isPlaying = false;
    });
}

function checkAnswer(clickedText) {
    let correctElement = document.querySelector('.arabic-vowel.correct');
    if (clickedText === correct) {
        corrnum++;
        correctElement.classList.add('correct-answer');
        if (corrnum > highScore) {
            highScore = corrnum;
            localStorage.setItem('vowelHighScore', highScore);
            updateHighScore();
        }
    } else {
        corrnum > 0 ? corrnum-- : 0;
        correctElement.classList.add('wrong-answer');
    }
    updateScore();
    setTimeout(() => {
        correctElement.classList.remove('correct-answer', 'wrong-answer');
        updateFlashcards();
    }, 1000);
}

function getRandomConsonant() {
    return consonants[Math.floor(Math.random() * consonants.length)];
}

function getRandomVowel() {
    let filteredVowels = currentVowelType === 'all' ? vowels : vowels.filter(v => v.name === currentVowelType);
    return filteredVowels[Math.floor(Math.random() * filteredVowels.length)];
}

function updateFlashcards() {
    let flashcardsContainer = document.getElementById('flashcards-container');
    let arabicVowels = flashcardsContainer.querySelectorAll('.arabic-vowel');

    currentVowels = [];

    for (let i = 0; i < 3; i++) {
        let consonant = getRandomConsonant();
        let vowel = getRandomVowel();
        let vowelText = consonant + vowel.symbol;
        currentVowels.push(vowelText);
        arabicVowels[i].textContent = vowelText;
        arabicVowels[i].classList.remove('correct');
    }

    let correctIndex = Math.floor(Math.random() * currentVowels.length);
    correct = currentVowels[correctIndex];
    arabicVowels[correctIndex].classList.add('correct');

    queueAudio();
}

function updateScore() {
    document.getElementById('corrects').innerText = corrnum;
    if (corrnum !== 0 && corrnum % 10 === 0) {
        showModal('Gratulerer du har klart ' + corrnum + '!!');
    }
}

function updateHighScore() {
    document.getElementById('high-score').innerText = highScore;
}

function showModal(text) {
    let modal = document.getElementById('modal');
    let modalText = document.getElementById('modal-text');
    modalText.textContent = text;
    modal.style.display = 'block';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 3000);
}

function setVowelType(type) {
    currentVowelType = type;
    updateFlashcards();
}

document.getElementById('next-button-vowel').addEventListener('click', updateFlashcards);

document.getElementById('pronunciation-button').addEventListener('click', queueAudio);

document.querySelectorAll('.vowel-type-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        setVowelType(event.target.dataset.type);
        document.querySelectorAll('.vowel-type-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    });
});

document.getElementById('flashcards-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('arabic-vowel')) {
        checkAnswer(event.target.textContent);
    }
});

// Initialize with random vowels and update high score display
updateFlashcards();
updateHighScore();
