const letters =['ا', 'ـا', 'ب', 'ـب', 'ـبـ', 'بـ', 'ت', 'ـت', 'ـتـ', 'تـ', 'ث', 'ـث', 'ـثـ', 'ثـ', 'ج', 'ـج', 'ـجـ', 'جـ', 'ح', 'ـح', 'ـحـ', 'حـ', 'خ', 'ـخ', 'ـخـ', 'خـ', 'د', 'ـد', 'ذ', 'ـذ', 'ر', 'ـر',  'ز', 'ـز', 'س', 'ـس', 'ـسـ', 'سـ', 'ش', 'ـش', 'ـشـ', 'شـ', 'ص', 'ـص', 'ـصـ', 'صـ', 'ض', 'ـض', 'ـضـ', 'ضـ', 'ط', 'ـط', 'ـطـ', 'طـ', 'ظ', 'ـظ', 'ـظـ', 'ظـ', 'ع', 'ـع', 'ـعـ', 'عـ', 'غ', 'ـغ', 'ـغـ', 'غـ', 'ف', 'ـف', 'ـفـ', 'فـ', 'ق', 'ـق', 'ـقـ', 'قـ', 'ك', 'ـك', 'ـكـ', 'كـ', 'ل', 'ـل', 'ـلـ', 'لـ', 'م', 'ـم', 'ـمـ', 'مـ', 'ن', 'ـن', 'ـنـ', 'نـ', 'ه', 'ـه', 'ـهـ', 'هـ', 'و', 'ـو', 'ي', 'ـي', 'ـيـ', 'يـ'];
let words = [
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
let currentLetterIndex = 0;

function speakText(text) {
    let encodedText = encodeURIComponent(text).replaceAll("%D9%80","");
    console.log(encodedText);
    new Audio('./'+encodedText+'.mp3').play();
}
function getRandomWordIndex() {
    return Math.floor(Math.random() * words.length);
}
function getRandomLetterIndex() {
    return Math.floor(Math.random() * letters.length);
}
function updateFlashcardWord() {
    currentLetterIndex = getRandomWordIndex();
    document.getElementById('arabic-letter').textContent = words[currentLetterIndex];
}
function updateFlashcardLetter() {
    currentLetterIndex = getRandomLetterIndex();
    document.getElementById('arabic-letter').textContent = letters[currentLetterIndex];
}

document.getElementById('next-button-word').addEventListener('click', updateFlashcardWord);
document.getElementById('next-button-letter').addEventListener('click', updateFlashcardLetter);

document.getElementById('pronunciation-button').addEventListener('click', () => {
    //console.log(document.getElementById('arabic-letter').innerText);
    speakText(document.getElementById('arabic-letter').innerText);
});

// Initialize with a random letter
updateFlashcardLetter();
