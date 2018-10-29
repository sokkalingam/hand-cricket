import {  Component, Input, OnInit } from '@angular/core';

import { Update } from '../../../model/Update';
import { Player } from '../../../model/Player';
import { Game } from '../../../model/Game';

import { UpdateType } from '../../../enum/UpdateType';
import { PlayerType } from '../../../enum/PlayerType';
import { PlayerStatus } from '../../../enum/PlayerStatus';
import { GameStatus } from '../../../enum/GameStatus';

import { ProgressBarService } from '../../../services/progress-bar.service';
import { GameService } from '../../../services/game.service';
import { PlayerService } from '../../../services/player.service';
import { HelperService } from '../../../services/helper.service';
import { GameAnimationService } from '../../../services/game-animation.service';
import { StatsService } from '../../../services/stats.service';

import { GameAnimation } from '../../../animations/GameAnimation';
import { PlaySelectAnimation } from '../../../animations/PlaySelectAnimation';

@Component({
  selector: 'gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css'],
  providers: [ProgressBarService],
  animations: [GameAnimation, PlaySelectAnimation]
})

export class GameplayComponent implements OnInit {
  @Input() user: Player;
  @Input() computer: Player;
  @Input() game: Game;

  showInputs: boolean;

  Math = Math;

  /**
  * Init Enums
  */
  PlayerStatus = PlayerStatus;
  PlayerType = PlayerType;
  GameStatus = GameStatus;
  UpdateType = UpdateType;

  userInput: number;

  constructor(public progressBarService: ProgressBarService,
    public gameService: GameService,
    public playerService: PlayerService,
    public helperService: HelperService,
    public gameAS: GameAnimationService,
    public statsService: StatsService) { }

    ngOnInit(): void {
      this.showInputs = true;
      this.statsService.getMaxWinsAndRunsPlayer();
    }

    /**
    * Returns a random number between 0 and 6, both included
    */
    getRandomNumber(): number {
      return this.helperService.getRandomNumber();
    }

    isInputValid(): boolean {
      return (this.userInput >= 0 && this.userInput <= 6);
    }

    setOut(batsman: Player): void {
      batsman.status = PlayerStatus.Out;
      this.hideInputs();
    }

    setNotOut(player: Player): void {
      player.status = PlayerStatus.NotOut;
    }

    hideInputs(): void {
      this.showInputs = false;
      var that = this;
      setTimeout(() => that.showInputs = true, 1000);
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
        this.getBatsman().status = PlayerStatus.Won;
        this.getBowler().status = PlayerStatus.Lost;
        this.setGameStatus(GameStatus.GAME_OVER);
        this.getBatsman().wins++;
      }
      else
      if (this.getBatsman().isOut() && this.getBatsman().runs < this.getBowler().runs) {
        this.getBowler().status = PlayerStatus.Won;
        this.getBatsman().status = PlayerStatus.Lost;
        this.setGameStatus(GameStatus.GAME_OVER);
        this.getBowler().wins++;
      }
      else
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

      this.submitScore();
    }

    choseToBat(): void {
      this.restartGame();
      this.gameService.setPlayersAndGame(this.game, this.user, this.computer);
    }

    choseToBowl(): void {
      this.restartGame();
      this.gameService.setPlayersAndGame(this.game, this.computer, this.user);
    }

    toss(): void {
      (Math.random() < 0.5) ? this.choseToBat() : this.choseToBowl();
    }

    resetPlayer(player: Player): void {
      player.runs = 0;
      player.balls = 0;
      player.lastDelivery = undefined;
      player.status = PlayerStatus.NotOut;
    }

    restartGame(): void {
      this.game.gameStatus = GameStatus.IN_PROGRESS;
      this.resetPlayer(this.user);
      this.resetPlayer(this.computer);
    }

    submitScore(): void {

      if (this.statsService.playerMaxRuns == null ||
          this.statsService.playerMaxWins == null ||
          this.user.runs > this.statsService.playerMaxRuns.runs ||
          this.user.wins > this.statsService.playerMaxWins.wins) {

            this.statsService.submitScore(this.user).subscribe(
              (res: boolean) => {
                console.log('PlayerStats Submit: ' + res);
                this.statsService.getMaxWinsAndRunsPlayer();
              },
              (error: any) => console.log(error)
            );

          }
    }

  }
