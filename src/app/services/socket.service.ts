import { Injectable } from '@angular/core';

import { Player } from '../model/Player';
import { PlayerType } from '../enum/PlayerType';

var Stomp = require('stompjs');
var SockJS = require('sockjs-client');

@Injectable()
export class SocketService {

  socket: any;

  constructor() {
  }

  send(player: Player, text: string): void {
    player.stompClient.send(`/app/game/ABCDE/${player.id}`, {}, JSON.stringify({ 'name': text }));
  }

  connect(player: Player, messages: string[]): void {
    var that = this;
    this.socket = new SockJS('http://localhost:8080/socket-registration');
    player.stompClient = Stomp.over(this.socket);
    console.log('StompClient: ' + JSON.stringify(player.stompClient));
    player.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);
      player.stompClient.subscribe(`/live-updates/ABCDE/${player.id}`, function (greeting: any) {
        console.log('Received Greeting: ' + JSON.stringify(greeting));
        messages.push(greeting.body);
      });
      player.stompClient.subscribe(`/live-updates/ABCDE`, function (greeting: any) {
        console.log('Received Greeting: ' + JSON.stringify(greeting));
        messages.push(greeting.body);
      });
    }, function (err: any) {
      console.log('Socket Disconnected', err);
      console.log('Retrying in 5 seconds...');
      setTimeout(that.connect(player, messages), 5000);
    });
  }

  disconnect(player: Player): void {
    player.stompClient.disconnect();
    console.log("Disconnected");
  }

}
