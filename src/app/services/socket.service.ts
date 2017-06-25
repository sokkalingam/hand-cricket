import { Injectable } from '@angular/core';

import { Player } from '../model/Player';
import { Game } from '../model/Game';
import { Message } from '../model/Message';

import { PlayerType } from '../enum/PlayerType';

import { GameService } from './game.service'
import { PlayerService } from './player.service'
import { ApplicationService } from './application.service';
import { PlayService } from './play.service';
import { HelperService } from './helper.service';

var Stomp = require('stompjs');
var SockJS = require('sockjs-client');

@Injectable()
export class SocketService {

  socket: any;
  stompClient: any;

  constructor(private gameService: GameService,
              private playerService: PlayerService,
              private appService: ApplicationService,
              private playService: PlayService,
              private herlperService: HelperService) {}

  connectChat(message: Message) {
    this.stompClient.send(`/app/chat/${this.gameService.getGame().id}/connect`, {}, JSON.stringify(message));
  }

  disconnectChat(message: Message) {
    this.stompClient.send(`/app/chat/${this.gameService.getGame().id}/disconnect`, {}, JSON.stringify(message));
  }

  sendChatMessage(message: Message) {
    this.stompClient.send(`/app/chat/${this.gameService.getGame().id}`, {},
    JSON.stringify(message));
  }

  sendInput(number: number): void {
    this.stompClient
      .send(`/app/game/play/${this.gameService.getGame().id}/${this.playerService.getPlayer().id}`,
        {}, number);
  }

  connect(): any {
    var that = this;
    this.socket = new SockJS(`${this.appService.baseUrl}/game/socket-registration`);
    this.stompClient = Stomp.over(this.socket);
    console.log('StompClient: ' + JSON.stringify(this.stompClient));
    this.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);
      // that.stompClient.subscribe(`/game-updates/ABCDE/12345`, function (greeting: any) {
      //   console.log('Received Greeting: ' + JSON.stringify(greeting));
      // });
      // that.stompClient.subscribe(`/live-updates/ABCDE`, function (greeting: any) {
      //   console.log('Received Greeting: ' + JSON.stringify(greeting));
      //   messages.push(greeting.body);
      // });
      // that.stompClient.subscribe(`/chat/${game.id}`, (message: Message) => {
      //   console.log(JSON.stringify(message));
      //   messages.push(message);
      // });
    }, function (err: any) {
      console.log('Socket Disconnected', err);
      setTimeout(that.herlperService.reloadPage, 20000, window);
    });
  }

  subscribetoGame(): any {
    return this.stompClient.subscribe(`/game/${this.gameService.getGame().id}`, (response: any) => {
      console.log('Game Subscription: ' + JSON.stringify(response));
      this.gameService.setGame(JSON.parse(response.body));
    });
  }

  subscribetoChat(messages: Message[]): any {
    return this.stompClient.subscribe(`/chat/${this.gameService.getGame().id}`, (response: any) => {
      console.log('Chat Subscription: ' + JSON.stringify(response));
      messages.push(JSON.parse(response.body));
    });
  }

  subscribeToNotice(): any {
    return this.stompClient.subscribe(`/game/player/notify/${this.gameService.getGame().id}/${this.playerService.getPlayer().id}`,
        (response: any) => {
          console.log('Notice Subscription: ' + JSON.stringify(response));
          this.playService.notice = response.body;
    });
  }

  subscribeToWait(): any {
    return this.stompClient.subscribe(`/game/player/wait/${this.gameService.getGame().id}/${this.playerService.getPlayer().id}`,
      (response: any) => {
        console.log('Wait Subscription: ' + JSON.stringify(response));
        this.playService.setWait(response.body === 'true');
    });
  }

  subscribeToResult(): any {
    return this.stompClient.subscribe(`/game/result/${this.gameService.getGame().id}/${this.playerService.getPlayer().id}`,
      (response: any) => {
        console.log('Result Subscription: ' + JSON.stringify(response));
        this.playService.notice = response.body;
    });
  }

  subscribeToHighlight(): any {
    return this.stompClient.subscribe(`/game/highlight/${this.gameService.getGame().id}/${this.playerService.getPlayer().id}`,
      (response: any) => {
        console.log('Highlight Subscription: ' + JSON.stringify(response));
        this.playService.hightlight = response.body;
    });
  }

  disconnect(): void {
    this.stompClient.disconnect();
    console.log("Disconnected");
  }

  isConnected(): boolean {
    return this.stompClient && this.stompClient.connected;
  }

}
