import { Update } from './Update';
import { GameStatus } from '../enum/GameStatus';
import { Player } from './Player';

export class Game {
  id: string;
  targetScore: number;
  updates: Update[] = [];
  gameStatus: GameStatus = GameStatus.NOT_STARTED;

	batsman: Player;
	bowler: Player;

	setBatsman(player: Player): void 	{
		this.batsman = player;
	}
	getBatsman(): Player { return this.batsman; }

	setBowler(player: Player): void {
		this.bowler = player;
	}
	getBowler(): Player { return this.bowler; }

}
