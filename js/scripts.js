// UI Logic

$(document).ready(function () {
    $("form#word-counter").submit(function (event) {
        event.preventDefault();

        const passage = $("#text-passage").val();
        const word = $("#word").val();

        const wordCount = wordCounter(passage);
        const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
        const boldedPassage = boldPassage(word, passage);
        
        $("#total-count").html(wordCount);
        $("#selected-count").html(occurrencesOfWord);
        $("#bolded-passage").html(boldedPassage);
    });
});


// Business Logic
function wordCounter(text) {
    if (text.trim().length === 0) {
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
    if (text.trim().length === 0 || word.trim().length === 0) {
        return 0;
    }

    const wordArray = text.split(" ");
    let wordCount = 0;
    wordArray.forEach(function (element) {
        if (element.toLowerCase().includes(word.toLowerCase())) {
            wordCount++
        }
    });
    return wordCount;
}

function boldPassage(word, text) {
    if (text.trim().length === 0 || word.trim().length === 0) {
        return "";
    }

    let htmlString = "<p>";
    const wordArray = text.split(" ");
    wordArray.forEach(function(e) {
        if(word === e) {
            htmlString = htmlString.concat(`<b>${e}</b>`);
        } else {
            htmlString = htmlString.concat(e)
        }
        htmlString = htmlString.concat(" ");
    })
    return htmlString.trim() + "</p>";
}