import { Component, Input } from '@angular/core';

import { Update } from '../../../model/Update';
import { Player } from '../../../model/Player';
import { Game } from '../../../model/Game';

import { UpdateType } from '../../../enum/UpdateType';
import { PlayerType } from '../../../enum/PlayerType';
import { PlayerStatus } from '../../../enum/PlayerStatus';
import { GameStatus } from '../../../enum/GameStatus';

import { ProgressBarService } from '../../../services/progress-bar.service';
import { UpdateService } from '../../../services/update.service';
import { GameService } from '../../../services/game.service';
import { HelperService } from '../../../services/helper.service';

@Component({
  selector: 'gameplay',
  templateUrl: './gameplay.component.html',
  providers: [ProgressBarService, UpdateService, GameService]
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
    private updateService: UpdateService,
    private gameService: GameService,
    private helperService: HelperService) { }

    /**
    * Returns a random number between 0 and 6, both included
    */
    getRandomNumber(): number {
      return this.helperService.getRandomNumber();
    }

    restartGame(): void {
      location.reload();
    }

    isInputValid(): boolean {
      return (this.userInput >= 0 && this.userInput <= 6);
    }

    setOut(batsman: Player): void {
      this.updateService.addUpdate(
        UpdateType.DANGER,
        `${PlayerType[batsman.type]} got Out, scored ${batsman.runs} runs in ${batsman.balls} balls`
      );
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

    clickInput(num: number): void {
      this.userInput = num;
      this.play(this.game.batsman.type == PlayerType.User)
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
      this.getUpdates();
    }

    decideGameWinner(): void {

      if (this.getBatsman().runs > this.getBowler().runs) {
        if (this.getBatsman().type == PlayerType.User)
        this.setGameStatus(GameStatus.USER_WON);
        else
        if (this.getBatsman().type == PlayerType.Computer)
        this.setGameStatus(GameStatus.COMPUTER_WON);
      }

      if (this.getBatsman().isOut() &&
      this.getBatsman().runs < this.getBowler().runs) {
        if (this.getBatsman().type == PlayerType.User)
        this.setGameStatus(GameStatus.COMPUTER_WON);
        else
        if (this.getBatsman().type == PlayerType.Computer)
        this.setGameStatus(GameStatus.USER_WON);
      }

      if (this.getBatsman().isOut() &&
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
