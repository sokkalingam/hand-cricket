import { Injectable } from '@angular/core';

import { Player } from '../model/Player';
import { Game } from '../model/Game';
import { Message } from '../model/Message';

import { PlayerType } from '../enum/PlayerType';

import { GameService } from './game.service'
import { ApplicationService } from './application.service';

var Stomp = require('stompjs');
var SockJS = require('sockjs-client');

@Injectable()
export class SocketService {

  socket: any;
  stompClient: any;

  constructor(private gameService: GameService,
              private appService: ApplicationService) {}

  connectChat(gameId: string, message: Message) {
    this.stompClient.send(`/app/chat/${gameId}/connect`, {}, JSON.stringify(message));
  }

  disconnectChat(gameId: string, message: Message) {
    this.stompClient.send(`/app/chat/${gameId}/disconnect`, {}, JSON.stringify(message));
  }

  sendChatMessage(gameId: string, message: Message) {
    this.stompClient.send(`/app/chat/${gameId}`, {}, JSON.stringify(message));
  }

  send(player: Player, text: string): void {
    this.stompClient.send(`/app/game/ABCDE/${player.id}`, {}, JSON.stringify({ 'name': text }));
  }

  sendInput(gameId: string, playerId: string, number: number): void {
    this.stompClient.send(`/play/${gameId}/${playerId}`, number);
  }

  connect(): any {
    var that = this;
    this.socket = new SockJS(`${this.appService.baseUrl}/socket-registration`);
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
      console.log('Retrying in 5 seconds...');
      setTimeout(that.connect(), 5000);
    });
  }

  subscribetoGame(game: Game): any {
    return this.stompClient.subscribe(`/game/${game.id}`, (response: any) => {
      console.log('Game Subscription: ' + JSON.stringify(response));
      this.gameService.setGame(JSON.parse(response.body));
    });
  }

  subscribetoChat(gameId: string, messages: Message[], scrollFn: any): any {
    return this.stompClient.subscribe(`/chat/${gameId}`, (response: any) => {
      console.log('Chat Subscription: ' + JSON.stringify(response));
      messages.push(JSON.parse(response.body));
      setTimeout(scrollFn, 100, messages[messages.length - 1]);
    });
  }

  subscribeToNotice(gameId: string, playerId: string, notice: string): any {
    return this.stompClient.subscribe(`/notice/${gameId}/${playerId}`, (response: any) => {
      console.log('Notice Subscription: ' + JSON.stringify(response));
      notice = response.text();
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
