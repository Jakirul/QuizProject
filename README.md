# InQUIZitive - LAP 3 Project

Contributors:
- [Guy Margalith](https://github.com/guymargalith)
- [Bethan Vaughan](https://github.com/bethanvaughan)
- [Angela Dyrmishi](https://github.com/adyrmishi)
- [Jakirul Islam](https://github.com/Jakirul)


## Project Description

This is a group project which asked us to create an online quiz game using React. Users can register to play or choose to play as a Guest (not logged in), however the unregistered user's score will not be counted on the leaderboard. Users can start a quiz with other players and choose the number of questions, level and trivia topic of their preference. Once the game has finished, they can see each player's results of the game, as well as the overall scores for each player in the leaderboard.

The website can be viewed in this link: [https://lap3-inquizitive.netlify.app/](https://lap3-inquizitive.netlify.app/)

## Installation and Usage
### Installation
- For **client side**, run `npm install` in the client folder
- For **server side**, run `bash _scripts/startDB.sh`
- For **testing**, run bash _scripts/startTest.sh

### Usage
- Run the application using the two client and server side commands and navigate to `localhost:3000`

## Testing
### Client Side
- In the **client** folkder, run `npm run coverage` or `npm test`

### Server side
- In the **root directory**, run `bash _scripts/startTest.sh`

## Technologies
### Front end
- React
- React Redux
- React Router DOM
- Jest Testing

### Backend / Hosting
- JavaScript
- Node/Express
- MongoDB
- Docker
- Heroku / Netlify / Mongo Atlas

## Process
- Met up on Friday and planned the design on Figma and decided who will do which part of the work
- Started the backend and front end on Monday
- Finished backend relatively quickly and focused on front end after Tuesday
- Started testing
- Deployed on Netlify, Heroku and Mongo Atlas

## Wins and Challenges
### Wins
- Got the quiz working
- Added login/registration
- Can handle multiple players
- Added a chat system

### Challenges
- Redux was difficult to implement at first
- Socket.io was new to a lot of us so trying to figure out how the client and socket servers would communicate
- In a deployed version, the lobbys wouldn't work - (fixed)

## Website Design

### Home page
![image](https://user-images.githubusercontent.com/8548957/150417929-b4f11899-3956-4bcd-a3d5-4142c511ba92.png)

### New Quiz
![image](https://user-images.githubusercontent.com/8548957/150418000-cd5fc553-673e-4cfa-96e3-b9b6ebe9928e.png)

### Lobby
![image](https://user-images.githubusercontent.com/8548957/150418064-e5626cc2-389b-4ac8-b73f-6dc2a7ed0b4f.png)

### Game
![image](https://user-images.githubusercontent.com/8548957/150418157-ab00c894-15ba-4d56-968b-460b45488001.png)

### Leaderboard
![image](https://user-images.githubusercontent.com/8548957/150418224-73bb2356-e22d-434f-be6d-02ae9bbffbea.png)
