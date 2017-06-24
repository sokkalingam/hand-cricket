import { Injectable } from '@angular/core';

import { Player } from '../model/Player';
import { Game } from '../model/Game';
import { Message } from '../model/Message';

import { PlayerType } from '../enum/PlayerType';

import { GameService } from './game.service'
import { ApplicationService } from './application.service';
import { PlayService } from './play.service';

var Stomp = require('stompjs');
var SockJS = require('sockjs-client');

@Injectable()
export class SocketService {

  socket: any;
  stompClient: any;

  constructor(private gameService: GameService,
              private appService: ApplicationService,
              private playService: PlayService) {}

  connectChat(gameId: string, message: Message) {
    this.stompClient.send(`/app/chat/${gameId}/connect`, {}, JSON.stringify(message));
  }

  disconnectChat(gameId: string, message: Message) {
    this.stompClient.send(`/app/chat/${gameId}/disconnect`, {}, JSON.stringify(message));
  }

  sendChatMessage(gameId: string, message: Message) {
    this.stompClient.send(`/app/chat/${gameId}`, {}, JSON.stringify(message));
  }

  sendInput(gameId: string, playerId: string, number: number): void {
    this.stompClient.send(`/app/game/play/${gameId}/${playerId}`, {}, number);
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
      // console.log('Socket Disconnected', err);
      setTimeout(window.location.reload, 5000);
    });
  }

  subscribetoGame(game: Game): any {
    return this.stompClient.subscribe(`/game/${game.id}`, (response: any) => {
      console.log('Game Subscription: ' + JSON.stringify(response));
      this.gameService.setGame(JSON.parse(response.body));
    });
  }

  subscribetoChat(gameId: string, messages: Message[]): any {
    return this.stompClient.subscribe(`/chat/${gameId}`, (response: any) => {
      console.log('Chat Subscription: ' + JSON.stringify(response));
      messages.push(JSON.parse(response.body));
    });
  }

  subscribeToNotice(gameId: string, playerId: string): any {
    return this.stompClient.subscribe(`/game/player/notify/${gameId}/${playerId}`, (response: any) => {
      console.log('Notice Subscription: ' + JSON.stringify(response));
      this.playService.notice = response.body;
    });
  }

  subscribeToWait(gameId: string, playerId: string): any {
    return this.stompClient.subscribe(`/game/player/wait/${gameId}/${playerId}`, (response: any) => {
      console.log('Wait Subscription: ' + JSON.stringify(response));
      this.playService.setWait(response.body === 'true');
    });
  }

  subscribeToResult(gameId: string, playerId: string): any {
    return this.stompClient.subscribe(`/game/result/${gameId}/${playerId}`, (response: any) => {
      console.log('Result Subscription: ' + JSON.stringify(response));
      this.playService.notice = response.body;
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
