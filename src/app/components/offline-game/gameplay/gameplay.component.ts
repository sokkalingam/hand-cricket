import {  Component, Input } from '@angular/core';

import { Update } from '../../../model/Update';
import { Player } from '../../../model/Player';
import { Game } from '../../../model/Game';

import { UpdateType } from '../../../enum/UpdateType';
import { PlayerType } from '../../../enum/PlayerType';
import { PlayerStatus } from '../../../enum/PlayerStatus';
import { GameStatus } from '../../../enum/GameStatus';

import { ProgressBarService } from '../../../services/progress-bar.service';
import { GameService } from '../../../services/game.service';
import { HelperService } from '../../../services/helper.service';
import { GameAnimationService } from '../../../services/game-animation.service';

import { GameAnimation } from '../../../animations/GameAnimation';

@Component({
  selector: 'gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css', '../../../shared/css/price_table.css',
  '../../../shared/css/vertical-progress-bar.css'],
  providers: [ProgressBarService, GameService],
  animations: [GameAnimation]
})

export class GameplayComponent {
  @Input() user: Player;
  @Input() computer: Player;
  @Input() game: Game;

  Math = Math;

  /**
  * Init Enums
  */
  PlayerStatus = PlayerStatus;
  PlayerType = PlayerType;
  GameStatus = GameStatus;
  UpdateType = UpdateType;

  userInput: number;

  constructor(private progressBarService: ProgressBarService,
    private gameService: GameService,
    private helperService: HelperService,
    private gameAS: GameAnimationService) { }

    /**
    * Returns a random number between 0 and 6, both included
    */
    getRandomNumber(): number {
      return this.helperService.getRandomNumber();
    }

    restartGame(): void {
      this.game.gameStatus = GameStatus.IN_PROGRESS;
      this.resetPlayer(this.getBatsman());
      this.resetPlayer(this.getBowler());
      this.gameAS.gameRestart++;
    }

    resetPlayer(player: Player): void {
      player.runs = 0;
      player.balls = 0;
      player.lastDelivery = undefined;
      player.status = PlayerStatus.NotOut;
    }

    isInputValid(): boolean {
      return (this.userInput >= 0 && this.userInput <= 6);
    }

    setOut(batsman: Player): void {
      batsman.status = PlayerStatus.Out;
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

    didInputsMatch(batsman: Player, bowler: Player): boolean {
      return batsman.lastDelivery == bowler.lastDelivery;
    }

    setTargetScore(): void {
      if (!this.getBowler().balls)
      this.game.targetScore = this.progressBarService.getNextTargetScore(this.getBatsman().runs);
      else
      this.game.targetScore = this.getBowler().runs;
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

    clickInput(num: number): void {
      this.userInput = num;
      this.play(this.game.batsman.type == PlayerType.User)
      this.gameAS.inputs[num]++;
    }

    play(userBatting: boolean): void {

      if (!this.isInputValid()) return;

      this.setComputerInput();
      this.setUserInput();

      if (userBatting)
      this.batAndBowl(this.user, this.computer);
      else
      this.batAndBowl(this.computer, this.user);

      this.runGameThings();
    }

    runGameThings(): void {
      this.setTargetScore();
    }

    decideGameWinner(): void {

      if (this.getBowler().isOut() && this.getBatsman().runs > this.getBowler().runs) {
        if (this.getBatsman().type == PlayerType.User)
        this.setGameStatus(GameStatus.USER_WON);
        else
        if (this.getBatsman().type == PlayerType.Computer)
        this.setGameStatus(GameStatus.COMPUTER_WON);

        this.getBatsman().wins++;
      }

      if (this.getBatsman().isOut() &&
      this.getBatsman().runs < this.getBowler().runs) {
        if (this.getBatsman().type == PlayerType.User)
        this.setGameStatus(GameStatus.COMPUTER_WON);
        else
        if (this.getBatsman().type == PlayerType.Computer)
        this.setGameStatus(GameStatus.USER_WON);

        this.getBowler().wins++;
      }

      if (this.getBatsman().isOut() && this.getBowler().isOut() &&
      this.getBatsman().runs == this.getBowler().runs &&
      this.getBatsman().runs != undefined)
      this.setGameStatus(GameStatus.DRAW);
    }

    batAndBowl(batsman: Player, bowler: Player): void {
      this.gameService.makeBatsman(this.game, batsman);
      this.gameService.makeBowler(this.game, bowler);

      this.addBalls(this.getBatsman());

      if (this.didInputsMatch(this.getBatsman(), this.getBowler())) {
        this.setOut(this.getBatsman());
      } else {
        this.setNotOut(this.getBatsman());
        this.addRuns(this.getBatsman(), this.getBowler());
      }

      this.decideGameWinner();

      if (this.getBatsman().isOut() && !this.getBowler().isOut()) {
        this.gameService.makeBatsman(this.game, bowler);
        this.gameService.makeBowler(this.game, batsman);
      }
    }

    choseToBat(): void {
      this.gameService.setPlayersAndGame(this.game, this.user, this.computer);
    }

    choseToBowl(): void {
      this.gameService.setPlayersAndGame(this.game, this.computer, this.user);
    }

  }
