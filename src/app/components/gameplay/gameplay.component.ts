import { Component, Input } from '@angular/core';

import { Update } from '../../model/Update';
import { Player } from '../../model/Player';
import { Game } from '../../model/Game';

import { UpdateType } from '../../enum/UpdateType';
import { PlayerType } from '../../enum/PlayerType';
import { PlayerStatus } from '../../enum/PlayerStatus';
import { GameStatus } from '../../enum/GameStatus';

import { ProgressBarService } from '../../services/progress-bar.service';
import { UpdateService } from '../../services/update.service';

@Component({
  selector: 'gameplay',
  templateUrl: './gameplay.component.html',
	providers: [ProgressBarService, UpdateService]
})

export class GameplayComponent {
	@Input() user: Player;
	@Input() computer: Player;
	@Input() game: Game;

	/**
	* Init Enums
	*/
	PlayerStatus = PlayerStatus;
	PlayerType = PlayerType;
	GameStatus = GameStatus;
	UpdateType = UpdateType;

	userInput: number;

	/**
	* 0 to 6, total of 7 different outputs from computer
	*/
	noOfOutputs: number = 7;

	constructor(private progressBarService: ProgressBarService,
							private updateService: UpdateService) { }

	/**
	* Returns a random number between 0 and 6, both included
	*/
	getRandomNumber(): number {
		return Math.floor(Math.random() * this.noOfOutputs);
	}

	restartGame(): void {
		location.reload();
	}

	isInputValid(): boolean {
		return (this.userInput >= 0 && this.userInput <= 6);
	}

	setOut(batsman: Player, bowler: Player): void {
		var updateType: UpdateType = batsman.type == PlayerType.User ? UpdateType.DANGER : UpdateType.SUCCESS;
		this.updateService.addUpdate(updateType, `${PlayerType[batsman.type]} got Out, scored ${batsman.runs} runs in ${batsman.balls} balls`);
		batsman.status = PlayerStatus.Out;
		this.game.addToBattedList(batsman);
		this.game.addToBowledList(bowler);
	}

	setNotOut(player: Player): void {
		player.status = PlayerStatus.NotOut;
	}

	getBatsman(): Player { return this.game.getBatsman(); }

	getBowler(): Player { return this.game.getBowler(); }

	setGameStatus(gameStatus: GameStatus): void {
		this.game.gameStatus = gameStatus;
	}

	setUserInput(): void {
		this.user.lastDelivery = this.userInput;
		this.userInput = undefined;
	}

	 setComputerInput(): void {
		 this.computer.lastDelivery = this.getRandomNumber();
	 }

	 makeBatsman(player: Player): Player {
		 if (player.balls == undefined) player.balls = 0;
		 if (player.runs == undefined)  player.runs  = 0;
		 player.status = PlayerStatus.NotOut;
		 this.game.setBatsman(player);
		 return player;
	 }

	 makeBowler(player: Player): Player {
		 this.game.setBowler(player);
		 return player;
	 }

	 didInputsMatch(batsman: Player, bowler: Player): boolean {
		 var message: string = `${PlayerType[batsman.type]} batted ${batsman.lastDelivery}, ${PlayerType[bowler.type]} bowled ${bowler.lastDelivery}`;
		 this.updateService.addUpdate(UpdateType.INFO, message);
		 return batsman.lastDelivery == bowler.lastDelivery;
	 }

	 setTargetScore(): void {
		 if (this.getBowler().runs == undefined)
			 this.game.targetScore = this.progressBarService.getNextTargetScore(this.getBatsman().runs);
		 else
			 this.game.targetScore = this.getBowler().runs;
	 }

	 getUpdates(): void {
		 this.game.updates = this.updateService.getUpdates();
	 }

	 addBalls(player: Player): void {
		 player.balls++;
	 }

	 addRuns(batsman: Player, bowler: Player): void {
		 if (batsman.lastDelivery == 0)
				batsman.runs += bowler.lastDelivery;
			else
				batsman.runs += batsman.lastDelivery;
	 }

	 play(userBatting: boolean): void {

		 if (!this.isInputValid()) return;

		 this.setComputerInput();
		 this.setUserInput();

		 if (userBatting)
			this.userBatting();
		 else
			this.computerBatting();

			this.runGameThings();
	 }

	 runGameThings(): void {
			this.setTargetScore();
			this.getUpdates();
	 }

	userBatting(): void {

		this.makeBatsman(this.user);
		this.makeBowler(this.computer);

		this.addBalls(this.getBatsman());

		if (this.didInputsMatch(this.getBatsman(), this.getBowler())) {
			this.setOut(this.getBatsman(), this.getBowler());
		} else {
			this.setNotOut(this.getBatsman());
			this.addRuns(this.getBatsman(), this.getBowler());
		}

		if (this.getBatsman().runs > this.getBowler().runs)
			this.setGameStatus(GameStatus.USER_WON);

		if (this.getBatsman().isOut() && this.getBatsman().runs < this.getBowler().runs)
			this.setGameStatus(GameStatus.COMPUTER_WON);

		if (this.getBatsman().isOut() && this.getBatsman().runs == this.getBowler().runs && this.getBatsman().runs != undefined)
				this.setGameStatus(GameStatus.DRAW);

		if (this.getBatsman().isOut()) {
			this.makeBatsman(this.computer);
			this.makeBowler(this.user);
		}
	}

	computerBatting(): void {

		this.makeBatsman(this.computer);
		this.makeBowler(this.user);

		this.addBalls(this.getBatsman());

		if (this.didInputsMatch(this.getBatsman(), this.getBowler())) {
			this.setOut(this.getBatsman(), this.getBowler());
		} else {
			this.setNotOut(this.getBatsman());
			this.addRuns(this.getBatsman(), this.getBowler());
		}

		if (this.getBatsman().runs > this.getBowler().runs)
			this.setGameStatus(GameStatus.COMPUTER_WON);

		if (this.getBatsman().isOut() && this.getBatsman().runs < this.getBowler().runs)
			this.setGameStatus(GameStatus.USER_WON);

		if (this.getBatsman().isOut() && this.getBatsman().runs == this.getBowler().runs && this.getBatsman().runs != undefined)
				this.setGameStatus(GameStatus.DRAW);

		if (this.getBatsman().isOut()) {
			this.makeBatsman(this.user);
			this.makeBowler(this.computer);
		}
	}

	choseToBat(): void {
		this.makeBatsman(this.user);
		this.makeBowler(this.computer);
		this.setGameStatus(GameStatus.IN_PROGRESS);
	}

	choseToBowl(): void {
		this.makeBatsman(this.computer);
		this.makeBowler(this.user);
		this.setGameStatus(GameStatus.IN_PROGRESS);
	}

}
