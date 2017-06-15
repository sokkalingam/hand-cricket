import { Injectable } from '@angular/core';

import { Player } from '../model/Player';
import { Game } from '../model/Game';
import { Message } from '../model/Message';

import { PlayerType } from '../enum/PlayerType';

var Stomp = require('stompjs');
var SockJS = require('sockjs-client');

@Injectable()
export class SocketService {

  socket: any;
  stompClient: any;

  constructor() {
  }

  sendMessage(gameId: string, message: Message) {
    this.stompClient.send(`/app/chat/${gameId}`, {}, JSON.stringify(message));
  }

  send(player: Player, text: string): void {
    this.stompClient.send(`/app/game/ABCDE/${player.id}`, {}, JSON.stringify({ 'name': text }));
  }

  connect(): any {
    var that = this;
    this.socket = new SockJS('http://localhost:8080/socket-registration');
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

  subscribetoGame(game: Game, player: Player) {
    this.stompClient.subscribe(`/game/${game.id}/${player.id}`, (gameFromServer: Game) => {
      console.log(JSON.stringify(gameFromServer));
      game = gameFromServer;
    });
  }

  subscribetoChat(gameId: string, messages: Message[]) {
    this.stompClient.subscribe(`/chat/${gameId}`, (response: any) => {
      console.log('Received Message: ' + JSON.stringify(response));
      messages.push(JSON.parse(response.body));
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
