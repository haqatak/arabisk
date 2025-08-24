const letters =['ا', 'ـا', 'ب', 'ـب', 'ـبـ', 'بـ', 'ت', 'ـت', 'ـتـ', 'تـ', 'ث', 'ـث', 'ـثـ', 'ثـ', 'ج', 'ـج', 'ـجـ', 'جـ', 'ح', 'ـح', 'ـحـ', 'حـ', 'خ', 'ـخ', 'ـخـ', 'خـ', 'د', 'ـد', 'ذ', 'ـذ', 'ر', 'ـر',  'ز', 'ـز', 'س', 'ـس', 'ـسـ', 'سـ', 'ش', 'ـش', 'ـشـ', 'شـ', 'ص', 'ـص', 'ـصـ', 'صـ', 'ض', 'ـض', 'ـضـ', 'ضـ', 'ط', 'ـط', 'ـطـ', 'طـ', 'ظ', 'ـظ', 'ـظـ', 'ظـ', 'ع', 'ـع', 'ـعـ', 'عـ', 'غ', 'ـغ', 'ـغـ', 'غـ', 'ف', 'ـف', 'ـفـ', 'فـ', 'ق', 'ـق', 'ـقـ', 'قـ', 'ك', 'ـك', 'ـكـ', 'كـ', 'ل', 'ـل', 'ـلـ', 'لـ', 'م', 'ـم', 'ـمـ', 'مـ', 'ن', 'ـن', 'ـنـ', 'نـ', 'ه', 'ـه', 'ـهـ', 'هـ', 'و', 'ـو', 'ي', 'ـي', 'ـيـ', 'يـ'];
/*let words = [

    "أُذُن" , "أَنْتَ", "هُوَ", "هِيَ", "نَحْنُ", "أَنْتُم", "هُم", "هُنَّ", 
    "وَاحِد", "اثْنَان", "ثَلاثَة", "أَرْبَعَة", "خَمْسَة", 
    "يَوْم", "لَيْلَة", "صَبَاح", "مَسَاء", "شَمْس", "قَمَر", 
    "مَرْحَبًا", "كَيْف", "حَالِكَ", "شُكْرًا", "سَلام",
    "كِتَاب", "سَيَّارَة", "طَعام", "بَاب", "طِفْل", "قِطّ", "كَلْب", "طَائِر", "سَمَكَة", 
    "شَجَرَة", "زَهْرَة", "مَطَر", "شَمْس", "قَمَر", "نَهار", "لَيْل", "بَيْت", "طَرِيق", "شَارِع", "مَدينَة",
    "جَبَل", "نَهْر", "بَحْر", "سَمَاء", "نَجْم", "غَيْمَة", "رَياح", "صَحْرَاء", "غَابَة", 
    "عَيْن", "أُذُن", "فَم", "يَد", "رِجْل", "قَلْب", "رَأْس", "شَعْر", "وَجْه", 
    "مَدْرَسَة", "مَكْتَب", "مَطْعَم", "فِنْدَق", "مَسْجِد", "مَحَطَّة", "مَلْعَب", "مَستَشْفَى"
];
*/
let correct = '';
let corrnum = 0;
let currentLetterIndex = 0;
    function arrayRemove(arr) { 
    
        return arr.filter(function(ele){ 
            return ele != 'ـ'; 
        });
    }

function speakText(text) {
	text = arrayRemove(Array.from(text));
	rand = Math.floor( Math.random() * text.length );
	console.log(text, rand);
	let encodedText = encodeURIComponent(text[rand]).replaceAll("%D9%80","");
	console.log(encodedText);
	new Audio('./'+encodedText+'.mp3').play();
	console.log(text, rand, encodedText);
	correct = encodedText;
        return correct;
}
function speakText2(text) {
	text = arrayRemove(Array.from(text));
	let encodedText = encodeURIComponent(text);
	console.log(encodedText);
	new Audio('./'+encodedText+'.mp3').play();
	if (encodedText == correct)
	 { corrnum++;}else{corrnum > 0 ? corrnum--:0;}
	
	updateFlashcardLetter();
}
function getRandomWordIndex() {
    return Math.floor(Math.random() * words.length);
}
function getRandomLetterIndex(group) {
    let groupIndices = letters.map((_, index) => index).filter(index => index % 3 === group);
    let randomIndexInGroup = groupIndices[Math.floor(Math.random() * groupIndices.length)];
    return randomIndexInGroup;
}

function updateFlashcardLetter() {
    // Select one letter from each of the three groups
    let selectedLetters = [
        letters[getRandomLetterIndex(0)],
        letters[getRandomLetterIndex(1)],
        letters[getRandomLetterIndex(2)]
    ];

    // Get the parent element where the buttons will be appended
    let parentElement = document.getElementById('arabic-letter');
    parentElement.innerHTML = ''; // Clear existing content

    // Create and append a button for each letter
    selectedLetters.forEach(letter => {
        let button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => speakText2(letter));
        parentElement.appendChild(button);
    });
	
	document.getElementById('corrects').innerText = corrnum;
	if (corrnum != 0 && corrnum % 10 == 0){
	  new Audio('./right.mp3').play().then(() => {
	  alert('Gratulerer du har klart '+corrnum+'!!');
	 });
	}
	setTimeout("speakText(document.getElementById('arabic-letter').innerText)", 1000);
}

function updateFlashcardWord() {
	    currentLetterIndex = getRandomWordIndex();
	    document.getElementById('arabic-letter').textContent = words[currentLetterIndex];
}

//document.getElementById('next-button-word').addEventListener('click', updateFlashcardWord);
document.getElementById('next-button-letter').addEventListener('click', updateFlashcardLetter);

document.getElementById('pronunciation-button').addEventListener('click', () => {
    speakText(document.getElementById('arabic-letter').innerText);
    console.log('corr:', correct);
});

// Initialize with random letters
updateFlashcardLetter();

