# Hand Cricket

It is a number game that can be played against the computer or with a friend online. It simulates the game of cricket popularly played among school kids using their hands back in India.

Want to play? Go to http://www.handcricketgame.com

## How to play Hand Cricket?

  It is a two player game. One person bats while the other person bowls. A player can play any number between 0 to 6. [0, 1, 2, 3, 4, 5, 6]

  Batsman and Bowler input a random number each. If the numbers match, batsman is out else batsman's input is added to his total score as runs.

  If batsman plays zero and bowler plays a number other than zero, bowler's input is added to batsman's score.

  When batsman gets out, batsman becomes bowler and bowler becomes batsman. Whoever scores the highest runs wins.
  
## Example

    Batsman plays 5, bowler plays 4. Batsman scores 5 runs.
    Batsman plays 0, bowler plays 3. Batsman scores 3 runs, total of 8 runs.
    Batsman plays 6, bowler plays 6. Batsman is out with a total of 8 runs.
	
	Roles are reversed, Batsman becomes Bowler and Bowler becomes Batsman.
	
	Batsman plays 6, bowler plays 2. Batsman scores 6 runs.
	Batsman plays 0, bowler plays 4. Batsman scores 4 runs, total of 10 runs and wins the game.
	
## How to run this project in your local?

    git clone https://github.com/sosubramanian/hand-cricket.git hand-cricket
    cd hand-cricket
    npm start

The app will now be served in http://localhost:4200


