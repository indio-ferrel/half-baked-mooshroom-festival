// import functions and grab DOM elements
import { renderMushroom, renderFriend } from './render-utils.js';

const friendsContainer = document.querySelector('.friends');
const friendInputEl = document.getElementById('friend-input');
const mushroomsEl = document.querySelector('.mushrooms');
const addMushroomButton = document.getElementById('add-mushroom-button');
const addFriendButton = document.getElementById('add-friend-button');

// initialize state
let mushroomCount = 3;

const friendData = [
    {
        name: 'Erich',
        satisfaction: 2,
    },
    {
        name: 'Sarah',
        satisfaction: 3,
    },
    {
        name: 'Missael',
        satisfaction: 1,
    },
    {
        name: 'Soraya',
        satisfaction: 2,
    },
];

addMushroomButton.addEventListener('click', () => {
    if (Math.random() > 0.5) {
        alert('found a mushroom!');

        mushroomCount++;
        displayMushrooms();
    } else {
        alert('no luck!');
    }
});

addFriendButton.addEventListener('click', () => {
    // get the name from the input
    
    // create a new friend object
    const newFriend = {
        name: friendInputEl.value || `friend ${Math.floor(Math.random() * 1024)}`,
        satisfaction: 1
    };
    
    // push it into the friends state array, passed in as an argument
    friendData.push(newFriend);
    // reset the input
    friendInputEl.value = '';
    // display all the friends (use a function here)
    displayFriends();
});

function displayFriends() {
    // clear out the friends in DOM
    friendsContainer.textContent = '';
    // for each friend in state . . .
    for (let friend of friendData) {
        // use renderFriend to make a friendEl
        const friendEl = renderFriend(friend);
        // this is a clickable list, so . . .
        //    add an event listener to each friend
        friendEl.addEventListener('click', () => {
        //    and if the friend's satisfaction level is below 3 and you have mushrooms left
        //    increment the friends satisfaction and decrement your mushrooms
        //    then display your friends and mushrooms with the updated state
            if (mushroomCount === 0) {
                alert('Insufficient mushrooms.');
            } else if (mushroomCount > 0 && friend.satisfaction < 3) {
                friend.satisfaction++;
                mushroomCount--;

                displayFriends();
                displayMushrooms();
            }

        // append the friendEl to the friends list in DOM
        
        });
        friendsContainer.append(friendEl);
    };
}

function displayMushrooms() {
    mushroomsEl.textContent = '';

    for (let i = 0; i < mushroomCount; i++) {
        let mushroomEl = renderMushroom();
        mushroomsEl.append(mushroomEl);
    }
}

displayFriends();
displayMushrooms();
