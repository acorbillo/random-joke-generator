const jokeText = document.getElementById('joke-text');
const btn = document.getElementById('btn');
const jokeWrapper = document.querySelector('.joke-wrapper');

//the url of the API to get the jokes from
const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";

// function to display the fetched joke.
const displayJoke = joke => jokeText.textContent = joke; 

async function generateJoke(){

    jokeText.innerText = ''; //will clear the joke
    displayLoader(); //will show the loader while fetching the data;

    try {
        const response = await fetch(url);
        
        if (!response.ok){
            throw new Error(response.statusText);
        }

        const jokeData = await response.json();

        hideLoader(); //will hide the loader once the data has fetched
        displayJoke(jokeData.joke); //display the joke 
    } 
    catch (error) {
        alert(error.messageText);
    }

}

//function that will create and display the loader
function displayLoader(){
    const loader = document.createElement('div');
    loader.classList.add('loader');
    jokeWrapper.append(loader);
}

//function that will hide the loader
function hideLoader(){
    const loader = document.querySelector('.loader');
    jokeWrapper.removeChild(loader);
}

btn.addEventListener('click',() => {
    generateJoke();
});