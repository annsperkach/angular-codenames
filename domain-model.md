# User Stories

```
1.
As a user, 
I want to be able to create a new game and obtain a unique game ID, 
So that I can share it with my friends to invite them to join the game.
```
```
2.
As a player, 
I want to be able to choose a role (operative or spymaster) after starting the game, 
So that I can actively participate in the game according to my preferred role.
```
```
3.
As an operative role player, 
I want to see a list of words relevant to my role during the game, 
So that I can interact with them by clicking on them to mark them as chosen.
```
```
4.
As a spymaster role player, 
I want to view a list of all words in the game along with color-coded borders indicating their affiliations,
So that I can strategize and provide clues to my team without interacting with the words directly.
```
```
5.
As a user, 
I want the option to continue playing with a new game after finishing the current one, 
So that I can enjoy multiple rounds of the game without interruption.
```
```
6.
As a player, 
I want to receive real-time updates from the server, including information about joined players, game start, and ongoing game updates, 
So that I stay informed about the game's progress.
```

# Domain model
## Frontend
| Classes          | Members        | Methods                   | Scenario                                                             | Outputs                                                                                                                                                                                                                                |
|------------------|----------------|---------------------------|----------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `GameComponent`  | gameId: string | `ngOnInit()`              | When the user enters the game component                              |                                                                                                                                                                                                                                        |
|                  | role: string   | `nextGame()`              | When the user clicks the "Next game" button.                         | The component sends a request to the server to start the next game using the current game ID. The server responds by emitting the 'startGame' event with the new set of words for the next game.                                       |
|                  | words: any     | `startGame()`             | When the user initiates starting a new game.                         | The component sends a request to the server to start a new game using the current game ID. The server generates a set of words and emits the 'startGame' event to all participants in the game, providing them with the list of words. |
|                  |                | `receiveJoinedPlayers()`  | When the server notifies that a player has joined the game.          | The component listens for the 'joinGame' event and displays a notification using a snack bar to inform the user that a player has joined the game.                                                                                     |
|                  |                | `receiveStartGame()`      | When the server starts a new game and sends the list of words.       | The component listens for the 'startGame' event and updates the role to 'operative'. It also populates the words property with the list of words received from the server.                                                             |
|                  |                | `clickWord(word: any)`    | When the user clicks on a word as an operative to mark it as chosen. | The selected word's selected property is updated to true, indicating that the user has interacted with that word.                                                                                                                      |
|                  |                | `receiveGameUpdate()`     | When the server sends updates about the game's progress.             | The component listens for the game-specific event and updates the words property based on the new state of the game received from the server.                                                                                          |

| Classes          | Members | Methods        | Scenario                                             | Outputs                                                                                                                                              |
|------------------|---------|----------------|------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `LobbyComponent` |         | `createGame()` | When the user initiates the creation of a new game.  | A new game is created, and a unique game ID is generated. The user is then navigated to the game component with the generated game ID in the route.  |
|                  |         |                |                                                      |                                                                                                                                                      |
|                  |         |                |                                                      |                                                                                                                                                      |

| Classes            | Members         | Functions                                    | Scenario                                                            | Outputs                                                                                                                                                                                                                   |
|--------------------|-----------------|----------------------------------------------|---------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `SocketioService`  | socket: Socket  | `connect(gameId: string)`                    | When the user enters the game component and initiates a connection. | The service establishes a socket connection to the specified game ID, enabling real-time communication with the server.                                                                                                   |
|                    |                 | `startGame(gameId: string)`                  | When the user starts a new game.                                    | The service sends a request to the server to start a new game using the provided game ID. The server responds by generating a list of words and emitting the 'startGame' event with the words for all participants.       |
|                    |                 | `sendGameUpdate(gameId: string, words: any)` | When the user updates the game state by interacting with words.     | The service sends an update request to the server with the updated words array, reflecting the user's interactions. The server then emits the 'gameUpdate' event to notify all participants about the updated game state. |
|                    |                 | `receiveJoinedPlayers()`                     | When the server notifies about players joining the game.            | The service listens for the 'joinGame' event and provides an observable stream of messages notifying the frontend about player joins.                                                                                     |
|                    |                 | `receiveStartGame()`                         | When the server starts a new game and sends the list of words.      | The service listens for the 'startGame' event and provides an observable stream of the received words, allowing the frontend to update its state accordingly.                                                             |
|                    |                 | `receiveGameUpdate(gameId: string)`          | When the server sends updates about the game's progress.            | The service listens for the specific game event and provides an observable stream of the received words, allowing the frontend to update its state based on the latest game updates.                                      |

## Backend
| Classes         | Members | Methods             | Scenario                                                    | Outputs                                                                                                                                   |
|-----------------|---------|---------------------|-------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `Words Util`    |         | `createGame()`      | When a new game is initiated.                               | Generates a shuffled list of words, assigns colors and affiliations to the words, and returns the final list of words ready for the game. |
|                 |         | `shuffle(array)`    | When shuffling an array.                                    | Rearranges the elements of the array in a random order and returns the shuffled array.                                                    |
|                 |         | `getRandomInt(max)` | When generating a random integer within a specified range.  | Generates a random integer between 0 and the provided max (exclusive) and returns the random integer.                                     |
|                 |         |                     |                                                             |                                                                                                                                           |

| Classes | Members | Event Listeners                 | Scenario                                                      | Outputs                                                                                                                                                                                                                      |
|---------|---------|---------------------------------|---------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Index` |         | `connection`                    | When a user connects to the server.                           | Logs a message indicating that a user has connected                                                                                                                                                                          |
|         |         | `startGame({ gameId })`         | When a user initiates starting a new game.                    | The server receives a request to start a new game. It generates a list of words using the createGame() function and emits the 'startGame' event to all participants in the game room, providing them with the list of words. |
|         |         | `gameUpdate({ gameId, words })` | When a user updates the game state by interacting with words. | The server receives an update request with the modified words array. It emits the 'gameUpdate' event to all participants in the game room, sharing the updated game state.                                                   |
|         |         | `joinGame({ gameId })`          | When a user joins a game room.                                | The server receives a join request from a user, adds them to the specific game room, and emits a 'joinGame' event to notify other participants that a player has joined the game room.                                       |

## Socket.IO
Provides real-time communication between the frontend and backend components.