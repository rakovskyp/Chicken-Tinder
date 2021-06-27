# Chicken Tinder 🐣🔥
A virtual card deck that shows you new local restaurants. Swipe with your friends to decide on a restaurant. Where you match is where you eat!


### Setup
##### Mac
- run npm i 
- install xcode
- run xcode and accept terms and conditions
- npm install expo
- install homebrew
- brew install watchman
- enable permissions for watchman:
    - security & privacy > files and folders > watchman
    - security & privacy > full disk access > watchman

### Routes

Routes (`homeStack.js`) allow you to change between seperate screens. When you add a new screen make sure you add it to the `homeStack.js`


### Screens

Everything in the `screens` folder represents a different "page" in the app. 

##### BasicInfo.js

This is the first page of the app. It prompts the user to input a name and (should) enforce location permissions. 

##### UserType.js

Second page of the app. Here the user can decide whether to host a new lobby or join an existing lobby as a guest.

##### Lobby.js

The lobby maintains a group of users until the leader starts the lobby. When this occurs everyone moves to `ChickenTinderApp.js`

##### ChickenTinderApp.js

This is the swiping deck of the app. When all users in the lobby swipe right on the same restaurant, they will match.

##### InfoScreen.js

When a users taps on a card they will be taken to a new screen that has detailed information about the card. This information includes photos, reviews, stars, menu items, etc.

### Components

Components are the different React objects that make up different parts of the app.

A `CardDeck` is made up of multiple `Card`s. Each `Card` consists of a `Picture` and a `Misc`. A `Picture` is just the image rendered on the card. `Misc` refers to the basic details like name, cuisine, most recent review, etc.