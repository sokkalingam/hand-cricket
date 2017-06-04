import { Injectable } from '@angular/core';

import { Player } from '../model/Player';
import { Game } from '../model/Game';

import { PlayerStatus } from '../enum/PlayerStatus';
import { GameStatus } from '../enum/GameStatus';

@Injectable()
export class GameService {

	makeBatsman(game: Game, player: Player): Player {
		if (player.balls == undefined) player.balls = 0;
		if (player.runs == undefined)  player.runs  = 0;
		player.status = PlayerStatus.NotOut;
		game.setBatsman(player);
		return player;
	}

	makeBowler(game: Game, player: Player): Player {
		game.setBowler(player);
		return player;
	}

	setPlayersAndGame(game: Game, batsman: Player, bowler: Player): void {
		this.makeBatsman(game, batsman);
		this.makeBowler(game, bowler);
		game.gameStatus = GameStatus.IN_PROGRESS;
	}

}
