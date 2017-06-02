import { Update } from './Update';
import { GameStatus } from '../enum/GameStatus';
import { Player } from './Player';

export class Game {
  targetScore: number;
  updates: Update[] = [];
  gameStatus: GameStatus = GameStatus.No_Game;
}
