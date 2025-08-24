const letters = ['ا', 'ـا', 'ب', 'ـب', 'ـبـ', 'بـ', 'ت', 'ـت', 'ـتـ', 'تـ', 'ث', 'ـث', 'ـثـ', 'ثـ', 'ج', 'ـج', 'ـجـ', 'جـ', 'ح', 'ـح', 'ـحـ', 'حـ', 'خ', 'ـخ', 'ـخـ', 'خـ', 'د', 'ـد', 'ذ', 'ـذ', 'ر', 'ـر', 'ز', 'ـز', 'س', 'ـس', 'ـسـ', 'سـ', 'ش', 'ـش', 'ـشـ', 'شـ', 'ص', 'ـص', 'ـصـ', 'صـ', 'ض', 'ـض', 'ـضـ', 'ضـ', 'ط', 'ـط', 'ـطـ', 'طـ', 'ظ', 'ـظ', 'ـظـ', 'ظـ', 'ع', 'ـع', 'ـعـ', 'عـ', 'غ', 'ـغ', 'ـغـ', 'غـ', 'ف', 'ـف', 'ـفـ', 'فـ', 'ق', 'ـق', 'ـقـ', 'قـ', 'ك', 'ـك', 'ـكـ', 'كـ', 'ل', 'ـل', 'ـلـ', 'لـ', 'م', 'ـم', 'ـمـ', 'مـ', 'ن', 'ـن', 'ـنـ', 'نـ', 'ه', 'ـه', 'ـهـ', 'هـ', 'و', 'ـو', 'ي', 'ـي', 'ـيـ', 'يـ'];

// Updated harakat array with proper encoding
const harakat = [
    'َ',  // fatha
    'ِ',  // kasra
    'ُ',  // damma
    'ً',  // tanwin fath
    'ٍ',  // tanwin kasr
    'ٌ',  // tanwin damm
    'ّ',  // shadda
    'ْ'   // sukun
];
let correct = '';
let corrnum = 0;
let currentLetters = [];
let isPlaying = false;
let highScore = localStorage.getItem('highScore') || 0;
let currentLetterCount = 1;
let harakatEnabled = false;  // New variable to toggle harakat

function toggleHarakat() {
    harakatEnabled = !harakatEnabled;
    const toggleBtn = document.getElementById('harakat-toggle');
    toggleBtn.classList.toggle('active');
    updateFlashcards();
}

function addRandomHarakat(letter) {
    if (!harakatEnabled) return letter;
    
    // Split the letter into characters
    const chars = Array.from(letter);
    let result = '';
    
    for (let char of chars) {
        result += char;
        // Skip adding harakat to connecting characters (Ù€)
        if (char !== 'Ù€' && Math.random() < 0.7) {  // 70% chance to add harakat
            // Randomly decide whether to add shadda first (20% chance)
            if (Math.random() < 0.2) {
                result += 'ّ';  // shadda
            }
            // Add another random harakat
            result += harakat[Math.floor(Math.random() * harakat.length)];
        }
    }
    return result;
}

function arrayRemove(arr) {
    return arr.filter(function(ele) {
        return ele != 'Ù€';
    });
}

function queueAudio() {
    if (!isPlaying) {
        playAudio();
    }
}

function playAudio() {
    if (isPlaying) return;
    
    isPlaying = true;
    speakText(correct);
}

function speakText(text) {
    // Remove both connecting characters and harakat for audio playback
    let cleanedText = arrayRemove(Array.from(text)).filter(char => !harakat.includes(char));
    let correctElement = document.querySelector('.arabic-letter.correct');
    if (correctElement) correctElement.classList.add('playing');
    
    function playNextLetter(index) {
        if (index < cleanedText.length) {
            let encodedText = encodeURIComponent(cleanedText[index]).replaceAll("%D9%80","");
            let audio = new Audio('./' + encodedText + '.mp3');
            audio.onended = () => playNextLetter(index + 1);
            audio.play().catch(e => {
                console.error("Audio playback failed:", e);
                playNextLetter(index + 1);
            });
        } else {
            if (correctElement) correctElement.classList.remove('playing');
            isPlaying = false;
        }
    }
    
    playNextLetter(0);
}

function checkAnswer(clickedText) {
    let correctElement = document.querySelector('.arabic-letter.correct');
    if (clickedText === correct) {
        corrnum++;
        correctElement.classList.add('correct-answer');
        if (corrnum > highScore) {
            highScore = corrnum;
            localStorage.setItem('highScore', highScore);
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

function getRandomLetterIndex() {
    return Math.floor(Math.random() * letters.length);
}

function updateFlashcards() {
    let flashcardsContainer = document.getElementById('flashcards-container');
    let arabicLetters = flashcardsContainer.querySelectorAll('.arabic-letter');

    currentLetters = [];

    for (let i = 0; i < 3; i++) {
        let letterString = '';
        for (let j = 0; j < currentLetterCount; j++) {
            let baseLetter = letters[getRandomLetterIndex()];
            letterString += addRandomHarakat(baseLetter);
        }
        currentLetters.push(letterString);
        arabicLetters[i].textContent = letterString;
        arabicLetters[i].classList.remove('correct');
    }

    let correctIndex = Math.floor(Math.random() * currentLetters.length);
    correct = currentLetters[correctIndex];
    arabicLetters[correctIndex].classList.add('correct');

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

function setLetterCount(count) {
    currentLetterCount = count;
    updateFlashcards();
}

// Add event listeners
document.getElementById('next-button-letter').addEventListener('click', updateFlashcards);
document.getElementById('pronunciation-button').addEventListener('click', queueAudio);
document.getElementById('harakat-toggle').addEventListener('click', toggleHarakat);

document.querySelectorAll('.letter-count-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        setLetterCount(parseInt(event.target.dataset.count));
        document.querySelectorAll('.letter-count-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    });
});

document.getElementById('flashcards-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('arabic-letter')) {
        checkAnswer(event.target.textContent);
    }
});

// Initialize
updateFlashcards();
updateHighScore();
document.querySelector('.letter-count-btn[data-count="1"]').classList.add('active');
