import { Component, Input } from '@angular/core';

import { Update } from '../../model/Update';
import { Player } from '../../model/Player';
import { Game } from '../../model/Game';

import { UpdateType } from '../../enum/UpdateType';
import { PlayerType } from '../../enum/PlayerType';
import { PlayerStatus } from '../../enum/PlayerStatus';
import { GameStatus } from '../../enum/GameStatus';

@Component({
	selector: 'play-select',
	templateUrl: './play-select.component.html'
})

export class PlaySelectComponent {

	@Input() user: Player;
	@Input() computer: Player;
	@Input() game: Game;

	GameStatus = GameStatus;

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
