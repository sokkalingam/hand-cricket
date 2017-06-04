import { Update } from './Update';
import { GameStatus } from '../enum/GameStatus';
import { Player } from './Player';

export class Game {
  targetScore: number;
  updates: Update[] = [];
  gameStatus: GameStatus = GameStatus.NOT_STARTED;

	batsman: Player;
	bowler: Player;

	battedList: Player[] = [];
	bowledList: Player[] = [];

	setBatsman(player: Player): void 	{
		if (!this.didPlayerBat(player))
			this.batsman = player;
	}
	getBatsman(): Player { return this.batsman; }

	setBowler(player: Player): void {
		if (!this.didPlayerBowl(player))
			this.bowler = player;
	}
	getBowler(): Player { return this.bowler; }

	addToBattedList(batsman: Player): void { this.battedList.push(batsman); }
	addToBowledList(batsman: Player): void { this.bowledList.push(batsman); }

	didPlayerBat(player: Player): boolean {
		return this.isPlayerInList(this.battedList, player);
	}

	didPlayerBowl(player: Player): boolean {
		return this.isPlayerInList(this.bowledList, player);
	}

	isPlayerInList(list: Player[], player: Player): boolean {
		for (let item of list)
			if (item.id == player.id)
				return true;
		return false;
	}

}
