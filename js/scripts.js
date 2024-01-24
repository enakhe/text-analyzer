// UI Logic

$(document).ready(function () {
    $("form#word-counter").submit(function (event) {
        event.preventDefault();

        const passage = $("#text-passage").val();
        const word = $("#word").val();

        const wordCount = wordCounter(passage);
        const occurrencesOfWord = numberOfOccurrencesInText(passage, word);
        const boldedPassage = boldPassage(word, passage);
        const mostCommon = mostCommonWords(passage);
        
        $("#total-count").html(wordCount);
        $("#selected-count").html(occurrencesOfWord);
        $("#bolded-passage").html(boldedPassage);

        
        $("#1").text(`${mostCommon[0][0]} : ${mostCommon[0][1]}`)
        $("#2").text(`${mostCommon[1][0]} : ${mostCommon[1][1]}`)
        $("#3").text(`${mostCommon[2][0]} : ${mostCommon[2][1]}`)

    });
});

// Utility Logic
function noInputtedWord() {
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i].trim().length === 0) {
            return true;
        }
    }
    return false;
}

// Business Logic
function wordCounter(text) {
    if(noInputtedWord()) {
        return 0;
    }

    let wordCount = 0;
    const wordArray = text.split(" ");
    wordArray.forEach(function (word) {
        if (!Number(word)) {
            wordCount++;
        }
    })
    return wordCount;
}

function numberOfOccurrencesInText(word, text) {
    if (noInputtedWord()) {
        return "";
    }

    let regex = new RegExp(text, "gi"); // Instantiating
    return word.match(regex).length;
}

function boldPassage(word, text) {
    if (text.trim().length === 0 || word.trim().length === 0) {
        return "";
    }

    const offWords = ["biffaroni", "muppeteer", "zoinks", "loopdaloop"];

    const regexWord = new RegExp(word, "gi");
    const boldedWord = "<b>" + word + "</b>";
    let htmlString = text.replace(regexWord, boldedWord);

    offWords.forEach(function(word) {
        htmlString = htmlString.replace(word, "*****")
    })

    return "<p>" + htmlString + "</p>";
}


function mostCommonWords(passage) { 
    const wordArray = passage.split(" ");
    const uniqueWords = [...new Set(wordArray)];
    const uniqueWordsWithNumber = []; 
    let sortedWords = [];

    uniqueWords.forEach(function (word1) {
        let numberOfWords = wordArray.filter(function (word2) {
            return word1 === word2 
        }).length; 

        uniqueWordsWithNumber.push([word1, numberOfWords]);
    })

    sortedWords = uniqueWordsWithNumber.sort(function(a, b) {
        return b[1] - a[1]
    })

    return sortedWords;
}