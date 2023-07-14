
const api_url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const wordTitleElement = document.getElementById('word');
const wordContentElement = document.getElementById('content');
const meaningHeaderElement = document.getElementById('meanings-header');
const searchBoxElement = document.getElementById('search-box');
const searchButtonElement = document.getElementById('search-button');

// document.addEventListener('DOMContentLoaded', () => {
//     getDefinition();
// });

searchButtonElement.addEventListener('click', () => {
    let searchWord = searchBoxElement.value;
    while (wordContentElement.hasChildNodes()){
        wordContentElement.removeChild(wordContentElement.firstElementChild);
    }
    getDefinition(searchWord);
});

async function getDefinition(searchWord) {
    try {
        const api_url_with_word = api_url + searchWord;
        const response = await fetch(api_url_with_word);
        const data = await response.json();

        const wordInfo = data[0];
        let word = wordInfo.word;
        word = word.charAt(0).toUpperCase() + word.slice(1);

        wordTitleElement.textContent = word;
        meaningHeaderElement.textContent = 'Meanings';

        const meanings = wordInfo.meanings;

        for (let m = 0; m < meanings.length; m++){
            let partOfSpeech = meanings[m].partOfSpeech;
            let partOfSpeechElement = document.createElement('p');
            let partOfSpeechNode = document.createTextNode(partOfSpeech);

            let partOfSpeechBoldElement = document.createElement('b');
            let partOfSpeechBoldNode = document.createTextNode('Part of Speech: ');
            partOfSpeechBoldElement.appendChild(partOfSpeechBoldNode);
            partOfSpeechElement.appendChild(partOfSpeechBoldElement);
            partOfSpeechElement.appendChild(partOfSpeechNode);
            wordContentElement.appendChild(partOfSpeechElement);

            let synonyms = meanings[m].synonyms;
            let synonymBoldElement = document.createElement('b');
            let synonymBoldNode = document.createTextNode('Synonyms: ');
            let synonymElement = document.createElement('p');
            synonymBoldElement.appendChild(synonymBoldNode);
            synonymElement.appendChild(synonymBoldElement);
            if (synonyms !== undefined){
                for (let s = 0; s < synonyms.length; s++){
                    let synonymNode = document.createTextNode(synonyms[s] + ' ');
                    synonymElement.appendChild(synonymNode);
                    wordContentElement.appendChild(synonymElement);
                }
            }

            let antonyms = meanings[m].antonyms;
            let antonymBoldElement = document.createElement('b');
            let antonymBoldNode = document.createTextNode('Antonyms: ');
            let antonymElement = document.createElement('p');
            antonymBoldElement.appendChild(antonymBoldNode);
            antonymElement.appendChild(antonymBoldElement);
            if (antonyms !== undefined){
                for (let a = 0; a < antonyms.length; a++){
                    let antonymNode = document.createTextNode(antonyms[a] + ' ');
                    antonymElement.appendChild(antonymNode);
                    wordContentElement.appendChild(antonymElement);
                }
            }

            let definitions = meanings[m].definitions;
            for (let d = 0; d < definitions.length; d++){
                let definition = definitions[d].definition;
                let definitionElement = document.createElement('p');
                let definitionNode = document.createTextNode(definition);

                let definitionBoldElement = document.createElement('b');
                let definitionBoldNode = document.createTextNode('Definition: ');
                definitionBoldElement.appendChild(definitionBoldNode);
                definitionElement.appendChild(definitionBoldElement);
                definitionElement.appendChild(definitionNode);
                wordContentElement.appendChild(definitionElement);

                console.log(definitions[d].example);
                if (definitions[d].example !== undefined){
                    let example = definitions[d].example;
                    let exampleElement = document.createElement('p');
                    let exampleNode = document.createTextNode(example);

                    let exampleBoldElement = document.createElement('b');
                    let exampleBoldNode = document.createTextNode('Example: ');
                    exampleBoldElement.appendChild(exampleBoldNode);
                    exampleElement.appendChild(exampleBoldElement);
                    exampleElement.appendChild(exampleNode);
                    wordContentElement.appendChild(exampleElement);
                }
            }

            let brElement = document.createElement('br');
            wordContentElement.appendChild(brElement);

            console.log(meanings[m]);
        }
    } catch {
        let errorMessageElement = document.createElement('h4');
        let errorMessageNode = document.createTextNode(`${searchWord} is not a valid word in the dictionary... Try Again!`);
        errorMessageElement.appendChild(errorMessageNode);
        wordContentElement.appendChild(errorMessageElement);
    }

}