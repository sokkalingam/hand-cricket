import { Component } from '@angular/core';

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
	selector: 'game',
	templateUrl: './game.component.html',
	providers: [ProgressBarService, UpdateService]
})

export class GameComponent {

	/**
	* Init Enums
	*/
	PlayerStatus = PlayerStatus;
	PlayerType = PlayerType;
	GameStatus = GameStatus;

	userInput: number;

	user: Player = new Player(PlayerType.User);
	computer: Player = new Player(PlayerType.Computer);

	game: Game = new Game();

	constructor(private progressBarService: ProgressBarService,
		private updateService: UpdateService) { }

		getBatsman(): Player {
			return this.game.getBatsman();
		}

		getBowler(): Player {
			return this.game.getBowler();
		}

		setGameStatus(gameStatus: GameStatus): void {
			this.game.gameStatus = gameStatus;
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
