const imageDisplay = document.getElementById("img-display");
const characterTitle = document.getElementById("title-name");
//const changeButton = document.querySelector('#btn-get-character');
const outputSelect = document.querySelector('select-output');

const searchTerm = document.querySelector('#input-character-namee');
const outputList = document.querySelector('list-output');

let characterNameInput = "";
//const characters = "https://www.breakingbadapi.com/api/characters/";
const characters = "https://api.thesneakerdatabase.com";
getSelectData();

outputSelect.addEventListener('ionChange', getDetails);

//-------------------------------------------------------------------

function getDetails(){
  //API json object from Breaking Bad API
 // const characters = "https://www.breakingbadapi.com/api/characters/";

  fetch(characters).then(getJson).then(updateDisplay).catch(reportError);
}

//-------------------------------------------------------------------
function getJson(aResponse){

  return aResponse.json();
}


function updateDisplay(jsonObj){
  // Code goes here

  //getCharacterNameInput();


  let characterObjectArray = jsonObj;
  let characterObject;

  for (let aCharacterObject of characterObjectArray){

    if (aCharacterObject.name === outputSelect.value){
      characterObject = aCharacterObject;
    }
  }
  //console.log(characterObject);

  let characterName = characterObject.name;
  let characterImageURL = characterObject.img;

  characterTitle.textContent = characterName;
  imageDisplay.src = characterImageURL;

  removeAllItems();

  makeDetailsList(characterObject);

}


function reportError(anError){

  console.log(anError);
}


//function getCharacterNameInput(){

  //characterNameInput = searchTerm.value;

//}

function makeDetailsList(aCharacterObject){

  let chacracterPropertyList = ["birthday","nickname","portrayed","status"];

  for (let characterProperty of chacracterPropertyList){

    const newItem = document.createElement('ion-item');

    let outputText = characterProperty.toUpperCase() + ": " + aCharacterObject[CharacterProperty];

    newItem.textContent
    outputList.appendChild(newItem);

  }

}


function getSelectData(){

   fetch(characters).then(getJson).then(getListOfCharacters).catch(reportError);
}

function getListOfCharacters(jsonObj){

  let characterObjectArray = jsonObj;
  let characterNamesArray = [];

  for (let characterObject of characterObjectArray){
    characterNamesArray.push(characterObject.name);
  }

  buildSelectOptions(characterNamesArray);
}

function buildSelectOptions(anArreyOfCharacterNames){

  for (let characterName of anArreyOfCharacterNames){
    createSelectOption(characterName);
  }
}

function createSelectOption(aName){

  const newItem = document.createElement('ion-select-option');
  newItem.value = aName;
  newItem.textContent = aName.upperCase();

  outputSelect.appendChild(newItem);
}


function removeAllItems(){

  while(outputList.lastElementChild){
    outputList.removeChild(outputList.lastElementChild);
  }
}


// trying out//





const infiniteScroll = document.getElementById('infinite-scroll');

infiniteScroll.addEventListener('ionInfinite', function(event) {
  setTimeout(function() {
    console.log('Done');
    event.target.complete();

    // App logic to determine if all data is loaded
    // and disable the infinite scroll
    if (data.length == 1000) {
      event.target.disabled = true;
    }
  }, 500);
});

function toggleInfiniteScroll() {
  infiniteScroll.disabled = !infiniteScroll.disabled;
}